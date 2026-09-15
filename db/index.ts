import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let _db: any;
export function getDb() {
  if (_db) return _db;
  try {
    throw new Error("Mocking DB for AI Studio");
  } catch {
    console.warn('[AI Studio] Database not connected — using mock');
    const noOp = { findMany: async () => [], findFirst: async () => null,
      findUnique: async () => null, create: async (d: any) => d?.data ?? {},
      update: async (d: any) => d?.data ?? {}, delete: async () => ({}) };
    _db = new Proxy({}, {
      get: (_, prop) => prop === 'query'
        ? new Proxy({}, { get: () => noOp }) : async () => [],
    });
  }
  return _db;
}
