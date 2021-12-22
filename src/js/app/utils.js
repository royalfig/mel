export function formatTime(time) {
  const t = new Date(time);
  return {
    local: t.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    }),
    iso: t.toISOString(),
  };
}

export function setState(action, value) {
  document.body.classList[action](value);
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
