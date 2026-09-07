const {Redis} = require('@upstash/redis');

// CONNECT TO REDIS SERVER USING THE URL FROM ENVIRONMENT VARIABLES
const redisClient = new Redis({
    url:process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});  

// redisClient.on('connect', () => {
//     console.log('Connected to Redis server');
// });

// const testRedis = async ()=>{
//     const result = await redisClient.set("name","shahbaz");
//     console.log(result);

//     const ret = await redisClient.get("name")
// }
// testRedis()

module.exports = redisClient;