/* 外呼短信话术补丁 v1 —— 合规红线 + 10 条话术基线
   产出：2026-11-25 · 依据《广告法》《通信短信息服务管理规定》（2026-05-01 施行）
   《反不正当竞争法》、市场监管总局《关于严禁制售“特供酒”的公告》（2024）
   独立于 data.js，每日自动化不覆盖 */
(function () {
  var D = window.WORKBENCH_DATA;
  if (!D) return;

  var OUT = [
    {
      title: '订单签收后回访·最短路径加微',
      scenario: '京东订单已签收 24-72 小时·有明确购买记录',
      hook: '下单后的售后与服务延续（最合规的加微理由，不靠利益诱惑）',
      callScript: '您好，我是京东酒水这边负责售后的顾问小X，这次是您{日期}那笔订单的回访，耽误您 30 秒。\n想确认两件事：酒收到有没有破损，包装是否完好？\n另外提醒一下，这单的发票已经开好了，售后和后续补货都可以直接找我。\n我加您微信方便一些，有问题随时发我，您看可以吗？',
      hangupSms: '【京东酒水服务】您好，刚电话回访未接通。您的订单售后、发票、补货都可以直接联系我：加企微 {短链}\n本短信为订单服务通知，回复 TD 退订',
      comply: '① 开场先报“京东酒水”+“哪笔订单”，让客户立刻知道这通电话的来源，这是合规的基础（已有业务关系）；② 全程不提“优惠”“内部价”，只讲售后，避开广告法对促销话术的约束；③ 客户说“不用了”立刻结束，不要二次劝说——拒绝后再打是投诉高发点。',
      tip: '这是所有加微话术里最稳的一条。别贪心在这个电话里卖货，加微成功就是胜利，成交留到微信里做。',
      source: '基于京东订单服务场景设计；合规依据见顶部红线第 6-8 条'
    },
    {
      title: '宴席场景·先问用途再推荐',
      scenario: '京东买过中高端酒（500 元以上）·未明确用途',
      hook: '按场景配货，不推贵的只推对的（把推销变成顾问式咨询）',
      callScript: '您好，我是京东酒水顾问小X，看到您上个月在我们这儿买过两瓶{酒名}。\n冒昧问一句，这酒是自己喝还是办事用？\n（自饮）那我不给您推贵的，同价位里有款口感更绵的，回头微信发您；\n（宴请）那桌数和档期比较关键，我按您的场子给您配，别买贵了也别不够用。\n我加您微信，把两款对比和实际到手价发您，您自己挑。',
      hangupSms: '【京东酒水】您好，刚电话未接通。您之前咨询的配货方案我整理好了，加企微 {短链} 发给您，不合适随时说\n本短信为服务跟进，回复 TD 退订',
      comply: '① “实际到手价”可以说，但不能说“内部价/最低价/比别家便宜”——无法证明的价格比较属于虚假宣传（反不正当竞争法第 9 条）；② 不出现“宴会喝起来有面子”“喝了有气氛”这类暗示饮酒场景的话；③ 不同用途给不同推荐，不诱导过量购买。',
      tip: '这一条的核心是“先问用途”四个字。问出来才能分层，问不出来就当自饮处理，别硬推宴席装。',
      source: '筛选逻辑改编自公开报道中习酒按场景分层的做法（见「私域案例」板块）'
    },
    {
      title: '沉睡客户唤醒·用订单做由头',
      scenario: '6-12 个月无互动·历史有成功订单',
      hook: '不是“好久没联系”，而是“您那款酒最近有变化”（给一个不打扰的理由）',
      callScript: '您好，我是京东酒水顾问小X。您去年这时候买过{酒名}，我这边做个老客户回访。\n两件事：一是这酒新批次的到货了，口感比以前更稳；二是您之前的售后权益还在，有问题随时找我。\n最近价格有波动，如果您还想补货，我帮您盯着，降到合适的位置第一时间告诉您，不加价。\n加个微信？我到时候直接发您。',
      hangupSms: '【京东酒水】您好，您关注的{酒名}新批次已到货，价格有变动。需要我帮您留意的话加企微 {短链}\n回复 TD 退订',
      comply: '① 唤醒话术最容易踩的坑是“假装有优惠”——如果实际没有价格优势，不要暗示“现在便宜”；② “帮您盯着价格”是可以承诺的服务，但真降价了必须通知，否则就是虚假承诺；③ 沉睡超过 12 个月的客户，建议先用短信探活、再打电话，直接外呼投诉率更高。',
      tip: '唤醒别用“好久不见”开头，客户会立刻警觉。用“您那款酒”开头，他知道你记得他，戒备会低很多。',
      source: '结构参考现有「年货锁价」话术，去掉价格承诺型钩子，改为服务型钩子'
    },
    {
      title: '拒绝处理·把“不要”变成下次机会',
      scenario: '任意外呼场景中客户明确表示不需要',
      hook: '不纠缠、留退路（合规要求当场终止，但可以留一个下次的由头）',
      callScript: '（客户说“不需要”）\n好的，那我不打扰您了，这次就是订单回访，已经说完了。\n最后一句：以后您要买酒，京东店铺搜得到，也可以直接找我，我这边能帮您看发票和售后。\n那就不聊误您了，祝您生活愉快，再见。',
      hangupSms: '',
      comply: '① 客户明确拒绝后必须**立即终止**，不得再劝、不得换号重打——这是投诉和处罚的高发点（红线第 7 条）；② “以后要买找我”这句是留门，不是推销，不构成纠缠；③ 这通电话要标记“已拒绝”，进系统黑名单，下次活动不再触达。',
      tip: '这条看着没用，其实最该背下来。一通纠缠的电话，可能让整个号段被投诉封停，代价远大于一单生意。',
      source: '依据工信部骚扰电话整治要求与 AI 外呼合规评论整理'
    },
    {
      title: '老客复购·用“喝完的节奏”算时间',
      scenario: '同一 SKU 二次购买周期临近（按上次购买量推算）',
      hook: '按他的消耗速度提醒，而不是按我们的促销节奏',
      callScript: '您好，京东酒水顾问小X。您上次买{酒名}是{日期}，两瓶装，按一般喝法差不多该补了。\n我不确定您喝完没有，所以先问一句，不着急。\n如果快喝完了，我这边可以提前给您留货，避免临时断档；如果还早，那就当我提醒一下，您记着有我这号人就行。\n加个微信？下次直接发我一句就行。',
      hangupSms: '【京东酒水】您上次购买的{酒名}按周期该补货了，需要预留的话加企微 {短链}，不需要请忽略\n回复 TD 退订',
      comply: '① “按周期该补货”基于真实购买记录推算，属于服务提醒，不算虚假宣传；② 但推算要合理（按箱数/瓶数算，别两瓶酒说“一周喝完”）；③ 短信里必须给“不需要请忽略”的出口，降低投诉率。',
      tip: '复购电话的成败在“算得准不准”。算准了客户觉得你专业，算错了客户觉得你在催单。宁可保守估。',
      source: '基于订单周期管理思路设计'
    }
  ];

  var SMS = [
    {
      title: '纯文本引导回复·绕开链接拦截',
      scenario: '新加好友前的第一次短信触达',
      hook: '不塞链接，让客户回一个字（到达率最高的写法）',
      sms: '【京东酒水服务】您好，您近期在京东购买过酒水，我是专属顾问小X。\n有售后、发票、补货需求可直接回复“1”，我用企业微信联系您，不打扰。\n回复 TD 退订',
      comply: '① 无链接、无联系方式，避开运营商引流拦截（电信 2025-05 起含链接大概率拦截）；② 让客户回“1”，这条回复本身就是**明示同意的证据**，可留存 6 个月；③ 结尾必须有退订指令，且 24 小时内生效；④ 签名“京东酒水服务”须与实际发送主体一致，服务商代发不能用京东名义。',
      tip: '这条是目前到达率最稳的写法。“让客户回 1”比“点链接”门槛低，还顺手把同意凭证拿到了。',
      source: '依据《通信短信息服务管理规定》（2026-05-01 施行）第 21 条 + 三大运营商拦截政策'
    },
    {
      title: '订单服务通知·最合规的短信类型',
      scenario: '订单已签收·回访未接通',
      hook: '服务通知属性，不属于纯商业推广',
      sms: '【京东酒水服务】您好，您{日期}的订单已完成配送，本次为售后回访。\n如包装破损、发票问题、需要补货，回复“1”由专属顾问为您处理。\n回复 TD 退订',
      comply: '① 有明确订单指向，属于服务类而非营销类，可在端口分类管理下走服务通道；② 不得在服务短信里夹带促销内容——新规明确禁止端口混用；③ 只做服务、不推新品，这条一旦加了“限时优惠”就变成商业短信，规则全部适用。',
      tip: '服务短信和营销短信是两条通道，别混着用。想发促销就老老实实走营销通道，混用被查是重罚。',
      source: '依据端口“三分离”要求（商业/服务/公益不得混用）'
    },
    {
      title: '老客权益提醒·不带链接的促销写法',
      scenario: '有明确购买记录的老客·非节日节点',
      hook: '只讲权益，让客户主动来问（规避文案式促销的合规风险）',
      sms: '【京东酒水】您有一份老客权益待领取：{权益简述}，有效期至{日期}。\n需要了解回复“1”，顾问为您说明；不需要请忽略本条。\n回复 TD 退订',
      comply: '① 权益描述必须真实可兑现，写了“买赠”就得真送；② 不得出现“最低价”“比某平台便宜”等无法证明的比较；③ 必须给“不需要请忽略”的软出口，比只有退订的投诉率低；④ 22:00-次日 8:00 不得发送。',
      tip: '把“促销”写成“权益”，不是为了绕规则，是因为客户对“权益”的抵触远小于“打折”。',
      source: '依据广告法第 4 条（不得虚假或引人误解）+ 短信息新规时段限制'
    },
    {
      title: '节日节点·一句话讲清不堆词',
      scenario: '中秋/春节前 15-20 天·有购买记录的老客',
      hook: '只报一件事，不列清单（短信越短，到达率越高）',
      sms: '【京东酒水】{节日}用酒可以提前锁货了，您常买的{酒名}目前有货。\n需要预留回复“1”，我按您的量给您留。\n回复 TD 退订',
      comply: '① “有货”是可以核实的陈述，“紧俏/最后一批/抢完就没”属于制造稀缺，可能构成误导；② 不得出现“送礼有面子”“宴请显档次”这类场景暗示；③ 一条短信只讲一件事，多个卖点堆叠既超长又提升拦截率。',
      tip: '节日短信别写“全场 X 折起”，直接说“您常买的这款有货”——精准比热闹有效。',
      source: '依据广告法第 23 条（不得诱导、怂恿饮酒）'
    },
    {
      title: '关键词自查·发送前必过一遍',
      scenario: '任何短信发出前的最后一道检查',
      hook: '—',
      sms: '【发送前逐条打勾】\n□ 客户是否明示同意过（有勾选/回复记录，能留存 6 个月）\n□ 当前时间是否在 8:00–22:00 之间\n□ 是否有一键退订，且退订 24 小时内生效\n□ 签名是否≤15 字符，且与实际发送主体一致\n□ 是否含“特供/专供/内供/特酿/特需/授权/指定/接待/储备”等禁用词\n□ 是否含“治病/养生/保健/解压/提神”等功效词\n□ 是否含无法证明的价格比较（最低价/内部价/比 X 便宜）\n□ 是否只有一件事、一个动作',
      comply: '这 8 项任一条打不了勾，就别发。违规罚款 1–3 万起，严重的封端口，比一条短信的收益大得多。',
      tip: '建议做成手机备忘录，每次群发前照着念一遍，30 秒的事。',
      source: '汇总《广告法》第 17/23 条、《通信短信息服务管理规定》、《反不正当竞争法》第 9 条、市场监管总局 2024 特供酒公告'
    }
  ];

  /* ---------- 合规红线卡 ---------- */
  var RED_LINES = [
    {
      t: '短信 · 5 条硬规则',
      s: '《通信短信息服务管理规定》（工信部令第 74 号）2026-05-01 施行',
      items: [
        '只发给<strong>明示同意</strong>的人：默认勾选、捆绑授权一律无效，同意凭证要留存 ≥6 个月，纠纷时由发送方举证',
        '<strong>22:00–次日 8:00 禁发</strong>商业短信',
        '必须有一键退订，<strong>24 小时内生效</strong>，退订后不得换号再发',
        '签名须与发送主体一致，<strong>≤15 字符</strong>；服务商代发不能用“京东”字样冒充',
        '违规罚款 1–3 万，严重可封端口'
      ]
    },
    {
      t: '外呼 · 4 条硬规则',
      s: '工信部骚扰电话整治 + AI 外呼合规要求',
      items: [
        '开场<strong>明示主体</strong>（京东酒水 + 哪笔订单），不伪装真人',
        '客户说“不需要/别再打”→ <strong>当场终止</strong>并加黑名单，不得换号重打',
        '只用<strong>有业务关系</strong>的名单（京东订单客户）；采购来的陌生名单风险最高',
        '下一步监管方向：AI 营销外呼须<strong>备案号段、限定时段频次</strong>'
      ]
    },
    {
      t: '酒类广告 · 不能用的话',
      s: '《广告法》第 17/23 条、《反不正当竞争法》第 9 条、市场监管总局 2024 特供酒公告',
      items: [
        '<strong>功效类</strong>：治病、养生、保健、解压、提神、助眠、增强免疫',
        '<strong>特供类</strong>：特供、专供、内供、特酿、特需、定制、订制、授权、指定、接待、内部招待、储备、备战',
        '<strong>场景类</strong>：出现饮酒动作、劝酒、“送礼有面子”、与驾驶并提',
        '<strong>价格类</strong>：最低价、内部价、比某平台便宜（无法证明即属虚假宣传）'
      ]
    },
    {
      t: '⚠️ 运营商拦截 · 直接影响进粉',
      s: '三大运营商 2025 年起陆续收紧',
      items: [
        '中国电信 2025-05-20 起：短信含<strong>链接/联系方式</strong>大概率被拦截',
        '中国移动：已开启<strong>引流信息拦截</strong>，含链接可能发送失败',
        '中国联通 2025-07 起：含联系方式须<strong>提前报备</strong>',
        '<strong>对策</strong>：带短链的短信到达率会掉，改「纯文本 + 引导客户回复 1」，或走企微/咚咚通道'
      ]
    }
  ];

  function esc(s) { return (typeof escHtml === 'function') ? escHtml(s) : String(s == null ? '' : s); }

  function redCardHtml() {
    var h = '<div class="cmpl-card"><div class="cmpl-head">🚨 发送前必看：合规红线（点开逐条核）</div>';
    RED_LINES.forEach(function (g) {
      h += '<details class="cmpl-group"><summary><b>' + g.t + '</b><span class="cmpl-src">' + g.s + '</span></summary><ul class="cmpl-list">';
      g.items.forEach(function (i) { h += '<li>' + i + '</li>'; });
      h += '</ul></details>';
    });
    h += '<div class="cmpl-foot">依据均为公开法规原文或官方发布，具体适用请以最新法规与你所在平台规则为准。</div></div>';
    return h;
  }

  function cardHtml(n, idx, kind) {
    var isOut = kind === 'out';
    var main = isOut ? n.callScript : n.sms;
    var h = '<div class="case-card">'
      + '<div class="case-head"><span class="case-type">' + (isOut ? '外呼' : '短信') + ' ' + idx + '</span>'
      + '<span class="script-cat">' + esc(n.scenario) + '</span></div>'
      + '<div class="case-title">' + esc(n.title) + '</div>';
    if (n.hook && n.hook !== '—') h += '<div class="cs-hook">🎯 利益钩子：' + esc(n.hook) + '</div>';
    h += '<div class="cs-label">' + (isOut ? '外呼话术（京东酒水顾问）' : '短信正文') + '</div>'
      + '<div class="script-body">' + esc(main) + '</div>';
    if (isOut && n.hangupSms) h += '<div class="cs-label">配套挂机短信</div><div class="script-body cs-sms">' + esc(n.hangupSms) + '</div>';
    if (n.metric) h += '<div class="cs-data">📊 ' + esc(n.metric) + '<span class="cs-src">（来源：' + esc(n.metricSource) + '）</span></div>';
    if (n.comply) h += '<div class="cmpl-note"><b>✅ 合规校验</b>' + esc(n.comply) + '</div>';
    h += '<div class="cs-source">依据：' + esc(n.source) + '</div>';
    if (n.tip) h += '<div class="cs-tip">💡 ' + esc(n.tip) + '</div>';
    return h + '</div>';
  }

  var css = '.cmpl-card{background:#fff2f0;border:1px solid #ffccc7;border-left:4px solid #cf1322;border-radius:8px;padding:14px 18px;margin-bottom:16px;}'
    + '.cmpl-head{font-size:14px;font-weight:600;color:#a8071a;margin-bottom:8px;}'
    + '.cmpl-group{border-top:1px dashed #ffccc7;padding:8px 0 4px;}'
    + '.cmpl-group summary{cursor:pointer;font-size:13px;color:#1f1f1f;list-style:none;}'
    + '.cmpl-group summary::-webkit-details-marker{display:none;}'
    + '.cmpl-group summary:before{content:"▸ ";color:#cf1322;}'
    + '.cmpl-group[open] summary:before{content:"▾ ";color:#cf1322;}'
    + '.cmpl-src{display:block;font-size:11px;color:#8c8c8c;margin:2px 0 0 14px;}'
    + '.cmpl-list{margin:6px 0 0 16px;padding-left:12px;font-size:12.5px;line-height:1.85;color:#434343;}'
    + '.cmpl-list li{margin-bottom:2px;}'
    + '.cmpl-foot{font-size:11px;color:#8c8c8c;margin-top:8px;border-top:1px dashed #ffccc7;padding-top:6px;}'
    + '.cmpl-note{margin-top:8px;background:#f6ffed;border:1px solid #b7eb8f;border-radius:6px;padding:8px 12px;font-size:12.5px;color:#237804;line-height:1.75;}'
    + '.cmpl-note b{display:block;margin-bottom:3px;font-size:12px;}';

  function run() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    D.outboundScripts = OUT;
    D.marketingSms = SMS;

    var z = document.getElementById('callSmsZone');
    if (!z) return;
    z.innerHTML = redCardHtml()
      + '<div class="cs-section-title">📞 外呼话术 + 配套挂机短信（' + OUT.length + '条）</div>'
      + OUT.map(function (n, i) { return cardHtml(n, i + 1, 'out'); }).join('')
      + '<div class="cs-section-title">📩 营销短信话术（' + SMS.length + '条）</div>'
      + SMS.map(function (n, i) { return cardHtml(n, i + 1, 'sms'); }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 0); });
  } else {
    setTimeout(run, 0);
  }
})();
