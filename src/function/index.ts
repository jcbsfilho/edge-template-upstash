import { Request, Response } from "node-fetch";
import { MethodRedis, redisGet, redisSet } from "../lib/upstash-redis";

export interface Args {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
}

async function handleRequest(request: Request, args: Args) {
  const method = request.method;

  if (!methodRouter[method]) {
    return new Response(
      JSON.stringify({
        message: "METHOD NOT ALLOWED",
      }),
      {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const result = await methodRouter[method](request, {
    url: args?.UPSTASH_REDIS_REST_URL || "",
    token: args?.UPSTASH_REDIS_REST_TOKEN || "",
  });

  return new Response(JSON.stringify(result), {
    status: result?.status || 500,
    headers: {
      "content-type": "application/json",
    },
  });
}

const methodRouter: MethodRedis = {
  GET: redisGet,
  POST: redisSet,
};

export { handleRequest };
