/* 白酒知识补丁 v1 —— 5 条带来源与话术边界的知识 + 品牌区提示
   产出：2026-11-25 · 依据 GB/T 10781 系列国标、中国酒业协会团体标准
   独立于 data.js，每日自动化不覆盖 */
(function () {
  var D = window.WORKBENCH_DATA;
  if (!D) return;

  var FACTS = [
    {
      tag: '标识',
      title: '瓶身标准号怎么看：一张表认出新标和旧标',
      body: 'GB/T 10781 系列是白酒质量要求国标，已按香型重组为 15 个部分：\n.1 浓香 · .2 清香 · .3 米香 · .4 酱香 · .5 豉香 · .6 凤香 · .7 特香 · .8 浓酱兼香 · .9 芝麻香 · .10 老白干 · .11 馥郁 · .12 董香，另加 .13 液态法 · .14 固液法 · .15 小曲固态。\n\n两个容易踩的点：\n① 酱香换过标——旧标 GB/T 26760-2011 已被 GB/T 10781.4-2024 取代，2025 年 6 月起实施。瓶身还印 26760 的不是假酒，是旧标产品或生产较早，可以据此判断批次新旧。\n② GB/T 20821 是液态法（食用酒精勾兑），GB/T 20822 是固液法（固态基酒+酒精+香精），这两个都不是纯粮固态。\n\n跟客户怎么说：不用讲标准体系，一句“这瓶执行的是 10781.4，酱香的固态法新国标，配料表只有水、高粱、小麦”就够了。',
      boundary: '能说：这瓶执行 GB/T 10781.x，是固态法（纯粮）标准。\n别说：标准号越高酒越好——标准管的是合格线，不是品质高低，等级看优级/一级。也别替客户断言某个品牌“用的是酒精勾兑”，只能看标准号和配料表。',
      cred: '国标',
      source: 'GB/T 10781.4-2024《白酒质量要求 第4部分：酱香型白酒》；GB/T 10781.6-2025（凤香型，2026-08-01 实施）；国家标准全文公开系统 openstd.samr.gov.cn'
    },
    {
      tag: '工艺',
      title: '客户问「你这是坤沙吗」，四档怎么分',
      body: '「沙」是贵州话里指高粱籽，四档差在这堆高粱怎么处理：\n\n坤沙——高粱破碎率控制在 20% 以内，走「12987」：1 年一个周期、2 次投料、9 次蒸煮、8 次发酵、7 次取酒，基酒还要窖藏 3 年以上。酱香突出、层次多、空杯留香久，高端酱酒走这个路数。\n碎沙——高粱打碎，2-3 次就把酒取完，周期 3-6 个月，出酒率高。酱香偏淡、酒体单薄，中端走量款多是这个。\n翻沙——用坤沙第 9 次丢的酒糟，加新高粱和曲再酿一次，1-2 个月。有酱味，但带糟苦。\n串沙——丢糟加食用酒精串蒸，严格说不属于酱香型白酒，不合国标。\n\n跟客户怎么说：不问就不主动提。客户问了，就讲“我们这款是坤沙，12987 工艺，基酒存了 X 年”，讲完打住，别主动去比别人的工艺。',
      boundary: '能说：这款用的是坤沙工艺，走 12987，基酒窖藏 X 年（前提是真的）。\n别说：碎沙就是假酒——碎沙是合法工艺，只是等级不同，说别人是假酒容易惹麻烦。也别光看价格判工艺，百元档有碎沙也有翻沙，得看标签和配料表。',
      cred: '行业通行',
      source: '四档工艺为行业通行表述（多份酒企技术资料与行业媒体一致）；「12987」为行业习惯叫法；国标 GB/T 10781.4-2024 规定质量要求，不直接定义这四档'
    },
    {
      tag: '年份',
      title: '「20 年陈酿」和「年份酒」不是一回事',
      body: '这两个概念经常被混着说，得分清：\n\n① 年份酒——2019 年中国酒业协会团标出台后，合规的「年份酒」需经协会认证，瓶身或盒身有「年份酒」注册商标、准入编号、备案编号和查询入口。只写「20 年陈酿」「30 年洞藏」却没有任何认证标识的，属于企业自述，不是合规年份酒。\n② 瓶储年份酒——协会标准的定义是：灌装到最终销售所用瓶中，自生产日期后瓶储 5 年及以上且保存完好。5 年是门槛，不满一年按上一年取整。\n\n顺带说一句低度酒：38 度以下酯类水解快，久放容易出「水味」，建议 2-3 年内喝掉。高度酒才谈越陈越香。\n\n跟客户怎么说：客户问“这酒多少年”，先看标签有没有认证标识。有，就按标注的讲；没有，就说“这款标注主体基酒贮存 X 年”，不要说整瓶年份。',
      boundary: '能说：这款标注主体基酒贮存 X 年；瓶储年份酒要满 5 年才够格。\n别说：整瓶都是 10 年——年份标的是基酒年份，不是整瓶酒龄。也别替没认证的产品“认定”它是年份酒。',
      cred: '协会标准',
      source: '中国酒业协会《瓶储年份酒》团体标准（cada.cc 公开文本）；协会年份酒认证规则见协会公示，具体准入以协会最新公告为准'
    },
    {
      tag: '工艺',
      title: '为什么白酒要「掐头去尾」',
      body: '蒸馏的时候，最先流出的「酒头」甲醇和醒类含量高、口感冲辣；最后流出的「酒尾」杂醇油多、味道寡淡。所以取中段最干净的部分做基酒，行里说的「中段酒」更柔就是这个道理。\n\n这也是新酒为什么要存：刚蒸出来的酒，醒类和杂醇还需要时间挥发和转化，存一段时间口感才顺。\n\n跟客户怎么说：不用讲化学名词，一句“头尾都不要，只取中间那段”就够明白。客户要是追问，再加一句“新酒还得存够时间，急不来”。',
      boundary: '能说：只取中段，头尾不要；新酒要陈放一段时间口感才顺。\n别说：掐头去尾就等于不上头——杂醇控制还靠陈放时长和勾调，单靠一道工序保证不了。',
      cred: '行业通行',
      source: '蒸馏工序通行表述；白酒工业术语可参照 GB/T 15109《白酒工业术语》，具体条文以标准原文为准'
    },
    {
      tag: '品鉴',
      title: '挂杯明显就等于好酒吗',
      body: '不完全。挂杯主要反映酒精度、糖类和酯类的综合表现——度数高的酒、糖分多的酒都容易挂杯，跟品质高低不能直接画等号。\n\n真正判断一款酒，还是看三件事：闻香是否干净（有没有刺鼻的酒精味、香精味）、入口是否协调（酸苦辣是否平衡、下喉是否灼）、回味是否持久（空杯放几小时还有粮香，通常是纯粮的特征）。\n\n跟客户怎么说：把挂杯当“观察项”不是“结论项”。可以说“您看这挂杯，酒体比较厚”，但别顺着客户的话说“挂杯多就是好酒”——他哪天遇到一款挂杯漂亮但刺喉的酒，就会觉得你在忽悠。',
      boundary: '能说：挂杯能看出酒体厚度和度数，是个参考。\n别说：挂杯多就是好酒；也别说不挂杯就是假酒——低度酒挂杯本来就弱。',
      cred: '行业通行',
      source: '品鉴通行表述，无国标定义；判断维度参考白酒感官评价的一般方法'
    }
  ];

  function esc(s) { return (typeof escHtml === 'function') ? escHtml(s) : String(s == null ? '' : s); }

  var CRED_CLS = { '国标': 'kcred-a', '协会标准': 'kcred-a', '行业通行': 'kcred-b', '存疑': 'kcred-c' };

  var css = '.kf-src{margin-top:8px;padding-top:7px;border-top:1px dashed #f0f0f0;font-size:11.5px;color:#8c8c8c;line-height:1.6;}'
    + '.kf-cred{display:inline-block;padding:1px 7px;border-radius:3px;font-size:10.5px;font-weight:600;margin-right:7px;vertical-align:1px;}'
    + '.kcred-a{background:#f6ffed;color:#389e0d;border:1px solid #b7eb8f;}'
    + '.kcred-b{background:#fffbe6;color:#d48806;border:1px solid #ffe58f;}'
    + '.kcred-c{background:#fff1f0;color:#cf1322;border:1px solid #ffa39e;}'
    + '.kf-bound{margin-top:8px;background:#f6ffed;border:1px solid #b7eb8f;border-radius:6px;padding:7px 12px;font-size:12.5px;color:#237804;line-height:1.75;white-space:pre-line;}'
    + '.kf-bound b{display:block;margin-bottom:3px;font-size:12px;}'
    + '.brand-note{grid-column:1/-1;font-size:11.5px;color:#8c8c8c;line-height:1.6;margin-top:4px;}';

  function factHtml(n, i) {
    return '<div class="fact-item"><div class="fact-no">' + (i + 1) + '</div><div class="fact-body">'
      + '<div class="fact-title" style="display:flex;align-items:center;gap:8px;">' + esc(n.title)
      + ' <span class="tag tag-blue">' + esc(n.tag) + '</span>'
      + '<button class="btn btn-sm btn-default note-save">📝 转存</button></div>'
      + '<div class="fact-text" style="white-space:pre-line;">' + esc(n.body) + '</div>'
      + (n.boundary ? '<div class="kf-bound"><b>🗣 话术边界</b>' + esc(n.boundary) + '</div>' : '')
      + (n.source ? '<div class="kf-src"><span class="kf-cred ' + (CRED_CLS[n.cred] || 'kcred-b') + '">' + esc(n.cred || '行业通行') + '</span>来源：' + esc(n.source) + '</div>' : '')
      + '</div></div>';
  }

  function run() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    D.baijiuFacts = FACTS;

    var fl = document.getElementById('factList');
    if (fl) {
      fl.innerHTML = FACTS.map(factHtml).join('');
      Array.prototype.forEach.call(fl.querySelectorAll('.note-save'), function (btn, i) {
        var n = FACTS[i];
        btn.addEventListener('click', function () {
          var txt = '【白酒科普·' + n.tag + '】' + n.title + '\n' + n.body
            + (n.boundary ? '\n\n话术边界：\n' + n.boundary : '')
            + (n.source ? '\n\n来源：' + n.source + '（' + (n.cred || '') + '）' : '');
          if (typeof openNoteCatPicker === 'function') openNoteCatPicker('白酒科普：' + n.title, txt);
        });
      });
    }

    var bz = document.getElementById('brandZone');
    if (bz && !bz.querySelector('.brand-note')) {
      var note = document.createElement('div');
      note.className = 'brand-note';
      note.textContent = '说明：价位为常见零售区间参考，随渠道和市场波动；「陶融香」这类为企业自创香型概念，不在国标十二大香型体系内。';
      bz.appendChild(note);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 0); });
  } else {
    setTimeout(run, 0);
  }
})();
