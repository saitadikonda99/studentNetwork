import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to Redis when the client is created
redisClient.connect().catch(console.error);

export default redisClient; 