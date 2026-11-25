/* 业务提效工具补丁 v1 —— 7 个能力入口（skill 口令卡）
   产出：2026-11-25 · 独立于 data.js，每日自动化不覆盖
   说明：页面是静态的，点击无法直接执行 skill，卡片提供「口令 + 复制」，
        在 WorkBuddy 对话框粘贴口令即可触发。 */
(function () {
  var SKILLS = [
    {
      icon: '📋', name: 'JD日报', freq: '每天', color: '#1890ff',
      when: '外呼、短信任务跑完，要出当日日报',
      input: '微电云导出 4 张表：企微转化明细、任务转化效果、场景营销转化效果、客服效能汇总',
      output: '日报 Excel + 进粉数据（纯文本，不出文件）',
      say: '做日报'
    },
    {
      icon: '🔗', name: 'GMV匹配', freq: '每天', color: '#722ed1',
      when: '要算真实 GMV 和员工业绩，日报之前先跑这个',
      input: '企微转化效果-导出明细 + 店铺-白酒订单明细',
      output: '回填「商家应收」的匹配表，含使用人、匹配状态、匹配订单号',
      say: '做GMV匹配'
    },
    {
      icon: '📊', name: '京东酒水数据看板', freq: '每周', color: '#13c2c2',
      when: '要看 GMV 与成本趋势、ROI、粉源单价、客户留存、日增量',
      input: '京东酒水项目每日数据.xlsx',
      output: '单文件 HTML 数据看板',
      say: '更新京东酒水看板'
    },
    {
      icon: '🪑', name: '外呼坐席报表', freq: '每月', color: '#fa8c16',
      when: '月度复盘，要按分公司、坐席出业绩',
      input: '计费记录表（含计费日期、账号、用户昵称、所属部门）',
      output: '坐席报表，按部门归到分公司',
      say: '做坐席报表'
    },
    {
      icon: '🏷️', name: '京东账号标签', freq: '不定期', color: '#52c41a',
      when: '人员变动，要导在职继承的企微账号清单',
      input: '浏览器登录微电云（会自己打开页面抓）',
      output: '在职继承名单 Excel',
      say: '抓取'
    },
    {
      icon: '📈', name: 'smart-charts', freq: '按需', color: '#eb2f96',
      when: '表格里有数据，想做成图看趋势或对比',
      input: '任意 Excel / CSV',
      output: '图表（趋势、对比、占比）',
      say: '把这个表做成图'
    },
    {
      icon: '🔍', name: '案例研究', freq: '按需', color: '#2f54eb',
      when: '要给工作台补案例，或核实某个案例和数据可不可信',
      input: '不用准备，会联网找',
      output: '五段拆解（背景/动作/数据/可复用/坑）+ 来源与可信度标注',
      say: '找几个私域案例'
    }
  ];

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var css = '.tk-wrap{margin-bottom:22px;}'
    + '.tk-hint{background:#f0f5ff;border:1px solid #adc6ff;border-left:4px solid #2f54eb;border-radius:8px;padding:11px 16px;font-size:12.5px;color:#1d39c4;line-height:1.7;margin-bottom:14px;}'
    + '.tk-hint b{font-weight:600;}'
    + '.tk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;}'
    + '.tk-card{background:var(--card-bg,#fff);border:1px solid var(--card-border,#f0f0f0);border-radius:8px;padding:14px 16px;border-left:4px solid #1890ff;display:flex;flex-direction:column;}'
    + '.tk-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}'
    + '.tk-ico{font-size:16px;}'
    + '.tk-name{font-size:14.5px;font-weight:600;color:var(--ink,#1f1f1f);}'
    + '.tk-freq{margin-left:auto;font-size:11px;padding:1px 8px;border-radius:10px;background:#f5f5f5;color:#8c8c8c;}'
    + '.tk-row{font-size:12.5px;line-height:1.7;color:#595959;margin-bottom:6px;}'
    + '.tk-row b{color:#262626;font-weight:600;}'
    + '.tk-cmd{margin-top:auto;padding-top:10px;border-top:1px dashed #f0f0f0;display:flex;align-items:center;gap:8px;}'
    + '.tk-say{flex:1;background:#f6ffed;border:1px solid #b7eb8f;border-radius:6px;padding:6px 10px;font-size:12.5px;color:#237804;font-weight:600;}'
    + '.tk-copy{border:1px solid #d9d9d9;background:#fff;color:#595959;font-size:12px;padding:5px 12px;border-radius:6px;cursor:pointer;}'
    + '.tk-copy:hover{border-color:#1890ff;color:#1890ff;}'
    + '.tk-copy.ok{border-color:#52c41a;color:#52c41a;}'
    + '.tk-sec{font-size:14px;font-weight:600;color:var(--ink,#1f1f1f);margin:6px 0 12px;padding-left:10px;border-left:3px solid #1890ff;}';

  function cardHtml(s) {
    return '<div class="tk-card" style="border-left-color:' + s.color + '">'
      + '<div class="tk-head"><span class="tk-ico">' + s.icon + '</span><span class="tk-name">' + esc(s.name) + '</span><span class="tk-freq">' + esc(s.freq) + '</span></div>'
      + '<div class="tk-row"><b>什么时候用：</b>' + esc(s.when) + '</div>'
      + '<div class="tk-row"><b>你要准备：</b>' + esc(s.input) + '</div>'
      + '<div class="tk-row"><b>你会拿到：</b>' + esc(s.output) + '</div>'
      + '<div class="tk-cmd"><span class="tk-say">' + esc(s.say) + '</span><button class="tk-copy" data-say="' + esc(s.say) + '">复制口令</button></div>'
      + '</div>';
  }

  function copyText(txt, btn) {
    var done = function () {
      var old = btn.textContent;
      btn.textContent = '已复制';
      btn.classList.add('ok');
      setTimeout(function () { btn.textContent = old; btn.classList.remove('ok'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done).catch(function () { fallback(txt, done); });
    } else {
      fallback(txt, done);
    }
  }

  function fallback(txt, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) {
      alert('复制失败，请手动选中口令：' + txt);
    }
  }

  function run() {
    var grid = document.getElementById('toolGrid');
    if (!grid || document.getElementById('tkWrap')) return;

    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var wrap = document.createElement('div');
    wrap.id = 'tkWrap';
    wrap.className = 'tk-wrap';
    wrap.innerHTML = '<div class="tk-sec">🧰 能直接帮你干活的能力（7 个）</div>'
      + '<div class="tk-hint"><b>怎么用：</b>页面是静态的，点按钮不会自己跑。把口令<b>复制</b>下来，到 WorkBuddy 对话框粘贴发送，再把要处理的文件拖进去就行。<br>不知道用哪个？看「什么时候用」那一行，对上你的场景就点复制。</div>'
      + '<div class="tk-grid">' + SKILLS.map(cardHtml).join('') + '</div>';

    grid.parentNode.insertBefore(wrap, grid);

    Array.prototype.forEach.call(wrap.querySelectorAll('.tk-copy'), function (btn) {
      btn.addEventListener('click', function () { copyText(btn.getAttribute('data-say'), btn); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 0); });
  } else {
    setTimeout(run, 0);
  }
})();
