import { UserRepository, UserPersistData, CampaignPersistData, FilingPersistData } from '@/server/repositories/user.repository';
import { SignupInput } from '@/server/validators/user.validator';
import { logger } from '@/server/utils/logger';

export class UserService {
  constructor(private repository: UserRepository) {}

  async registerUser(data: SignupInput, userAgent?: string): Promise<{ status: 'new' | 'existing' }> {
    const existingUser = await this.repository.findByEmailOrPhone(data.email, data.phone);

    const campaignData: CampaignPersistData = {
      route: data.route,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
      platform: data.platform,
      gclid: data.gclid,
      fbclid: data.fbclid,
      fbp: data.fbp,
      fbc: data.fbc,
      matchtype: data.matchtype,
      network: data.network,
      device: data.device,
      keyword: data.keyword,
      placement: data.placement,
      campaignid: data.campaignid,
      adgroupid: data.adgroupid,
      userAgent: userAgent ? userAgent.slice(0, 500) : undefined,
    };

    const filingData: FilingPersistData = {
      primaryFilingRequirement: data.primaryFilingRequirement,
      entityType: data.entityType,
      filingDetails: data.filingDetails,
    };

    const userData: UserPersistData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      city: data.city,
      countryCode: data.countryCode,
      timezone: data.timezone,
    };

    if (existingUser) {
      // Existing user multi-touchpoint: update demographics and append touchpoint
      logger.info('Existing user submission processed');
      await this.repository.updateExistingUser(existingUser._id, userData, campaignData, filingData);
      return { status: 'existing' };
    }

    // New user registration
    logger.info('New lead signup processed');
    await this.repository.createUser(userData, campaignData, filingData);
    return { status: 'new' };
  }
}
