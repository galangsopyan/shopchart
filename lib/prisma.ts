import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseConfig() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL belum tersedia.");
  }

  const parsed = new URL(url);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
  };
}

const db = getDatabaseConfig();

const adapter = new PrismaMariaDb({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,

  // Railway + Vercel
  connectionLimit: 5,
  acquireTimeout: 10000,
  connectTimeout: 10000,
  idleTimeout: 300,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}