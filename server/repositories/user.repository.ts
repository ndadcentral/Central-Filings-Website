import mongoose, { HydratedDocument } from 'mongoose';
import User, { IUser } from '@/server/models/User';
import UtmCampaign, { IUtmCampaign } from '@/server/models/UtmCampaign';
import FilingInfo, { IFilingInfo } from '@/server/models/FilingInfo';

export interface UserPersistData {
  name: string;
  email?: string;
  phone: string;
  companyName: string;
  city?: string;
  countryCode?: string;
  timezone?: string;
}

export interface CampaignPersistData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  platform?: string;
  gclid?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  matchtype?: string;
  network?: string;
  device?: string;
  keyword?: string;
  placement?: string;
  campaignid?: string;
  adgroupid?: string;
  route?: string;
  userAgent?: string;
}

export interface FilingPersistData {
  primaryFilingRequirement: string;
  entityType?: string;
  filingDetails?: string;
}

export class UserRepository {
  async findByEmailOrPhone(email: string | undefined, phone: string): Promise<HydratedDocument<IUser> | null> {
    const conditions: Array<{ phone?: string; email?: string }> = [{ phone }];
    if (email && email.trim()) {
      conditions.push({ email: email.trim().toLowerCase() });
    }
    return User.findOne({ $or: conditions });
  }

  async createUser(
    userData: UserPersistData,
    campaignData: CampaignPersistData,
    filingData: FilingPersistData
  ): Promise<IUser> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check again inside transaction to prevent race conditions
      const conditions: Array<{ phone?: string; email?: string }> = [{ phone: userData.phone }];
      if (userData.email) {
        conditions.push({ email: userData.email });
      }

      const existingUser = await User.findOne({ $or: conditions }).session(session);
      if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS');
      }

      // 1. Explicit allowlisted User creation
      const [user] = await User.create(
        [
          {
            name: userData.name,
            email: userData.email || undefined,
            phone: userData.phone,
            companyName: userData.companyName,
            city: userData.city || undefined,
            countryCode: userData.countryCode || '+91',
            timezone: userData.timezone || 'Asia/Kolkata',
          },
        ],
        { session }
      );

      // 2. Explicit allowlisted FilingInfo creation
      await FilingInfo.create(
        [
          {
            userId: user._id,
            primaryFilingRequirement: filingData.primaryFilingRequirement,
            entityType: filingData.entityType || undefined,
            filingDetails: filingData.filingDetails || undefined,
          },
        ],
        { session }
      );

      // 3. Explicit allowlisted UtmCampaign creation
      await UtmCampaign.create(
        [
          {
            userId: user._id,
            utm_source: campaignData.utm_source || undefined,
            utm_medium: campaignData.utm_medium || undefined,
            utm_campaign: campaignData.utm_campaign || undefined,
            utm_content: campaignData.utm_content || undefined,
            utm_term: campaignData.utm_term || undefined,
            platform: campaignData.platform || undefined,
            gclid: campaignData.gclid || undefined,
            fbclid: campaignData.fbclid || undefined,
            fbp: campaignData.fbp || undefined,
            fbc: campaignData.fbc || undefined,
            matchtype: campaignData.matchtype || undefined,
            network: campaignData.network || undefined,
            device: campaignData.device || undefined,
            keyword: campaignData.keyword || undefined,
            placement: campaignData.placement || undefined,
            campaignid: campaignData.campaignid || undefined,
            adgroupid: campaignData.adgroupid || undefined,
            route: campaignData.route || '/',
            userAgent: campaignData.userAgent || undefined,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return user;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async updateExistingUser(
    userId: mongoose.Types.ObjectId,
    userData: UserPersistData,
    campaignData: CampaignPersistData,
    filingData: FilingPersistData
  ): Promise<boolean> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Update demographics on User record
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            name: userData.name,
            companyName: userData.companyName,
            city: userData.city || undefined,
            countryCode: userData.countryCode || '+91',
            timezone: userData.timezone || 'Asia/Kolkata',
          },
        },
        { session }
      );

      // 2. Create new FilingInfo record for this submission
      await FilingInfo.create(
        [
          {
            userId,
            primaryFilingRequirement: filingData.primaryFilingRequirement,
            entityType: filingData.entityType || undefined,
            filingDetails: filingData.filingDetails || undefined,
          },
        ],
        { session }
      );

      // 3. Create new UtmCampaign touchpoint linked to this user
      await UtmCampaign.create(
        [
          {
            userId,
            utm_source: campaignData.utm_source || undefined,
            utm_medium: campaignData.utm_medium || undefined,
            utm_campaign: campaignData.utm_campaign || undefined,
            utm_content: campaignData.utm_content || undefined,
            utm_term: campaignData.utm_term || undefined,
            platform: campaignData.platform || undefined,
            gclid: campaignData.gclid || undefined,
            fbclid: campaignData.fbclid || undefined,
            fbp: campaignData.fbp || undefined,
            fbc: campaignData.fbc || undefined,
            matchtype: campaignData.matchtype || undefined,
            network: campaignData.network || undefined,
            device: campaignData.device || undefined,
            keyword: campaignData.keyword || undefined,
            placement: campaignData.placement || undefined,
            campaignid: campaignData.campaignid || undefined,
            adgroupid: campaignData.adgroupid || undefined,
            route: campaignData.route || '/',
            userAgent: campaignData.userAgent || undefined,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return true;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
