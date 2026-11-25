const CACHE = 'kst-v4';
/* 子路径兼容：GitHub Pages 会在 /仓库名/ 下提供服务，所有地址以 scope 为基准 */
const SCOPE = self.registration.scope;
const U = p => new URL(p, SCOPE).href;
const CORE = ['index.html', 'data.js', 'html2canvas.min.js', 'manifest.json'].map(U);
/* 需要实时最新的资源：网络优先；其余静态资源：缓存优先（离线可用） */
const NETWORK_FIRST = ['/index.html', '/data.js'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // 跨域请求不接管
  const path = url.pathname;

  // 网络优先：拿到最新即更新缓存，失败再退回缓存（离线兜底）
  if (NETWORK_FIRST.some(p => path === p || path.endsWith(p))) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match(U('index.html'))))
    );
    return;
  }

  // 缓存优先：静态资源离线可用
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) return r;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(U('index.html')));
    })
  );
});
