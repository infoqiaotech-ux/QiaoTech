/**
 * QIAO TECH - Service Demo Viewer v2.0
 * Vanilla JS | 6 interactive demos | ARIA accessible | No dependencies
 */
(function() {
'use strict';
var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function delay(ms) { return new Promise(function(r){setTimeout(r,ms);}); }

var SVC=[
  {id:'ai',   title:'AI Automation',   desc:'Self-running workflows and AI pipelines operating 24/7 without human supervision.', demoId:'demo-ai'},
  {id:'web',  title:'Web Apps',        desc:'Custom software architecture for your business. Robust, secure, lightning-fast cloud platforms.', demoId:'demo-web'},
  {id:'erp',  title:'ERP Systems',     desc:'End-to-end inventory, purchase order lifecycles and enterprise resource planning.', demoId:'demo-erp'},
  {id:'ocr',  title:'OCR / ICR',       desc:'AI document data extraction, neural OCR for invoices, bills and handwritten documents.', demoId:'demo-ocr'},
  {id:'web2', title:'Modern Websites', desc:'High-converting platforms and lightning-fast portals with technical authority.', demoId:'demo-web2'},
  {id:'brand',title:'Branding Systems',desc:'Logo engineering, visual style guides, brand guidelines and typographic identities.', demoId:'demo-brand'},
];

var TELE=[
  [{l:'Processing',v:'98.7%',c:'gold'},{l:'Automations',v:'24',c:'white'},{l:'Webhooks',v:'18',c:'white'},{l:'Tasks Done',v:'1,284',c:''}],
  [{l:'Active Users',v:'3.2K',c:'gold'},{l:'Uptime',v:'99.9%',c:''},{l:'API/s',v:'847',c:'white'},{l:'Latency',v:'38ms',c:''}],
  [{l:'POs Today',v:'142',c:'gold'},{l:'Stock Items',v:'8,840',c:'white'},{l:'Accuracy',v:'99.8%',c:''},{l:'GRN Scans',v:'3.2K',c:'white'}],
  [{l:'Confidence',v:'99.2%',c:''},{l:'Docs/Hour',v:'3,200',c:'gold'},{l:'Fields Read',v:'18',c:'white'},{l:'Errors',v:'0',c:''}],
  [{l:'Lighthouse',v:'98',c:'gold'},{l:'LCP',v:'0.8s',c:''},{l:'CLS',v:'0.01',c:''},{l:'FID',v:'12ms',c:'white'}],
  [{l:'Assets',v:'240+',c:'gold'},{l:'Variants',v:'48',c:'white'},{l:'Formats',v:'12',c:''},{l:'Pages',v:'32',c:'white'}],
];

var ICONS={
  ai:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="10" height="8" rx="1"/><circle cx="6" cy="9" r="1"/><circle cx="10" cy="9" r="1"/><path d="M6 7V6M10 7V6"/></svg>',
  web:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="2" y="2" width="5.5" height="5.5" rx=".75"/><rect x="8.5" y="2" width="5.5" height="5.5" rx=".75"/><rect x="2" y="8.5" width="5.5" height="5.5" rx=".75"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx=".75"/></svg>',
  erp:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M2 5l1.5-3h9L14 5M6 8h4"/></svg>',
  ocr:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="4" y="3" width="8" height="10" rx=".75"/><path d="M2 6h2M12 6h2M6 5h4M6 7h4"/></svg>',
  web2:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="2" y="4" width="9" height="7" rx=".75"/><path d="M5 12h3M11 6h3v4h-3"/></svg>',
  brand:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M8 2l1.25 3.75L13 7l-3.75 1.25L8 12l-1.25-3.75L3 7l3.75-1.25z"/></svg>',
};

function dH(t,s,d){
  var c=d==='cyan'?'#5bdfff':d==='gold'?'#eac078':'#28c840';
  return '<div class="demo-header"><span class="demo-title">'+t+'</span><div class="demo-status" style="color:'+c+'"><span class="pulse-dot '+d+'"></span>'+s+'</div></div>';
}
function dT(a){
  return '<div class="demo-telemetry">'+a.map(function(x){return '<div class="tele-chip"><span class="tele-label">'+x.l+'</span><span class="tele-value '+(x.c||'')+'">'+x.v+'</span></div>';}).join('')+'</div>';
}

function buildAI(){
  var nodes=[
    {i:'\u{1F4E8}',n:'Business Request',  d:'IMAP / Webhook inbound trigger',s:'RECEIVED'},
    {i:'\u{1F916}',n:'AI Agent',          d:'NLP classification & entity extraction',s:'PROCESSING'},
    {i:'\u{1F4CA}',n:'Document Analysis', d:'Table parsing, OCR, field validation',s:'ANALYSING'},
    {i:'\u26A1',   n:'Decision Engine',   d:'Rule-based + ML routing logic',s:'ROUTING'},
    {i:'\u{1F517}',n:'Webhook Dispatch',  d:'Outbound REST call to target system',s:'DISPATCHING'},
    {i:'\u{1F5C4}',n:'ERP / CRM Write',   d:'Atomic write to master database',s:'WRITING'},
    {i:'\u2705',   n:'Task Complete',     d:'Notification sent \u2014 0 human touches',s:'DONE'},
  ];
  var nH=nodes.map(function(n,i){
    return '<div class="ai-node" data-idx="'+i+'" tabindex="0" role="button"><div class="ai-node-icon"><span style="font-size:16px" aria-hidden="true">'+n.i+'</span></div><div class="ai-node-info"><div class="ai-node-name">'+n.n+'</div><div class="ai-node-detail">'+n.d+'</div></div><span class="ai-node-status">'+n.s+'</span></div>'+(i<nodes.length-1?'<div class="ai-connector" data-c="'+i+'"></div>':'');
  }).join('');
  var logs=[
    '<span class="ts">[09:41:01]</span> <span class="ev">TRIGGER</span> Inbound PO detected via IMAP',
    '<span class="ts">[09:41:02]</span> <span class="ev">AI</span> NLP model loaded (LLM-v4)',
    '<span class="ts">[09:41:03]</span> <span class="ok">EXTRACT</span> 4 SKU entities identified',
    '<span class="ts">[09:41:04]</span> <span class="ev">ROUTE</span> Decision rule #12 matched',
    '<span class="ts">[09:41:04]</span> <span class="ev">HOOK</span> POST \u2192 erp.internal/api/orders',
    '<span class="ts">[09:41:05]</span> <span class="ok">200 OK</span> ERP record created',
    '<span class="ts">[09:41:05]</span> <span class="ok">DONE</span> Workflow complete \u2014 0 errors',
    '<span class="ts">[09:41:06]</span> <span class="warn">NOTIF</span> Confirmation dispatched',
  ];
  var lH=logs.map(function(l){return '<div class="ai-log-entry">'+l+'</div>';}).join('');
  return '<div class="demo-env active" id="demo-ai">'+dH('AI AUTOMATION WORKFLOW','LIVE PROCESSING','cyan')+dT(TELE[0])+'<div class="ai-canvas"><div class="ai-flow-wrap">'+nH+'</div><div class="ai-log-panel"><div class="ai-log-hdr">\u26A1 EVENT LOG</div><div class="ai-log-body">'+lH+'</div></div></div></div>';
}

function buildWeb(){
  var views=['Dashboard','Analytics','Users','Projects','Reports'];
  var sbar=views.map(function(v,i){return '<div class="web-nav-item'+(i===0?' active':'')+'" data-view="'+i+'" tabindex="0" role="button">'+v+'</div>';}).join('');
  var b1=[62,78,55,90,67,88,95].map(function(h,i){return '<div class="web-bar'+(i%2?' cy':'')+'" style="height:'+h+'%"></div>';}).join('');
  var rows=[['Analytics Engine v4','Production','2026-10-01','success'],['Leave Portal API','Production','2026-09-28','success'],['OCR Pipeline','Staging','2026-10-02','pending'],['ERP Sync Service','Production','2026-09-20','success'],['Webhook Relay','Dev','2026-10-02','error']];
  var tH=rows.map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td><span class="web-badge '+r[3]+'">'+(r[3]==='success'?'Active':r[3]==='pending'?'Testing':'Draft')+'</span></td></tr>';}).join('');
  function kpi(d){return '<div class="web-kpis">'+d.map(function(k){return '<div class="web-kpi"><div class="web-kpi-label">'+k[0]+'</div><div class="web-kpi-val">'+k[1]+'</div><div class="web-kpi-delta '+(k[3]?'up':'down')+'">'+k[2]+'</div></div>';}).join('')+'</div>';}
  var b2=[100,84,61,42,29,18,9].map(function(h,i){return '<div class="web-bar'+(i%2?' cy':'')+'" style="height:'+h+'%"></div>';}).join('');
  var v0='<div class="web-main active" id="web-view-0">'+kpi([['Revenue','\u20B94.2L','\u2191 12.4%',1],['Users','3,218','\u2191 7.1%',1],['Orders','847','\u2191 22%',1],['Errors','0.02%','\u2193 98%',0]])+'<div class="web-chart-bar"><div class="web-chart-title">API Calls \u2014 Last 7 Days</div><div class="web-bars">'+b1+'</div></div><div class="web-table-wrap"><table class="web-table"><thead><tr><th>Module</th><th>Env</th><th>Updated</th><th>Status</th></tr></thead><tbody>'+tH+'</tbody></table></div></div>';
  var v1='<div class="web-main" id="web-view-1">'+kpi([['Page Views','48K','\u2191 31%',1],['Bounce','18%','\u2193 9%',0],['Session','4:12','\u2191 14%',1],['Conversions','6.8%','\u2191 2.1%',1]])+'<div class="web-chart-bar"><div class="web-chart-title">Conversion Funnel</div><div class="web-bars">'+b2+'</div></div></div>';
  var vR=['Users','Projects','Reports'].map(function(v,i){return '<div class="web-main" id="web-view-'+(i+2)+'">'+kpi([['Total','1,284','',1],['Active','847','',1],['New','+32','',1],['Rate','94%','',1]])+'<div class="web-chart-bar" style="text-align:center;padding:1.5rem"><div class="web-chart-title">'+v+' \u2014 Click to explore</div></div></div>';}).join('');
  return '<div class="demo-env" id="demo-web">'+dH('WEB APPLICATION DASHBOARD','LIVE SYSTEM','green')+dT(TELE[1])+'<div class="web-shell"><div class="web-sidebar">'+sbar+'</div><div style="flex:1 1 0;overflow:hidden;position:relative;">'+v0+v1+vR+'</div></div></div>';
}

function buildERP(){
  var steps=['Purchase','PO Created','GRN','Inventory','Production','Quality','Dispatch','Reporting'];
  var sH=steps.map(function(s,i){return '<span class="erp-step'+(i<2?' done':i===2?' active':'')+'" data-step="'+i+'">'+s+'</span>'+(i<steps.length-1?'<span style="color:#4e4639;font-size:10px">\u203a</span>':'');}).join('');
  var inv=[{n:'Steel Rods',p:78,c:'',v:'780 u'},{n:'Bearings',p:22,c:'crit',v:'22 u'},{n:'Circuit PCB',p:91,c:'cy',v:'456 u'},{n:'Packaging',p:55,c:'',v:'1,100 u'}];
  var iH=inv.map(function(x){return '<div class="erp-inv-row"><span class="erp-inv-label">'+x.n+'</span><div class="erp-inv-bg"><div class="erp-inv-bar '+x.c+'" style="width:0%" data-w="'+x.p+'%"></div></div><span class="erp-inv-val">'+x.v+'</span></div>';}).join('');
  var logs=[['09:38','IN','PO #4821 received','\u20B948,200'],['09:39','GRN','Delivery challan scanned','\u2014'],['09:40','STK','+480 Steel Rods added','\u2014'],['09:41','OUT','Dispatch #D-221 approved','\u20B912,800'],['09:42','QC','Quality check PASS','\u2014'],['09:43','RPT','Daily report generated','\u2014']];
  var lH=logs.map(function(r){return '<div class="erp-log-row"><span class="erp-ts">'+r[0]+'</span><span class="erp-type">'+r[1]+'</span><span class="erp-msg">'+r[2]+'</span><span class="erp-amt">'+r[3]+'</span></div>';}).join('');
  return '<div class="demo-env" id="demo-erp">'+dH('ENTERPRISE RESOURCE PLANNING','LIVE SYSTEM','gold')+dT(TELE[2])+'<div class="erp-body"><div class="erp-card"><div class="erp-card-header"><span class="erp-card-title">Inventory Levels</span><span class="erp-sbadge live">Live</span></div>'+iH+'</div><div class="erp-card"><div class="erp-card-header"><span class="erp-card-title">Transactions</span><span class="erp-sbadge live">Real-time</span></div><div class="erp-log">'+lH+'</div></div><div class="erp-card" style="grid-column:1/-1"><div class="erp-card-header"><span class="erp-card-title">Workflow Pipeline</span><span class="erp-sbadge warn">GRN Active</span></div><div class="erp-flow">'+sH+'</div></div></div></div>';
}

function buildOCR(){
  var f=[{k:'Invoice Number',v:'INV-2026-8842',c:'99.8%'},{k:'Vendor',v:'Mehta Supplies Pvt Ltd',c:'99.5%'},{k:'Invoice Date',v:'01-Oct-2026',c:'99.9%'},{k:'Amount',v:'\u20B948,200.00',c:'99.7%'},{k:'GST 18%',v:'\u20B98,676.00',c:'99.6%'},{k:'Total',v:'\u20B956,876.00',c:'99.8%'}];
  var fH=f.map(function(x,i){return '<div class="ocr-field" data-f="'+i+'"><span class="ocr-fk">'+x.k+'</span><div class="ocr-fv">'+x.v+'</div><span class="ocr-fc">'+x.c+' confidence</span></div>';}).join('');
  return '<div class="demo-env" id="demo-ocr">'+dH('OCR / ICR DOCUMENT EXTRACTOR','AI SCANNING','cyan')+dT(TELE[3])+'<div class="ocr-body"><div class="ocr-left"><div class="ocr-doc"><div class="ocr-invoice" id="ocr-inv"><div class="ocr-inv-hdr"><div><div class="ocr-inv-title">Tax Invoice</div><div class="ocr-inv-no">INV-2026-8842</div></div><div class="ocr-inv-logo">QT</div></div><table class="ocr-inv-tbl"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amt</th></tr></thead><tbody><tr><td>Steel Rods 10mm</td><td>200</td><td>\u20B9120</td><td>\u20B924,000</td></tr><tr><td>Bearings SKF 6204</td><td>80</td><td>\u20B9185</td><td>\u20B914,800</td></tr><tr><td>PCB Modules</td><td>20</td><td>\u20B9470</td><td>\u20B99,400</td></tr></tbody></table><div class="ocr-inv-total"><span>TOTAL DUE</span><span>\u20B956,876.00</span></div></div><div class="ocr-beam" id="ocr-beam"></div><div class="ocr-bbox" id="ocr-bb0" style="top:8%;left:5%;width:60%;height:9%"><span class="ocr-bbox-lbl">Invoice No.</span></div><div class="ocr-bbox gold" id="ocr-bb1" style="top:8%;right:5%;width:22%;height:11%"><span class="ocr-bbox-lbl">Logo</span></div><div class="ocr-bbox" id="ocr-bb2" style="top:40%;left:3%;width:94%;height:34%"><span class="ocr-bbox-lbl">Line Items</span></div><div class="ocr-bbox gold" id="ocr-bb3" style="bottom:4%;left:3%;width:94%;height:10%"><span class="ocr-bbox-lbl">Total</span></div></div><div class="ocr-conf-bar"><span class="ocr-conf-lbl">Accuracy</span><div class="ocr-conf-track"><div class="ocr-conf-fill" id="ocr-fill"></div></div><span class="ocr-conf-pct" id="ocr-pct">0%</span></div></div><div class="ocr-right"><div style="padding:.75rem 1rem;border-bottom:1px solid rgba(78,70,57,.18);background:rgba(11,18,41,.60);font-family:Space Grotesk,sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9a8f80">EXTRACTED FIELDS</div><div class="ocr-extracted">'+fH+'</div></div></div></div>';
}

function buildWebBuilder(){
  var tabDefs=[
    {label:'Desktop', icon:'\ud83d\udda5', key:'desktop'},
    {label:'Tablet',  icon:'\ud83d\udcf1', key:'tablet'},
    {label:'Mobile',  icon:'\ud83d\udcf1', key:'mobile'},
  ];
  var dc=['#ff5f57','#febc2e','#28c840'];

  // Feature cards for the mock site
  var feats=[
    {emoji:'\u26a1',title:'Lightning Fast',text:'Sub-second loads, globally cached',tag:'Performance',tagClr:'#3b5bdb',tagBg:'#eff3ff'},
    {emoji:'\ud83d\udcca',title:'Analytics Dashboard',text:'Real-time metrics, conversion funnels',tag:'Business Intel',tagClr:'#7c3aed',tagBg:'#f5f3ff'},
    {emoji:'\ud83e\udd16',title:'AI Automation',text:'Smart workflows, zero manual overhead',tag:'AI-Powered',tagClr:'#0891b2',tagBg:'#ecfeff'},
    {emoji:'\ud83d\udd12',title:'Bank-Grade Security',text:'SSL, 2FA, encrypted at rest',tag:'Security',tagClr:'#059669',tagBg:'#ecfdf5'},
    {emoji:'\ud83d\udcf1',title:'Mobile-First Design',text:'Perfect on every screen and device',tag:'Responsive',tagClr:'#d97706',tagBg:'#fffbeb'},
    {emoji:'\ud83c\udf0d',title:'Global CDN',text:'Deployed across 200+ edge nodes',tag:'Infrastructure',tagClr:'#be185d',tagBg:'#fdf2f8'},
  ];
  var featH=feats.map(function(f){
    return '<div class="wb-feature" data-wb="">'
      +'<div class="wb-feat-icon" style="background:'+f.tagBg+'">'+f.emoji+'</div>'
      +'<div class="wb-feat-title">'+f.title+'</div>'
      +'<div class="wb-feat-text">'+f.text+'</div>'
      +'<div class="wb-feat-tag" style="color:'+f.tagClr+';background:'+f.tagBg+'">'+f.tag+'</div>'
      +'</div>';
  }).join('');

  // Stats
  var stats=[
    {num:'3.2K',lbl:'Active Users'},
    {num:'99.9%',lbl:'Uptime SLA'},
    {num:'0.8s',lbl:'Avg. Load'},
    {num:'98',lbl:'Lighthouse'},
  ];
  var statsH=stats.map(function(s){return '<div class="wb-stat" data-wb=""><div class="wb-stat-num">'+s.num+'</div><div class="wb-stat-lbl">'+s.lbl+'</div></div>';}).join('');

  // Sparkline bars (visitor chart)
  var sparkVals=[40,55,38,72,60,88,65,95,78,100,84,92];
  var sparkClrs=['#c4b5fd','#a78bfa','#c4b5fd','#7c3aed','#a78bfa','#3b5bdb','#60a5fa','#3b5bdb','#7c3aed','#a78bfa','#3b5bdb','#60a5fa'];
  var sparkH=sparkVals.map(function(v,i){
    return '<div class="wb-spark-bar" style="height:'+v+'%;background:'+sparkClrs[i]+';opacity:'+(0.5+v/200)+';"></div>';
  }).join('');

  // Build one device HTML (same site content, different wrapper class for sizing)
  function makeDevice(key, idx) {
    return '<div class="wb-device'+(idx===0?' active':'')+'" id="wb-dev-'+idx+'" data-device="'+key+'">'
      +'<div class="wb-browser-bar"><div class="wb-br-dots">'+dc.map(function(c){return '<span style="background:'+c+'"></span>';}).join('')+'</div>'
      +'<div class="wb-url">https://client.yoursite.in</div></div>'
      +'<div class="wb-site">'
        // Site nav
        +'<div class="wb-site-nav">'
          +'<div class="wb-site-logo">NEXUS TECH</div>'
          +'<div class="wb-site-links">'
            +'<span class="wb-site-link">Home</span>'
            +'<span class="wb-site-link">Products</span>'
            +'<span class="wb-site-link">Solutions</span>'
            +'<span class="wb-site-link">Pricing</span>'
            +'<span class="wb-site-cta-btn">Get Demo \u2192</span>'
          +'</div>'
        +'</div>'
        // Hero
        +'<div class="wb-hero">'
          +'<div class="wb-hero-bg-orbs">'
            +'<div class="wb-hero-orb a"></div>'
            +'<div class="wb-hero-orb b"></div>'
            +'<div class="wb-hero-orb c"></div>'
          +'</div>'
          +'<div class="wb-badge-pill" data-wb=""><span class="wb-badge-dot"></span><span class="wb-badge-text">AI-Powered Platform \u2022 Now Live</span></div>'
          +'<div class="wb-h1" data-wb="">Scale Your Business with <em>Intelligent</em> Software</div>'
          +'<div class="wb-sub" data-wb="">Enterprise-grade platforms that automate operations,<br>accelerate growth and delight every user.</div>'
          +'<div class="wb-hero-btns" data-wb=""><div class="wb-btn-primary">Start Free Trial</div><div class="wb-btn-outline">Watch Demo \u25b6</div></div>'
        +'</div>'
        // Stats row
        +'<div class="wb-stats">'+statsH+'</div>'
        // Features
        +'<div class="wb-features">'+featH+'</div>'
        // Sparkline chart
        +'<div class="wb-chart-section">'
          +'<div class="wb-chart-title-row">'
            +'<span class="wb-chart-label">Monthly Active Users</span>'
            +'<span class="wb-chart-badge">\u2191 24% this month</span>'
          +'</div>'
          +'<div class="wb-sparkline">'+sparkH+'</div>'
        +'</div>'
      +'</div>'
    +'</div>';
  }

  var devH=tabDefs.map(function(t,i){return makeDevice(t.key,i);}).join('');
  var tabH=tabDefs.map(function(t,i){
    return '<button class="wb-tab'+(i===0?' active':'')+'" data-wbtab="'+i+'"><span class="wb-tab-icon">'+t.icon+'</span>'+t.label+'</button>';
  }).join('');

  return '<div class="demo-env" id="demo-web2">'
    +dH('MODERN WEBSITE BUILDER','BUILDING LIVE','cyan')
    +'<div class="wb-tabs">'+tabH+'</div>'
    +'<div class="wb-body">'+devH+'</div>'
    +'<div class="wb-perf">'
      +'<div class="wb-perf-chip"><span class="wb-perf-num">98</span> Lighthouse</div>'
      +'<div class="wb-perf-divider"></div>'
      +'<div class="wb-perf-chip"><span class="wb-perf-num">0.8s</span> LCP</div>'
      +'<div class="wb-perf-divider"></div>'
      +'<div class="wb-perf-chip"><span class="wb-perf-num">0.01</span> CLS</div>'
      +'<div class="wb-perf-divider"></div>'
      +'<div class="wb-perf-chip"><span class="wb-perf-num">12ms</span> FID</div>'
      +'<div class="wb-perf-chip seo" style="margin-left:auto"><span class="wb-perf-num">100</span> SEO</div>'
    +'</div>'
    +'</div>';
}


function buildBrand(){
  var sw=[{c:'#0b1229',n:'Navy'},{c:'#141a32',n:'Navy 2'},{c:'#eac078',n:'Gold'},{c:'#c9a25d',n:'Gold 2'},{c:'#5bdfff',n:'Cyan'},{c:'#36d8fb',n:'Cyan 2'},{c:'#dce1ff',n:'On-surface'},{c:'#9a8f80',n:'Muted'}];
  var swH=sw.map(function(s){return '<div class="brand-sw" style="background:'+s.c+';border:1px solid rgba(255,255,255,.10)" title="'+s.n+'"></div>';}).join('');
  var ip=['<path d="M3 6h10M3 9h10M3 12h6" stroke-linecap="round"/>','<circle cx="8" cy="8" r="5"/><path d="M8 5v3l2 2"/>','<rect x="2" y="3" width="12" height="9" rx="1"/><path d="M5 14h6"/>','<path d="M8 2l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8z"/>','<path d="M2 14L6 4l4 6 3-3 3 6H2z" stroke-linejoin="round"/>','<circle cx="8" cy="5" r="3"/><path d="M2 15c0-3.3 2.7-6 6-6s6 2.7 6 6"/>'];
  var icH=ip.map(function(p){return '<div class="brand-icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'+p+'</svg></div>';}).join('');
  return '<div class="demo-env" id="demo-brand">'+dH('BRANDING SYSTEM LABORATORY','LIVE DESIGN','gold')+dT(TELE[5])+'<div class="brand-body"><div class="brand-panel"><div class="brand-ptitle">Logo Construction</div><div class="brand-stage"><div class="brand-gh" style="top:50%"></div><div class="brand-gh" style="top:33%"></div><div class="brand-gh" style="top:67%"></div><div class="brand-gv" style="left:50%"></div><div class="brand-gv" style="left:33%"></div><div class="brand-gv" style="left:67%"></div><div class="brand-mark"></div></div></div><div class="brand-panel"><div class="brand-ptitle">Color Palette</div><div class="brand-palette">'+swH+'</div><div class="brand-ptitle" style="margin-top:.75rem">Typography</div><div class="brand-td">Display / Sora</div><div class="brand-tb">Body uses Manrope \u2014 clean and legible for enterprise interfaces.</div><div class="brand-tm">MONO LABELS \u2014 SPACE GROTESK</div></div><div class="brand-panel"><div class="brand-ptitle">Icon System</div><div class="brand-icons">'+icH+'</div></div><div class="brand-panel"><div class="brand-ptitle">Business Card</div><div class="biz-card"><div class="biz-logo">QIAO TECH</div><div><div class="biz-name">Principal Engineer</div><div class="biz-role">AI Systems \u00B7 Enterprise Software</div><div class="biz-contact">Pune, Maharashtra, India<br>contact@qiaotech.in</div></div></div></div></div></div>';
}

function buildModal(){
  var el=document.createElement('div');
  el.id='svc-viewer';
  el.setAttribute('role','dialog');
  el.setAttribute('aria-modal','true');
  el.setAttribute('aria-label','Service demonstration viewer');
  var dots=SVC.map(function(s,i){return '<span class="svc-dot'+(i===0?' active':'')+'" data-di="'+i+'" aria-label="'+s.title+'"></span>';}).join('');
  var sbar=SVC.map(function(s,i){return '<div class="svc-nav-item'+(i===0?' active':'')+'" data-ni="'+i+'" tabindex="0" role="button" aria-label="'+s.title+'"><span class="svc-nav-icon">'+(ICONS[s.id]||'')+'</span><span class="svc-nav-label">'+s.title+'</span></div>';}).join('');
  el.innerHTML='<div id="svc-panel">'
    +'<div id="svc-chrome"><div class="svc-chrome-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>'
    +'<div id="svc-title-bar"><span class="svc-badge">QIAO TECH \u00B7 DEMO</span><span id="svc-name">AI Automation</span></div>'
    +'<div class="svc-ctrl-group">'
    +'<button class="svc-ctrl" id="svc-replay" aria-label="Replay demonstration" title="Replay"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 7a5 5 0 1 0 1-3.1"/><path d="M2 2v3h3"/></svg></button>'
    +'<button class="svc-ctrl" id="svc-fs" aria-label="Fullscreen" title="Fullscreen"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9"/></svg></button>'
    +'<button class="svc-ctrl" id="svc-close-btn" aria-label="Close viewer"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12"/></svg></button>'
    +'</div></div>'
    +'<div id="svc-body"><nav id="svc-sidebar" aria-label="Service navigation">'+sbar
    +'<div class="svc-nav-divider"></div><div class="svc-sidebar-desc"><p id="svc-desc">Select a service to explore the live demonstration.</p>'
    +'<a href="contact.html" class="svc-sidebar-cta">Request This Service <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 5h6M5 2l3 3-3 3"/></svg></a></div></nav>'
    +'<div id="svc-demo-area">'+buildAI()+buildWeb()+buildERP()+buildOCR()+buildWebBuilder()+buildBrand()+'</div></div>'
    +'<div id="svc-footer"><div class="svc-nav-dots">'+dots+'</div><div class="svc-footer-nav">'
    +'<button class="svc-prev" id="svc-prev" aria-label="Previous service"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 2L4 5l3 3"/></svg>Prev</button>'
    +'<a href="contact.html" class="svc-cta">Get a Quote</a>'
    +'<button class="svc-next" id="svc-next" aria-label="Next service">Next<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 2l3 3-3 3"/></svg></button>'
    +'</div></div></div>';
  document.body.appendChild(el);
  return el;
}

var stopFns={};
function stopAll(){Object.keys(stopFns).forEach(function(k){if(stopFns[k])stopFns[k]();});stopFns={};}
function startDemo(id){stopAll();var el=document.getElementById('demo-'+id);if(el&&CTRL[id])CTRL[id](el);}

var CTRL={
  ai:function(el){
    var nodes=el.querySelectorAll('.ai-node'),conns=el.querySelectorAll('.ai-connector'),logs=el.querySelectorAll('.ai-log-entry'),stopped=false;
    nodes.forEach(function(n){n.classList.remove('visible','active','complete');});
    conns.forEach(function(c){c.classList.remove('lit');});
    logs.forEach(function(l){l.classList.remove('visible');});
    if(rm){nodes.forEach(function(n){n.classList.add('visible','complete');});logs.forEach(function(l){l.classList.add('visible');});stopFns.ai=function(){};return;}
    (async function run(){
      for(var i=0;i<nodes.length&&!stopped;i++){
        nodes[i].classList.add('visible','active');await delay(500);if(stopped)break;
        if(conns[i]){conns[i].classList.add('lit');await delay(280);}
        if(i>0){nodes[i-1].classList.remove('active');nodes[i-1].classList.add('complete');}
        if(logs[i])logs[i].classList.add('visible');
        await delay(600);
      }
      if(!stopped&&nodes.length){
        nodes[nodes.length-1].classList.remove('active');nodes[nodes.length-1].classList.add('complete');
        if(logs[nodes.length-1])logs[nodes.length-1].classList.add('visible');
        await delay(3200);if(!stopped)CTRL.ai(el);
      }
    })();
    nodes.forEach(function(n){n.addEventListener('click',function(){nodes.forEach(function(x){x.style.outline='';});n.style.outline='2px solid #eac078';setTimeout(function(){n.style.outline='';},1200);});});
    stopFns.ai=function(){stopped=true;};
  },
  web:function(el){
    var navs=el.querySelectorAll('.web-nav-item'),views=el.querySelectorAll('.web-main');
    function sw(i){navs.forEach(function(n,j){n.classList.toggle('active',j===i);});views.forEach(function(v,j){v.classList.toggle('active',j===i);});}
    navs.forEach(function(n,i){n.addEventListener('click',function(){sw(i);});n.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sw(i);}});});
    stopFns.web=function(){};
  },
  erp:function(el){
    var bars=el.querySelectorAll('.erp-inv-bar'),logs=el.querySelectorAll('.erp-log-row'),steps=el.querySelectorAll('.erp-step'),stopped=false,si=2;
    bars.forEach(function(b){b.style.width='0%';});
    requestAnimationFrame(function(){bars.forEach(function(b){if(!stopped)b.style.width=b.dataset.w||'50%';});});
    logs.forEach(function(l){l.classList.remove('visible');});
    if(rm){bars.forEach(function(b){b.style.width=b.dataset.w||'50%';});logs.forEach(function(l){l.classList.add('visible');});}
    else{
      (async function(){for(var i=0;i<logs.length&&!stopped;i++){await delay(300+i*240);if(!stopped)logs[i].classList.add('visible');}})();
      (function adv(){if(stopped)return;steps.forEach(function(s,i){s.classList.toggle('done',i<si);s.classList.toggle('active',i===si);});si=(si+1)%steps.length;if(si===0)si=1;setTimeout(adv,1100);})();
    }
    stopFns.erp=function(){stopped=true;};
  },
  ocr:function(el){
    var beam=el.querySelector('.ocr-beam'),bbs=el.querySelectorAll('.ocr-bbox'),flds=el.querySelectorAll('.ocr-field'),fill=el.querySelector('.ocr-conf-fill'),pct=el.querySelector('.ocr-conf-pct'),stopped=false;
    bbs.forEach(function(b){b.classList.remove('visible');});flds.forEach(function(f){f.classList.remove('visible');});
    if(fill)fill.style.width='0%';if(pct)pct.textContent='0%';
    if(rm){bbs.forEach(function(b){b.classList.add('visible');});flds.forEach(function(f){f.classList.add('visible');});if(fill)fill.style.width='99.2%';if(pct)pct.textContent='99.2%';stopFns.ocr=function(){};return;}
    (async function run(){
      await delay(400);if(stopped)return;
      if(beam)beam.classList.add('scanning');await delay(1200);
      for(var i=0;i<bbs.length&&!stopped;i++){bbs[i].classList.add('visible');await delay(340);}
      if(beam&&!stopped)beam.classList.remove('scanning');await delay(300);
      for(var j=0;j<flds.length&&!stopped;j++){flds[j].classList.add('visible');await delay(270);}
      if(!stopped&&fill){
        fill.style.width='99.2%';var p=0,target=99.2;
        var step=function(){if(p<target&&!stopped){p=Math.min(p+2,target);if(pct)pct.textContent=p.toFixed(1)+'%';if(p<target)requestAnimationFrame(step);}};
        requestAnimationFrame(step);
      }
      await delay(4000);if(!stopped)CTRL.ocr(el);
    })();
    stopFns.ocr=function(){stopped=true;if(beam)beam.classList.remove('scanning');};
  },
  web2:function(el){
    var tabs=el.querySelectorAll('.wb-tab'),devs=el.querySelectorAll('.wb-device'),stopped=false;
    function sw(i){
      tabs.forEach(function(t,j){t.classList.toggle('active',j===i);});
      devs.forEach(function(d,j){d.classList.toggle('active',j===i);});
      var dev=devs[i];
      if(dev){
        var wbs=dev.querySelectorAll('[data-wb]');
        wbs.forEach(function(e){e.classList.remove('visible');});
        (async function(){for(var k=0;k<wbs.length&&!stopped;k++){await delay(rm?0:180+k*140);if(!stopped)wbs[k].classList.add('visible');}})();
      }
    }
    tabs.forEach(function(tab,i){tab.addEventListener('click',function(){sw(i);});tab.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sw(i);}});});
    sw(0);stopFns.web2=function(){stopped=true;};
  },
  brand:function(el){
    var sws=el.querySelectorAll('.brand-sw');
    sws.forEach(function(sw){sw.addEventListener('click',function(){sws.forEach(function(s){s.style.outline='';s.style.outlineOffset='';});sw.style.outline='2px solid #5bdfff';sw.style.outlineOffset='2px';});});
    el.querySelectorAll('.brand-icon').forEach(function(ic){ic.addEventListener('click',function(){el.querySelectorAll('.brand-icon').forEach(function(x){x.style.borderColor='';});ic.style.borderColor='#eac078';});});
    stopFns.brand=function(){};
  },
};

