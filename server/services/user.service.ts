import { UserRepository } from '@/server/repositories/user.repository';
import { SignupSchema, UserDetailsQuerySchema } from '@/server/validators/user.validator';
import { z } from 'zod';
import UtmCampaign from '@/server/models/UtmCampaign';
import { getDateRangeBounds } from '@/server/utils/timezone';
import { logger } from '@/server/utils/logger';

export class UserService {
  constructor(private repository: UserRepository) {}

  async registerUser(data: z.infer<typeof SignupSchema>, clientIp?: string, userAgent?: string) {
    const existingUser = await this.repository.findByEmailOrPhone(data.email, data.phone);

    const campaignData = {
      route: data.route,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      platform: data.platform,
      gclid: data.gclid,
      fbclid: data.fbclid,
      fbp: data.fbp,
      fbc: data.fbc,
      utm_term: data.utm_term,
      matchtype: data.matchtype,
      network: data.network,
      device: data.device,
      keyword: data.keyword,
      placement: data.placement,
      campaignid: data.campaignid,
      adgroupid: data.adgroupid,
      clientIp,
      userAgent,
    };

    const filingData = {
      primaryFilingRequirement: data.primaryFilingRequirement,
      entityType: data.entityType,
      filingDetails: data.filingDetails,
    };

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      city: data.city,
      countryCode: data.countryCode,
      timezone: data.timezone,
    };

    if (existingUser) {
      // Multi-Touchpoint Tracking: add new campaign and update demographics
      logger.info(`Existing user detected (${existingUser.email || existingUser.phone}), updating demographics and adding campaign`);
      await this.repository.updateExistingUser(existingUser._id as any, userData, campaignData, filingData);
      
      // Return the updated user object for the response
      const updatedUser = { ...existingUser.toObject(), name: userData.name, companyName: userData.companyName, primaryFilingRequirement: filingData.primaryFilingRequirement, city: userData.city, filingDetails: filingData.filingDetails };
      return { user: updatedUser, status: 'existing' };
    }

    logger.info(`Creating new user: ${data.email || data.phone}`);
    const newUser = await this.repository.createUser(userData, campaignData, filingData);
    return { user: newUser, status: 'new' };
  }

  async getUserDetails(query: z.infer<typeof UserDetailsQuerySchema>) {
    const { startDate, endDate, page, limit, range } = query;
    const skip = (page - 1) * limit;

    // Use timezone utility for accurate range bounding
    const { start, end } = getDateRangeBounds(range, startDate, endDate, 'Asia/Kolkata');

    const filter: any = {
      createdAt: {
        $gte: start,
        $lte: end,
      },
    };

    logger.info(`Fetching user details for range: ${range}, bounds: [${start.toISOString()} - ${end.toISOString()}]`);

    // Query total count and campaigns concurrently for maximum performance
    const [total, campaigns] = await Promise.all([
      UtmCampaign.countDocuments(filter),
      UtmCampaign.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1, _id: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'filing_info',
          let: { searchUserId: '$userId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$userId', '$$searchUserId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 }
          ],
          as: 'filingInfo'
        }
      },
      { $unwind: { path: '$filingInfo', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          userCreatedAt: "$user.createdAt",
          utmCreatedAt: "$createdAt"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$user",
              "$filingInfo",
              "$$ROOT"
            ]
          }
        }
      },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          createdAt: 0,
          userId: 0,
          user: 0,
          filingInfo: 0
        }
      }
    ])
  ]);

    return {
      data: campaigns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
