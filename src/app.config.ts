import { registerAs } from '@nestjs/config';

export const APP_CONFIG_NAMESPACE = 'app-config';
export const appConfig = registerAs(APP_CONFIG_NAMESPACE, () => ({
  http: {
    port: parseInt(process.env.HTTP_PORT || '8080', 10),
  },
}));
