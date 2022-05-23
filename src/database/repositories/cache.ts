import IORedis from 'ioredis';
import Redis from '../connections/Redis'

export class CacheRepository {
    private readonly redis: IORedis.Redis;

    constructor() {
        this.redis = Redis.getInstance();
    }

    async save(key: string, value: any) {
        return await this.redis.set(key, JSON.stringify(value));
    }

    async saveExpiration(key: string, value: any, ttl: number) {
        return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async find(key: string) {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    }

    async delete(key: string) {
        const result = await this.redis.del(key);

        return result !== 0;
    }
}