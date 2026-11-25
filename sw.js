const CACHE = 'kst-v5';
/* 子路径兼容：GitHub Pages 会在 /仓库名/ 下提供服务，所有地址以 scope 为基准 */
const SCOPE = self.registration.scope;
const U = p => new URL(p, SCOPE).href;
const CORE = ['index.html', 'data.js', 'cases_v1.js', 'talk_v1.js', 'html2canvas.min.js', 'manifest.json'].map(U);
/* 需要实时最新的资源：网络优先；其余静态资源：缓存优先（离线可用） */
const NETWORK_FIRST = ['/index.html', '/data.js', '/cases_v1.js', '/talk_v1.js'];

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

  // 页面导航：注入补丁脚本（index.html 无需改动即可加载 cases_v1.js / talk_v1.js）
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        if (!res || res.status !== 200 || !/text\/html/.test(res.headers.get('content-type') || '')) return res;
        return res.text().then(txt => {
          let out = txt;
          let inject = '';
          if (txt.indexOf('cases_v1.js') === -1) inject += '<script src="cases_v1.js"></script>';
          if (txt.indexOf('talk_v1.js') === -1) inject += '<script src="talk_v1.js"></script>';
          if (inject && txt.indexOf('<script src="data.js"></script>') > -1) {
            out = txt.replace('<script src="data.js"></script>', '<script src="data.js"></script>' + inject);
          }
          return new Response(out, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
          });
        }).catch(() => res);
      }).catch(() => caches.match(e.request).then(r => r || caches.match(U('index.html'))))
    );
    return;
  }

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
