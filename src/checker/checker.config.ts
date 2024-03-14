import { registerAs } from '@nestjs/config';

const CHECKER_CONFIG_NAMESPACE = 'checker' as const;

export const checkerConfig = registerAs(CHECKER_CONFIG_NAMESPACE, () => ({
  retries: parseInt(process.env.HTTP_SOURCE_RETRIES ?? '0', 10) || 3,
  timeout: parseInt(process.env.HTTP_SOURCE_TIMEOUT ?? '0', 10) || 5000,
  maxRedirects: parseInt(process.env.HTTP_SOURCE_MAX_REDIRECTS ?? '0', 10) || 2,
}));