var currentIdx=0,triggerEl=null,viewer,closeBtn,prevBtn,nextBtn,replayBtn,fsBtn;

function updatePanel(idx){
  currentIdx=idx;
  var svc=SVC[idx];
  document.getElementById('svc-name').textContent=svc.title;
  document.getElementById('svc-desc').textContent=svc.desc;
  viewer.querySelectorAll('.svc-nav-item').forEach(function(el,i){el.classList.toggle('active',i===idx);});
  viewer.querySelectorAll('.svc-dot').forEach(function(el,i){el.classList.toggle('active',i===idx);});
  viewer.querySelectorAll('.demo-env').forEach(function(el){el.classList.remove('active');});
  var demo=document.getElementById(svc.demoId);
  if(demo){demo.classList.add('active');startDemo(svc.id);}
}

function openViewer(idx){
  updatePanel(idx);
  viewer.classList.add('open');
  document.body.style.overflow='hidden';
  if(closeBtn)closeBtn.focus();
}

function closeViewer(){
  stopAll();
  viewer.classList.remove('open');
  document.body.style.overflow='';
  if(triggerEl)triggerEl.focus();
}

function getFocusable(){
  var p=document.getElementById('svc-panel');
  if(!p)return[];
  return Array.from(p.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'));
}

function init(){
  viewer=buildModal();
  closeBtn=document.getElementById('svc-close-btn');
  prevBtn=document.getElementById('svc-prev');
  nextBtn=document.getElementById('svc-next');
  replayBtn=document.getElementById('svc-replay');
  fsBtn=document.getElementById('svc-fs');

  document.querySelectorAll('.service-card').forEach(function(card,i){
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.setAttribute('aria-haspopup','dialog');
    card.setAttribute('aria-label','View '+(SVC[i%SVC.length]?SVC[i%SVC.length].title:'service')+' demonstration');
    function open(){triggerEl=card;openViewer(i%SVC.length);}
    card.addEventListener('click',open);
    card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  });

  viewer.querySelectorAll('.svc-nav-item').forEach(function(item,i){
    item.addEventListener('click',function(){updatePanel(i);});
    item.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();updatePanel(i);}});
  });

  viewer.querySelectorAll('.svc-dot').forEach(function(dot,i){
    dot.addEventListener('click',function(){updatePanel(i);});
  });

  prevBtn.addEventListener('click',function(){updatePanel((currentIdx-1+SVC.length)%SVC.length);});
  nextBtn.addEventListener('click',function(){updatePanel((currentIdx+1)%SVC.length);});
  replayBtn.addEventListener('click',function(){startDemo(SVC[currentIdx].id);});

  fsBtn.addEventListener('click',function(){
    var p=document.getElementById('svc-panel');
    if(!document.fullscreenElement){if(p.requestFullscreen)p.requestFullscreen().catch(function(){});}
    else{if(document.exitFullscreen)document.exitFullscreen();}
  });

  closeBtn.addEventListener('click',closeViewer);
  viewer.addEventListener('click',function(e){if(e.target===viewer)closeViewer();});

  document.addEventListener('keydown',function(e){
    if(!viewer.classList.contains('open'))return;
    if(e.key==='Escape'){closeViewer();return;}
    if(e.key==='ArrowRight'||e.key==='ArrowDown')updatePanel((currentIdx+1)%SVC.length);
    if(e.key==='ArrowLeft'||e.key==='ArrowUp')updatePanel((currentIdx-1+SVC.length)%SVC.length);
  });

  var panel=document.getElementById('svc-panel');
  if(panel){
    panel.addEventListener('keydown',function(e){
      if(e.key!=='Tab')return;
      var els=getFocusable();if(!els.length)return;
      var first=els[0],last=els[els.length-1];
      if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus();}}
      else{if(document.activeElement===last){e.preventDefault();first.focus();}}
    });
  }

  CTRL.web(document.getElementById('demo-web'));
  CTRL.brand(document.getElementById('demo-brand'));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();

