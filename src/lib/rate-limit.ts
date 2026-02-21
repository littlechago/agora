"use client";

import { useRef, useCallback } from "react";

export function useRateLimit(maxPerMinute: number = 10) {
  const timestamps = useRef<number[]>([]);

  const check = useCallback((): boolean => {
    const now = Date.now();
    const windowStart = now - 60_000;
    timestamps.current = timestamps.current.filter((t) => t > windowStart);

    if (timestamps.current.length >= maxPerMinute) {
      console.warn(
        `[Agora] Rate limit: ${maxPerMinute} requests/minute exceeded. In production, this would throttle the request.`
      );
      return false;
    }

    timestamps.current.push(now);
    return true;
  }, [maxPerMinute]);

  return { check };
}
