require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
