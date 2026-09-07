import { NextRequest } from 'next/server';
import { UserService } from '@/server/services/user.service';
import { sendSuccess, sendError } from '@/server/utils/response';
import { SignupSchema } from '@/server/validators/user.validator';
import { HTTP_STATUS, ERROR_CODES } from '@/server/config/constants';
import { logger } from '@/server/utils/logger';

export class UserController {
  constructor(private service: UserService) {}

  async signup(req: NextRequest) {
    try {
      let body: Record<string, unknown>;
      try {
        body = await req.json();
      } catch {
        logger.warn('Malformed JSON payload in signup request');
        return sendError(
          'We received an invalid request format. Please try submitting again.',
          ERROR_CODES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        return sendError(
          'We received an invalid request format. Please try submitting again.',
          ERROR_CODES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Honeypot check at API boundary
      if (typeof body.website === 'string' && body.website.trim().length > 0) {
        logger.warn('Honeypot triggered during signup');
        return sendError(
          'Please check your details and try again.',
          ERROR_CODES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Remove honeypot field so .strict() validation passes cleanly
      if ('website' in body) {
        delete body.website;
      }

      const validationResult = SignupSchema.safeParse(body);

      if (!validationResult.success) {
        logger.warn('Signup validation failed');
        return sendError(
          'Please check your details and try again. Some information seems to be missing or incorrect.',
          ERROR_CODES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST,
          validationResult.error.format()
        );
      }

      const userAgent = req.headers.get('user-agent') || undefined;

      const result = await this.service.registerUser(validationResult.data, userAgent);

      return sendSuccess(
        { status: result.status },
        'Your information has been successfully saved. Thank you!',
        result.status === 'new' ? HTTP_STATUS.CREATED : HTTP_STATUS.OK
      );
    } catch (error) {
      logger.error('Error during signup execution');
      return sendError(
        'Oops! Something went wrong on our end. Please try again later.',
        ERROR_CODES.DATABASE_ERROR,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
