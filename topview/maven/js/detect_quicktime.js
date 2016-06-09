/*
PluginDetect v0.8.9
www.pinlady.net/PluginDetect/license/
[ QuickTime ]
[ isMinVersion getVersion hasMimeType ]
[ AllowActiveX ]
*/
(function(){var j={version:"0.8.9",name:"PluginDetect",addPlugin:function(p,q){if(p&&j.isString(p)&&q&&j.isFunc(q.getVersion)){p=p.replace(/\s/g,"").toLowerCase();j.Plugins[p]=q;if(!j.isDefined(q.getVersionDone)){q.installed=null;q.version=null;q.version0=null;q.getVersionDone=null;q.pluginName=p;}}},openTag:"<",hasOwnPROP:({}).constructor.prototype.hasOwnProperty,hasOwn:function(s,t){var p;try{p=j.hasOwnPROP.call(s,t)}catch(q){}return !!p},rgx:{str:/string/i,num:/number/i,fun:/function/i,arr:/array/i},toString:({}).constructor.prototype.toString,isDefined:function(p){return typeof p!="undefined"},isArray:function(p){return j.rgx.arr.test(j.toString.call(p))},isString:function(p){return j.rgx.str.test(j.toString.call(p))},isNum:function(p){return j.rgx.num.test(j.toString.call(p))},isStrNum:function(p){return j.isString(p)&&(/\d/).test(p)},isFunc:function(p){return j.rgx.fun.test(j.toString.call(p))},getNumRegx:/[\d][\d\.\_,\-]*/,splitNumRegx:/[\.\_,\-]/g,getNum:function(q,r){var p=j.isStrNum(q)?(j.isDefined(r)?new RegExp(r):j.getNumRegx).exec(q):null;return p?p[0]:null},compareNums:function(w,u,t){var s,r,q,v=parseInt;if(j.isStrNum(w)&&j.isStrNum(u)){if(j.isDefined(t)&&t.compareNums){return t.compareNums(w,u)}s=w.split(j.splitNumRegx);r=u.split(j.splitNumRegx);for(q=0;q<Math.min(s.length,r.length);q++){if(v(s[q],10)>v(r[q],10)){return 1}if(v(s[q],10)<v(r[q],10)){return -1}}}return 0},formatNum:function(q,r){var p,s;if(!j.isStrNum(q)){return null}if(!j.isNum(r)){r=4}r--;s=q.replace(/\s/g,"").split(j.splitNumRegx).concat(["0","0","0","0"]);for(p=0;p<4;p++){if(/^(0+)(.+)$/.test(s[p])){s[p]=RegExp.$2}if(p>r||!(/\d/).test(s[p])){s[p]="0"}}return s.slice(0,4).join(",")},pd:{getPROP:function(s,q,p){try{if(s){p=s[q]}}catch(r){}return p},findNavPlugin:function(u){if(u.dbug){return u.dbug}var A=null;if(window.navigator){var z={Find:j.isString(u.find)?new RegExp(u.find,"i"):u.find,Find2:j.isString(u.find2)?new RegExp(u.find2,"i"):u.find2,Avoid:u.avoid?(j.isString(u.avoid)?new RegExp(u.avoid,"i"):u.avoid):0,Num:u.num?/\d/:0},s,r,t,y,x,q,p=navigator.mimeTypes,w=navigator.plugins;if(u.mimes&&p){y=j.isArray(u.mimes)?[].concat(u.mimes):(j.isString(u.mimes)?[u.mimes]:[]);for(s=0;s<y.length;s++){r=0;try{if(j.isString(y[s])&&/[^\s]/.test(y[s])){r=p[y[s]].enabledPlugin}}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}}if(u.plugins&&w){x=j.isArray(u.plugins)?[].concat(u.plugins):(j.isString(u.plugins)?[u.plugins]:[]);for(s=0;s<x.length;s++){r=0;try{if(x[s]&&j.isString(x[s])){r=w[x[s]]}}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}q=w.length;if(j.isNum(q)){for(s=0;s<q;s++){r=0;try{r=w[s]}catch(v){}if(r){t=this.findNavPlugin_(r,z);if(t.obj){A=t.obj}if(A&&!j.dbug){return A}}}}}}return A},findNavPlugin_:function(t,s){var r=t.description||"",q=t.name||"",p={};if((s.Find.test(r)&&(!s.Find2||s.Find2.test(q))&&(!s.Num||s.Num.test(RegExp.leftContext+RegExp.rightContext)))||(s.Find.test(q)&&(!s.Find2||s.Find2.test(r))&&(!s.Num||s.Num.test(RegExp.leftContext+RegExp.rightContext)))){if(!s.Avoid||!(s.Avoid.test(r)||s.Avoid.test(q))){p.obj=t}}return p},getVersionDelimiter:",",findPlugin:function(r){var q,p={status:-3,plugin:0};if(!j.isString(r)){return p}if(r.length==1){this.getVersionDelimiter=r;return p}r=r.toLowerCase().replace(/\s/g,"");q=j.Plugins[r];if(!q||!q.getVersion){return p}p.plugin=q;p.status=1;return p}},AXO:(function(){var q;try{q=new window.ActiveXObject()}catch(p){}return q?null:window.ActiveXObject})(),getAXO:function(p){var r=null;try{r=new j.AXO(p)}catch(q){j.errObj=q;}if(r){j.browser.ActiveXEnabled=!0}return r},browser:{detectPlatform:function(){var r=this,q,p=window.navigator?navigator.platform||"":"";j.OS=100;if(p){var s=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];for(q=s.length-2;q>=0;q=q-2){if(s[q]&&new RegExp(s[q],"i").test(p)){j.OS=s[q+1];break}}}},detectIE:function(){var r=this,u=document,t,q,v=window.navigator?navigator.userAgent||"":"",w,p,y;r.ActiveXFilteringEnabled=!1;r.ActiveXEnabled=!1;try{r.ActiveXFilteringEnabled=!!window.external.msActiveXFilteringEnabled()}catch(s){}p=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","TDCCtl.TDCCtl","Shell.UIHelper","HtmlDlgSafeHelper.HtmlDlgSafeHelper","Scripting.Dictionary"];y=["WMPlayer.OCX","ShockwaveFlash.ShockwaveFlash","AgControl.AgControl"];w=p.concat(y);for(t=0;t<w.length;t++){if(j.getAXO(w[t])&&!j.dbug){break}}if(r.ActiveXEnabled&&r.ActiveXFilteringEnabled){for(t=0;t<y.length;t++){if(j.getAXO(y[t])){r.ActiveXFilteringEnabled=!1;break}}}q=u.documentMode;try{u.documentMode=""}catch(s){}r.isIE=r.ActiveXEnabled;r.isIE=r.isIE||j.isNum(u.documentMode)||new Function("return/*@cc_on!@*/!1")();try{u.documentMode=q}catch(s){}r.verIE=null;if(r.isIE){r.verIE=(j.isNum(u.documentMode)&&u.documentMode>=7?u.documentMode:0)||((/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(v)?parseFloat(RegExp.$1,10):7)}},detectNonIE:function(){var p=this,s=window.navigator?navigator:{},r=p.isIE?"":s.userAgent||"",t=s.vendor||"",q=s.product||"";p.isGecko=(/Gecko/i).test(q)&&(/Gecko\s*\/\s*\d/i).test(r);p.verGecko=p.isGecko?j.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(r)?RegExp.$1:"0.9"):null;p.isOpera=(/(OPR\s*\/|Opera\s*\/\s*\d.*\s*Version\s*\/|Opera\s*[\/]?)\s*(\d+[\.,\d]*)/i).test(r);p.verOpera=p.isOpera?j.formatNum(RegExp.$2):null;p.isChrome=!p.isOpera&&(/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(r);p.verChrome=p.isChrome?j.formatNum(RegExp.$2):null;p.isSafari=!p.isOpera&&!p.isChrome&&((/Apple/i).test(t)||!t)&&(/Safari\s*\/\s*(\d[\d\.]*)/i).test(r);p.verSafari=p.isSafari&&(/Version\s*\/\s*(\d[\d\.]*)/i).test(r)?j.formatNum(RegExp.$1):null;},init:function(){var p=this;p.detectPlatform();p.detectIE();p.detectNonIE()}},init:{hasRun:0,library:function(){window[j.name]=j;var q=this,p=document;j.win.init();j.head=p.getElementsByTagName("head")[0]||p.getElementsByTagName("body")[0]||p.body||null;j.browser.init();q.hasRun=1;}},ev:{handler:function(t,s,r,q,p){return function(){t(s,r,q,p)}},setTimeout:function(q,p){if(j.win&&j.win.unload){return}setTimeout(q,p)},fPush:function(q,p){if(j.isArray(p)&&(j.isFunc(q)||(j.isArray(q)&&q.length>0&&j.isFunc(q[0])))){p.push(q)}},call0:function(q){var p=j.isArray(q)?q.length:-1;if(p>0&&j.isFunc(q[0])){q[0](j,p>1?q[1]:0,p>2?q[2]:0,p>3?q[3]:0)}else{if(j.isFunc(q)){q(j)}}},callArray0:function(p){var q=this,r;if(j.isArray(p)){while(p.length){r=p[0];p.splice(0,1);if(j.win&&j.win.unload&&p!==j.win.unloadHndlrs){}else{q.call0(r)}}}},call:function(q){var p=this;p.call0(q);p.ifDetectDoneCallHndlrs()},callArray:function(p){var q=this;q.callArray0(p);q.ifDetectDoneCallHndlrs()},allDoneHndlrs:[],ifDetectDoneCallHndlrs:function(){var r=this,p,q;if(!r.allDoneHndlrs.length){return}if(j.win){if(!j.win.loaded||j.win.loadPrvtHndlrs.length||j.win.loadPblcHndlrs.length){return}}if(j.Plugins){for(p in j.Plugins){if(j.hasOwn(j.Plugins,p)){q=j.Plugins[p];if(q&&j.isFunc(q.getVersion)){if(q.OTF==3||(q.DoneHndlrs&&q.DoneHndlrs.length)||(q.BIHndlrs&&q.BIHndlrs.length)){return}}}}}r.callArray0(r.allDoneHndlrs);}},isMinVersion:function(v,u,r,q){var s=j.pd.findPlugin(v),t,p=-1;if(s.status<0){return s.status}t=s.plugin;u=j.formatNum(j.isNum(u)?u.toString():(j.isStrNum(u)?j.getNum(u):"0"));if(t.getVersionDone!=1){t.getVersion(u,r,q);if(t.getVersionDone===null){t.getVersionDone=1}}if(t.installed!==null){p=t.installed<=0.5?t.installed:(t.installed==0.7?1:(t.version===null?0:(j.compareNums(t.version,u,t)>=0?1:-0.1)))}return p},getVersion:function(u,r,q){var s=j.pd.findPlugin(u),t,p;if(s.status<0){return null}t=s.plugin;if(t.getVersionDone!=1){t.getVersion(null,r,q);if(t.getVersionDone===null){t.getVersionDone=1}}p=(t.version||t.version0);p=p?p.replace(j.splitNumRegx,j.pd.getVersionDelimiter):p;return p},hasMimeType:function(t){if(t&&window.navigator&&navigator.mimeTypes){var w,v,q,s,p=navigator.mimeTypes,r=j.isArray(t)?[].concat(t):(j.isString(t)?[t]:[]);s=r.length;for(q=0;q<s;q++){w=0;try{if(j.isString(r[q])&&/[^\s]/.test(r[q])){w=p[r[q]]}}catch(u){}v=w?w.enabledPlugin:0;if(v&&(v.name||v.description)){return w}}}return null},codebase:{isDisabled:function(){if(j.browser.ActiveXEnabled&&j.isDefined(j.pd.getPROP(document.createElement("object"),"object"))){return 0}return 1},pluginMayBeHanging:function(q){var r=this,p;if(!r.isDisabled()&&q&&j.isDefined(j.pd.getPROP(q,"readyState"))&&j.pd.getPROP(q.firstChild,"object")){p=j.pd.getPROP(q.firstChild,"readyState");if(j.isNum(p)&&p!=4){return 1}}return 0},emptyGarbage:function(){var r=this,p,t=r.HTML,q=0;if(!t.length){return}for(p=t.length-1;p>=r.len;p--){if(t[p]&&t[p].span&&r.pluginMayBeHanging(t[p].span)){r.emptyNode(t[p].span);t[p].span=null;q=1}}r.len=t.length;if(q){try{window.CollectGarbage()}catch(s){}}},isMin:function(u,t){var s=this,r,q,p=0;if(!j.isStrNum(t)||s.isDisabled()){return p}s.init(u);if(!u.L){u.L={};for(r=0;r<u.Lower.length;r++){if(s.isActiveXObject(u,u.Lower[r])){u.L=s.convert(u,u.Lower[r]);break}}}if(u.L.v){q=s.convert(u,t,1);if(q.x>=0){p=(u.L.x==q.x?s.isActiveXObject(u,q.v):j.compareNums(t,u.L.v)<=0)?1:-1}}return p},search:function(v){var B=this,w=v.$$,q=0,r;r=v.searchHasRun||B.isDisabled()?1:0;v.searchHasRun=1;if(r){return v.version||null}B.init(v);var F,E,D,s=v.DIGITMAX,t,p,C=99999999,u=[0,0,0,0],G=[0,0,0,0];var A=function(y,J){var H=[].concat(u),I;H[y]=J;I=B.isActiveXObject(v,H.join(","));if(I){q=1;u[y]=J}else{G[y]=J}return I};for(F=0;F<G.length;F++){u[F]=Math.floor(v.DIGITMIN[F])||0;t=u.join(",");p=u.slice(0,F).concat([C,C,C,C]).slice(0,u.length).join(",");for(D=0;D<s.length;D++){if(j.isArray(s[D])){s[D].push(0);if(s[D][F]>G[F]&&j.compareNums(p,v.Lower[D])>=0&&j.compareNums(t,v.Upper[D])<0){G[F]=Math.floor(s[D][F])}}}for(E=0;E<30;E++){if(G[F]-u[F]<=16){for(D=G[F];D>=u[F]+(F?1:0);D--){if(A(F,D)){break}}break}A(F,Math.round((G[F]+u[F])/2))}if(!q){break}G[F]=u[F];}if(q){v.version=B.convert(v,u.join(",")).v}return v.version||null},emptyNode:function(p){try{p.innerHTML=""}catch(q){}},HTML:[],len:0,onUnload:function(r,q){var p,s=q.HTML;for(p=0;p<s.length;p++){if(s[p]&&s[p].span){q.emptyNode(s[p].span);s[p].span=null;s[p]=0}}},init:function(s){if(!s.init){s.init=1;var r=this,p,q;j.ev.fPush([r.onUnload,r],j.win.unloadHndlrs);s.tagA='<object width="1" height="1" style="display:none;" codebase="#version=';q=s.classID||s.$$.classID||"";s.tagB='" '+((/clsid\s*:/i).test(q)?'classid="':'type="')+q+'">'+j.openTag+"/object>";for(p=0;p<s.Lower.length;p++){s.Lower[p]=j.formatNum(s.Lower[p]);s.Upper[p]=j.formatNum(s.Upper[p]);}}},isActiveXObject:function(u,q){var t=this,p=0,s=u.$$,r=document.createElement("span");if(u.min&&j.compareNums(q,u.min)<=0){return 1}if(u.max&&j.compareNums(q,u.max)>=0){return 0}r.innerHTML=u.tagA+q+u.tagB;if(j.pd.getPROP(r.firstChild,"object")){p=1}if(p){u.min=q;t.HTML.push({span:r})}else{u.max=q;r.innerHTML=""}return p},convert_:function(t,p,q,s){var r=t.convert[p];return r?(j.isFunc(r)?j.formatNum(r(q.split(j.splitNumRegx),s).join(",")):q):r},convert:function(v,r,u){var t=this,q,p,s;r=j.formatNum(r);p={v:r,x:-1};if(r){for(q=0;q<v.Lower.length;q++){s=t.convert_(v,q,v.Lower[q]);if(s&&j.compareNums(r,u?s:v.Lower[q])>=0&&(!q||j.compareNums(r,u?t.convert_(v,q,v.Upper[q]):v.Upper[q])<0)){p.v=t.convert_(v,q,r,u);p.x=q;break}}}return p},z:0},win:{disable:function(){this.cancel=true},cancel:false,loaded:false,unload:false,hasRun:0,init:function(){var p=this;if(!p.hasRun){p.hasRun=1;if((/complete/i).test(document.readyState||"")){p.loaded=true;}else{p.addEvent("load",p.onLoad)}p.addEvent("unload",p.onUnload)}},addEvent:function(r,q){var s=this,p=window;if(p.addEventListener){p.addEventListener(r,q,false)}else{if(p.attachEvent){p.attachEvent("on"+r,q)}else{p["on"+r]=s.concatFn(q,p["on"+r])}}},removeEvent:function(r,q){var p=window;if(p.removeEventListener){p.removeEventListener(r,q,false)}else{if(p.detachEvent){p.detachEvent("on"+r,q)}}},concatFn:function(q,p){return function(){q();if(typeof p=="function"){p()}}},loadPrvtHndlrs:[],loadPblcHndlrs:[],unloadHndlrs:[],onUnload:function(){var p=j.win;if(p.unload){return}p.unload=true;p.removeEvent("load",p.onLoad);p.removeEvent("unload",p.onUnload);j.ev.callArray(p.unloadHndlrs)},count:0,countMax:1,intervalLength:10,onLoad:function(){var p=j.win;if(p.loaded||p.unload||p.cancel){return}if(p.count<p.countMax&&p.loadPrvtHndlrs.length){j.ev.setTimeout(p.onLoad,p.intervalLength)}else{p.loaded=true;j.ev.callArray(p.loadPrvtHndlrs);j.ev.callArray(p.loadPblcHndlrs);}p.count++}},Plugins:{}};j.init.library();var i={setPluginStatus:function(q,p,s){var r=this;r.version=p?j.formatNum(p,3):null;r.installed=r.version?1:(s?(s>0?0.7:-0.1):(q?0:-1));r.getVersionDone=r.installed==0.7||r.installed==-0.1||r.nav.done===0?0:1;j.codebase.emptyGarbage();},getVersion:function(s,t){var u=this,p=null,r=0,q;t=j.browser.isIE?0:t;if((!r||j.dbug)&&u.nav.query(t).installed){r=1}if((!p||j.dbug)&&u.nav.query(t).version){p=u.nav.version}q=!p?u.codebase.isMin(s):0;if(q){u.setPluginStatus(0,0,q);return}if(!p||j.dbug){q=u.codebase.search();if(q){r=1;p=q}}if((!r||j.dbug)&&u.axo.query().installed){r=1}if((!p||j.dbug)&&u.axo.query().version){p=u.axo.version}u.setPluginStatus(r,p)},nav:{done:null,installed:0,version:null,result:[0,0],mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime","application/x-rtsp","application/x-sdp","application/sdp","audio/vnd.qcelp","video/sd-video","audio/mpeg","video/mp4","video/3gpp2","application/x-mpeg","audio/x-m4b","audio/x-aac","video/flc"],find:"QuickTime.*Plug-?in",find2:"QuickTime.*Plug-?in",find3filename:"QuickTime|QT",avoid:"Totem|VLC|RealPlayer|Helix|MPlayer|Windows\\s*Media\\s*Player",plugins:"QuickTime Plug-in",detect:function(s){var t=this,r,q,p={installed:0,version:null,plugin:null};r=j.pd.findNavPlugin({find:t.find,find2:s?0:t.find2,avoid:s?0:t.avoid,mimes:t.mimeType,plugins:t.plugins});if(r){p.plugin=r;p.installed=1;q=new RegExp(t.find,"i");if(r.name&&q.test(r.name+"")){p.version=j.getNum(r.name+"")}}return p},query:function(r){var q=this,t,s;r=r?1:0;if(q.done===null){if(j.hasMimeType(q.mimeType)){s=q.detect(1);if(s.installed){t=q.detect(0);q.result=[t,t.installed?t:s]}var x=q.result[0],v=q.result[1],w=new RegExp(q.avoid,"i"),u=new RegExp(q.find3filename,"i"),p;x=x?x.plugin:0;v=v?v.plugin:0;if(!x&&v&&v.name&&(!v.description||(/^[\s]*$/).test(v.description+""))&&!w.test(v.name+"")){p=(v.filename||"")+"";if((/^.*[\\\/]([^\\\/]*)$/).test(p)){p=RegExp.$1;}if(p&&u.test(p)&&!w.test(p)){q.result[0]=q.result[1]}}}q.done=q.result[0]===q.result[1]?1:0;}if(q.result[r]){q.installed=q.result[r].installed;q.version=q.result[r].version}return q}},codebase:{classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",isMin:function(r){var s=this,q,p=0;s.$$=i;if(j.isStrNum(r)){q=r.split(j.splitNumRegx);if(q.length>3&&parseInt(q[3],10)>0){q[3]="9999"}r=q.join(",");p=j.codebase.isMin(s,r)}return p},search:function(){this.$$=i;return j.codebase.search(this)},DIGITMAX:[[12,11,11],[7,60],[7,11,11],0,[7,11,11]],DIGITMIN:[5,0,0,0],Upper:["999","7,60","7,50","7,6","7,5"],Lower:["7,60","7,50","7,6","7,5","0"],convert:[1,function(r,q){return q?[r[0],r[1]+r[2],r[3],"0"]:[r[0],r[1].charAt(0),r[1].charAt(1),r[2]]},1,0,1]},axo:{hasRun:0,installed:0,version:null,progID:["QuickTimeCheckObject.QuickTimeCheck","QuickTimeCheckObject.QuickTimeCheck.1"],progID0:"QuickTime.QuickTime",query:function(){var r=this,t,p,q,s=r.hasRun||!j.browser.ActiveXEnabled;r.hasRun=1;if(s){return r}for(p=0;p<r.progID.length;p++){t=j.getAXO(r.progID[p]);if(t){r.installed=1;q=j.pd.getPROP(t,"QuickTimeVersion");if(q&&q.toString){q=q.toString(16);r.version=parseInt(q.charAt(0)||"0",16)+"."+parseInt(q.charAt(1)||"0",16)+"."+parseInt(q.charAt(2)||"0",16);if(!j.dbug){break}}}}return r}}};j.addPlugin("quicktime",i);})();