import IORedis from 'ioredis';
import Redis from '../connections/Redis'

export class CacheRepository {
    private readonly redis: IORedis.Redis;

    constructor() {
        this.redis = Redis.getInstance();
    }

    async set(key: string, value: any) {
        await this.redis.set(key, JSON.stringify(value));
    }

    async setEx(key: string, value: any, ttl: number) {
        await this.redis.set(key, JSON.stringify(value), "EX", 15);
    }

    async get(key: string): Promise<any> {
        const result = await this.redis.get(key);

        if (result === null) return undefined;

        return JSON.parse(result);
    }

    async delete(key: string) {
        const result = await this.redis.del(key);

        return result !== 0;
    }
}