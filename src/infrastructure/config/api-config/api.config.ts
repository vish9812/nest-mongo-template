import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  env: process.env.apiEnv,
  port: process.env.port,
}));
