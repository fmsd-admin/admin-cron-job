import 'dotenv/config'
import Redis from "ioredis";
import { config } from "dotenv";
import type { ProductSale } from "../interfaces/product.sale";
import { envs } from '../config/envs';
import type { RedisSale } from '../interfaces/redis.sale';

config();

const redis = new Redis(envs.REDIS_URL!);

export async function getSalesFromRedis(): Promise<ProductSale[]> {
  const raw = await redis.lrange("sales:daily", 0, -1);
  const rawJSON = raw.map((sale) => JSON.parse(sale) as RedisSale);
  const sales: ProductSale[] = [];
  for (const sale of rawJSON) {
    for (const product of sale.products) {
      sales.push(product);
    }
  }
  return sales;
}

export async function getValue<T = any>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  
  if (!value) return null;
  return JSON.parse(value) as unknown as T;
}

export async function clearCache(keys: string[]) {
  await redis.del(keys);
}
