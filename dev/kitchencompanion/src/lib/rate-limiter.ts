import { RateLimiterPrisma } from "rate-limiter-flexible";
import { db } from "@/db/prisma-db";

const maxFailsByEmailAndIP = 5;

const rateLimiter = new RateLimiterPrisma({
  storeClient: db,
  keyPrefix: "login_fail_email_ip",
  points: maxFailsByEmailAndIP,
  duration: 60 * 60 * 24 * 30, // Store number of attempts for 30 days after first fail
  blockDuration: 60 * 60, // Block for 1 hour,
});

export const getEmailIPkey = (email: string, ip: string) => {
  return `${email}_${ip}`;
};

export async function rateLimitLogin(emailIPKey: string) {
  try {
    const rlRes = await rateLimiter.consume(emailIPKey, 1); // consume 1 point
    return rlRes;
  } catch (rejRes) {
    throw rejRes;
  }
}

export async function clearLoginLimit(emailIPKey: string) {
  await rateLimiter.delete(emailIPKey);
}

export async function isAccountBlocked(emailIPKey: string) {
  const attempts = await rateLimiter.get(emailIPKey);
  return attempts !== null && attempts.consumedPoints >= maxFailsByEmailAndIP;
}
