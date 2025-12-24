import { useRef } from "react";

export default function useThrottle(callback, delay = 800) {
  const lastRun = useRef(0);

  return (...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    }
  };
}
