import ratelimiter from "../config/redis.config.js";

const rateLimiter = async (req, res, next) => {
    try {
        
        const { success } = await ratelimiter.limit("my-rate-limit");
        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }
        next();
    } catch (error) {
        console.error('Rate Limiter Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default rateLimiter;
// Example usage of Redis client
// (This part seems out of place in a rate limiter middleware and might be for testing purposes)    
