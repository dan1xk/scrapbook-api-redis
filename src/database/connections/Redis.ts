import IORedis from "ioredis";
import 'dotenv/config';

export default class Redis {
    private static instance: IORedis.Redis;

    private constructor() { }

    static getInstance() {
        if (!Redis.instance) {
            const redis = new Redis();
            Redis.instance = redis.openConnection();
        }

        return Redis.instance
    }

    private openConnection() {
        try {
            return new IORedis(process.env.REDIS_URL, {
                password: process.env.REDIS_PASSWORD
            });
        } catch (error) {
            throw new Error(`Erro ao conectar no Redis: ${error}`);
        }
    }
}
