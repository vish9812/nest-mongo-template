import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  server: process.env.mongoServer,
  db: process.env.mongoDb,
  uri: process.env.mongoUri,
}));
