import { Redis, RedisConfigNodejs } from "@upstash/redis/nodejs";
import type { Request } from "node-fetch";

export interface MethodRedis {
  [x:string]: (request: Request, config: RedisConfigNodejs) => Promise<ResultProps>;
}

export interface RedisConfig extends RedisConfigNodejs {}

export interface ResultProps {
  result: any;
  status?: number;
}

export async function redisGet(request: Request, config: RedisConfigNodejs): Promise<ResultProps> {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    if(!search) return { result: "search parameter invalid", status: 404 };
    const redis = new Redis(config);
    const result = await redis.get<string>(search);
    if (!result) {
      return { result: "fail find item", status: 404 };
    }
    return { result: result, status: 200 };
  } catch (error:any) {
    return { result: error?.message || 'fail get item', status: 500 };
  }
}

export async function redisSet(request: Request, config: RedisConfigNodejs): Promise<ResultProps> {
  try {
    const { key, value, ex } = await request.json();
    const redis = new Redis(config);
    const result = await redis.set(key, value, { ex });
    if (!result) {
      return { result: "fail set item", status: 400 };
    }
    return { result: "success!", status: 200 };
  } catch (error:any) {
    return { result: error?.message || 'fail set item', status: 500 };
  }
}
