/* 每日资讯速览补丁 v1 —— 12 条真实可核验资讯 + 原文链接
   产出：2026-11-25 · 每条均附来源媒体与原文 URL，可点开核对
   独立于 data.js，每日自动化不覆盖 */
(function () {
  var D = window.WORKBENCH_DATA;
  if (!D) return;

  var NEWS = [
    {
      date: '2026-11-25', cat: '价格',
      text: '今日名酒批发参考价：26 年飞天原件 1680–1700、散瓶 1670–1690；普五八代 840；国窖 1573 840–880；青花 30 670–775；水晶剑 400–405。三家酒商报价略有差异属正常。',
      source: '酒水板 / 酒直购 / 淘酒帮（三家独立酒商日报价）',
      url: 'http://mp.weixin.qq.com/s?__biz=Mzg4MzcwMzg4Ng==&mid=2247500488&idx=2&sn=338d31db21b7ef93ef7039b6e1c61193&chksm=ceaabee50103dd04f52487c599fe331b9c650fe6419a5115edb9e3db1f1f0d16942e9e7b4ecf#rd'
    },
    {
      date: '2026-11-25', cat: '价格',
      text: '同一天不同酒商口径能差 20–40 元（飞天原箱 1680 vs 1700），所以跟客户报价别用「全国统一价」这种说法，说「今天渠道价大概在 X 到 Y 之间」更稳。',
      source: '酒直购 11 月 25 日行情（含昨日/今日对照）',
      url: 'http://mp.weixin.qq.com/s?__biz=MzIyNzM5MDE5Ng==&mid=2247494848&idx=1&sn=5c308ffa101156375dc6c6fe5663bea7&chksm=e9e502bba2c164644379e61af1272d7b3c1a7f95621a2b6ddc5bc5a78f7ab4463d313635b847#rd'
    },
    {
      date: '2026-11-12', cat: '电商',
      text: '京东名酒双 11 战报（10/9–11/11）：酒类成交整体 +25%；茅台 +10%、五粮液 +13%、泸州老窖 +10%；金沙 +85%、习酒老酒 +240%；24 年飞天整箱 +98%、第八代普五 +23%。',
      source: '每日经济新闻·酒业早参（引京东酒业战报）',
      url: 'https://dy.163.com/article/LBJS3RBI0512B07B.html'
    },
    {
      date: '2026-11-12', cat: '电商',
      text: '京东酒类品牌榜前三：茅台、五粮液、汾酒；陈年酒榜前三：茅台、五粮液、泸州老窖。老酒与次高端是这轮增长最快的一档。',
      source: '泸州市酒业发展促进局·泸州酒业周报',
      url: 'https://jfj.luzhou.gov.cn/jcdt/content_1162630'
    },
    {
      date: '2026-11-13', cat: '消费',
      text: '有消费者双 11 买八代普五 6 瓶装，叠加平台补贴、政府补贴和消费券后到手约 3800 元，折合约 633 元/瓶——比今日批发价 840 元还低，这就是线上大促对线下价盘的冲击。',
      source: '界面新闻',
      url: 'https://www.163.com/dy/article/LBKC4NIM0534A4SC.html'
    },
    {
      date: '2026-11-03', cat: '基本面',
      text: '19 家 A 股白酒前三季营收 2678.22 亿元（-7.61%）、净利 973.68 亿元（-9.55%）；Q3 单季营收 699.28 亿元（-9.97%）。茅台一家占营收 49.77%、净利 66.21%。',
      source: '澎湃新闻（引 Wind 数据）/ 新浪财经',
      url: 'https://finance.sina.com.cn/roll/2026-11-02/doc-inixiynw2869497.shtml'
    },
    {
      date: '2026-11-03', cat: '基本面',
      text: '剔除茅台后，前三季收入降幅扩大到 -23.54%、扣非净利 -44.94%。五粮液 Q3 收入 -37.7%、泸州老窖 -37.1%、洋河 -61%、汾酒 -18%。',
      source: '南方+·公司舆情哨',
      url: 'https://www.nfnews.com/content/j3kjgbNdyA.html'
    },
    {
      date: '2026-10-21', cat: '供给',
      text: '国家统计局：1–9 月规上企业白酒产量 235.4 万千升，同比 -3.9%；9 月单月 27.5 万千升，同比 -4.8%。产量连续下行，是酒厂主动降速。',
      source: '国家统计局（经澎湃/南方+转引）',
      url: 'http://m.szonline.cn/ty/2026/1102/776883.html'
    },
    {
      date: '2026-11-13', cat: '库存',
      text: '中国酒业协会联合毕马威中期报告：全行业库存一度破 3000 亿元、成品酒库存 36.4 万吨、平均周转 900 天——一箱酒躺两年半才变成现金。',
      source: '南方+（引酒业协会×毕马威《2026 中国白酒市场中期研究报告》）',
      url: 'https://www.nfnews.com/content/j3kjgbNdyA.html'
    },
    {
      date: '2026-11-11', cat: '渠道',
      text: '茅台自 11 月 11 日起，i茅台 16 款产品从限时抢购改为全天动态补货（含精品茅台、陈年茅台 15、鼓乐飞天等）。官方口径是优化供给节奏，市面解读为遏制渠道库存积压。',
      source: '界面新闻',
      url: 'https://www.163.com/dy/article/LBK2SPN80534A4SC.html'
    },
    {
      date: '2026-11-03', cat: '分化',
      text: 'Q3 收入转正的企业从二季度 3 家增至 7 家：茅台、今世缘、迎驾贡酒、古井贡酒、老白干、水井坊、口子窖。区域酒和 100–300 元价格带比次高端抗跌。',
      source: '21 世纪经济报道（引广发证券）',
      url: 'https://finance.sina.com.cn/wm/2026-11-03/doc-inixmswc8781344.shtml'
    },
    {
      date: '2026-11-13', cat: '消费',
      text: '广州商务宴请用酒从一两百元压到百元以内，烟酒店「有人要才敢拿货」。这是真实开瓶需求，不是线上战报里的热闹——线上增长有一部分只是订单从线下搬到线上。',
      source: '南方+·公司舆情哨',
      url: 'https://www.nfnews.com/content/j3kjgbNdyA.html'
    }
  ];

  function esc(s) { return (typeof escHtml === 'function') ? escHtml(s) : String(s == null ? '' : s); }

  var css = '.news-src{display:block;margin-top:5px;font-size:11.5px;color:#8c8c8c;line-height:1.6;}'
    + '.news-src a{color:#1890ff;text-decoration:none;margin-left:6px;}'
    + '.news-src a:hover{text-decoration:underline;}'
    + '.list-item{align-items:flex-start;}';

  function itemHtml(n) {
    var badge = (typeof freshBadge === 'function') ? freshBadge(n.date) : '';
    return '<div class="list-item">'
      + '<span class="list-date" title="资讯日期">📅 ' + esc(n.date) + '</span>'
      + '<span class="list-cat">' + esc(n.cat) + '</span>' + badge
      + '<span class="list-text">' + esc(n.text)
      + '<span class="news-src">来源：' + esc(n.source)
      + ' <a href="' + esc(n.url) + '" target="_blank" rel="noopener">查看原文 ↗</a></span>'
      + '</span>'
      + '<button class="btn btn-sm btn-default note-save">📝 转存</button></div>';
  }

  function run() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    D.hotNews = NEWS;

    var hl = document.getElementById('hotList');
    if (!hl) return;
    hl.innerHTML = NEWS.map(itemHtml).join('');
    Array.prototype.forEach.call(hl.querySelectorAll('.note-save'), function (btn, i) {
      var n = NEWS[i];
      btn.addEventListener('click', function () {
        var txt = n.date + '｜' + n.cat + '：' + n.text + '\n\n来源：' + n.source + '\n原文：' + n.url;
        if (typeof openNoteCatPicker === 'function') openNoteCatPicker(n.date + ' ' + n.cat + ' 资讯', txt);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 0); });
  } else {
    setTimeout(run, 0);
  }
})();
