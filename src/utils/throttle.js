export function throttle(fn, delay = 800) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastTime >= delay) {
      lastTime = now;
      fn(...args);
    }
  };
}
