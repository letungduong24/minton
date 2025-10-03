export const THROTTLER = {
  DEFAULT: { default: { limit: 10, ttl: 10000 } },
  VERIFY: { default: { limit: 1, ttl: 60000 } }
} as const;