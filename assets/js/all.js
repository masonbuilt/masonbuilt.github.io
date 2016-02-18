!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.gumshoe=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";var e,n,o,r,i,s,a={},l="querySelector"in document&&"addEventListener"in t&&"classList"in document.createElement("_"),c=[],u={selector:"[data-gumshoe] a",selectorHeader:"[data-gumshoe-header]",offset:0,activeClass:"active",callback:function(){}},f=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else for(var r=0,i=t.length;i>r;r++)e.call(n,t[r],r,t)},h=function(){var t={},e=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e&&"[object Object]"===Object.prototype.toString.call(n[o])?t[o]=h(!0,t[o],n[o]):t[o]=n[o])};o>n;n++){var i=arguments[n];r(i)}return t},d=function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},p=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},g=function(t){var n=0;if(t.offsetParent)do n+=t.offsetTop,t=t.offsetParent;while(t);return n=n-i-e.offset,n>=0?n:0},y=function(){c.sort(function(t,e){return t.distance>e.distance?-1:t.distance<e.distance?1:0})};a.setDistances=function(){o=p(),i=r?d(r)+g(r):0,f(c,function(t){t.distance=g(t.target)}),y()};var m=function(){var t=document.querySelectorAll(e.selector);f(t,function(t){t.hash&&c.push({nav:t,target:document.querySelector(t.hash),parent:"li"===t.parentNode.tagName.toLowerCase()?t.parentNode:null,distance:0})})},w=function(t){s&&(s.nav.classList.remove(e.activeClass),s.parent&&s.parent.classList.remove(e.activeClass)),t.nav.classList.add(e.activeClass),t.parent&&t.parent.classList.add(e.activeClass),e.callback(t),s={nav:t.nav,parent:t.parent}};a.getCurrentNav=function(){var e=t.pageYOffset;if(t.innerHeight+e>=o)return w(c[0]);for(var n=0,r=c.length;r>n;n++){var i=c[n];if(i.distance<e)return w(i)}};var v=function(){f(c,function(t){t.nav.classList.contains(e.activeClass)&&(s={nav:t.nav,parent:t.parent})})};a.destroy=function(){e&&(t.removeEventListener("resize",b,!1),t.removeEventListener("scroll",b,!1),c=[],e=null,n=null,o=null,r=null,i=null,s=null)};var b=function(t){n||(n=setTimeout(function(){n=null,"scroll"===t.type&&a.getCurrentNav(),"resize"===t.type&&(a.setDistances(),a.getCurrentNav())},66))};return a.init=function(n){l&&(a.destroy(),e=h(u,n||{}),r=document.querySelector(e.selectorHeader),m(),0!==c.length&&(v(),a.setDistances(),a.getCurrentNav(),t.addEventListener("resize",b,!1),t.addEventListener("scroll",b,!1)))},a}),function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in n)e.push(n[o]);for(var r=0,i=e.length;i>r;r++)e[r][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=r.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,o={},r=window.Waypoint,i=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,r.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||r.isTouch)&&(e.didScroll=!0,r.requestAnimationFrame(t))})},e.prototype.handleResize=function(){r.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var o=e[n],r=o.newScroll>o.oldScroll,i=r?o.forward:o.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s],l=o.oldScroll<a.triggerPoint,c=o.newScroll>=a.triggerPoint,u=l&&c,f=!l&&!c;(u||f)&&(a.queueTrigger(i),t[a.group.id]=a.group)}}for(var h in t)t[h].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?r.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?r.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var o=0,r=t.length;r>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var i in t){var s=t[i];for(var a in this.waypoints[i]){var l,c,u,f,h,d=this.waypoints[i][a],p=d.options.offset,g=d.triggerPoint,y=0,m=null==g;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof p?p=p.apply(d):"string"==typeof p&&(p=parseFloat(p),d.options.offset.indexOf("%")>-1&&(p=Math.ceil(s.contextDimension*p/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-p,c=g<s.oldScroll,u=d.triggerPoint>=s.oldScroll,f=c&&u,h=!c&&!u,!m&&f?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!m&&h?(d.queueTrigger(s.forward),o[d.group.id]=d.group):m&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return r.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){i&&i(),e.refreshAll()},r.requestAnimationFrame=function(e){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;n.call(window,e)},r.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},r=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var o=this.triggerQueues[n],r="up"===n||"left"===n;o.sort(r?e:t);for(var i=0,s=o.length;s>i;i+=1){var a=o[i];(a.options.continuous||i===o.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=r.Adapter.inArray(e,this.waypoints),o=n===this.waypoints.length-1;return o?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=r.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=r.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return o[t.axis][t.name]||new n(t)},r.Group=n}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,n=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,n){t.prototype[n]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(n,o){t[o]=e[o]}),n.adapters.push({name:"jquery",Adapter:t}),n.Adapter=t}(),function(){"use strict";function t(t){return function(){var n=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var r=t.extend({},o,{element:this});"string"==typeof r.context&&(r.context=t(this).closest(r.context)[0]),n.push(new e(r))}),n}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}(),function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.smoothScroll=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";var e,n,o,r,i={},s="querySelector"in document&&"addEventListener"in t,a={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},l=function(){var t={},e=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e&&"[object Object]"===Object.prototype.toString.call(n[o])?t[o]=l(!0,t[o],n[o]):t[o]=n[o])};o>n;n++){var i=arguments[n];r(i)}return t},c=function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},u=function(t,e){var n,o,r=e.charAt(0),i="classList"in document.documentElement;for("["===r&&(e=e.substr(1,e.length-2),n=e.split("="),n.length>1&&(o=!0,n[1]=n[1].replace(/"/g,"").replace(/'/g,"")));t&&t!==document;t=t.parentNode){if("."===r)if(i){if(t.classList.contains(e.substr(1)))return t}else if(new RegExp("(^|\\s)"+e.substr(1)+"(\\s|$)").test(t.className))return t;if("#"===r&&t.id===e.substr(1))return t;if("["===r&&t.hasAttribute(n[0])){if(!o)return t;if(t.getAttribute(n[0])===n[1])return t}if(t.tagName.toLowerCase()===e)return t}return null};i.escapeCharacters=function(t){"#"===t.charAt(0)&&(t=t.substr(1));for(var e,n=String(t),o=n.length,r=-1,i="",s=n.charCodeAt(0);++r<o;){if(e=n.charCodeAt(r),0===e)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");i+=e>=1&&31>=e||127==e||0===r&&e>=48&&57>=e||1===r&&e>=48&&57>=e&&45===s?"\\"+e.toString(16)+" ":e>=128||45===e||95===e||e>=48&&57>=e||e>=65&&90>=e||e>=97&&122>=e?n.charAt(r):"\\"+n.charAt(r)}return"#"+i};var f=function(t,e){var n;return"easeInQuad"===t&&(n=e*e),"easeOutQuad"===t&&(n=e*(2-e)),"easeInOutQuad"===t&&(n=.5>e?2*e*e:-1+(4-2*e)*e),"easeInCubic"===t&&(n=e*e*e),"easeOutCubic"===t&&(n=--e*e*e+1),"easeInOutCubic"===t&&(n=.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1),"easeInQuart"===t&&(n=e*e*e*e),"easeOutQuart"===t&&(n=1- --e*e*e*e),"easeInOutQuart"===t&&(n=.5>e?8*e*e*e*e:1-8*--e*e*e*e),"easeInQuint"===t&&(n=e*e*e*e*e),"easeOutQuint"===t&&(n=1+--e*e*e*e*e),"easeInOutQuint"===t&&(n=.5>e?16*e*e*e*e*e:1+16*--e*e*e*e*e),n||e},h=function(t,e,n){var o=0;if(t.offsetParent)do o+=t.offsetTop,t=t.offsetParent;while(t);return o=o-e-n,o>=0?o:0},d=function(){return Math.max(t.document.body.scrollHeight,t.document.documentElement.scrollHeight,t.document.body.offsetHeight,t.document.documentElement.offsetHeight,t.document.body.clientHeight,t.document.documentElement.clientHeight)},p=function(t){return t&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(t):{}},g=function(e,n){t.history.pushState&&(n||"true"===n)&&"file:"!==t.location.protocol&&t.history.pushState(null,null,[t.location.protocol,"//",t.location.host,t.location.pathname,t.location.search,e].join(""))},y=function(t){return null===t?0:c(t)+t.offsetTop};i.animateScroll=function(e,n,i){var s=p(n?n.getAttribute("data-options"):null),c=l(c||a,i||{},s),u="[object Number]"===Object.prototype.toString.call(e)?!0:!1,m=u?null:"#"===e?t.document.documentElement:t.document.querySelector(e);if(u||m){var w=t.pageYOffset;o||(o=t.document.querySelector(c.selectorHeader)),r||(r=y(o));var v,b,x,S=u?e:h(m,r,parseInt(c.offset,10)),A=S-w,O=d(),H=0;u||g(e,c.updateURL);var E=function(o,r,i){var s=t.pageYOffset;(o==r||s==r||t.innerHeight+s>=O)&&(clearInterval(i),u||m.focus(),c.callback(e,n))},C=function(){H+=16,b=H/parseInt(c.speed,10),b=b>1?1:b,x=w+A*f(c.easing,b),t.scrollTo(0,Math.floor(x)),E(x,S,v)},j=function(){v=setInterval(C,16)};0===t.pageYOffset&&t.scrollTo(0,0),j()}};var m=function(t){var n=u(t.target,e.selector);if(n&&"a"===n.tagName.toLowerCase()){t.preventDefault();var o=i.escapeCharacters(n.hash);i.animateScroll(o,n,e)}},w=function(t){n||(n=setTimeout(function(){n=null,r=y(o)},66))};return i.destroy=function(){e&&(t.document.removeEventListener("click",m,!1),t.removeEventListener("resize",w,!1),e=null,n=null,o=null,r=null)},i.init=function(n){s&&(i.destroy(),e=l(a,n||{}),o=t.document.querySelector(e.selectorHeader),r=y(o),t.document.addEventListener("click",m,!1),o&&t.addEventListener("resize",w,!1))},i});