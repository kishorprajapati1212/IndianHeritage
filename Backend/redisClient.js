const { createClient } = require("redis");

// Replace with your actual Upstash Redis URL
const redisClient = createClient({
  url: 'rediss://default:ATV4AAIjcDExZmE5ZThkMmI5NmU0MGJlYjAyNGQxNjlkOTU3NDhiY3AxMA@generous-meerkat-13688.upstash.io:6379'
});

redisClient.on('error', (error) => {
  console.error("Redis error", error);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection failed", err);
  }
};

connectRedis();

module.exports = redisClient;
