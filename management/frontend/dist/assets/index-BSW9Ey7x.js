const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DevicesView-sphuEVzk.js","assets/DevicesView-DubcK2bh.css","assets/MirroringView-BD6p05u8.js","assets/MirroringView-BQIP4Fry.css","assets/LoginView-oDd7d7oU.js","assets/LoginView-D3ACE_aq.css","assets/FilesView-Qj_kviei.js","assets/FilesView-B4wLOQZn.css","assets/OperationView-DWXPXFzS.js","assets/roomStore-DP39p3Y2.js","assets/OperationView-CNz3ssp0.css","assets/FilePlayerView-D_DYlIF4.js","assets/fileStore-CIKe8y3M.js","assets/FilePlayerView-B_98vZOF.css","assets/MoviePlayerView-r2ynZQvJ.js","assets/MoviePlayerView-B2wSgHRD.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ti(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const he={},yn=[],ut=()=>{},Ha=()=>!1,or=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Ci=e=>e.startsWith("onUpdate:"),Te=Object.assign,Ai=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},du=Object.prototype.hasOwnProperty,ae=(e,t)=>du.call(e,t),j=Array.isArray,vn=e=>vs(e)==="[object Map]",xn=e=>vs(e)==="[object Set]",oo=e=>vs(e)==="[object Date]",Y=e=>typeof e=="function",we=e=>typeof e=="string",pt=e=>typeof e=="symbol",ce=e=>e!==null&&typeof e=="object",ja=e=>(ce(e)||Y(e))&&Y(e.then)&&Y(e.catch),Wa=Object.prototype.toString,vs=e=>Wa.call(e),hu=e=>vs(e).slice(8,-1),Ga=e=>vs(e)==="[object Object]",ar=e=>we(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Jn=Ti(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),cr=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},pu=/-\w/g,Je=cr(e=>e.replace(pu,t=>t.slice(1).toUpperCase())),gu=/\B([A-Z])/g,ln=cr(e=>e.replace(gu,"-$1").toLowerCase()),lr=cr(e=>e.charAt(0).toUpperCase()+e.slice(1)),Or=cr(e=>e?`on${lr(e)}`:""),Wt=(e,t)=>!Object.is(e,t),xs=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ka=(e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})},ur=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ao;const fr=()=>ao||(ao=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ye(e){if(j(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=we(s)?vu(s):Ye(s);if(r)for(const i in r)t[i]=r[i]}return t}else if(we(e)||ce(e))return e}const mu=/;(?![^(]*\))/g,_u=/:([^]+)/,yu=/\/\*[^]*?\*\//g;function vu(e){const t={};return e.replace(yu,"").split(mu).forEach(n=>{if(n){const s=n.split(_u);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function ze(e){let t="";if(we(e))t=e;else if(j(e))for(let n=0;n<e.length;n++){const s=ze(e[n]);s&&(t+=s+" ")}else if(ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const bu="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",wu=Ti(bu);function za(e){return!!e||e===""}function Eu(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=Ln(e[s],t[s]);return n}function Ln(e,t){if(e===t)return!0;let n=oo(e),s=oo(t);if(n||s)return n&&s?e.getTime()===t.getTime():!1;if(n=pt(e),s=pt(t),n||s)return e===t;if(n=j(e),s=j(t),n||s)return n&&s?Eu(e,t):!1;if(n=ce(e),s=ce(t),n||s){if(!n||!s)return!1;const r=Object.keys(e).length,i=Object.keys(t).length;if(r!==i)return!1;for(const o in e){const a=e.hasOwnProperty(o),c=t.hasOwnProperty(o);if(a&&!c||!a&&c||!Ln(e[o],t[o]))return!1}}return String(e)===String(t)}function Ri(e,t){return e.findIndex(n=>Ln(n,t))}const qa=e=>!!(e&&e.__v_isRef===!0),ue=e=>we(e)?e:e==null?"":j(e)||ce(e)&&(e.toString===Wa||!Y(e.toString))?qa(e)?ue(e.value):JSON.stringify(e,Ja,2):String(e),Ja=(e,t)=>qa(t)?Ja(e,t.value):vn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[s,r],i)=>(n[kr(s,i)+" =>"]=r,n),{})}:xn(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>kr(n))}:pt(t)?kr(t):ce(t)&&!j(t)&&!Ga(t)?String(t):t,kr=(e,t="")=>{var n;return pt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ae;class Ya{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Ae,!t&&Ae&&(this.index=(Ae.scopes||(Ae.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Ae;try{return Ae=this,t()}finally{Ae=n}}}on(){++this._on===1&&(this.prevScope=Ae,Ae=this)}off(){this._on>0&&--this._on===0&&(Ae=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Xa(e){return new Ya(e)}function Qa(){return Ae}function Iu(e,t=!1){Ae&&Ae.cleanups.push(e)}let ge;const Nr=new WeakSet;class Za{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ae&&Ae.active&&Ae.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Nr.has(this)&&(Nr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||tc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,co(this),nc(this);const t=ge,n=Qe;ge=this,Qe=!0;try{return this.fn()}finally{sc(this),ge=t,Qe=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ki(t);this.deps=this.depsTail=void 0,co(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Nr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Qr(this)&&this.run()}get dirty(){return Qr(this)}}let ec=0,Yn,Xn;function tc(e,t=!1){if(e.flags|=8,t){e.next=Xn,Xn=e;return}e.next=Yn,Yn=e}function Pi(){ec++}function Oi(){if(--ec>0)return;if(Xn){let t=Xn;for(Xn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Yn;){let t=Yn;for(Yn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function nc(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function sc(e){let t,n=e.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),ki(s),Su(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}e.deps=t,e.depsTail=n}function Qr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(rc(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function rc(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===as)||(e.globalVersion=as,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Qr(e))))return;e.flags|=2;const t=e.dep,n=ge,s=Qe;ge=e,Qe=!0;try{nc(e);const r=e.fn(e._value);(t.version===0||Wt(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{ge=n,Qe=s,sc(e),e.flags&=-3}}function ki(e,t=!1){const{dep:n,prevSub:s,nextSub:r}=e;if(s&&(s.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)ki(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Su(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Qe=!0;const ic=[];function Tt(){ic.push(Qe),Qe=!1}function Ct(){const e=ic.pop();Qe=e===void 0?!0:e}function co(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=ge;ge=void 0;try{t()}finally{ge=n}}}let as=0;class Tu{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ni{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ge||!Qe||ge===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ge)n=this.activeLink=new Tu(ge,this),ge.deps?(n.prevDep=ge.depsTail,ge.depsTail.nextDep=n,ge.depsTail=n):ge.deps=ge.depsTail=n,oc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=ge.depsTail,n.nextDep=void 0,ge.depsTail.nextDep=n,ge.depsTail=n,ge.deps===n&&(ge.deps=s)}return n}trigger(t){this.version++,as++,this.notify(t)}notify(t){Pi();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Oi()}}}function oc(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)oc(s)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const js=new WeakMap,rn=Symbol(""),Zr=Symbol(""),cs=Symbol("");function Re(e,t,n){if(Qe&&ge){let s=js.get(e);s||js.set(e,s=new Map);let r=s.get(n);r||(s.set(n,r=new Ni),r.map=s,r.key=n),r.track()}}function bt(e,t,n,s,r,i){const o=js.get(e);if(!o){as++;return}const a=c=>{c&&c.trigger()};if(Pi(),t==="clear")o.forEach(a);else{const c=j(e),l=c&&ar(n);if(c&&n==="length"){const u=Number(s);o.forEach((f,d)=>{(d==="length"||d===cs||!pt(d)&&d>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),l&&a(o.get(cs)),t){case"add":c?l&&a(o.get("length")):(a(o.get(rn)),vn(e)&&a(o.get(Zr)));break;case"delete":c||(a(o.get(rn)),vn(e)&&a(o.get(Zr)));break;case"set":vn(e)&&a(o.get(rn));break}}Oi()}function Cu(e,t){const n=js.get(e);return n&&n.get(t)}function hn(e){const t=se(e);return t===e?t:(Re(t,"iterate",cs),je(e)?t:t.map(Ze))}function dr(e){return Re(e=se(e),"iterate",cs),e}function Mt(e,t){return At(e)?Cn(ft(e)?Ze(t):t):Ze(t)}const Au={__proto__:null,[Symbol.iterator](){return Dr(this,Symbol.iterator,e=>Mt(this,e))},concat(...e){return hn(this).concat(...e.map(t=>j(t)?hn(t):t))},entries(){return Dr(this,"entries",e=>(e[1]=Mt(this,e[1]),e))},every(e,t){return mt(this,"every",e,t,void 0,arguments)},filter(e,t){return mt(this,"filter",e,t,n=>n.map(s=>Mt(this,s)),arguments)},find(e,t){return mt(this,"find",e,t,n=>Mt(this,n),arguments)},findIndex(e,t){return mt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return mt(this,"findLast",e,t,n=>Mt(this,n),arguments)},findLastIndex(e,t){return mt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return mt(this,"forEach",e,t,void 0,arguments)},includes(...e){return xr(this,"includes",e)},indexOf(...e){return xr(this,"indexOf",e)},join(e){return hn(this).join(e)},lastIndexOf(...e){return xr(this,"lastIndexOf",e)},map(e,t){return mt(this,"map",e,t,void 0,arguments)},pop(){return Vn(this,"pop")},push(...e){return Vn(this,"push",e)},reduce(e,...t){return lo(this,"reduce",e,t)},reduceRight(e,...t){return lo(this,"reduceRight",e,t)},shift(){return Vn(this,"shift")},some(e,t){return mt(this,"some",e,t,void 0,arguments)},splice(...e){return Vn(this,"splice",e)},toReversed(){return hn(this).toReversed()},toSorted(e){return hn(this).toSorted(e)},toSpliced(...e){return hn(this).toSpliced(...e)},unshift(...e){return Vn(this,"unshift",e)},values(){return Dr(this,"values",e=>Mt(this,e))}};function Dr(e,t,n){const s=dr(e),r=s[t]();return s!==e&&!je(e)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const Ru=Array.prototype;function mt(e,t,n,s,r,i){const o=dr(e),a=o!==e&&!je(e),c=o[t];if(c!==Ru[t]){const f=c.apply(e,i);return a?Ze(f):f}let l=n;o!==e&&(a?l=function(f,d){return n.call(this,Mt(e,f),d,e)}:n.length>2&&(l=function(f,d){return n.call(this,f,d,e)}));const u=c.call(o,l,s);return a&&r?r(u):u}function lo(e,t,n,s){const r=dr(e);let i=n;return r!==e&&(je(e)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,e)}):i=function(o,a,c){return n.call(this,o,Mt(e,a),c,e)}),r[t](i,...s)}function xr(e,t,n){const s=se(e);Re(s,"iterate",cs);const r=s[t](...n);return(r===-1||r===!1)&&hr(n[0])?(n[0]=se(n[0]),s[t](...n)):r}function Vn(e,t,n=[]){Tt(),Pi();const s=se(e)[t].apply(e,n);return Oi(),Ct(),s}const Pu=Ti("__proto__,__v_isRef,__isVue"),ac=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(pt));function Ou(e){pt(e)||(e=String(e));const t=se(this);return Re(t,"has",e),t.hasOwnProperty(e)}class cc{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?Bu:dc:i?fc:uc).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=j(t);if(!r){let c;if(o&&(c=Au[n]))return c;if(n==="hasOwnProperty")return Ou}const a=Reflect.get(t,n,_e(t)?t:s);if((pt(n)?ac.has(n):Pu(n))||(r||Re(t,"get",n),i))return a;if(_e(a)){const c=o&&ar(n)?a:a.value;return r&&ce(c)?ti(c):c}return ce(a)?r?ti(a):bs(a):a}}class lc extends cc{constructor(t=!1){super(!1,t)}set(t,n,s,r){let i=t[n];const o=j(t)&&ar(n);if(!this._isShallow){const l=At(i);if(!je(s)&&!At(s)&&(i=se(i),s=se(s)),!o&&_e(i)&&!_e(s))return l||(i.value=s),!0}const a=o?Number(n)<t.length:ae(t,n),c=Reflect.set(t,n,s,_e(t)?t:r);return t===se(r)&&(a?Wt(s,i)&&bt(t,"set",n,s):bt(t,"add",n,s)),c}deleteProperty(t,n){const s=ae(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&s&&bt(t,"delete",n,void 0),r}has(t,n){const s=Reflect.has(t,n);return(!pt(n)||!ac.has(n))&&Re(t,"has",n),s}ownKeys(t){return Re(t,"iterate",j(t)?"length":rn),Reflect.ownKeys(t)}}class ku extends cc{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Nu=new lc,Du=new ku,xu=new lc(!0);const ei=e=>e,Ps=e=>Reflect.getPrototypeOf(e);function Lu(e,t,n){return function(...s){const r=this.__v_raw,i=se(r),o=vn(i),a=e==="entries"||e===Symbol.iterator&&o,c=e==="keys"&&o,l=r[e](...s),u=n?ei:t?Cn:Ze;return!t&&Re(i,"iterate",c?Zr:rn),Te(Object.create(l),{next(){const{value:f,done:d}=l.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}}})}}function Os(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Mu(e,t){const n={get(r){const i=this.__v_raw,o=se(i),a=se(r);e||(Wt(r,a)&&Re(o,"get",r),Re(o,"get",a));const{has:c}=Ps(o),l=t?ei:e?Cn:Ze;if(c.call(o,r))return l(i.get(r));if(c.call(o,a))return l(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!e&&Re(se(r),"iterate",rn),r.size},has(r){const i=this.__v_raw,o=se(i),a=se(r);return e||(Wt(r,a)&&Re(o,"has",r),Re(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,c=se(a),l=t?ei:e?Cn:Ze;return!e&&Re(c,"iterate",rn),a.forEach((u,f)=>r.call(i,l(u),l(f),o))}};return Te(n,e?{add:Os("add"),set:Os("set"),delete:Os("delete"),clear:Os("clear")}:{add(r){!t&&!je(r)&&!At(r)&&(r=se(r));const i=se(this);return Ps(i).has.call(i,r)||(i.add(r),bt(i,"add",r,r)),this},set(r,i){!t&&!je(i)&&!At(i)&&(i=se(i));const o=se(this),{has:a,get:c}=Ps(o);let l=a.call(o,r);l||(r=se(r),l=a.call(o,r));const u=c.call(o,r);return o.set(r,i),l?Wt(i,u)&&bt(o,"set",r,i):bt(o,"add",r,i),this},delete(r){const i=se(this),{has:o,get:a}=Ps(i);let c=o.call(i,r);c||(r=se(r),c=o.call(i,r)),a&&a.call(i,r);const l=i.delete(r);return c&&bt(i,"delete",r,void 0),l},clear(){const r=se(this),i=r.size!==0,o=r.clear();return i&&bt(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Lu(r,e,t)}),n}function Di(e,t){const n=Mu(e,t);return(s,r,i)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(ae(n,r)&&r in s?n:s,r,i)}const Uu={get:Di(!1,!1)},Fu={get:Di(!1,!0)},$u={get:Di(!0,!1)};const uc=new WeakMap,fc=new WeakMap,dc=new WeakMap,Bu=new WeakMap;function Vu(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Hu(e){return e.__v_skip||!Object.isExtensible(e)?0:Vu(hu(e))}function bs(e){return At(e)?e:xi(e,!1,Nu,Uu,uc)}function hc(e){return xi(e,!1,xu,Fu,fc)}function ti(e){return xi(e,!0,Du,$u,dc)}function xi(e,t,n,s,r){if(!ce(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=Hu(e);if(i===0)return e;const o=r.get(e);if(o)return o;const a=new Proxy(e,i===2?s:n);return r.set(e,a),a}function ft(e){return At(e)?ft(e.__v_raw):!!(e&&e.__v_isReactive)}function At(e){return!!(e&&e.__v_isReadonly)}function je(e){return!!(e&&e.__v_isShallow)}function hr(e){return e?!!e.__v_raw:!1}function se(e){const t=e&&e.__v_raw;return t?se(t):e}function Li(e){return!ae(e,"__v_skip")&&Object.isExtensible(e)&&Ka(e,"__v_skip",!0),e}const Ze=e=>ce(e)?bs(e):e,Cn=e=>ce(e)?ti(e):e;function _e(e){return e?e.__v_isRef===!0:!1}function fe(e){return pc(e,!1)}function ju(e){return pc(e,!0)}function pc(e,t){return _e(e)?e:new Wu(e,t)}class Wu{constructor(t,n){this.dep=new Ni,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:se(t),this._value=n?t:Ze(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,s=this.__v_isShallow||je(t)||At(t);t=s?t:se(t),Wt(t,n)&&(this._rawValue=t,this._value=s?t:Ze(t),this.dep.trigger())}}function Pe(e){return _e(e)?e.value:e}const Gu={get:(e,t,n)=>t==="__v_raw"?e:Pe(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return _e(r)&&!_e(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function gc(e){return ft(e)?e:new Proxy(e,Gu)}function Ku(e){const t=j(e)?new Array(e.length):{};for(const n in e)t[n]=mc(e,n);return t}class zu{constructor(t,n,s){this._object=t,this._key=n,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._raw=se(t);let r=!0,i=t;if(!j(t)||!ar(String(n)))do r=!hr(i)||je(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Pe(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&_e(this._raw[this._key])){const n=this._object[this._key];if(_e(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Cu(this._raw,this._key)}}class qu{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Ju(e,t,n){return _e(e)?e:Y(e)?new qu(e):ce(e)&&arguments.length>1?mc(e,t,n):fe(e)}function mc(e,t,n){return new zu(e,t,n)}class Yu{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ni(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=as-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ge!==this)return tc(this,!0),!0}get value(){const t=this.dep.track();return rc(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Xu(e,t,n=!1){let s,r;return Y(e)?s=e:(s=e.get,r=e.set),new Yu(s,r,n)}const ks={},Ws=new WeakMap;let en;function Qu(e,t=!1,n=en){if(n){let s=Ws.get(n);s||Ws.set(n,s=[]),s.push(e)}}function Zu(e,t,n=he){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:c}=n,l=k=>r?k:je(k)||r===!1||r===0?wt(k,1):wt(k);let u,f,d,g,_=!1,w=!1;if(_e(e)?(f=()=>e.value,_=je(e)):ft(e)?(f=()=>l(e),_=!0):j(e)?(w=!0,_=e.some(k=>ft(k)||je(k)),f=()=>e.map(k=>{if(_e(k))return k.value;if(ft(k))return l(k);if(Y(k))return c?c(k,2):k()})):Y(e)?t?f=c?()=>c(e,2):e:f=()=>{if(d){Tt();try{d()}finally{Ct()}}const k=en;en=u;try{return c?c(e,3,[g]):e(g)}finally{en=k}}:f=ut,t&&r){const k=f,V=r===!0?1/0:r;f=()=>wt(k(),V)}const R=Qa(),P=()=>{u.stop(),R&&R.active&&Ai(R.effects,u)};if(i&&t){const k=t;t=(...V)=>{k(...V),P()}}let I=w?new Array(e.length).fill(ks):ks;const S=k=>{if(!(!(u.flags&1)||!u.dirty&&!k))if(t){const V=u.run();if(r||_||(w?V.some((q,G)=>Wt(q,I[G])):Wt(V,I))){d&&d();const q=en;en=u;try{const G=[V,I===ks?void 0:w&&I[0]===ks?[]:I,g];I=V,c?c(t,3,G):t(...G)}finally{en=q}}}else u.run()};return a&&a(S),u=new Za(f),u.scheduler=o?()=>o(S,!1):S,g=k=>Qu(k,!1,u),d=u.onStop=()=>{const k=Ws.get(u);if(k){if(c)c(k,4);else for(const V of k)V();Ws.delete(u)}},t?s?S(!0):I=u.run():o?o(S.bind(null,!0),!0):u.run(),P.pause=u.pause.bind(u),P.resume=u.resume.bind(u),P.stop=P,P}function wt(e,t=1/0,n){if(t<=0||!ce(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,_e(e))wt(e.value,t,n);else if(j(e))for(let s=0;s<e.length;s++)wt(e[s],t,n);else if(xn(e)||vn(e))e.forEach(s=>{wt(s,t,n)});else if(Ga(e)){for(const s in e)wt(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&wt(e[s],t,n)}return e}/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ws(e,t,n,s){try{return s?e(...s):e()}catch(r){pr(r,t,n)}}function gt(e,t,n,s){if(Y(e)){const r=ws(e,t,n,s);return r&&ja(r)&&r.catch(i=>{pr(i,t,n)}),r}if(j(e)){const r=[];for(let i=0;i<e.length;i++)r.push(gt(e[i],t,n,s));return r}}function pr(e,t,n,s=!0){const r=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||he;if(t){let a=t.parent;const c=t.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,c,l)===!1)return}a=a.parent}if(i){Tt(),ws(i,null,10,[e,c,l]),Ct();return}}ef(e,n,r,s,o)}function ef(e,t,n,s=!0,r=!1){if(r)throw e;console.error(e)}const xe=[];let ot=-1;const bn=[];let Ut=null,gn=0;const _c=Promise.resolve();let Gs=null;function gr(e){const t=Gs||_c;return e?t.then(this?e.bind(this):e):t}function tf(e){let t=ot+1,n=xe.length;for(;t<n;){const s=t+n>>>1,r=xe[s],i=ls(r);i<e||i===e&&r.flags&2?t=s+1:n=s}return t}function Mi(e){if(!(e.flags&1)){const t=ls(e),n=xe[xe.length-1];!n||!(e.flags&2)&&t>=ls(n)?xe.push(e):xe.splice(tf(t),0,e),e.flags|=1,yc()}}function yc(){Gs||(Gs=_c.then(bc))}function nf(e){j(e)?bn.push(...e):Ut&&e.id===-1?Ut.splice(gn+1,0,e):e.flags&1||(bn.push(e),e.flags|=1),yc()}function uo(e,t,n=ot+1){for(;n<xe.length;n++){const s=xe[n];if(s&&s.flags&2){if(e&&s.id!==e.uid)continue;xe.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function vc(e){if(bn.length){const t=[...new Set(bn)].sort((n,s)=>ls(n)-ls(s));if(bn.length=0,Ut){Ut.push(...t);return}for(Ut=t,gn=0;gn<Ut.length;gn++){const n=Ut[gn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Ut=null,gn=0}}const ls=e=>e.id==null?e.flags&2?-1:1/0:e.id;function bc(e){try{for(ot=0;ot<xe.length;ot++){const t=xe[ot];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),ws(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;ot<xe.length;ot++){const t=xe[ot];t&&(t.flags&=-2)}ot=-1,xe.length=0,vc(),Gs=null,(xe.length||bn.length)&&bc()}}let Ve=null,wc=null;function Ks(e){const t=Ve;return Ve=e,wc=e&&e.type.__scopeId||null,t}function tn(e,t=Ve,n){if(!t||e._n)return e;const s=(...r)=>{s._d&&Js(-1);const i=Ks(t);let o;try{o=e(...r)}finally{Ks(i),s._d&&Js(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function fo(e,t){if(Ve===null)return e;const n=br(Ve),s=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[i,o,a,c=he]=t[r];i&&(Y(i)&&(i={mounted:i,updated:i}),i.deep&&wt(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return e}function Qt(e,t,n,s){const r=e.dirs,i=t&&t.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let c=a.dir[s];c&&(Tt(),gt(c,n,8,[e.el,a,e,t]),Ct())}}function Ls(e,t){if(Oe){let n=Oe.provides;const s=Oe.parent&&Oe.parent.provides;s===n&&(n=Oe.provides=Object.create(s)),n[e]=t}}function We(e,t,n=!1){const s=Jc();if(s||an){let r=an?an._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Y(t)?t.call(s&&s.proxy):t}}function sf(){return!!(Jc()||an)}const rf=Symbol.for("v-scx"),of=()=>We(rf);function on(e,t,n){return Ec(e,t,n)}function Ec(e,t,n=he){const{immediate:s,deep:r,flush:i,once:o}=n,a=Te({},n),c=t&&s||!t&&i!=="post";let l;if(ds){if(i==="sync"){const g=of();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=ut,g.resume=ut,g.pause=ut,g}}const u=Oe;a.call=(g,_,w)=>gt(g,u,_,w);let f=!1;i==="post"?a.scheduler=g=>{Ce(g,u&&u.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(g,_)=>{_?g():Mi(g)}),a.augmentJob=g=>{t&&(g.flags|=4),f&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const d=Zu(e,t,a);return ds&&(l?l.push(d):c&&d()),d}function af(e,t,n){const s=this.proxy,r=we(e)?e.includes(".")?Ic(s,e):()=>s[e]:e.bind(s,s);let i;Y(t)?i=t:(i=t.handler,n=t);const o=Es(this),a=Ec(r,i.bind(s),n);return o(),a}function Ic(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const Sc=Symbol("_vte"),cf=e=>e.__isTeleport,Qn=e=>e&&(e.disabled||e.disabled===""),ho=e=>e&&(e.defer||e.defer===""),po=e=>typeof SVGElement<"u"&&e instanceof SVGElement,go=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,ni=(e,t)=>{const n=e&&e.to;return we(n)?t?t(n):null:n},Tc={name:"Teleport",__isTeleport:!0,process(e,t,n,s,r,i,o,a,c,l){const{mc:u,pc:f,pbc:d,o:{insert:g,querySelector:_,createText:w,createComment:R}}=l,P=Qn(t.props);let{shapeFlag:I,children:S,dynamicChildren:k}=t;if(e==null){const V=t.el=w(""),q=t.anchor=w("");g(V,n,s),g(q,n,s);const G=(M,X)=>{I&16&&u(S,M,X,r,i,o,a,c)},F=()=>{const M=t.target=ni(t.props,_),X=si(M,t,w,g);M&&(o!=="svg"&&po(M)?o="svg":o!=="mathml"&&go(M)&&(o="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(M),P||(G(M,X),Ms(t,!1)))};P&&(G(n,q),Ms(t,!0)),ho(t.props)?(t.el.__isMounted=!1,Ce(()=>{F(),delete t.el.__isMounted},i)):F()}else{if(ho(t.props)&&e.el.__isMounted===!1){Ce(()=>{Tc.process(e,t,n,s,r,i,o,a,c,l)},i);return}t.el=e.el,t.targetStart=e.targetStart;const V=t.anchor=e.anchor,q=t.target=e.target,G=t.targetAnchor=e.targetAnchor,F=Qn(e.props),M=F?n:q,X=F?V:G;if(o==="svg"||po(q)?o="svg":(o==="mathml"||go(q))&&(o="mathml"),k?(d(e.dynamicChildren,k,M,r,i,o,a),Bi(e,t,!0)):c||f(e,t,M,X,r,i,o,a,!1),P)F?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Ns(t,n,V,l,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const H=t.target=ni(t.props,_);H&&Ns(t,H,null,l,0)}else F&&Ns(t,q,G,l,1);Ms(t,P)}},remove(e,t,n,{um:s,o:{remove:r}},i){const{shapeFlag:o,children:a,anchor:c,targetStart:l,targetAnchor:u,target:f,props:d}=e;if(f&&(r(l),r(u)),i&&r(c),o&16){const g=i||!Qn(d);for(let _=0;_<a.length;_++){const w=a[_];s(w,t,n,g,!!w.dynamicChildren)}}},move:Ns,hydrate:lf};function Ns(e,t,n,{o:{insert:s},m:r},i=2){i===0&&s(e.targetAnchor,t,n);const{el:o,anchor:a,shapeFlag:c,children:l,props:u}=e,f=i===2;if(f&&s(o,t,n),(!f||Qn(u))&&c&16)for(let d=0;d<l.length;d++)r(l[d],t,n,2);f&&s(a,t,n)}function lf(e,t,n,s,r,i,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:l,createText:u}},f){function d(R,P){let I=P;for(;I;){if(I&&I.nodeType===8){if(I.data==="teleport start anchor")t.targetStart=I;else if(I.data==="teleport anchor"){t.targetAnchor=I,R._lpa=t.targetAnchor&&o(t.targetAnchor);break}}I=o(I)}}function g(R,P){P.anchor=f(o(R),P,a(R),n,s,r,i)}const _=t.target=ni(t.props,c),w=Qn(t.props);if(_){const R=_._lpa||_.firstChild;t.shapeFlag&16&&(w?(g(e,t),d(_,R),t.targetAnchor||si(_,t,u,l,a(e)===_?e:null)):(t.anchor=o(e),d(_,R),t.targetAnchor||si(_,t,u,l),f(R&&o(R),t,_,n,s,r,i))),Ms(t,w)}else w&&t.shapeFlag&16&&(g(e,t),t.targetStart=e,t.targetAnchor=o(e));return t.anchor&&o(t.anchor)}const uf=Tc;function Ms(e,t){const n=e.ctx;if(n&&n.ut){let s,r;for(t?(s=e.el,r=e.anchor):(s=e.targetStart,r=e.targetAnchor);s&&s!==r;)s.nodeType===1&&s.setAttribute("data-v-owner",n.uid),s=s.nextSibling;n.ut()}}function si(e,t,n,s,r=null){const i=t.targetStart=n(""),o=t.targetAnchor=n("");return i[Sc]=o,e&&(s(i,e,r),s(o,e,r)),o}const ff=Symbol("_leaveCb");function Ui(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Ui(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Mn(e,t){return Y(e)?Te({name:e.name},t,{setup:e}):e}function Cc(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function mo(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const zs=new WeakMap;function Zn(e,t,n,s,r=!1){if(j(e)){e.forEach((w,R)=>Zn(w,t&&(j(t)?t[R]:t),n,s,r));return}if(es(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Zn(e,t,n,s.component.subTree);return}const i=s.shapeFlag&4?br(s.component):s.el,o=r?null:i,{i:a,r:c}=e,l=t&&t.r,u=a.refs===he?a.refs={}:a.refs,f=a.setupState,d=se(f),g=f===he?Ha:w=>mo(u,w)?!1:ae(d,w),_=(w,R)=>!(R&&mo(u,R));if(l!=null&&l!==c){if(_o(t),we(l))u[l]=null,g(l)&&(f[l]=null);else if(_e(l)){const w=t;_(l,w.k)&&(l.value=null),w.k&&(u[w.k]=null)}}if(Y(c))ws(c,a,12,[o,u]);else{const w=we(c),R=_e(c);if(w||R){const P=()=>{if(e.f){const I=w?g(c)?f[c]:u[c]:_()||!e.k?c.value:u[e.k];if(r)j(I)&&Ai(I,i);else if(j(I))I.includes(i)||I.push(i);else if(w)u[c]=[i],g(c)&&(f[c]=u[c]);else{const S=[i];_(c,e.k)&&(c.value=S),e.k&&(u[e.k]=S)}}else w?(u[c]=o,g(c)&&(f[c]=o)):R&&(_(c,e.k)&&(c.value=o),e.k&&(u[e.k]=o))};if(o){const I=()=>{P(),zs.delete(e)};I.id=-1,zs.set(e,I),Ce(I,n)}else _o(e),P()}}}function _o(e){const t=zs.get(e);t&&(t.flags|=8,zs.delete(e))}fr().requestIdleCallback;fr().cancelIdleCallback;const es=e=>!!e.type.__asyncLoader,Ac=e=>e.type.__isKeepAlive;function Rc(e,t){Oc(e,"a",t)}function Pc(e,t){Oc(e,"da",t)}function Oc(e,t,n=Oe){const s=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(mr(t,s,n),n){let r=n.parent;for(;r&&r.parent;)Ac(r.parent.vnode)&&df(s,t,n,r),r=r.parent}}function df(e,t,n,s){const r=mr(t,e,s,!0);Un(()=>{Ai(s[t],r)},n)}function mr(e,t,n=Oe,s=!1){if(n){const r=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{Tt();const a=Es(n),c=gt(t,n,e,o);return a(),Ct(),c});return s?r.unshift(i):r.push(i),i}}const Ot=e=>(t,n=Oe)=>{(!ds||e==="sp")&&mr(e,(...s)=>t(...s),n)},hf=Ot("bm"),_r=Ot("m"),pf=Ot("bu"),gf=Ot("u"),mf=Ot("bum"),Un=Ot("um"),_f=Ot("sp"),yf=Ot("rtg"),vf=Ot("rtc");function bf(e,t=Oe){mr("ec",e,t)}const wf="components";function yo(e,t){return If(wf,e,!0,t)||e}const Ef=Symbol.for("v-ndc");function If(e,t,n=!0,s=!1){const r=Ve||Oe;if(r){const i=r.type;{const a=cd(i,!1);if(a&&(a===t||a===Je(t)||a===lr(Je(t))))return i}const o=vo(r[e]||i[e],t)||vo(r.appContext[e],t);return!o&&s?i:o}}function vo(e,t){return e&&(e[t]||e[Je(t)]||e[lr(Je(t))])}function Sf(e,t,n,s){let r;const i=n,o=j(e);if(o||we(e)){const a=o&&ft(e);let c=!1,l=!1;a&&(c=!je(e),l=At(e),e=dr(e)),r=new Array(e.length);for(let u=0,f=e.length;u<f;u++)r[u]=t(c?l?Cn(Ze(e[u])):Ze(e[u]):e[u],u,void 0,i)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,i)}else if(ce(e))if(e[Symbol.iterator])r=Array.from(e,(a,c)=>t(a,c,void 0,i));else{const a=Object.keys(e);r=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const u=a[c];r[c]=t(e[u],u,c,i)}}else r=[];return r}const ri=e=>e?Yc(e)?br(e):ri(e.parent):null,ts=Te(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ri(e.parent),$root:e=>ri(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Nc(e),$forceUpdate:e=>e.f||(e.f=()=>{Mi(e.update)}),$nextTick:e=>e.n||(e.n=gr.bind(e.proxy)),$watch:e=>af.bind(e)}),Lr=(e,t)=>e!==he&&!e.__isScriptSetup&&ae(e,t),Tf={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:c}=e;if(t[0]!=="$"){const d=o[t];if(d!==void 0)switch(d){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return i[t]}else{if(Lr(s,t))return o[t]=1,s[t];if(r!==he&&ae(r,t))return o[t]=2,r[t];if(ae(i,t))return o[t]=3,i[t];if(n!==he&&ae(n,t))return o[t]=4,n[t];ii&&(o[t]=0)}}const l=ts[t];let u,f;if(l)return t==="$attrs"&&Re(e.attrs,"get",""),l(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==he&&ae(n,t))return o[t]=4,n[t];if(f=c.config.globalProperties,ae(f,t))return f[t]},set({_:e},t,n){const{data:s,setupState:r,ctx:i}=e;return Lr(r,t)?(r[t]=n,!0):s!==he&&ae(s,t)?(s[t]=n,!0):ae(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,props:i,type:o}},a){let c;return!!(n[a]||e!==he&&a[0]!=="$"&&ae(e,a)||Lr(t,a)||ae(i,a)||ae(s,a)||ae(ts,a)||ae(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ae(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function bo(e){return j(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ii=!0;function Cf(e){const t=Nc(e),n=e.proxy,s=e.ctx;ii=!1,t.beforeCreate&&wo(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:f,mounted:d,beforeUpdate:g,updated:_,activated:w,deactivated:R,beforeDestroy:P,beforeUnmount:I,destroyed:S,unmounted:k,render:V,renderTracked:q,renderTriggered:G,errorCaptured:F,serverPrefetch:M,expose:X,inheritAttrs:H,components:O,directives:re,filters:ke}=t;if(l&&Af(l,s,null),o)for(const J in o){const Z=o[J];Y(Z)&&(s[J]=Z.bind(n))}if(r){const J=r.call(n,n);ce(J)&&(e.data=bs(J))}if(ii=!0,i)for(const J in i){const Z=i[J],me=Y(Z)?Z.bind(n,n):Y(Z.get)?Z.get.bind(n,n):ut,$e=!Y(Z)&&Y(Z.set)?Z.set.bind(n):ut,Me=be({get:me,set:$e});Object.defineProperty(s,J,{enumerable:!0,configurable:!0,get:()=>Me.value,set:Se=>Me.value=Se})}if(a)for(const J in a)kc(a[J],s,n,J);if(c){const J=Y(c)?c.call(n):c;Reflect.ownKeys(J).forEach(Z=>{Ls(Z,J[Z])})}u&&wo(u,e,"c");function ie(J,Z){j(Z)?Z.forEach(me=>J(me.bind(n))):Z&&J(Z.bind(n))}if(ie(hf,f),ie(_r,d),ie(pf,g),ie(gf,_),ie(Rc,w),ie(Pc,R),ie(bf,F),ie(vf,q),ie(yf,G),ie(mf,I),ie(Un,k),ie(_f,M),j(X))if(X.length){const J=e.exposed||(e.exposed={});X.forEach(Z=>{Object.defineProperty(J,Z,{get:()=>n[Z],set:me=>n[Z]=me,enumerable:!0})})}else e.exposed||(e.exposed={});V&&e.render===ut&&(e.render=V),H!=null&&(e.inheritAttrs=H),O&&(e.components=O),re&&(e.directives=re),M&&Cc(e)}function Af(e,t,n=ut){j(e)&&(e=oi(e));for(const s in e){const r=e[s];let i;ce(r)?"default"in r?i=We(r.from||s,r.default,!0):i=We(r.from||s):i=We(r),_e(i)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[s]=i}}function wo(e,t,n){gt(j(e)?e.map(s=>s.bind(t.proxy)):e.bind(t.proxy),t,n)}function kc(e,t,n,s){let r=s.includes(".")?Ic(n,s):()=>n[s];if(we(e)){const i=t[e];Y(i)&&on(r,i)}else if(Y(e))on(r,e.bind(n));else if(ce(e))if(j(e))e.forEach(i=>kc(i,t,n,s));else{const i=Y(e.handler)?e.handler.bind(n):t[e.handler];Y(i)&&on(r,i,e)}}function Nc(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let c;return a?c=a:!r.length&&!n&&!s?c=t:(c={},r.length&&r.forEach(l=>qs(c,l,o,!0)),qs(c,t,o)),ce(t)&&i.set(t,c),c}function qs(e,t,n,s=!1){const{mixins:r,extends:i}=t;i&&qs(e,i,n,!0),r&&r.forEach(o=>qs(e,o,n,!0));for(const o in t)if(!(s&&o==="expose")){const a=Rf[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Rf={data:Eo,props:Io,emits:Io,methods:Gn,computed:Gn,beforeCreate:Ne,created:Ne,beforeMount:Ne,mounted:Ne,beforeUpdate:Ne,updated:Ne,beforeDestroy:Ne,beforeUnmount:Ne,destroyed:Ne,unmounted:Ne,activated:Ne,deactivated:Ne,errorCaptured:Ne,serverPrefetch:Ne,components:Gn,directives:Gn,watch:Of,provide:Eo,inject:Pf};function Eo(e,t){return t?e?function(){return Te(Y(e)?e.call(this,this):e,Y(t)?t.call(this,this):t)}:t:e}function Pf(e,t){return Gn(oi(e),oi(t))}function oi(e){if(j(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ne(e,t){return e?[...new Set([].concat(e,t))]:t}function Gn(e,t){return e?Te(Object.create(null),e,t):t}function Io(e,t){return e?j(e)&&j(t)?[...new Set([...e,...t])]:Te(Object.create(null),bo(e),bo(t??{})):t}function Of(e,t){if(!e)return t;if(!t)return e;const n=Te(Object.create(null),e);for(const s in t)n[s]=Ne(e[s],t[s]);return n}function Dc(){return{app:null,config:{isNativeTag:Ha,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let kf=0;function Nf(e,t){return function(s,r=null){Y(s)||(s=Te({},s)),r!=null&&!ce(r)&&(r=null);const i=Dc(),o=new WeakSet,a=[];let c=!1;const l=i.app={_uid:kf++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:ud,get config(){return i.config},set config(u){},use(u,...f){return o.has(u)||(u&&Y(u.install)?(o.add(u),u.install(l,...f)):Y(u)&&(o.add(u),u(l,...f))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,f){return f?(i.components[u]=f,l):i.components[u]},directive(u,f){return f?(i.directives[u]=f,l):i.directives[u]},mount(u,f,d){if(!c){const g=l._ceVNode||ve(s,r);return g.appContext=i,d===!0?d="svg":d===!1&&(d=void 0),e(g,u,d),c=!0,l._container=u,u.__vue_app__=l,br(g.component)}},onUnmount(u){a.push(u)},unmount(){c&&(gt(a,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(u,f){return i.provides[u]=f,l},runWithContext(u){const f=an;an=l;try{return u()}finally{an=f}}};return l}}let an=null;const Df=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Je(t)}Modifiers`]||e[`${ln(t)}Modifiers`];function xf(e,t,...n){if(e.isUnmounted)return;const s=e.vnode.props||he;let r=n;const i=t.startsWith("update:"),o=i&&Df(s,t.slice(7));o&&(o.trim&&(r=n.map(u=>we(u)?u.trim():u)),o.number&&(r=n.map(ur)));let a,c=s[a=Or(t)]||s[a=Or(Je(t))];!c&&i&&(c=s[a=Or(ln(t))]),c&&gt(c,e,6,r);const l=s[a+"Once"];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,gt(l,e,6,r)}}const Lf=new WeakMap;function xc(e,t,n=!1){const s=n?Lf:t.emitsCache,r=s.get(e);if(r!==void 0)return r;const i=e.emits;let o={},a=!1;if(!Y(e)){const c=l=>{const u=xc(l,t,!0);u&&(a=!0,Te(o,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!a?(ce(e)&&s.set(e,null),null):(j(i)?i.forEach(c=>o[c]=null):Te(o,i),ce(e)&&s.set(e,o),o)}function yr(e,t){return!e||!or(t)?!1:(t=t.slice(2).replace(/Once$/,""),ae(e,t[0].toLowerCase()+t.slice(1))||ae(e,ln(t))||ae(e,t))}function So(e){const{type:t,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:c,render:l,renderCache:u,props:f,data:d,setupState:g,ctx:_,inheritAttrs:w}=e,R=Ks(e);let P,I;try{if(n.shapeFlag&4){const k=r||s,V=k;P=ct(l.call(V,k,u,f,g,d,_)),I=a}else{const k=t;P=ct(k.length>1?k(f,{attrs:a,slots:o,emit:c}):k(f,null)),I=t.props?a:Mf(a)}}catch(k){ns.length=0,pr(k,e,1),P=ve(qt)}let S=P;if(I&&w!==!1){const k=Object.keys(I),{shapeFlag:V}=S;k.length&&V&7&&(i&&k.some(Ci)&&(I=Uf(I,i)),S=An(S,I,!1,!0))}return n.dirs&&(S=An(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(n.dirs):n.dirs),n.transition&&Ui(S,n.transition),P=S,Ks(R),P}const Mf=e=>{let t;for(const n in e)(n==="class"||n==="style"||or(n))&&((t||(t={}))[n]=e[n]);return t},Uf=(e,t)=>{const n={};for(const s in e)(!Ci(s)||!(s.slice(9)in t))&&(n[s]=e[s]);return n};function Ff(e,t,n){const{props:s,children:r,component:i}=e,{props:o,children:a,patchFlag:c}=t,l=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?To(s,o,l):!!o;if(c&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(Lc(o,s,d)&&!yr(l,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?To(s,o,l):!0:!!o;return!1}function To(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(Lc(t,e,i)&&!yr(n,i))return!0}return!1}function Lc(e,t,n){const s=e[n],r=t[n];return n==="style"&&ce(s)&&ce(r)?!Ln(s,r):s!==r}function $f({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s===e)(e=t.vnode).el=n,t=t.parent;else break}}const Mc={},Uc=()=>Object.create(Mc),Fc=e=>Object.getPrototypeOf(e)===Mc;function Bf(e,t,n,s=!1){const r={},i=Uc();e.propsDefaults=Object.create(null),$c(e,t,r,i);for(const o in e.propsOptions[0])o in r||(r[o]=void 0);n?e.props=s?r:hc(r):e.type.props?e.props=r:e.props=i,e.attrs=i}function Vf(e,t,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=e,a=se(r),[c]=e.propsOptions;let l=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(yr(e.emitsOptions,d))continue;const g=t[d];if(c)if(ae(i,d))g!==i[d]&&(i[d]=g,l=!0);else{const _=Je(d);r[_]=ai(c,a,_,g,e,!1)}else g!==i[d]&&(i[d]=g,l=!0)}}}else{$c(e,t,r,i)&&(l=!0);let u;for(const f in a)(!t||!ae(t,f)&&((u=ln(f))===f||!ae(t,u)))&&(c?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=ai(c,a,f,void 0,e,!0)):delete r[f]);if(i!==a)for(const f in i)(!t||!ae(t,f))&&(delete i[f],l=!0)}l&&bt(e.attrs,"set","")}function $c(e,t,n,s){const[r,i]=e.propsOptions;let o=!1,a;if(t)for(let c in t){if(Jn(c))continue;const l=t[c];let u;r&&ae(r,u=Je(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:yr(e.emitsOptions,c)||(!(c in s)||l!==s[c])&&(s[c]=l,o=!0)}if(i){const c=se(n),l=a||he;for(let u=0;u<i.length;u++){const f=i[u];n[f]=ai(r,c,f,l[f],e,!ae(l,f))}}return o}function ai(e,t,n,s,r,i){const o=e[n];if(o!=null){const a=ae(o,"default");if(a&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&Y(c)){const{propsDefaults:l}=r;if(n in l)s=l[n];else{const u=Es(r);s=l[n]=c.call(null,t),u()}}else s=c;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===ln(n))&&(s=!0))}return s}const Hf=new WeakMap;function Bc(e,t,n=!1){const s=n?Hf:t.propsCache,r=s.get(e);if(r)return r;const i=e.props,o={},a=[];let c=!1;if(!Y(e)){const u=f=>{c=!0;const[d,g]=Bc(f,t,!0);Te(o,d),g&&a.push(...g)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!c)return ce(e)&&s.set(e,yn),yn;if(j(i))for(let u=0;u<i.length;u++){const f=Je(i[u]);Co(f)&&(o[f]=he)}else if(i)for(const u in i){const f=Je(u);if(Co(f)){const d=i[u],g=o[f]=j(d)||Y(d)?{type:d}:Te({},d),_=g.type;let w=!1,R=!0;if(j(_))for(let P=0;P<_.length;++P){const I=_[P],S=Y(I)&&I.name;if(S==="Boolean"){w=!0;break}else S==="String"&&(R=!1)}else w=Y(_)&&_.name==="Boolean";g[0]=w,g[1]=R,(w||ae(g,"default"))&&a.push(f)}}const l=[o,a];return ce(e)&&s.set(e,l),l}function Co(e){return e[0]!=="$"&&!Jn(e)}const Fi=e=>e==="_"||e==="_ctx"||e==="$stable",$i=e=>j(e)?e.map(ct):[ct(e)],jf=(e,t,n)=>{if(t._n)return t;const s=tn((...r)=>$i(t(...r)),n);return s._c=!1,s},Vc=(e,t,n)=>{const s=e._ctx;for(const r in e){if(Fi(r))continue;const i=e[r];if(Y(i))t[r]=jf(r,i,s);else if(i!=null){const o=$i(i);t[r]=()=>o}}},Hc=(e,t)=>{const n=$i(t);e.slots.default=()=>n},jc=(e,t,n)=>{for(const s in t)(n||!Fi(s))&&(e[s]=t[s])},Wf=(e,t,n)=>{const s=e.slots=Uc();if(e.vnode.shapeFlag&32){const r=t._;r?(jc(s,t,n),n&&Ka(s,"_",r,!0)):Vc(t,s)}else t&&Hc(e,t)},Gf=(e,t,n)=>{const{vnode:s,slots:r}=e;let i=!0,o=he;if(s.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:jc(r,t,n):(i=!t.$stable,Vc(t,r)),o=t}else t&&(Hc(e,t),o={default:1});if(i)for(const a in r)!Fi(a)&&o[a]==null&&delete r[a]},Ce=Yf;function Kf(e){return zf(e)}function zf(e,t){const n=fr();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:f,nextSibling:d,setScopeId:g=ut,insertStaticContent:_}=e,w=(h,p,m,y=null,E=null,v=null,D=void 0,N=null,A=!!p.dynamicChildren)=>{if(h===p)return;h&&!Hn(h,p)&&(y=b(h),Se(h,E,v,!0),h=null),p.patchFlag===-2&&(A=!1,p.dynamicChildren=null);const{type:T,ref:W,shapeFlag:L}=p;switch(T){case vr:R(h,p,m,y);break;case qt:P(h,p,m,y);break;case Ur:h==null&&I(p,m,y,D);break;case qe:O(h,p,m,y,E,v,D,N,A);break;default:L&1?V(h,p,m,y,E,v,D,N,A):L&6?re(h,p,m,y,E,v,D,N,A):(L&64||L&128)&&T.process(h,p,m,y,E,v,D,N,A,$)}W!=null&&E?Zn(W,h&&h.ref,v,p||h,!p):W==null&&h&&h.ref!=null&&Zn(h.ref,null,v,h,!0)},R=(h,p,m,y)=>{if(h==null)s(p.el=a(p.children),m,y);else{const E=p.el=h.el;p.children!==h.children&&l(E,p.children)}},P=(h,p,m,y)=>{h==null?s(p.el=c(p.children||""),m,y):p.el=h.el},I=(h,p,m,y)=>{[h.el,h.anchor]=_(h.children,p,m,y,h.el,h.anchor)},S=({el:h,anchor:p},m,y)=>{let E;for(;h&&h!==p;)E=d(h),s(h,m,y),h=E;s(p,m,y)},k=({el:h,anchor:p})=>{let m;for(;h&&h!==p;)m=d(h),r(h),h=m;r(p)},V=(h,p,m,y,E,v,D,N,A)=>{if(p.type==="svg"?D="svg":p.type==="math"&&(D="mathml"),h==null)q(p,m,y,E,v,D,N,A);else{const T=h.el&&h.el._isVueCE?h.el:null;try{T&&T._beginPatch(),M(h,p,E,v,D,N,A)}finally{T&&T._endPatch()}}},q=(h,p,m,y,E,v,D,N)=>{let A,T;const{props:W,shapeFlag:L,transition:B,dirs:z}=h;if(A=h.el=o(h.type,v,W&&W.is,W),L&8?u(A,h.children):L&16&&F(h.children,A,null,y,E,Mr(h,v),D,N),z&&Qt(h,null,y,"created"),G(A,h,h.scopeId,D,y),W){for(const pe in W)pe!=="value"&&!Jn(pe)&&i(A,pe,null,W[pe],v,y);"value"in W&&i(A,"value",null,W.value,v),(T=W.onVnodeBeforeMount)&&it(T,y,h)}z&&Qt(h,null,y,"beforeMount");const te=qf(E,B);te&&B.beforeEnter(A),s(A,p,m),((T=W&&W.onVnodeMounted)||te||z)&&Ce(()=>{T&&it(T,y,h),te&&B.enter(A),z&&Qt(h,null,y,"mounted")},E)},G=(h,p,m,y,E)=>{if(m&&g(h,m),y)for(let v=0;v<y.length;v++)g(h,y[v]);if(E){let v=E.subTree;if(p===v||Kc(v.type)&&(v.ssContent===p||v.ssFallback===p)){const D=E.vnode;G(h,D,D.scopeId,D.slotScopeIds,E.parent)}}},F=(h,p,m,y,E,v,D,N,A=0)=>{for(let T=A;T<h.length;T++){const W=h[T]=N?vt(h[T]):ct(h[T]);w(null,W,p,m,y,E,v,D,N)}},M=(h,p,m,y,E,v,D)=>{const N=p.el=h.el;let{patchFlag:A,dynamicChildren:T,dirs:W}=p;A|=h.patchFlag&16;const L=h.props||he,B=p.props||he;let z;if(m&&Zt(m,!1),(z=B.onVnodeBeforeUpdate)&&it(z,m,p,h),W&&Qt(p,h,m,"beforeUpdate"),m&&Zt(m,!0),(L.innerHTML&&B.innerHTML==null||L.textContent&&B.textContent==null)&&u(N,""),T?X(h.dynamicChildren,T,N,m,y,Mr(p,E),v):D||Z(h,p,N,null,m,y,Mr(p,E),v,!1),A>0){if(A&16)H(N,L,B,m,E);else if(A&2&&L.class!==B.class&&i(N,"class",null,B.class,E),A&4&&i(N,"style",L.style,B.style,E),A&8){const te=p.dynamicProps;for(let pe=0;pe<te.length;pe++){const le=te[pe],Ue=L[le],Fe=B[le];(Fe!==Ue||le==="value")&&i(N,le,Ue,Fe,E,m)}}A&1&&h.children!==p.children&&u(N,p.children)}else!D&&T==null&&H(N,L,B,m,E);((z=B.onVnodeUpdated)||W)&&Ce(()=>{z&&it(z,m,p,h),W&&Qt(p,h,m,"updated")},y)},X=(h,p,m,y,E,v,D)=>{for(let N=0;N<p.length;N++){const A=h[N],T=p[N],W=A.el&&(A.type===qe||!Hn(A,T)||A.shapeFlag&198)?f(A.el):m;w(A,T,W,null,y,E,v,D,!0)}},H=(h,p,m,y,E)=>{if(p!==m){if(p!==he)for(const v in p)!Jn(v)&&!(v in m)&&i(h,v,p[v],null,E,y);for(const v in m){if(Jn(v))continue;const D=m[v],N=p[v];D!==N&&v!=="value"&&i(h,v,N,D,E,y)}"value"in m&&i(h,"value",p.value,m.value,E)}},O=(h,p,m,y,E,v,D,N,A)=>{const T=p.el=h?h.el:a(""),W=p.anchor=h?h.anchor:a("");let{patchFlag:L,dynamicChildren:B,slotScopeIds:z}=p;z&&(N=N?N.concat(z):z),h==null?(s(T,m,y),s(W,m,y),F(p.children||[],m,W,E,v,D,N,A)):L>0&&L&64&&B&&h.dynamicChildren&&h.dynamicChildren.length===B.length?(X(h.dynamicChildren,B,m,E,v,D,N),(p.key!=null||E&&p===E.subTree)&&Bi(h,p,!0)):Z(h,p,m,W,E,v,D,N,A)},re=(h,p,m,y,E,v,D,N,A)=>{p.slotScopeIds=N,h==null?p.shapeFlag&512?E.ctx.activate(p,m,y,D,A):ke(p,m,y,E,v,D,A):Ge(h,p,A)},ke=(h,p,m,y,E,v,D)=>{const N=h.component=sd(h,y,E);if(Ac(h)&&(N.ctx.renderer=$),rd(N,!1,D),N.asyncDep){if(E&&E.registerDep(N,ie,D),!h.el){const A=N.subTree=ve(qt);P(null,A,p,m),h.placeholder=A.el}}else ie(N,h,p,m,E,v,D)},Ge=(h,p,m)=>{const y=p.component=h.component;if(Ff(h,p,m))if(y.asyncDep&&!y.asyncResolved){J(y,p,m);return}else y.next=p,y.update();else p.el=h.el,y.vnode=p},ie=(h,p,m,y,E,v,D)=>{const N=()=>{if(h.isMounted){let{next:L,bu:B,u:z,parent:te,vnode:pe}=h;{const st=Wc(h);if(st){L&&(L.el=pe.el,J(h,L,D)),st.asyncDep.then(()=>{Ce(()=>{h.isUnmounted||T()},E)});return}}let le=L,Ue;Zt(h,!1),L?(L.el=pe.el,J(h,L,D)):L=pe,B&&xs(B),(Ue=L.props&&L.props.onVnodeBeforeUpdate)&&it(Ue,te,L,pe),Zt(h,!0);const Fe=So(h),nt=h.subTree;h.subTree=Fe,w(nt,Fe,f(nt.el),b(nt),h,E,v),L.el=Fe.el,le===null&&$f(h,Fe.el),z&&Ce(z,E),(Ue=L.props&&L.props.onVnodeUpdated)&&Ce(()=>it(Ue,te,L,pe),E)}else{let L;const{el:B,props:z}=p,{bm:te,m:pe,parent:le,root:Ue,type:Fe}=h,nt=es(p);Zt(h,!1),te&&xs(te),!nt&&(L=z&&z.onVnodeBeforeMount)&&it(L,le,p),Zt(h,!0);{Ue.ce&&Ue.ce._hasShadowRoot()&&Ue.ce._injectChildStyle(Fe);const st=h.subTree=So(h);w(null,st,m,y,h,E,v),p.el=st.el}if(pe&&Ce(pe,E),!nt&&(L=z&&z.onVnodeMounted)){const st=p;Ce(()=>it(L,le,st),E)}(p.shapeFlag&256||le&&es(le.vnode)&&le.vnode.shapeFlag&256)&&h.a&&Ce(h.a,E),h.isMounted=!0,p=m=y=null}};h.scope.on();const A=h.effect=new Za(N);h.scope.off();const T=h.update=A.run.bind(A),W=h.job=A.runIfDirty.bind(A);W.i=h,W.id=h.uid,A.scheduler=()=>Mi(W),Zt(h,!0),T()},J=(h,p,m)=>{p.component=h;const y=h.vnode.props;h.vnode=p,h.next=null,Vf(h,p.props,y,m),Gf(h,p.children,m),Tt(),uo(h),Ct()},Z=(h,p,m,y,E,v,D,N,A=!1)=>{const T=h&&h.children,W=h?h.shapeFlag:0,L=p.children,{patchFlag:B,shapeFlag:z}=p;if(B>0){if(B&128){$e(T,L,m,y,E,v,D,N,A);return}else if(B&256){me(T,L,m,y,E,v,D,N,A);return}}z&8?(W&16&&Ke(T,E,v),L!==T&&u(m,L)):W&16?z&16?$e(T,L,m,y,E,v,D,N,A):Ke(T,E,v,!0):(W&8&&u(m,""),z&16&&F(L,m,y,E,v,D,N,A))},me=(h,p,m,y,E,v,D,N,A)=>{h=h||yn,p=p||yn;const T=h.length,W=p.length,L=Math.min(T,W);let B;for(B=0;B<L;B++){const z=p[B]=A?vt(p[B]):ct(p[B]);w(h[B],z,m,null,E,v,D,N,A)}T>W?Ke(h,E,v,!0,!1,L):F(p,m,y,E,v,D,N,A,L)},$e=(h,p,m,y,E,v,D,N,A)=>{let T=0;const W=p.length;let L=h.length-1,B=W-1;for(;T<=L&&T<=B;){const z=h[T],te=p[T]=A?vt(p[T]):ct(p[T]);if(Hn(z,te))w(z,te,m,null,E,v,D,N,A);else break;T++}for(;T<=L&&T<=B;){const z=h[L],te=p[B]=A?vt(p[B]):ct(p[B]);if(Hn(z,te))w(z,te,m,null,E,v,D,N,A);else break;L--,B--}if(T>L){if(T<=B){const z=B+1,te=z<W?p[z].el:y;for(;T<=B;)w(null,p[T]=A?vt(p[T]):ct(p[T]),m,te,E,v,D,N,A),T++}}else if(T>B)for(;T<=L;)Se(h[T],E,v,!0),T++;else{const z=T,te=T,pe=new Map;for(T=te;T<=B;T++){const Be=p[T]=A?vt(p[T]):ct(p[T]);Be.key!=null&&pe.set(Be.key,T)}let le,Ue=0;const Fe=B-te+1;let nt=!1,st=0;const Bn=new Array(Fe);for(T=0;T<Fe;T++)Bn[T]=0;for(T=z;T<=L;T++){const Be=h[T];if(Ue>=Fe){Se(Be,E,v,!0);continue}let rt;if(Be.key!=null)rt=pe.get(Be.key);else for(le=te;le<=B;le++)if(Bn[le-te]===0&&Hn(Be,p[le])){rt=le;break}rt===void 0?Se(Be,E,v,!0):(Bn[rt-te]=T+1,rt>=st?st=rt:nt=!0,w(Be,p[rt],m,null,E,v,D,N,A),Ue++)}const so=nt?Jf(Bn):yn;for(le=so.length-1,T=Fe-1;T>=0;T--){const Be=te+T,rt=p[Be],ro=p[Be+1],io=Be+1<W?ro.el||Gc(ro):y;Bn[T]===0?w(null,rt,m,io,E,v,D,N,A):nt&&(le<0||T!==so[le]?Me(rt,m,io,2):le--)}}},Me=(h,p,m,y,E=null)=>{const{el:v,type:D,transition:N,children:A,shapeFlag:T}=h;if(T&6){Me(h.component.subTree,p,m,y);return}if(T&128){h.suspense.move(p,m,y);return}if(T&64){D.move(h,p,m,$);return}if(D===qe){s(v,p,m);for(let L=0;L<A.length;L++)Me(A[L],p,m,y);s(h.anchor,p,m);return}if(D===Ur){S(h,p,m);return}if(y!==2&&T&1&&N)if(y===0)N.beforeEnter(v),s(v,p,m),Ce(()=>N.enter(v),E);else{const{leave:L,delayLeave:B,afterLeave:z}=N,te=()=>{h.ctx.isUnmounted?r(v):s(v,p,m)},pe=()=>{v._isLeaving&&v[ff](!0),L(v,()=>{te(),z&&z()})};B?B(v,te,pe):pe()}else s(v,p,m)},Se=(h,p,m,y=!1,E=!1)=>{const{type:v,props:D,ref:N,children:A,dynamicChildren:T,shapeFlag:W,patchFlag:L,dirs:B,cacheIndex:z}=h;if(L===-2&&(E=!1),N!=null&&(Tt(),Zn(N,null,m,h,!0),Ct()),z!=null&&(p.renderCache[z]=void 0),W&256){p.ctx.deactivate(h);return}const te=W&1&&B,pe=!es(h);let le;if(pe&&(le=D&&D.onVnodeBeforeUnmount)&&it(le,p,h),W&6)Xt(h.component,m,y);else{if(W&128){h.suspense.unmount(m,y);return}te&&Qt(h,null,p,"beforeUnmount"),W&64?h.type.remove(h,p,m,$,y):T&&!T.hasOnce&&(v!==qe||L>0&&L&64)?Ke(T,p,m,!1,!0):(v===qe&&L&384||!E&&W&16)&&Ke(A,p,m),y&&fn(h)}(pe&&(le=D&&D.onVnodeUnmounted)||te)&&Ce(()=>{le&&it(le,p,h),te&&Qt(h,null,p,"unmounted")},m)},fn=h=>{const{type:p,el:m,anchor:y,transition:E}=h;if(p===qe){dn(m,y);return}if(p===Ur){k(h);return}const v=()=>{r(m),E&&!E.persisted&&E.afterLeave&&E.afterLeave()};if(h.shapeFlag&1&&E&&!E.persisted){const{leave:D,delayLeave:N}=E,A=()=>D(m,v);N?N(h.el,v,A):A()}else v()},dn=(h,p)=>{let m;for(;h!==p;)m=d(h),r(h),h=m;r(p)},Xt=(h,p,m)=>{const{bum:y,scope:E,job:v,subTree:D,um:N,m:A,a:T}=h;Ao(A),Ao(T),y&&xs(y),E.stop(),v&&(v.flags|=8,Se(D,h,p,m)),N&&Ce(N,p),Ce(()=>{h.isUnmounted=!0},p)},Ke=(h,p,m,y=!1,E=!1,v=0)=>{for(let D=v;D<h.length;D++)Se(h[D],p,m,y,E)},b=h=>{if(h.shapeFlag&6)return b(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=d(h.anchor||h.el),m=p&&p[Sc];return m?d(m):p};let U=!1;const x=(h,p,m)=>{let y;h==null?p._vnode&&(Se(p._vnode,null,null,!0),y=p._vnode.component):w(p._vnode||null,h,p,null,null,null,m),p._vnode=h,U||(U=!0,uo(y),vc(),U=!1)},$={p:w,um:Se,m:Me,r:fn,mt:ke,mc:F,pc:Z,pbc:X,n:b,o:e};return{render:x,hydrate:void 0,createApp:Nf(x)}}function Mr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Zt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function qf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Bi(e,t,n=!1){const s=e.children,r=t.children;if(j(s)&&j(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=vt(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Bi(o,a)),a.type===vr&&(a.patchFlag===-1&&(a=r[i]=vt(a)),a.el=o.el),a.type===qt&&!a.el&&(a.el=o.el)}}function Jf(e){const t=e.slice(),n=[0];let s,r,i,o,a;const c=e.length;for(s=0;s<c;s++){const l=e[s];if(l!==0){if(r=n[n.length-1],e[r]<l){t[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,e[n[a]]<l?i=a+1:o=a;l<e[n[i]]&&(i>0&&(t[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function Wc(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Wc(t)}function Ao(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Gc(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Gc(t.subTree):null}const Kc=e=>e.__isSuspense;function Yf(e,t){t&&t.pendingBranch?j(e)?t.effects.push(...e):t.effects.push(e):nf(e)}const qe=Symbol.for("v-fgt"),vr=Symbol.for("v-txt"),qt=Symbol.for("v-cmt"),Ur=Symbol.for("v-stc"),ns=[];let He=null;function Q(e=!1){ns.push(He=e?null:[])}function Xf(){ns.pop(),He=ns[ns.length-1]||null}let us=1;function Js(e,t=!1){us+=e,e<0&&He&&t&&(He.hasOnce=!0)}function zc(e){return e.dynamicChildren=us>0?He||yn:null,Xf(),us>0&&He&&He.push(e),e}function ne(e,t,n,s,r,i){return zc(C(e,t,n,s,r,i,!0))}function fs(e,t,n,s,r){return zc(ve(e,t,n,s,r,!0))}function Ys(e){return e?e.__v_isVNode===!0:!1}function Hn(e,t){return e.type===t.type&&e.key===t.key}const qc=({key:e})=>e??null,Us=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?we(e)||_e(e)||Y(e)?{i:Ve,r:e,k:t,f:!!n}:e:null);function C(e,t=null,n=null,s=0,r=null,i=e===qe?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&qc(t),ref:t&&Us(t),scopeId:wc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ve};return a?(Vi(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=we(n)?8:16),us>0&&!o&&He&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&He.push(c),c}const ve=Qf;function Qf(e,t=null,n=null,s=0,r=null,i=!1){if((!e||e===Ef)&&(e=qt),Ys(e)){const a=An(e,t,!0);return n&&Vi(a,n),us>0&&!i&&He&&(a.shapeFlag&6?He[He.indexOf(e)]=a:He.push(a)),a.patchFlag=-2,a}if(ld(e)&&(e=e.__vccOpts),t){t=Zf(t);let{class:a,style:c}=t;a&&!we(a)&&(t.class=ze(a)),ce(c)&&(hr(c)&&!j(c)&&(c=Te({},c)),t.style=Ye(c))}const o=we(e)?1:Kc(e)?128:cf(e)?64:ce(e)?4:Y(e)?2:0;return C(e,t,n,s,r,o,i,!0)}function Zf(e){return e?hr(e)||Fc(e)?Te({},e):e:null}function An(e,t,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:c}=e,l=t?ed(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&qc(l),ref:t&&t.ref?n&&i?j(i)?i.concat(Us(t)):[i,Us(t)]:Us(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==qe?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&An(e.ssContent),ssFallback:e.ssFallback&&An(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&s&&Ui(u,c.clone(u)),u}function at(e=" ",t=0){return ve(vr,null,e,t)}function Ie(e="",t=!1){return t?(Q(),fs(qt,null,e)):ve(qt,null,e)}function ct(e){return e==null||typeof e=="boolean"?ve(qt):j(e)?ve(qe,null,e.slice()):Ys(e)?vt(e):ve(vr,null,String(e))}function vt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:An(e)}function Vi(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(j(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),Vi(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!Fc(t)?t._ctx=Ve:r===3&&Ve&&(Ve.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Y(t)?(t={default:t,_ctx:Ve},n=32):(t=String(t),s&64?(n=16,t=[at(t)]):n=8);e.children=t,e.shapeFlag|=n}function ed(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=ze([t.class,s.class]));else if(r==="style")t.style=Ye([t.style,s.style]);else if(or(r)){const i=t[r],o=s[r];o&&i!==o&&!(j(i)&&i.includes(o))&&(t[r]=i?[].concat(i,o):o)}else r!==""&&(t[r]=s[r])}return t}function it(e,t,n,s=null){gt(e,t,7,[n,s])}const td=Dc();let nd=0;function sd(e,t,n){const s=e.type,r=(t?t.appContext:e.appContext)||td,i={uid:nd++,vnode:e,type:s,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ya(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Bc(s,r),emitsOptions:xc(s,r),emit:null,emitted:null,propsDefaults:he,inheritAttrs:s.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=xf.bind(null,i),e.ce&&e.ce(i),i}let Oe=null;const Jc=()=>Oe||Ve;let Xs,ci;{const e=fr(),t=(n,s)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};Xs=t("__VUE_INSTANCE_SETTERS__",n=>Oe=n),ci=t("__VUE_SSR_SETTERS__",n=>ds=n)}const Es=e=>{const t=Oe;return Xs(e),e.scope.on(),()=>{e.scope.off(),Xs(t)}},Ro=()=>{Oe&&Oe.scope.off(),Xs(null)};function Yc(e){return e.vnode.shapeFlag&4}let ds=!1;function rd(e,t=!1,n=!1){t&&ci(t);const{props:s,children:r}=e.vnode,i=Yc(e);Bf(e,s,i,t),Wf(e,r,n||t);const o=i?id(e,t):void 0;return t&&ci(!1),o}function id(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Tf);const{setup:s}=n;if(s){Tt();const r=e.setupContext=s.length>1?ad(e):null,i=Es(e),o=ws(s,e,0,[e.props,r]),a=ja(o);if(Ct(),i(),(a||e.sp)&&!es(e)&&Cc(e),a){if(o.then(Ro,Ro),t)return o.then(c=>{Po(e,c)}).catch(c=>{pr(c,e,0)});e.asyncDep=o}else Po(e,o)}else Xc(e)}function Po(e,t,n){Y(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ce(t)&&(e.setupState=gc(t)),Xc(e)}function Xc(e,t,n){const s=e.type;e.render||(e.render=s.render||ut);{const r=Es(e);Tt();try{Cf(e)}finally{Ct(),r()}}}const od={get(e,t){return Re(e,"get",""),e[t]}};function ad(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,od),slots:e.slots,emit:e.emit,expose:t}}function br(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(gc(Li(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ts)return ts[n](e)},has(t,n){return n in t||n in ts}})):e.proxy}function cd(e,t=!0){return Y(e)?e.displayName||e.name:e.name||t&&e.__name}function ld(e){return Y(e)&&"__vccOpts"in e}const be=(e,t)=>Xu(e,t,ds);function Qc(e,t,n){try{Js(-1);const s=arguments.length;return s===2?ce(t)&&!j(t)?Ys(t)?ve(e,null,[t]):ve(e,t):ve(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Ys(n)&&(n=[n]),ve(e,t,n))}finally{Js(1)}}const ud="3.5.28";/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let li;const Oo=typeof window<"u"&&window.trustedTypes;if(Oo)try{li=Oo.createPolicy("vue",{createHTML:e=>e})}catch{}const Zc=li?e=>li.createHTML(e):e=>e,fd="http://www.w3.org/2000/svg",dd="http://www.w3.org/1998/Math/MathML",yt=typeof document<"u"?document:null,ko=yt&&yt.createElement("template"),hd={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const r=t==="svg"?yt.createElementNS(fd,e):t==="mathml"?yt.createElementNS(dd,e):n?yt.createElement(e,{is:n}):yt.createElement(e);return e==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:e=>yt.createTextNode(e),createComment:e=>yt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>yt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,r,i){const o=n?n.previousSibling:t.lastChild;if(r&&(r===i||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{ko.innerHTML=Zc(s==="svg"?`<svg>${e}</svg>`:s==="mathml"?`<math>${e}</math>`:e);const a=ko.content;if(s==="svg"||s==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},pd=Symbol("_vtc");function gd(e,t,n){const s=e[pd];s&&(t=(t?[t,...s]:[...s]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Qs=Symbol("_vod"),el=Symbol("_vsh"),md={name:"show",beforeMount(e,{value:t},{transition:n}){e[Qs]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):jn(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:s}){!t!=!n&&(s?t?(s.beforeEnter(e),jn(e,!0),s.enter(e)):s.leave(e,()=>{jn(e,!1)}):jn(e,t))},beforeUnmount(e,{value:t}){jn(e,t)}};function jn(e,t){e.style.display=t?e[Qs]:"none",e[el]=!t}const _d=Symbol(""),yd=/(?:^|;)\s*display\s*:/;function vd(e,t,n){const s=e.style,r=we(n);let i=!1;if(n&&!r){if(t)if(we(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Fs(s,a,"")}else for(const o in t)n[o]==null&&Fs(s,o,"");for(const o in n)o==="display"&&(i=!0),Fs(s,o,n[o])}else if(r){if(t!==n){const o=s[_d];o&&(n+=";"+o),s.cssText=n,i=yd.test(n)}}else t&&e.removeAttribute("style");Qs in e&&(e[Qs]=i?s.display:"",e[el]&&(s.display="none"))}const No=/\s*!important$/;function Fs(e,t,n){if(j(n))n.forEach(s=>Fs(e,t,s));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=bd(e,t);No.test(n)?e.setProperty(ln(s),n.replace(No,""),"important"):e[s]=n}}const Do=["Webkit","Moz","ms"],Fr={};function bd(e,t){const n=Fr[t];if(n)return n;let s=Je(t);if(s!=="filter"&&s in e)return Fr[t]=s;s=lr(s);for(let r=0;r<Do.length;r++){const i=Do[r]+s;if(i in e)return Fr[t]=i}return t}const xo="http://www.w3.org/1999/xlink";function Lo(e,t,n,s,r,i=wu(t)){s&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(xo,t.slice(6,t.length)):e.setAttributeNS(xo,t,n):n==null||i&&!za(n)?e.removeAttribute(t):e.setAttribute(t,i?"":pt(n)?String(n):n)}function Mo(e,t,n,s,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Zc(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=za(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(r||t)}function $t(e,t,n,s){e.addEventListener(t,n,s)}function wd(e,t,n,s){e.removeEventListener(t,n,s)}const Uo=Symbol("_vei");function Ed(e,t,n,s,r=null){const i=e[Uo]||(e[Uo]={}),o=i[t];if(s&&o)o.value=s;else{const[a,c]=Id(t);if(s){const l=i[t]=Cd(s,r);$t(e,a,l,c)}else o&&(wd(e,a,o,c),i[t]=void 0)}}const Fo=/(?:Once|Passive|Capture)$/;function Id(e){let t;if(Fo.test(e)){t={};let s;for(;s=e.match(Fo);)e=e.slice(0,e.length-s[0].length),t[s[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):ln(e.slice(2)),t]}let $r=0;const Sd=Promise.resolve(),Td=()=>$r||(Sd.then(()=>$r=0),$r=Date.now());function Cd(e,t){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;gt(Ad(s,n.value),t,5,[s])};return n.value=e,n.attached=Td(),n}function Ad(e,t){if(j(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(s=>r=>!r._stopped&&s&&s(r))}else return t}const $o=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Rd=(e,t,n,s,r,i)=>{const o=r==="svg";t==="class"?gd(e,s,o):t==="style"?vd(e,n,s):or(t)?Ci(t)||Ed(e,t,n,s,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Pd(e,t,s,o))?(Mo(e,t,s),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Lo(e,t,s,o,i,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!we(s))?Mo(e,Je(t),s,i,t):(t==="true-value"?e._trueValue=s:t==="false-value"&&(e._falseValue=s),Lo(e,t,s,o))};function Pd(e,t,n,s){if(s)return!!(t==="innerHTML"||t==="textContent"||t in e&&$o(t)&&Y(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return $o(t)&&we(n)?!1:t in e}const Rn=e=>{const t=e.props["onUpdate:modelValue"]||!1;return j(t)?n=>xs(t,n):t};function Od(e){e.target.composing=!0}function Bo(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const St=Symbol("_assign");function Vo(e,t,n){return t&&(e=e.trim()),n&&(e=ur(e)),e}const kd={created(e,{modifiers:{lazy:t,trim:n,number:s}},r){e[St]=Rn(r);const i=s||r.props&&r.props.type==="number";$t(e,t?"change":"input",o=>{o.target.composing||e[St](Vo(e.value,n,i))}),(n||i)&&$t(e,"change",()=>{e.value=Vo(e.value,n,i)}),t||($t(e,"compositionstart",Od),$t(e,"compositionend",Bo),$t(e,"change",Bo))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(e[St]=Rn(o),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?ur(e.value):e.value,c=t??"";a!==c&&(document.activeElement===e&&e.type!=="range"&&(s&&t===n||r&&e.value.trim()===c)||(e.value=c))}},Pv={deep:!0,created(e,t,n){e[St]=Rn(n),$t(e,"change",()=>{const s=e._modelValue,r=hs(e),i=e.checked,o=e[St];if(j(s)){const a=Ri(s,r),c=a!==-1;if(i&&!c)o(s.concat(r));else if(!i&&c){const l=[...s];l.splice(a,1),o(l)}}else if(xn(s)){const a=new Set(s);i?a.add(r):a.delete(r),o(a)}else o(tl(e,i))})},mounted:Ho,beforeUpdate(e,t,n){e[St]=Rn(n),Ho(e,t,n)}};function Ho(e,{value:t,oldValue:n},s){e._modelValue=t;let r;if(j(t))r=Ri(t,s.props.value)>-1;else if(xn(t))r=t.has(s.props.value);else{if(t===n)return;r=Ln(t,tl(e,!0))}e.checked!==r&&(e.checked=r)}const Ov={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const r=xn(t);$t(e,"change",()=>{const i=Array.prototype.filter.call(e.options,o=>o.selected).map(o=>n?ur(hs(o)):hs(o));e[St](e.multiple?r?new Set(i):i:i[0]),e._assigning=!0,gr(()=>{e._assigning=!1})}),e[St]=Rn(s)},mounted(e,{value:t}){jo(e,t)},beforeUpdate(e,t,n){e[St]=Rn(n)},updated(e,{value:t}){e._assigning||jo(e,t)}};function jo(e,t){const n=e.multiple,s=j(t);if(!(n&&!s&&!xn(t))){for(let r=0,i=e.options.length;r<i;r++){const o=e.options[r],a=hs(o);if(n)if(s){const c=typeof a;c==="string"||c==="number"?o.selected=t.some(l=>String(l)===String(a)):o.selected=Ri(t,a)>-1}else o.selected=t.has(a);else if(Ln(hs(o),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function hs(e){return"_value"in e?e._value:e.value}function tl(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Nd=["ctrl","shift","alt","meta"],Dd={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Nd.some(n=>e[`${n}Key`]&&!t.includes(n))},xd=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=((r,...i)=>{for(let o=0;o<t.length;o++){const a=Dd[t[o]];if(a&&a(r,t))return}return e(r,...i)}))},Ld=Te({patchProp:Rd},hd);let Wo;function Md(){return Wo||(Wo=Kf(Ld))}const Ud=((...e)=>{const t=Md().createApp(...e),{mount:n}=t;return t.mount=s=>{const r=$d(s);if(!r)return;const i=t._component;!Y(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Fd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t});function Fd(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function $d(e){return we(e)?document.querySelector(e):e}/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let nl;const wr=e=>nl=e,sl=Symbol();function ui(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var ss;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(ss||(ss={}));function Bd(){const e=Xa(!0),t=e.run(()=>fe({}));let n=[],s=[];const r=Li({install(i){wr(r),r._a=i,i.provide(sl,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return this._a?n.push(i):s.push(i),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return r}const rl=()=>{};function Go(e,t,n,s=rl){e.add(t);const r=()=>{e.delete(t)&&s()};return!n&&Qa()&&Iu(r),r}function pn(e,...t){e.forEach(n=>{n(...t)})}const Vd=e=>e(),Ko=Symbol(),Br=Symbol();function fi(e,t){e instanceof Map&&t instanceof Map?t.forEach((n,s)=>e.set(s,n)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const s=t[n],r=e[n];ui(r)&&ui(s)&&e.hasOwnProperty(n)&&!_e(s)&&!ft(s)?e[n]=fi(r,s):e[n]=s}return e}const Hd=Symbol();function jd(e){return!ui(e)||!Object.prototype.hasOwnProperty.call(e,Hd)}const{assign:Lt}=Object;function Wd(e){return!!(_e(e)&&e.effect)}function Gd(e,t,n,s){const{state:r,actions:i,getters:o}=t,a=n.state.value[e];let c;function l(){a||(n.state.value[e]=r?r():{});const u=Ku(n.state.value[e]);return Lt(u,i,Object.keys(o||{}).reduce((f,d)=>(f[d]=Li(be(()=>{wr(n);const g=n._s.get(e);return o[d].call(g,g)})),f),{}))}return c=il(e,l,t,n,s,!0),c}function il(e,t,n={},s,r,i){let o;const a=Lt({actions:{}},n),c={deep:!0};let l,u,f=new Set,d=new Set,g;const _=s.state.value[e];!i&&!_&&(s.state.value[e]={});let w;function R(F){let M;l=u=!1,typeof F=="function"?(F(s.state.value[e]),M={type:ss.patchFunction,storeId:e,events:g}):(fi(s.state.value[e],F),M={type:ss.patchObject,payload:F,storeId:e,events:g});const X=w=Symbol();gr().then(()=>{w===X&&(l=!0)}),u=!0,pn(f,M,s.state.value[e])}const P=i?function(){const{state:M}=n,X=M?M():{};this.$patch(H=>{Lt(H,X)})}:rl;function I(){o.stop(),f.clear(),d.clear(),s._s.delete(e)}const S=(F,M="")=>{if(Ko in F)return F[Br]=M,F;const X=function(){wr(s);const H=Array.from(arguments),O=new Set,re=new Set;function ke(J){O.add(J)}function Ge(J){re.add(J)}pn(d,{args:H,name:X[Br],store:V,after:ke,onError:Ge});let ie;try{ie=F.apply(this&&this.$id===e?this:V,H)}catch(J){throw pn(re,J),J}return ie instanceof Promise?ie.then(J=>(pn(O,J),J)).catch(J=>(pn(re,J),Promise.reject(J))):(pn(O,ie),ie)};return X[Ko]=!0,X[Br]=M,X},k={_p:s,$id:e,$onAction:Go.bind(null,d),$patch:R,$reset:P,$subscribe(F,M={}){const X=Go(f,F,M.detached,()=>H()),H=o.run(()=>on(()=>s.state.value[e],O=>{(M.flush==="sync"?u:l)&&F({storeId:e,type:ss.direct,events:g},O)},Lt({},c,M)));return X},$dispose:I},V=bs(k);s._s.set(e,V);const G=(s._a&&s._a.runWithContext||Vd)(()=>s._e.run(()=>(o=Xa()).run(()=>t({action:S}))));for(const F in G){const M=G[F];if(_e(M)&&!Wd(M)||ft(M))i||(_&&jd(M)&&(_e(M)?M.value=_[F]:fi(M,_[F])),s.state.value[e][F]=M);else if(typeof M=="function"){const X=S(M,F);G[F]=X,a.actions[F]=M}}return Lt(V,G),Lt(se(V),G),Object.defineProperty(V,"$state",{get:()=>s.state.value[e],set:F=>{R(M=>{Lt(M,F)})}}),s._p.forEach(F=>{Lt(V,o.run(()=>F({store:V,app:s._a,pinia:s,options:a})))}),_&&i&&n.hydrate&&n.hydrate(V.$state,_),l=!0,u=!0,V}/*! #__NO_SIDE_EFFECTS__ */function Kd(e,t,n){let s;const r=typeof t=="function";s=r?n:t;function i(o,a){const c=sf();return o=o||(c?We(sl,null):null),o&&wr(o),o=nl,o._s.has(e)||(r?il(e,t,s,o):Gd(e,s,o)),o._s.get(e)}return i.$id=e,i}function kv(e){const t=se(e),n={};for(const s in t){const r=t[s];r.effect?n[s]=be({get:()=>e[s],set(i){e[s]=i}}):(_e(r)||ft(r))&&(n[s]=Ju(e,s))}return n}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const mn=typeof document<"u";function ol(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function zd(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&ol(e.default)}const oe=Object.assign;function Vr(e,t){const n={};for(const s in t){const r=t[s];n[s]=et(r)?r.map(e):e(r)}return n}const rs=()=>{},et=Array.isArray;function zo(e,t){const n={};for(const s in e)n[s]=s in t?t[s]:e[s];return n}const al=/#/g,qd=/&/g,Jd=/\//g,Yd=/=/g,Xd=/\?/g,cl=/\+/g,Qd=/%5B/g,Zd=/%5D/g,ll=/%5E/g,eh=/%60/g,ul=/%7B/g,th=/%7C/g,fl=/%7D/g,nh=/%20/g;function Hi(e){return e==null?"":encodeURI(""+e).replace(th,"|").replace(Qd,"[").replace(Zd,"]")}function sh(e){return Hi(e).replace(ul,"{").replace(fl,"}").replace(ll,"^")}function di(e){return Hi(e).replace(cl,"%2B").replace(nh,"+").replace(al,"%23").replace(qd,"%26").replace(eh,"`").replace(ul,"{").replace(fl,"}").replace(ll,"^")}function rh(e){return di(e).replace(Yd,"%3D")}function ih(e){return Hi(e).replace(al,"%23").replace(Xd,"%3F")}function oh(e){return ih(e).replace(Jd,"%2F")}function ps(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const ah=/\/$/,ch=e=>e.replace(ah,"");function Hr(e,t,n="/"){let s,r={},i="",o="";const a=t.indexOf("#");let c=t.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(s=t.slice(0,c),i=t.slice(c,a>0?a:t.length),r=e(i.slice(1))),a>=0&&(s=s||t.slice(0,a),o=t.slice(a,t.length)),s=dh(s??t,n),{fullPath:s+i+o,path:s,query:r,hash:ps(o)}}function lh(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function qo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function uh(e,t,n){const s=t.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&Pn(t.matched[s],n.matched[r])&&dl(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Pn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function dl(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!fh(e[n],t[n]))return!1;return!0}function fh(e,t){return et(e)?Jo(e,t):et(t)?Jo(t,e):(e==null?void 0:e.valueOf())===(t==null?void 0:t.valueOf())}function Jo(e,t){return et(t)?e.length===t.length&&e.every((n,s)=>n===t[s]):e.length===1&&e[0]===t}function dh(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),s=e.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const Nt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let hi=(function(e){return e.pop="pop",e.push="push",e})({}),jr=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function hh(e){if(!e)if(mn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),ch(e)}const ph=/^[^#]+#/;function gh(e,t){return e.replace(ph,"#")+t}function mh(e,t){const n=document.documentElement.getBoundingClientRect(),s=e.getBoundingClientRect();return{behavior:t.behavior,left:s.left-n.left-(t.left||0),top:s.top-n.top-(t.top||0)}}const Er=()=>({left:window.scrollX,top:window.scrollY});function _h(e){let t;if("el"in e){const n=e.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;t=mh(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Yo(e,t){return(history.state?history.state.position-t:-1)+e}const pi=new Map;function yh(e,t){pi.set(e,t)}function vh(e){const t=pi.get(e);return pi.delete(e),t}function bh(e){return typeof e=="string"||e&&typeof e=="object"}function hl(e){return typeof e=="string"||typeof e=="symbol"}let ye=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const pl=Symbol("");ye.MATCHER_NOT_FOUND+"",ye.NAVIGATION_GUARD_REDIRECT+"",ye.NAVIGATION_ABORTED+"",ye.NAVIGATION_CANCELLED+"",ye.NAVIGATION_DUPLICATED+"";function On(e,t){return oe(new Error,{type:e,[pl]:!0},t)}function _t(e,t){return e instanceof Error&&pl in e&&(t==null||!!(e.type&t))}const wh=["params","query","hash"];function Eh(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of wh)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function Ih(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<n.length;++s){const r=n[s].replace(cl," "),i=r.indexOf("="),o=ps(i<0?r:r.slice(0,i)),a=i<0?null:ps(r.slice(i+1));if(o in t){let c=t[o];et(c)||(c=t[o]=[c]),c.push(a)}else t[o]=a}return t}function Xo(e){let t="";for(let n in e){const s=e[n];if(n=rh(n),s==null){s!==void 0&&(t+=(t.length?"&":"")+n);continue}(et(s)?s.map(r=>r&&di(r)):[s&&di(s)]).forEach(r=>{r!==void 0&&(t+=(t.length?"&":"")+n,r!=null&&(t+="="+r))})}return t}function Sh(e){const t={};for(const n in e){const s=e[n];s!==void 0&&(t[n]=et(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return t}const gl=Symbol(""),Qo=Symbol(""),Ir=Symbol(""),ji=Symbol(""),gi=Symbol("");function Wn(){let e=[];function t(s){return e.push(s),()=>{const r=e.indexOf(s);r>-1&&e.splice(r,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Th(e,t,n){const s=()=>{e[t].delete(n)};Un(s),Pc(s),Rc(()=>{e[t].add(n)}),e[t].add(n)}function Nv(e){const t=We(gl,{}).value;t&&Th(t,"leaveGuards",e)}function Ft(e,t,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((a,c)=>{const l=d=>{d===!1?c(On(ye.NAVIGATION_ABORTED,{from:n,to:t})):d instanceof Error?c(d):bh(d)?c(On(ye.NAVIGATION_GUARD_REDIRECT,{from:t,to:d})):(o&&s.enterCallbacks[r]===o&&typeof d=="function"&&o.push(d),a())},u=i(()=>e.call(s&&s.instances[r],t,n,l));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch(d=>c(d))})}function Wr(e,t,n,s,r=i=>i()){const i=[];for(const o of e)for(const a in o.components){let c=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(ol(c)){const l=(c.__vccOpts||c)[t];l&&i.push(Ft(l,n,s,o,a,r))}else{let l=c();i.push(()=>l.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=zd(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[t];return d&&Ft(d,n,s,o,a,r)()}))}}return i}function Ch(e,t){const n=[],s=[],r=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const a=t.matched[o];a&&(e.matched.find(l=>Pn(l,a))?s.push(a):n.push(a));const c=e.matched[o];c&&(t.matched.find(l=>Pn(l,c))||r.push(c))}return[n,s,r]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Ah=()=>location.protocol+"//"+location.host;function ml(e,t){const{pathname:n,search:s,hash:r}=t,i=e.indexOf("#");if(i>-1){let o=r.includes(e.slice(i))?e.slice(i).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),qo(a,"")}return qo(n,e)+s+r}function Rh(e,t,n,s){let r=[],i=[],o=null;const a=({state:d})=>{const g=ml(e,location),_=n.value,w=t.value;let R=0;if(d){if(n.value=g,t.value=d,o&&o===_){o=null;return}R=w?d.position-w.position:0}else s(g);r.forEach(P=>{P(n.value,_,{delta:R,type:hi.pop,direction:R?R>0?jr.forward:jr.back:jr.unknown})})};function c(){o=n.value}function l(d){r.push(d);const g=()=>{const _=r.indexOf(d);_>-1&&r.splice(_,1)};return i.push(g),g}function u(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(oe({},d.state,{scroll:Er()}),"")}}function f(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:c,listen:l,destroy:f}}function Zo(e,t,n,s=!1,r=!1){return{back:e,current:t,forward:n,replaced:s,position:window.history.length,scroll:r?Er():null}}function Ph(e){const{history:t,location:n}=window,s={value:ml(e,n)},r={value:t.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+c:Ah()+e+c;try{t[u?"replaceState":"pushState"](l,"",d),r.value=l}catch(g){console.error(g),n[u?"replace":"assign"](d)}}function o(c,l){i(c,oe({},t.state,Zo(r.value.back,c,r.value.forward,!0),l,{position:r.value.position}),!0),s.value=c}function a(c,l){const u=oe({},r.value,t.state,{forward:c,scroll:Er()});i(u.current,u,!0),i(c,oe({},Zo(s.value,c,null),{position:u.position+1},l),!1),s.value=c}return{location:s,state:r,push:a,replace:o}}function Oh(e){e=hh(e);const t=Ph(e),n=Rh(e,t.state,t.location,t.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=oe({location:"",base:e,go:s,createHref:gh.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}let sn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var Ee=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(Ee||{});const kh={type:sn.Static,value:""},Nh=/[a-zA-Z0-9_]/;function Dh(e){if(!e)return[[]];if(e==="/")return[[kh]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${l}": ${g}`)}let n=Ee.Static,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,c,l="",u="";function f(){l&&(n===Ee.Static?i.push({type:sn.Static,value:l}):n===Ee.Param||n===Ee.ParamRegExp||n===Ee.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:sn.Param,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==Ee.ParamRegExp){s=n,n=Ee.EscapeNext;continue}switch(n){case Ee.Static:c==="/"?(l&&f(),o()):c===":"?(f(),n=Ee.Param):d();break;case Ee.EscapeNext:d(),n=s;break;case Ee.Param:c==="("?n=Ee.ParamRegExp:Nh.test(c)?d():(f(),n=Ee.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case Ee.ParamRegExp:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=Ee.ParamRegExpEnd:u+=c;break;case Ee.ParamRegExpEnd:f(),n=Ee.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===Ee.ParamRegExp&&t(`Unfinished custom RegExp for param "${l}"`),f(),o(),r}const ea="[^/]+?",xh={sensitive:!1,strict:!1,start:!0,end:!0};var De=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(De||{});const Lh=/[.+*?^${}()[\]/\\]/g;function Mh(e,t){const n=oe({},xh,t),s=[];let r=n.start?"^":"";const i=[];for(const l of e){const u=l.length?[]:[De.Root];n.strict&&!l.length&&(r+="/");for(let f=0;f<l.length;f++){const d=l[f];let g=De.Segment+(n.sensitive?De.BonusCaseSensitive:0);if(d.type===sn.Static)f||(r+="/"),r+=d.value.replace(Lh,"\\$&"),g+=De.Static;else if(d.type===sn.Param){const{value:_,repeatable:w,optional:R,regexp:P}=d;i.push({name:_,repeatable:w,optional:R});const I=P||ea;if(I!==ea){g+=De.BonusCustomRegExp;try{`${I}`}catch(k){throw new Error(`Invalid custom RegExp for param "${_}" (${I}): `+k.message)}}let S=w?`((?:${I})(?:/(?:${I}))*)`:`(${I})`;f||(S=R&&l.length<2?`(?:/${S})`:"/"+S),R&&(S+="?"),r+=S,g+=De.Dynamic,R&&(g+=De.BonusOptional),w&&(g+=De.BonusRepeatable),I===".*"&&(g+=De.BonusWildcard)}u.push(g)}s.push(u)}if(n.strict&&n.end){const l=s.length-1;s[l][s[l].length-1]+=De.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(l){const u=l.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const g=u[d]||"",_=i[d-1];f[_.name]=g&&_.repeatable?g.split("/"):g}return f}function c(l){let u="",f=!1;for(const d of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const g of d)if(g.type===sn.Static)u+=g.value;else if(g.type===sn.Param){const{value:_,repeatable:w,optional:R}=g,P=_ in l?l[_]:"";if(et(P)&&!w)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const I=et(P)?P.join("/"):P;if(!I)if(R)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=I}}return u||"/"}return{re:o,score:s,keys:i,parse:a,stringify:c}}function Uh(e,t){let n=0;for(;n<e.length&&n<t.length;){const s=t[n]-e[n];if(s)return s;n++}return e.length<t.length?e.length===1&&e[0]===De.Static+De.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===De.Static+De.Segment?1:-1:0}function _l(e,t){let n=0;const s=e.score,r=t.score;for(;n<s.length&&n<r.length;){const i=Uh(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(ta(s))return 1;if(ta(r))return-1}return r.length-s.length}function ta(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Fh={strict:!1,end:!0,sensitive:!1};function $h(e,t,n){const s=Mh(Dh(e.path),n),r=oe(s,{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function Bh(e,t){const n=[],s=new Map;t=zo(Fh,t);function r(f){return s.get(f)}function i(f,d,g){const _=!g,w=sa(f);w.aliasOf=g&&g.record;const R=zo(t,f),P=[w];if("alias"in f){const k=typeof f.alias=="string"?[f.alias]:f.alias;for(const V of k)P.push(sa(oe({},w,{components:g?g.record.components:w.components,path:V,aliasOf:g?g.record:w})))}let I,S;for(const k of P){const{path:V}=k;if(d&&V[0]!=="/"){const q=d.record.path,G=q[q.length-1]==="/"?"":"/";k.path=d.record.path+(V&&G+V)}if(I=$h(k,d,R),g?g.alias.push(I):(S=S||I,S!==I&&S.alias.push(I),_&&f.name&&!ra(I)&&o(f.name)),yl(I)&&c(I),w.children){const q=w.children;for(let G=0;G<q.length;G++)i(q[G],I,g&&g.children[G])}g=g||I}return S?()=>{o(S)}:rs}function o(f){if(hl(f)){const d=s.get(f);d&&(s.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&s.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function c(f){const d=jh(f,n);n.splice(d,0,f),f.record.name&&!ra(f)&&s.set(f.record.name,f)}function l(f,d){let g,_={},w,R;if("name"in f&&f.name){if(g=s.get(f.name),!g)throw On(ye.MATCHER_NOT_FOUND,{location:f});R=g.record.name,_=oe(na(d.params,g.keys.filter(S=>!S.optional).concat(g.parent?g.parent.keys.filter(S=>S.optional):[]).map(S=>S.name)),f.params&&na(f.params,g.keys.map(S=>S.name))),w=g.stringify(_)}else if(f.path!=null)w=f.path,g=n.find(S=>S.re.test(w)),g&&(_=g.parse(w),R=g.record.name);else{if(g=d.name?s.get(d.name):n.find(S=>S.re.test(d.path)),!g)throw On(ye.MATCHER_NOT_FOUND,{location:f,currentLocation:d});R=g.record.name,_=oe({},d.params,f.params),w=g.stringify(_)}const P=[];let I=g;for(;I;)P.unshift(I.record),I=I.parent;return{name:R,path:w,params:_,matched:P,meta:Hh(P)}}e.forEach(f=>i(f));function u(){n.length=0,s.clear()}return{addRoute:i,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function na(e,t){const n={};for(const s of t)s in e&&(n[s]=e[s]);return n}function sa(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Vh(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Vh(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const s in e.components)t[s]=typeof n=="object"?n[s]:n;return t}function ra(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Hh(e){return e.reduce((t,n)=>oe(t,n.meta),{})}function jh(e,t){let n=0,s=t.length;for(;n!==s;){const i=n+s>>1;_l(e,t[i])<0?s=i:n=i+1}const r=Wh(e);return r&&(s=t.lastIndexOf(r,s-1)),s}function Wh(e){let t=e;for(;t=t.parent;)if(yl(t)&&_l(e,t)===0)return t}function yl({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function ia(e){const t=We(Ir),n=We(ji),s=be(()=>{const c=Pe(e.to);return t.resolve(c)}),r=be(()=>{const{matched:c}=s.value,{length:l}=c,u=c[l-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(Pn.bind(null,u));if(d>-1)return d;const g=oa(c[l-2]);return l>1&&oa(u)===g&&f[f.length-1].path!==g?f.findIndex(Pn.bind(null,c[l-2])):d}),i=be(()=>r.value>-1&&Jh(n.params,s.value.params)),o=be(()=>r.value>-1&&r.value===n.matched.length-1&&dl(n.params,s.value.params));function a(c={}){if(qh(c)){const l=t[Pe(e.replace)?"replace":"push"](Pe(e.to)).catch(rs);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:s,href:be(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}function Gh(e){return e.length===1?e[0]:e}const Kh=Mn({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:ia,setup(e,{slots:t}){const n=bs(ia(e)),{options:s}=We(Ir),r=be(()=>({[aa(e.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[aa(e.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&Gh(t.default(n));return e.custom?i:Qc("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),zh=Kh;function qh(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Jh(e,t){for(const n in t){const s=t[n],r=e[n];if(typeof s=="string"){if(s!==r)return!1}else if(!et(r)||r.length!==s.length||s.some((i,o)=>i.valueOf()!==r[o].valueOf()))return!1}return!0}function oa(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const aa=(e,t,n)=>e??t??n,Yh=Mn({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const s=We(gi),r=be(()=>e.route||s.value),i=We(Qo,0),o=be(()=>{let l=Pe(i);const{matched:u}=r.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),a=be(()=>r.value.matched[o.value]);Ls(Qo,be(()=>o.value+1)),Ls(gl,a),Ls(gi,r);const c=fe();return on(()=>[c.value,a.value,e.name],([l,u,f],[d,g,_])=>{u&&(u.instances[f]=l,g&&g!==u&&l&&l===d&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),l&&u&&(!g||!Pn(u,g)||!d)&&(u.enterCallbacks[f]||[]).forEach(w=>w(l))},{flush:"post"}),()=>{const l=r.value,u=e.name,f=a.value,d=f&&f.components[u];if(!d)return ca(n.default,{Component:d,route:l});const g=f.props[u],_=g?g===!0?l.params:typeof g=="function"?g(l):g:null,R=Qc(d,oe({},_,t,{onVnodeUnmounted:P=>{P.component.isUnmounted&&(f.instances[u]=null)},ref:c}));return ca(n.default,{Component:R,route:l})||R}}});function ca(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const Xh=Yh;function Qh(e){const t=Bh(e.routes,e),n=e.parseQuery||Ih,s=e.stringifyQuery||Xo,r=e.history,i=Wn(),o=Wn(),a=Wn(),c=ju(Nt);let l=Nt;mn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Vr.bind(null,b=>""+b),f=Vr.bind(null,oh),d=Vr.bind(null,ps);function g(b,U){let x,$;return hl(b)?(x=t.getRecordMatcher(b),$=U):$=b,t.addRoute($,x)}function _(b){const U=t.getRecordMatcher(b);U&&t.removeRoute(U)}function w(){return t.getRoutes().map(b=>b.record)}function R(b){return!!t.getRecordMatcher(b)}function P(b,U){if(U=oe({},U||c.value),typeof b=="string"){const m=Hr(n,b,U.path),y=t.resolve({path:m.path},U),E=r.createHref(m.fullPath);return oe(m,y,{params:d(y.params),hash:ps(m.hash),redirectedFrom:void 0,href:E})}let x;if(b.path!=null)x=oe({},b,{path:Hr(n,b.path,U.path).path});else{const m=oe({},b.params);for(const y in m)m[y]==null&&delete m[y];x=oe({},b,{params:f(m)}),U.params=f(U.params)}const $=t.resolve(x,U),ee=b.hash||"";$.params=u(d($.params));const h=lh(s,oe({},b,{hash:sh(ee),path:$.path})),p=r.createHref(h);return oe({fullPath:h,hash:ee,query:s===Xo?Sh(b.query):b.query||{}},$,{redirectedFrom:void 0,href:p})}function I(b){return typeof b=="string"?Hr(n,b,c.value.path):oe({},b)}function S(b,U){if(l!==b)return On(ye.NAVIGATION_CANCELLED,{from:U,to:b})}function k(b){return G(b)}function V(b){return k(oe(I(b),{replace:!0}))}function q(b,U){const x=b.matched[b.matched.length-1];if(x&&x.redirect){const{redirect:$}=x;let ee=typeof $=="function"?$(b,U):$;return typeof ee=="string"&&(ee=ee.includes("?")||ee.includes("#")?ee=I(ee):{path:ee},ee.params={}),oe({query:b.query,hash:b.hash,params:ee.path!=null?{}:b.params},ee)}}function G(b,U){const x=l=P(b),$=c.value,ee=b.state,h=b.force,p=b.replace===!0,m=q(x,$);if(m)return G(oe(I(m),{state:typeof m=="object"?oe({},ee,m.state):ee,force:h,replace:p}),U||x);const y=x;y.redirectedFrom=U;let E;return!h&&uh(s,$,x)&&(E=On(ye.NAVIGATION_DUPLICATED,{to:y,from:$}),Me($,$,!0,!1)),(E?Promise.resolve(E):X(y,$)).catch(v=>_t(v)?_t(v,ye.NAVIGATION_GUARD_REDIRECT)?v:$e(v):Z(v,y,$)).then(v=>{if(v){if(_t(v,ye.NAVIGATION_GUARD_REDIRECT))return G(oe({replace:p},I(v.to),{state:typeof v.to=="object"?oe({},ee,v.to.state):ee,force:h}),U||y)}else v=O(y,$,!0,p,ee);return H(y,$,v),v})}function F(b,U){const x=S(b,U);return x?Promise.reject(x):Promise.resolve()}function M(b){const U=dn.values().next().value;return U&&typeof U.runWithContext=="function"?U.runWithContext(b):b()}function X(b,U){let x;const[$,ee,h]=Ch(b,U);x=Wr($.reverse(),"beforeRouteLeave",b,U);for(const m of $)m.leaveGuards.forEach(y=>{x.push(Ft(y,b,U))});const p=F.bind(null,b,U);return x.push(p),Ke(x).then(()=>{x=[];for(const m of i.list())x.push(Ft(m,b,U));return x.push(p),Ke(x)}).then(()=>{x=Wr(ee,"beforeRouteUpdate",b,U);for(const m of ee)m.updateGuards.forEach(y=>{x.push(Ft(y,b,U))});return x.push(p),Ke(x)}).then(()=>{x=[];for(const m of h)if(m.beforeEnter)if(et(m.beforeEnter))for(const y of m.beforeEnter)x.push(Ft(y,b,U));else x.push(Ft(m.beforeEnter,b,U));return x.push(p),Ke(x)}).then(()=>(b.matched.forEach(m=>m.enterCallbacks={}),x=Wr(h,"beforeRouteEnter",b,U,M),x.push(p),Ke(x))).then(()=>{x=[];for(const m of o.list())x.push(Ft(m,b,U));return x.push(p),Ke(x)}).catch(m=>_t(m,ye.NAVIGATION_CANCELLED)?m:Promise.reject(m))}function H(b,U,x){a.list().forEach($=>M(()=>$(b,U,x)))}function O(b,U,x,$,ee){const h=S(b,U);if(h)return h;const p=U===Nt,m=mn?history.state:{};x&&($||p?r.replace(b.fullPath,oe({scroll:p&&m&&m.scroll},ee)):r.push(b.fullPath,ee)),c.value=b,Me(b,U,x,p),$e()}let re;function ke(){re||(re=r.listen((b,U,x)=>{if(!Xt.listening)return;const $=P(b),ee=q($,Xt.currentRoute.value);if(ee){G(oe(ee,{replace:!0,force:!0}),$).catch(rs);return}l=$;const h=c.value;mn&&yh(Yo(h.fullPath,x.delta),Er()),X($,h).catch(p=>_t(p,ye.NAVIGATION_ABORTED|ye.NAVIGATION_CANCELLED)?p:_t(p,ye.NAVIGATION_GUARD_REDIRECT)?(G(oe(I(p.to),{force:!0}),$).then(m=>{_t(m,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&!x.delta&&x.type===hi.pop&&r.go(-1,!1)}).catch(rs),Promise.reject()):(x.delta&&r.go(-x.delta,!1),Z(p,$,h))).then(p=>{p=p||O($,h,!1),p&&(x.delta&&!_t(p,ye.NAVIGATION_CANCELLED)?r.go(-x.delta,!1):x.type===hi.pop&&_t(p,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),H($,h,p)}).catch(rs)}))}let Ge=Wn(),ie=Wn(),J;function Z(b,U,x){$e(b);const $=ie.list();return $.length?$.forEach(ee=>ee(b,U,x)):console.error(b),Promise.reject(b)}function me(){return J&&c.value!==Nt?Promise.resolve():new Promise((b,U)=>{Ge.add([b,U])})}function $e(b){return J||(J=!b,ke(),Ge.list().forEach(([U,x])=>b?x(b):U()),Ge.reset()),b}function Me(b,U,x,$){const{scrollBehavior:ee}=e;if(!mn||!ee)return Promise.resolve();const h=!x&&vh(Yo(b.fullPath,0))||($||!x)&&history.state&&history.state.scroll||null;return gr().then(()=>ee(b,U,h)).then(p=>p&&_h(p)).catch(p=>Z(p,b,U))}const Se=b=>r.go(b);let fn;const dn=new Set,Xt={currentRoute:c,listening:!0,addRoute:g,removeRoute:_,clearRoutes:t.clearRoutes,hasRoute:R,getRoutes:w,resolve:P,options:e,push:k,replace:V,go:Se,back:()=>Se(-1),forward:()=>Se(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:ie.add,isReady:me,install(b){b.component("RouterLink",zh),b.component("RouterView",Xh),b.config.globalProperties.$router=Xt,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>Pe(c)}),mn&&!fn&&c.value===Nt&&(fn=!0,k(r.location).catch($=>{}));const U={};for(const $ in Nt)Object.defineProperty(U,$,{get:()=>c.value[$],enumerable:!0});b.provide(Ir,Xt),b.provide(ji,hc(U)),b.provide(gi,c);const x=b.unmount;dn.add(b),b.unmount=function(){dn.delete(b),dn.size<1&&(l=Nt,re&&re(),re=null,c.value=Nt,fn=!1,J=!1),x()}}};function Ke(b){return b.reduce((U,x)=>U.then(()=>M(x)),Promise.resolve())}return Xt}function Dv(){return We(Ir)}function Zh(e){return We(ji)}const ep=()=>{};var la={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=r&63|128):(r&64512)===55296&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=r&63|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=r&63|128)}return t},tp=function(e){const t=[];let n=0,s=0;for(;n<e.length;){const r=e[n++];if(r<128)t[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=e[n++],o=e[n++],a=e[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;t[s++]=String.fromCharCode(55296+(c>>10)),t[s++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],o=e[n++];t[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return t.join("")},bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<e.length;r+=3){const i=e[r],o=r+1<e.length,a=o?e[r+1]:0,c=r+2<e.length,l=c?e[r+2]:0,u=i>>2,f=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(d=64)),s.push(n[u],n[f],n[d],n[g])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(vl(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):tp(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<e.length;){const i=n[e.charAt(r++)],a=r<e.length?n[e.charAt(r)]:0;++r;const l=r<e.length?n[e.charAt(r)]:64;++r;const f=r<e.length?n[e.charAt(r)]:64;if(++r,i==null||a==null||l==null||f==null)throw new np;const d=i<<2|a>>4;if(s.push(d),l!==64){const g=a<<4&240|l>>2;if(s.push(g),f!==64){const _=l<<6&192|f;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class np extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sp=function(e){const t=vl(e);return bl.encodeByteArray(t,!0)},wl=function(e){return sp(e).replace(/\./g,"")},El=function(e){try{return bl.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=()=>rp().__FIREBASE_DEFAULTS__,op=()=>{if(typeof process>"u"||typeof la>"u")return;const e=la.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},ap=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&El(e[1]);return t&&JSON.parse(t)},Wi=()=>{try{return ep()||ip()||op()||ap()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},cp=e=>{var t,n;return(n=(t=Wi())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},Il=()=>{var e;return(e=Wi())==null?void 0:e.config},Sl=e=>{var t;return(t=Wi())==null?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sr(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function up(e){return(await fetch(e,{credentials:"include"})).ok}const is={};function fp(){const e={prod:[],emulator:[]};for(const t of Object.keys(is))is[t]?e.emulator.push(t):e.prod.push(t);return e}function dp(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let ua=!1;function hp(e,t){if(typeof window>"u"||typeof document>"u"||!Sr(window.location.host)||is[e]===t||is[e]||ua)return;is[e]=t;function n(d){return`__firebase__banner__${d}`}const s="__firebase__banner",i=fp().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,g){d.setAttribute("width","24"),d.setAttribute("id",g),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{ua=!0,o()},d}function u(d,g){d.setAttribute("id",g),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function f(){const d=dp(s),g=n("text"),_=document.getElementById(g)||document.createElement("span"),w=n("learnmore"),R=document.getElementById(w)||document.createElement("a"),P=n("preprendIcon"),I=document.getElementById(P)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const S=d.element;a(S),u(R,w);const k=l();c(I,P),S.append(I,_,R,k),document.body.appendChild(S)}i?(_.innerText="Preview backend disconnected.",I.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(I.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",g)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Le())}function gp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mp(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function _p(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yp(){const e=Le();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function vp(){try{return typeof indexedDB=="object"}catch{return!1}}function bp(){return new Promise((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;t(((i=r.error)==null?void 0:i.message)||"")}}catch(n){t(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="FirebaseError";class Jt extends Error{constructor(t,n,s){super(n),this.code=t,this.customData=s,this.name=wp,Object.setPrototypeOf(this,Jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Is.prototype.create)}}class Is{constructor(t,n,s){this.service=t,this.serviceName=n,this.errors=s}create(t,...n){const s=n[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?Ep(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Jt(r,a,s)}}function Ep(e,t){return e.replace(Ip,(n,s)=>{const r=t[s];return r!=null?String(r):`<${s}?>`})}const Ip=/\{\$([^}]+)}/g;function Sp(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function kn(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const r of n){if(!s.includes(r))return!1;const i=e[r],o=t[r];if(fa(i)&&fa(o)){if(!kn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function fa(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach(r=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function Kn(e){const t={};return e.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");t[decodeURIComponent(r)]=decodeURIComponent(i)}}),t}function zn(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function Tp(e,t){const n=new Cp(e,t);return n.subscribe.bind(n)}class Cp{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(s=>{this.error(s)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,s){let r;if(t===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Ap(t,["next","error","complete"])?r=t:r={next:t,error:n,complete:s},r.next===void 0&&(r.next=Gr),r.error===void 0&&(r.error=Gr),r.complete===void 0&&(r.complete=Gr);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ap(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Gr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(e){return e&&e._delegate?e._delegate:e}class Nn{constructor(t,n,s){this.name=t,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const s=new lp;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Op(t))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(t=nn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=nn){return this.instances.has(t)}getOptions(t=nn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(t,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Pp(t),options:n}),this.instances.set(t,s),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=nn){return this.component?this.component.multipleInstances?t:nn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pp(e){return e===nn?void 0:e}function Op(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Rp(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(de||(de={}));const Np={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},Dp=de.INFO,xp={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},Lp=(e,t,...n)=>{if(t<e.logLevel)return;const s=new Date().toISOString(),r=xp[t];if(r)console[r](`[${s}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Tl{constructor(t){this.name=t,this._logLevel=Dp,this._logHandler=Lp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in de))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Np[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...t),this._logHandler(this,de.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...t),this._logHandler(this,de.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,de.INFO,...t),this._logHandler(this,de.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,de.WARN,...t),this._logHandler(this,de.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...t),this._logHandler(this,de.ERROR,...t)}}const Mp=(e,t)=>t.some(n=>e instanceof n);let da,ha;function Up(){return da||(da=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fp(){return ha||(ha=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cl=new WeakMap,mi=new WeakMap,Al=new WeakMap,Kr=new WeakMap,Gi=new WeakMap;function $p(e){const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{n(Gt(e.result)),r()},o=()=>{s(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Cl.set(n,e)}).catch(()=>{}),Gi.set(t,e),t}function Bp(e){if(mi.has(e))return;const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)});mi.set(e,t)}let _i={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return mi.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Al.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Gt(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Vp(e){_i=e(_i)}function Hp(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const s=e.call(zr(this),t,...n);return Al.set(s,t.sort?t.sort():[t]),Gt(s)}:Fp().includes(e)?function(...t){return e.apply(zr(this),t),Gt(Cl.get(this))}:function(...t){return Gt(e.apply(zr(this),t))}}function jp(e){return typeof e=="function"?Hp(e):(e instanceof IDBTransaction&&Bp(e),Mp(e,Up())?new Proxy(e,_i):e)}function Gt(e){if(e instanceof IDBRequest)return $p(e);if(Kr.has(e))return Kr.get(e);const t=jp(e);return t!==e&&(Kr.set(e,t),Gi.set(t,e)),t}const zr=e=>Gi.get(e);function Wp(e,t,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(e,t),a=Gt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Gt(o.result),c.oldVersion,c.newVersion,Gt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Gp=["get","getKey","getAll","getAllKeys","count"],Kp=["put","add","delete","clear"],qr=new Map;function pa(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(qr.get(t))return qr.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,r=Kp.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Gp.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return qr.set(t,i),i}Vp(e=>({...e,get:(t,n,s)=>pa(t,n)||e.get(t,n,s),has:(t,n)=>!!pa(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qp(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function qp(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const yi="@firebase/app",ga="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new Tl("@firebase/app"),Jp="@firebase/app-compat",Yp="@firebase/analytics-compat",Xp="@firebase/analytics",Qp="@firebase/app-check-compat",Zp="@firebase/app-check",eg="@firebase/auth",tg="@firebase/auth-compat",ng="@firebase/database",sg="@firebase/data-connect",rg="@firebase/database-compat",ig="@firebase/functions",og="@firebase/functions-compat",ag="@firebase/installations",cg="@firebase/installations-compat",lg="@firebase/messaging",ug="@firebase/messaging-compat",fg="@firebase/performance",dg="@firebase/performance-compat",hg="@firebase/remote-config",pg="@firebase/remote-config-compat",gg="@firebase/storage",mg="@firebase/storage-compat",_g="@firebase/firestore",yg="@firebase/ai",vg="@firebase/firestore-compat",bg="firebase",wg="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="[DEFAULT]",Eg={[yi]:"fire-core",[Jp]:"fire-core-compat",[Xp]:"fire-analytics",[Yp]:"fire-analytics-compat",[Zp]:"fire-app-check",[Qp]:"fire-app-check-compat",[eg]:"fire-auth",[tg]:"fire-auth-compat",[ng]:"fire-rtdb",[sg]:"fire-data-connect",[rg]:"fire-rtdb-compat",[ig]:"fire-fn",[og]:"fire-fn-compat",[ag]:"fire-iid",[cg]:"fire-iid-compat",[lg]:"fire-fcm",[ug]:"fire-fcm-compat",[fg]:"fire-perf",[dg]:"fire-perf-compat",[hg]:"fire-rc",[pg]:"fire-rc-compat",[gg]:"fire-gcs",[mg]:"fire-gcs-compat",[_g]:"fire-fst",[vg]:"fire-fst-compat",[yg]:"fire-vertex","fire-js":"fire-js",[bg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs=new Map,Ig=new Map,bi=new Map;function ma(e,t){try{e.container.addComponent(t)}catch(n){Rt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function gs(e){const t=e.name;if(bi.has(t))return Rt.debug(`There were multiple attempts to register component ${t}.`),!1;bi.set(t,e);for(const n of Zs.values())ma(n,e);for(const n of Ig.values())ma(n,e);return!0}function Rl(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function lt(e){return e==null?!1:e.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new Is("app","Firebase",Sg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(t,n,s){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=wg;function Pl(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const s={name:vi,automaticDataCollectionEnabled:!0,...t},r=s.name;if(typeof r!="string"||!r)throw Kt.create("bad-app-name",{appName:String(r)});if(n||(n=Il()),!n)throw Kt.create("no-options");const i=Zs.get(r);if(i){if(kn(n,i.options)&&kn(s,i.config))return i;throw Kt.create("duplicate-app",{appName:r})}const o=new kp(r);for(const c of bi.values())o.addComponent(c);const a=new Tg(n,s,o);return Zs.set(r,a),a}function Cg(e=vi){const t=Zs.get(e);if(!t&&e===vi&&Il())return Pl();if(!t)throw Kt.create("no-app",{appName:e});return t}function wn(e,t,n){let s=Eg[e]??e;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=t.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${t}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Rt.warn(o.join(" "));return}gs(new Nn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag="firebase-heartbeat-database",Rg=1,ms="firebase-heartbeat-store";let Jr=null;function Ol(){return Jr||(Jr=Wp(Ag,Rg,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(ms)}catch(n){console.warn(n)}}}}).catch(e=>{throw Kt.create("idb-open",{originalErrorMessage:e.message})})),Jr}async function Pg(e){try{const n=(await Ol()).transaction(ms),s=await n.objectStore(ms).get(kl(e));return await n.done,s}catch(t){if(t instanceof Jt)Rt.warn(t.message);else{const n=Kt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Rt.warn(n.message)}}}async function _a(e,t){try{const s=(await Ol()).transaction(ms,"readwrite");await s.objectStore(ms).put(t,kl(e)),await s.done}catch(n){if(n instanceof Jt)Rt.warn(n.message);else{const s=Kt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Rt.warn(s.message)}}}function kl(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og=1024,kg=30;class Ng{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xg(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var t,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ya();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>kg){const o=Lg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Rt.warn(s)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ya(),{heartbeatsToSend:s,unsentEntries:r}=Dg(this._heartbeatsCache.heartbeats),i=wl(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Rt.warn(n),""}}}function ya(){return new Date().toISOString().substring(0,10)}function Dg(e,t=Og){const n=[];let s=e.slice();for(const r of e){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),va(n)>t){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),va(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class xg{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vp()?bp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Pg(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return _a(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return _a(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function va(e){return wl(JSON.stringify({version:2,heartbeats:e})).length}function Lg(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let s=1;s<e.length;s++)e[s].date<n&&(n=e[s].date,t=s);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(e){gs(new Nn("platform-logger",t=>new zp(t),"PRIVATE")),gs(new Nn("heartbeat",t=>new Ng(t),"PRIVATE")),wn(yi,ga,e),wn(yi,ga,"esm2020"),wn("fire-js","")}Mg("");function Nl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ug=Nl,Dl=new Is("auth","Firebase",Nl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new Tl("@firebase/auth");function Fg(e,...t){er.logLevel<=de.WARN&&er.warn(`Auth (${Ts}): ${e}`,...t)}function $s(e,...t){er.logLevel<=de.ERROR&&er.error(`Auth (${Ts}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(e,...t){throw Ki(e,...t)}function dt(e,...t){return Ki(e,...t)}function xl(e,t,n){const s={...Ug(),[t]:n};return new Is("auth","Firebase",s).create(t,{appName:e.name})}function zt(e){return xl(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ki(e,...t){if(typeof e!="string"){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return Dl.create(e,...t)}function K(e,t,...n){if(!e)throw Ki(t,...n)}function Et(e){const t="INTERNAL ASSERTION FAILED: "+e;throw $s(t),new Error(t)}function Pt(e,t){e||Et(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.href)||""}function $g(){return ba()==="http:"||ba()==="https:"}function ba(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($g()||mp()||"connection"in navigator)?navigator.onLine:!0}function Vg(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(t,n){this.shortDelay=t,this.longDelay=n,Pt(n>t,"Short delay should be less than long delay!"),this.isMobile=pp()||_p()}get(){return Bg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(e,t){Pt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{static initialize(t,n,s){this.fetchImpl=t,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Et("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Et("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Et("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Wg=new Cs(3e4,6e4);function un(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Yt(e,t,n,s,r={}){return Ml(e,r,async()=>{let i={},o={};s&&(t==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ss({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const l={method:t,headers:c,...i};return gp()||(l.referrerPolicy="no-referrer"),e.emulatorConfig&&Sr(e.emulatorConfig.host)&&(l.credentials="include"),Ll.fetch()(await Ul(e,e.config.apiHost,n,a),l)})}async function Ml(e,t,n){e._canInitEmulator=!1;const s={...Hg,...t};try{const r=new Kg(e),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ds(e,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ds(e,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ds(e,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ds(e,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw xl(e,u,l);tt(e,u)}}catch(r){if(r instanceof Jt)throw r;tt(e,"network-request-failed",{message:String(r)})}}async function Tr(e,t,n,s,r={}){const i=await Yt(e,t,n,s,r);return"mfaPendingCredential"in i&&tt(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ul(e,t,n,s){const r=`${t}${n}?${s}`,i=e,o=i.config.emulator?zi(e.config,r):`${e.config.apiScheme}://${r}`;return jg.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function Gg(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Kg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(dt(this.auth,"network-request-failed")),Wg.get())})}}function Ds(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=dt(e,t,s);return r.customData._tokenResponse=n,r}function wa(e){return e!==void 0&&e.enterprise!==void 0}class zg{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===t)return Gg(n.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function qg(e,t){return Yt(e,"GET","/v2/recaptchaConfig",un(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jg(e,t){return Yt(e,"POST","/v1/accounts:delete",t)}async function tr(e,t){return Yt(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Yg(e,t=!1){const n=kt(e),s=await n.getIdToken(t),r=qi(s);K(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:os(Yr(r.auth_time)),issuedAtTime:os(Yr(r.iat)),expirationTime:os(Yr(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Yr(e){return Number(e)*1e3}function qi(e){const[t,n,s]=e.split(".");if(t===void 0||n===void 0||s===void 0)return $s("JWT malformed, contained fewer than 3 sections"),null;try{const r=El(n);return r?JSON.parse(r):($s("Failed to decode base64 JWT payload"),null)}catch(r){return $s("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Ea(e){const t=qi(e);return K(t,"internal-error"),K(typeof t.exp<"u","internal-error"),K(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _s(e,t,n=!1){if(n)return t;try{return await t}catch(s){throw s instanceof Jt&&Xg(s)&&e.auth.currentUser===e&&await e.auth.signOut(),s}}function Xg({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=os(this.lastLoginAt),this.creationTime=os(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nr(e){var f;const t=e.auth,n=await e.getIdToken(),s=await _s(e,tr(t,{idToken:n}));K(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];e._notifyReloadListener(r);const i=(f=r.providerUserInfo)!=null&&f.length?Fl(r.providerUserInfo):[],o=em(e.providerData,i),a=e.isAnonymous,c=!(e.email&&r.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Ei(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(e,u)}async function Zg(e){const t=kt(e);await nr(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function em(e,t){return[...e.filter(s=>!t.some(r=>r.providerId===s.providerId)),...t]}function Fl(e){return e.map(({providerId:t,...n})=>({providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tm(e,t){const n=await Ml(e,{},async()=>{const s=Ss({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,o=await Ul(e,r,"/v1/token",`key=${i}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return e.emulatorConfig&&Sr(e.emulatorConfig.host)&&(c.credentials="include"),Ll.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function nm(e,t){return Yt(e,"POST","/v2/accounts:revokeToken",un(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){K(t.idToken,"internal-error"),K(typeof t.idToken<"u","internal-error"),K(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Ea(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){K(t.length!==0,"internal-error");const n=Ea(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(K(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await tm(t,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(t,n,s){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(t,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new En;return s&&(K(typeof s=="string","internal-error",{appName:t}),o.refreshToken=s),r&&(K(typeof r=="string","internal-error",{appName:t}),o.accessToken=r),i&&(K(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new En,this.toJSON())}_performRefresh(){return Et("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(e,t){K(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class Xe{constructor({uid:t,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Qg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ei(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(t){const n=await _s(this,this.stsTokenManager.getToken(this.auth,t));return K(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return Yg(this,t)}reload(){return Zg(this)}_assign(t){this!==t&&(K(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>({...n})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new Xe({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(t){K(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let s=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),s=!0),n&&await nr(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(lt(this.auth.app))return Promise.reject(zt(this.auth));const t=await this.getIdToken();return await _s(this,Jg(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:f,emailVerified:d,isAnonymous:g,providerData:_,stsTokenManager:w}=n;K(f&&w,t,"internal-error");const R=En.fromJSON(this.name,w);K(typeof f=="string",t,"internal-error"),Dt(s,t.name),Dt(r,t.name),K(typeof d=="boolean",t,"internal-error"),K(typeof g=="boolean",t,"internal-error"),Dt(i,t.name),Dt(o,t.name),Dt(a,t.name),Dt(c,t.name),Dt(l,t.name),Dt(u,t.name);const P=new Xe({uid:f,auth:t,email:r,emailVerified:d,displayName:s,isAnonymous:g,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:R,createdAt:l,lastLoginAt:u});return _&&Array.isArray(_)&&(P.providerData=_.map(I=>({...I}))),c&&(P._redirectEventId=c),P}static async _fromIdTokenResponse(t,n,s=!1){const r=new En;r.updateFromServerResponse(n);const i=new Xe({uid:n.localId,auth:t,stsTokenManager:r,isAnonymous:s});return await nr(i),i}static async _fromGetAccountInfoResponse(t,n,s){const r=n.users[0];K(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Fl(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),a=new En;a.updateFromIdToken(s);const c=new Xe({uid:r.localId,auth:t,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Ei(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=new Map;function It(e){Pt(e instanceof Function,"Expected a class definition");let t=Ia.get(e);return t?(Pt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Ia.set(e,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}$l.type="NONE";const Sa=$l;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(e,t,n){return`firebase:${e}:${t}:${n}`}class In{constructor(t,n,s){this.persistence=t,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Bs(this.userKey,r.apiKey,i),this.fullPersistenceKey=Bs("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const n=await tr(this.auth,{idToken:t}).catch(()=>{});return n?Xe._fromGetAccountInfoResponse(this.auth,n,t):null}return Xe._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,s="authUser"){if(!n.length)return new In(It(Sa),t,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||It(Sa);const o=Bs(s,t.config.apiKey,t.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let f;if(typeof u=="string"){const d=await tr(t,{idToken:u}).catch(()=>{});if(!d)break;f=await Xe._fromGetAccountInfoResponse(t,d,u)}else f=Xe._fromJSON(t,u);l!==i&&(a=f),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new In(i,t,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new In(i,t,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(jl(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Bl(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Gl(t))return"Blackberry";if(Kl(t))return"Webos";if(Vl(t))return"Safari";if((t.includes("chrome/")||Hl(t))&&!t.includes("edge/"))return"Chrome";if(Wl(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=e.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Bl(e=Le()){return/firefox\//i.test(e)}function Vl(e=Le()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Hl(e=Le()){return/crios\//i.test(e)}function jl(e=Le()){return/iemobile/i.test(e)}function Wl(e=Le()){return/android/i.test(e)}function Gl(e=Le()){return/blackberry/i.test(e)}function Kl(e=Le()){return/webos/i.test(e)}function Ji(e=Le()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function sm(e=Le()){var t;return Ji(e)&&!!((t=window.navigator)!=null&&t.standalone)}function rm(){return yp()&&document.documentMode===10}function zl(e=Le()){return Ji(e)||Wl(e)||Kl(e)||Gl(e)||/windows phone/i.test(e)||jl(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(e,t=[]){let n;switch(e){case"Browser":n=Ta(Le());break;case"Worker":n=`${Ta(Le())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ts}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const s=i=>new Promise((o,a)=>{try{const c=t(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const s of this.queue)await s(t),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function om(e,t={}){return Yt(e,"GET","/v2/passwordPolicy",un(e,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const am=6;class cm{constructor(t){var s;const n=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??am,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=t.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,n),this.validatePasswordCharacterOptions(t,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(t,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=t.length>=s),r&&(n.meetsMaxPasswordLength=t.length<=r)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<t.length;r++)s=t.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(t,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(t,n,s,r){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ca(this),this.idTokenSubscription=new Ca(this),this.beforeStateQueue=new im(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=It(n)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await In.create(this,t),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await tr(this,{idToken:t}),s=await Xe._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(lt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(t);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return K(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await nr(t)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Vg()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(lt(this.app))return Promise.reject(zt(this));const n=t?kt(t):null;return n&&K(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&K(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return lt(this.app)?Promise.reject(zt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return lt(this.app)?Promise.reject(zt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(It(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await om(this),n=new cm(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Is("auth","Firebase",t())}onAuthStateChanged(t,n,s){return this.registerStateListener(this.authStateSubscription,t,n,s)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,s){return this.registerStateListener(this.idTokenSubscription,t,n,s)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const s=this.onAuthStateChanged(()=>{s(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await nm(this,s)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,n){const s=await this.getOrInitRedirectPersistenceManager(n);return t===null?s.removeCurrentUser():s.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&It(t)||this._popupRedirectResolver;K(n,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[It(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===t?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(K(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=t.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=t.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return K(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=ql(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var n;if(lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return t!=null&&t.error&&Fg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Fn(e){return kt(e)}class Ca{constructor(t){this.auth=t,this.observer=null,this.addObserver=Tp(n=>this.observer=n)}get next(){return K(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function um(e){Cr=e}function Jl(e){return Cr.loadJS(e)}function fm(){return Cr.recaptchaEnterpriseScript}function dm(){return Cr.gapiScript}function hm(e){return`__${e}${Math.floor(Math.random()*1e6)}`}class pm{constructor(){this.enterprise=new gm}ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}class gm{ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}const mm="recaptcha-enterprise",Yl="NO_RECAPTCHA";class _m{constructor(t){this.type=mm,this.auth=Fn(t)}async verify(t="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{qg(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new zg(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(i,o,a){const c=window.grecaptcha;wa(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:t}).then(l=>{o(l)}).catch(()=>{o(Yl)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new pm().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&wa(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=fm();c.length!==0&&(c+=a),Jl(c).then(()=>{r(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Aa(e,t,n,s=!1,r=!1){const i=new _m(e);let o;if(r)o=Yl;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...t};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ra(e,t,n,s,r){var i;if((i=e._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Aa(e,t,n,n==="getOobCode");return s(e,o)}else return s(e,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Aa(e,t,n,n==="getOobCode");return s(e,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ym(e,t){const n=Rl(e,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(kn(i,t??{}))return r;tt(r,"already-initialized")}return n.initialize({options:t})}function vm(e,t){const n=(t==null?void 0:t.persistence)||[],s=(Array.isArray(n)?n:[n]).map(It);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,t==null?void 0:t.popupRedirectResolver)}function bm(e,t,n){const s=Fn(e);K(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const r=!1,i=Xl(t),{host:o,port:a}=wm(t),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){K(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),K(kn(l,s.config.emulator)&&kn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,Sr(o)?(up(`${i}//${o}${c}`),hp("Auth",!0)):Em()}function Xl(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function wm(e){const t=Xl(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Pa(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Pa(o)}}}function Pa(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function Em(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return Et("not implemented")}_getIdTokenResponse(t){return Et("not implemented")}_linkToIdToken(t,n){return Et("not implemented")}_getReauthenticationResolver(t){return Et("not implemented")}}async function Im(e,t){return Yt(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sm(e,t){return Tr(e,"POST","/v1/accounts:signInWithPassword",un(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tm(e,t){return Tr(e,"POST","/v1/accounts:signInWithEmailLink",un(e,t))}async function Cm(e,t){return Tr(e,"POST","/v1/accounts:signInWithEmailLink",un(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends Yi{constructor(t,n,s,r=null){super("password",s),this._email=t,this._password=n,this._tenantId=r}static _fromEmailAndPassword(t,n){return new ys(t,n,"password")}static _fromEmailAndCode(t,n,s=null){return new ys(t,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(t,n,"signInWithPassword",Sm);case"emailLink":return Tm(t,{email:this._email,oobCode:this._password});default:tt(t,"internal-error")}}async _linkToIdToken(t,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(t,s,"signUpPassword",Im);case"emailLink":return Cm(t,{idToken:n,email:this._email,oobCode:this._password});default:tt(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(e,t){return Tr(e,"POST","/v1/accounts:signInWithIdp",un(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="http://localhost";class cn extends Yi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new cn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):tt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new cn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const n=this.buildRequest();return Sn(t,n)}_linkToIdToken(t,n){const s=this.buildRequest();return s.idToken=n,Sn(t,s)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,Sn(t,n)}buildRequest(){const t={requestUri:Am,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=Ss(n)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rm(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Pm(e){const t=Kn(zn(e)).link,n=t?Kn(zn(t)).deep_link_id:null,s=Kn(zn(e)).deep_link_id;return(s?Kn(zn(s)).link:null)||s||n||t||e}class Xi{constructor(t){const n=Kn(zn(t)),s=n.apiKey??null,r=n.oobCode??null,i=Rm(n.mode??null);K(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(t){const n=Pm(t);try{return new Xi(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(){this.providerId=$n.PROVIDER_ID}static credential(t,n){return ys._fromEmailAndPassword(t,n)}static credentialWithLink(t,n){const s=Xi.parseLink(n);return K(s,"argument-error"),ys._fromEmailAndCode(t,s.code,s.tenantId)}}$n.PROVIDER_ID="password";$n.EMAIL_PASSWORD_SIGN_IN_METHOD="password";$n.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As extends Ql{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends As{constructor(){super("facebook.com")}static credential(t){return cn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Bt.credentialFromTaggedObject(t)}static credentialFromError(t){return Bt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Bt.credential(t.oauthAccessToken)}catch{return null}}}Bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends As{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return cn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return Vt.credentialFromTaggedObject(t)}static credentialFromError(t){return Vt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:s}=t;if(!n&&!s)return null;try{return Vt.credential(n,s)}catch{return null}}}Vt.GOOGLE_SIGN_IN_METHOD="google.com";Vt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends As{constructor(){super("github.com")}static credential(t){return cn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Ht.credentialFromTaggedObject(t)}static credentialFromError(t){return Ht.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Ht.credential(t.oauthAccessToken)}catch{return null}}}Ht.GITHUB_SIGN_IN_METHOD="github.com";Ht.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends As{constructor(){super("twitter.com")}static credential(t,n){return cn._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return jt.credentialFromTaggedObject(t)}static credentialFromError(t){return jt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=t;if(!n||!s)return null;try{return jt.credential(n,s)}catch{return null}}}jt.TWITTER_SIGN_IN_METHOD="twitter.com";jt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,s,r=!1){const i=await Xe._fromIdTokenResponse(t,s,r),o=Oa(s);return new Dn({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(t,n,s){await t._updateTokensIfNecessary(s,!0);const r=Oa(s);return new Dn({user:t,providerId:r,_tokenResponse:s,operationType:n})}}function Oa(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends Jt{constructor(t,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,sr.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(t,n,s,r){return new sr(t,n,s,r)}}function Zl(e,t,n,s){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?sr._fromErrorAndOperation(e,i,t,s):i})}async function Om(e,t,n=!1){const s=await _s(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Dn._forOperation(e,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function km(e,t,n=!1){const{auth:s}=e;if(lt(s.app))return Promise.reject(zt(s));const r="reauthenticate";try{const i=await _s(e,Zl(s,r,t,e),n);K(i.idToken,s,"internal-error");const o=qi(i.idToken);K(o,s,"internal-error");const{sub:a}=o;return K(e.uid===a,s,"user-mismatch"),Dn._forOperation(e,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&tt(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eu(e,t,n=!1){if(lt(e.app))return Promise.reject(zt(e));const s="signIn",r=await Zl(e,s,t),i=await Dn._fromIdTokenResponse(e,s,r);return n||await e._updateCurrentUser(i.user),i}async function Nm(e,t){return eu(Fn(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dm(e){const t=Fn(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}function xm(e,t,n){return lt(e.app)?Promise.reject(zt(e)):Nm(kt(e),$n.credential(t,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Dm(e),s})}function Lm(e,t,n,s){return kt(e).onIdTokenChanged(t,n,s)}function Mm(e,t,n){return kt(e).beforeAuthStateChanged(t,n)}function Um(e,t,n,s){return kt(e).onAuthStateChanged(t,n,s)}function Fm(e){return kt(e).signOut()}const rr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(rr,"1"),this.storage.removeItem(rr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m=1e3,Bm=10;class nu extends tu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zl(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&t(n,r,s)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=t.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);rm()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,Bm):r()}notifyListeners(t,n){this.localCache[t]=n;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:s}),!0)})},$m)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}nu.type="LOCAL";const Vm=nu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su extends tu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}su.type="SESSION";const ru=su;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hm(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(r=>r.isListeningto(t));if(n)return n;const s=new Ar(t);return this.receivers.push(s),s}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await Hm(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ar.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(e="",t=10){let n="";for(let s=0;s<t;s++)n+=Math.floor(Math.random()*10);return e+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Qi("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const d=f;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return window}function Wm(e){ht().location.href=e}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(){return typeof ht().WorkerGlobalScope<"u"&&typeof ht().importScripts=="function"}async function Gm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Km(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)==null?void 0:e.controller)||null}function zm(){return iu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="firebaseLocalStorageDb",qm=1,ir="firebaseLocalStorage",au="fbase_key";class Rs{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Rr(e,t){return e.transaction([ir],t?"readwrite":"readonly").objectStore(ir)}function Jm(){const e=indexedDB.deleteDatabase(ou);return new Rs(e).toPromise()}function Ii(){const e=indexedDB.open(ou,qm);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const s=e.result;try{s.createObjectStore(ir,{keyPath:au})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const s=e.result;s.objectStoreNames.contains(ir)?t(s):(s.close(),await Jm(),t(await Ii()))})})}async function ka(e,t,n){const s=Rr(e,!0).put({[au]:t,value:n});return new Rs(s).toPromise()}async function Ym(e,t){const n=Rr(e,!1).get(t),s=await new Rs(n).toPromise();return s===void 0?null:s.value}function Na(e,t){const n=Rr(e,!0).delete(t);return new Rs(n).toPromise()}const Xm=800,Qm=3;class cu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ii(),this.db)}async _withRetries(t){let n=0;for(;;)try{const s=await this._openDb();return await t(s)}catch(s){if(n++>Qm)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return iu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ar._getInstance(zm()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await Gm(),!this.activeServiceWorker)return;this.sender=new jm(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(n=t[0])!=null&&n.fulfilled&&(s=t[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||Km()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await Ii();return await ka(t,rr,"1"),await Na(t,rr),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>ka(s,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(s=>Ym(s,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Na(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(r=>{const i=Rr(r,!1).getAll();return new Rs(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(t.length!==0)for(const{fbase_key:r,value:i}of t)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(t,n){this.localCache[t]=n;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cu.type="LOCAL";const Zm=cu;new Cs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(e,t){return t?It(t):(K(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi extends Yi{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Sn(t,this._buildIdpRequest())}_linkToIdToken(t,n){return Sn(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return Sn(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function t_(e){return eu(e.auth,new Zi(e),e.bypassAuthState)}function n_(e){const{auth:t,user:n}=e;return K(n,t,"internal-error"),km(n,new Zi(e),e.bypassAuthState)}async function s_(e){const{auth:t,user:n}=e;return K(n,t,"internal-error"),Om(n,new Zi(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(t,n,s,r,i=!1){this.auth=t,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return t_;case"linkViaPopup":case"linkViaRedirect":return s_;case"reauthViaPopup":case"reauthViaRedirect":return n_;default:tt(this.auth,"internal-error")}}resolve(t){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=new Cs(2e3,1e4);class _n extends lu{constructor(t,n,s,r,i){super(t,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,_n.currentPopupAction&&_n.currentPopupAction.cancel(),_n.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return K(t,this.auth,"internal-error"),t}async onExecution(){Pt(this.filter.length===1,"Popup operations only handle one event");const t=Qi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(dt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(dt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,_n.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(dt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,r_.get())};t()}}_n.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_="pendingRedirect",Vs=new Map;class o_ extends lu{constructor(t,n,s=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let t=Vs.get(this.auth._key());if(!t){try{const s=await a_(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(s)}catch(n){t=()=>Promise.reject(n)}Vs.set(this.auth._key(),t)}return this.bypassAuthState||Vs.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function a_(e,t){const n=u_(t),s=l_(e);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function c_(e,t){Vs.set(e._key(),t)}function l_(e){return It(e._redirectPersistence)}function u_(e){return Bs(i_,e.config.apiKey,e.name)}async function f_(e,t,n=!1){if(lt(e.app))return Promise.reject(zt(e));const s=Fn(e),r=e_(s,t),o=await new o_(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=600*1e3;class h_{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(t,s)&&(n=!0,this.sendToConsumer(t,s),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!p_(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var s;if(t.error&&!uu(t)){const r=((s=t.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(dt(this.auth,r))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const s=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&s}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=d_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Da(t))}saveEventToCache(t){this.cachedEventUids.add(Da(t)),this.lastProcessedEventTime=Date.now()}}function Da(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function uu({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function p_(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return uu(e);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function g_(e,t={}){return Yt(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,__=/^https?/;async function y_(e){if(e.config.emulator)return;const{authorizedDomains:t}=await g_(e);for(const n of t)try{if(v_(n))return}catch{}tt(e,"unauthorized-domain")}function v_(e){const t=wi(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const o=new URL(e);return o.hostname===""&&s===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!__.test(n))return!1;if(m_.test(e))return s===e;const r=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_=new Cs(3e4,6e4);function xa(){const e=ht().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function w_(e){return new Promise((t,n)=>{var r,i,o;function s(){xa(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{xa(),n(dt(e,"network-request-failed"))},timeout:b_.get()})}if((i=(r=ht().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=ht().gapi)!=null&&o.load)s();else{const a=hm("iframefcb");return ht()[a]=()=>{gapi.load?s():n(dt(e,"network-request-failed"))},Jl(`${dm()}?onload=${a}`).catch(c=>n(c))}}).catch(t=>{throw Hs=null,t})}let Hs=null;function E_(e){return Hs=Hs||w_(e),Hs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_=new Cs(5e3,15e3),S_="__/auth/iframe",T_="emulator/auth/iframe",C_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},A_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function R_(e){const t=e.config;K(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?zi(t,T_):`https://${e.config.authDomain}/${S_}`,s={apiKey:t.apiKey,appName:e.name,v:Ts},r=A_.get(e.config.apiHost);r&&(s.eid=r);const i=e._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ss(s).slice(1)}`}async function P_(e){const t=await E_(e),n=ht().gapi;return K(n,e,"internal-error"),t.open({where:document.body,url:R_(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:C_,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=dt(e,"network-request-failed"),a=ht().setTimeout(()=>{i(o)},I_.get());function c(){ht().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},k_=500,N_=600,D_="_blank",x_="http://localhost";class La{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function L_(e,t,n,s=k_,r=N_){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...O_,width:s.toString(),height:r.toString(),top:i,left:o},l=Le().toLowerCase();n&&(a=Hl(l)?D_:n),Bl(l)&&(t=t||x_,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[g,_])=>`${d}${g}=${_},`,"");if(sm(l)&&a!=="_self")return M_(t||"",a),new La(null);const f=window.open(t||"",a,u);K(f,e,"popup-blocked");try{f.focus()}catch{}return new La(f)}function M_(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U_="__/auth/handler",F_="emulator/auth/handler",$_=encodeURIComponent("fac");async function Ma(e,t,n,s,r,i){K(e.config.authDomain,e,"auth-domain-config-required"),K(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:Ts,eventId:r};if(t instanceof Ql){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",Sp(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[u,f]of Object.entries({}))o[u]=f}if(t instanceof As){const u=t.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await e._getAppCheckToken(),l=c?`#${$_}=${encodeURIComponent(c)}`:"";return`${B_(e)}?${Ss(a).slice(1)}${l}`}function B_({config:e}){return e.emulator?zi(e,F_):`https://${e.authDomain}/${U_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="webStorageSupport";class V_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ru,this._completeRedirectFn=f_,this._overrideRedirectResult=c_}async _openPopup(t,n,s,r){var o;Pt((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Ma(t,n,s,wi(),r);return L_(t,i,Qi())}async _openRedirect(t,n,s,r){await this._originValidation(t);const i=await Ma(t,n,s,wi(),r);return Wm(i),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Pt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(t);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(t){const n=await P_(t),s=new h_(t);return n.register("authEvent",r=>(K(r==null?void 0:r.authEvent,t,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:s},this.iframes[t._key()]=n,s}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(Xr,{type:Xr},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[Xr];i!==void 0&&n(!!i),tt(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=y_(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return zl()||Vl()||Ji()}}const H_=V_;var Ua="@firebase/auth",Fa="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(s=>{t((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){K(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W_(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function G_(e){gs(new Nn("auth",(t,{options:n})=>{const s=t.getProvider("app").getImmediate(),r=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;K(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ql(e)},l=new lm(s,r,i,c);return vm(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,s)=>{t.getProvider("auth-internal").initialize()})),gs(new Nn("auth-internal",t=>{const n=Fn(t.getProvider("auth").getImmediate());return(s=>new j_(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),wn(Ua,Fa,W_(e)),wn(Ua,Fa,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_=300,z_=Sl("authIdTokenMaxAge")||K_;let $a=null;const q_=e=>async t=>{const n=t&&await t.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>z_)return;const r=n==null?void 0:n.token;$a!==r&&($a=r,await fetch(e,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Tn(e=Cg()){const t=Rl(e,"auth");if(t.isInitialized())return t.getImmediate();const n=ym(e,{popupRedirectResolver:H_,persistence:[Zm,Vm,ru]}),s=Sl("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=q_(i.toString());Mm(n,o,()=>o(n.currentUser)),Lm(n,a=>o(a))}}const r=cp("auth");return r&&bm(n,`http://${r}`),n}function J_(){var e;return((e=document.getElementsByTagName("head"))==null?void 0:e[0])??document}um({loadJS(e){return new Promise((t,n)=>{const s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=r=>{const i=dt("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",J_().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});G_("Browser");const Si="https://api.poranos.com";async function fu(){const t=Tn().currentUser;if(!t)throw new Error("Not authenticated");return t.getIdToken()}async function xv(e){const t=await fu(),n=await fetch(`${Si}${e}`,{headers:{Authorization:`Bearer ${t}`,Accept:"application/json"}});if(n.status===401){const r=await Tn().currentUser.getIdToken(!0),i=await fetch(`${Si}${e}`,{headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!i.ok)throw new Error(`GET ${e}: ${i.status}`);return i.json()}if(!n.ok)throw new Error(`GET ${e}: ${n.status}`);return n.json()}async function Y_(e,t){const n=await fu(),s=await fetch(`${Si}${e}`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json",Accept:"application/json"},body:t?JSON.stringify(t):void 0});if(!s.ok)throw new Error(`POST ${e}: ${s.status}`);return s.json()}const eo=Kd("auth",()=>{const e=fe(null),t=fe(!1),n=fe(!1),s=fe(""),r=be(()=>{var c;return((c=e.value)==null?void 0:c.email)||""});async function i(c,l){s.value="";try{const u=Tn(),f=await xm(u,c,l),d=await f.user.getIdToken(!0);localStorage.setItem("idToken",d);try{await Y_("/login/",{idToken:d})}catch{}e.value=f.user,t.value=!0}catch(u){switch(u.code){case"auth/invalid-credential":case"auth/user-not-found":s.value="メールアドレスまたはパスワードが正しくありません";break;case"auth/too-many-requests":s.value="ログイン試行が多すぎます。しばらくお待ちください";break;default:s.value=u.message||"ログインに失敗しました"}throw u}}async function o(){const c=Tn();await Fm(c),localStorage.removeItem("idToken"),e.value=null,t.value=!1}function a(){return new Promise(c=>{const l=Tn();Um(l,async u=>{if(u){e.value=u,t.value=!0;try{const f=await u.getIdToken();localStorage.setItem("idToken",f)}catch{}}else e.value=null,t.value=!1;n.value=!0,c()})})}return{user:e,isAuthenticated:t,initialized:n,error:s,userEmail:r,login:i,logout:o,initAuth:a}}),Pr="";async function X_(e){const t=await fetch(`${Pr}${e}`);if(!t.ok)throw new Error(`GET ${e} failed: ${t.status}`);return t.json()}async function qn(e,t){const n=await fetch(`${Pr}${e}`,{method:"POST",headers:t instanceof FormData?{}:{"Content-Type":"application/json"},body:t instanceof FormData?t:t?JSON.stringify(t):void 0});if(!n.ok)throw new Error(`POST ${e} failed: ${n.status}`);return n.json()}function Lv(e){return`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}${e}`}async function Mv(e){const t=localStorage.getItem("idToken")||"",n=await fetch(`${Pr}${e}`,{headers:{Authorization:`Bearer ${t}`}});if(!n.ok)throw new Error(`GET ${e} failed: ${n.status}`);return n.json()}async function Uv(e,t){const n=localStorage.getItem("idToken")||"",s=await fetch(`${Pr}${e}`,{method:"POST",headers:{Authorization:`Bearer ${n}`},body:void 0});if(!s.ok)throw new Error(`POST ${e} failed: ${s.status}`);return s.json()}function Q_(){const e=fe({connected:!1,width:0,height:0,error:null,fps:0});let t=null,n=null,s=null,r=null,i=null,o=!1,a=0,c=null,l=0,u=null,f=0,d=null,g=640,_=!1,w=null,R=null;function P(G,F,M=640){_=!1,q(),_=!1,d=G,g=M,s=F,r=s.getContext("2d"),f=0,I(G,M)}function I(G,F){e.value={connected:!1,width:0,height:0,error:null,fps:0},o=!1,i=null,a=0,l=0,c&&clearInterval(c),c=setInterval(()=>{e.value.fps=a,a=0},1e3);const M=`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}/api/mirror/stream/${G}?max_size=${F}`;t=new WebSocket(M),t.binaryType="arraybuffer";let X=!1;t.onopen=()=>{e.value.connected=!0,f=0,console.log(`[ScrcpyStream] Connected: ${G}`)},t.onmessage=H=>{const O=H.data;if(O.byteLength===0)return;if(!X){if(O.byteLength>=12){const me=new DataView(O),$e=me.getUint32(0),Me=me.getUint32(4),Se=me.getUint32(8);e.value.width=Me,e.value.height=Se,console.log(`[ScrcpyStream] Codec: 0x${$e.toString(16)}, Size: ${Me}x${Se}`),s.width=Math.floor(Me/2),s.height=Se,S($e),X=!0}return}if(O.byteLength<5)return;const re=new DataView(O),ke=re.getUint8(0),Ge=re.getUint32(1);if(O.byteLength<5+Ge)return;const ie=new Uint8Array(O,5,Ge),J=(ke&1)!==0,Z=(ke&2)!==0;if(J){i=new Uint8Array(ie),console.log(`[ScrcpyStream] SPS/PPS received: ${i.length} bytes, first bytes:`,Array.from(i.slice(0,16)).map(me=>me.toString(16).padStart(2,"0")).join(" "));return}if(!n||n.state!=="configured"){a===0&&console.warn(`[ScrcpyStream] Decoder not ready: state=${n==null?void 0:n.state}`);return}if(a<3&&console.log(`[ScrcpyStream] Packet: config=${J} key=${Z} size=${Ge} first bytes:`,Array.from(ie.slice(0,8)).map(me=>me.toString(16).padStart(2,"0")).join(" ")),!o){if(!Z||!i){a===0&&console.log(`[ScrcpyStream] Waiting for keyframe+SPS (key=${Z}, hasSPS=${!!i})`);return}o=!0,console.log("[ScrcpyStream] First keyframe! Decoding starts")}try{let me;Z&&i?(me=new Uint8Array(i.length+ie.length),me.set(i,0),me.set(ie,i.length)):me=ie;const $e=new EncodedVideoChunk({type:Z?"key":"delta",timestamp:l,data:me});l+=33333,n.decode($e),a++}catch(me){console.error("[ScrcpyStream] Decode error:",me)}},t.onerror=()=>{},t.onclose=H=>{if(e.value.connected=!1,console.log(`[ScrcpyStream] Disconnected: ${G} (code=${H.code})`),!_&&d&&s)if(f<10){f++;const re=H.code===1013?15e3:2e3*f,ke=Math.min(re,3e4);console.log(`[ScrcpyStream] Retry ${f}/10 in ${ke}ms...`),e.value.error=null,u=setTimeout(()=>{!_&&d&&s&&I(d,g)},ke)}else e.value.error="Connection failed after retries"}}function S(G){n&&n.state!=="closed"&&n.close();const F=G===1748121140?"avc1.640029":"hev1.1.6.L120.90";n=new VideoDecoder({output:M=>{w&&w.close(),w=M},error:M=>{console.error("[ScrcpyDecoder] error:",M),e.value.error=M.message}}),n.configure({codec:F,optimizeForLatency:!0}),console.log(`[ScrcpyStream] Decoder configured: ${F}`),k()}function k(){if(R!==null)return;function G(){if(w&&r&&s){const F=w;w=null;const M=F.displayWidth/2,X=F.displayHeight;(s.width!==M||s.height!==X)&&(s.width=M,s.height=X),r.drawImage(F,0,0,M,X,0,0,M,X),F.close()}R=requestAnimationFrame(G)}R=requestAnimationFrame(G)}function V(){R!==null&&(cancelAnimationFrame(R),R=null),w&&(w.close(),w=null)}function q(){if(_=!0,V(),u&&(clearTimeout(u),u=null),c&&(clearInterval(c),c=null),t&&(t.onmessage=null,t.onerror=null,t.onclose=null,t.close(),t=null),n&&n.state!=="closed")try{n.close()}catch{}n=null,s=null,r=null,i=null,o=!1,d=null,f=0,e.value={connected:!1,width:0,height:0,error:null,fps:0}}return Un(()=>{q()}),{state:e,connect:P,disconnect:q}}const Z_={class:"modal-dialog"},ey={class:"modal-title"},ty={class:"modal-message"},ny={class:"modal-actions"},sy=["disabled"],ry=["disabled"],iy=Mn({__name:"ConfirmModal",props:{title:{},message:{},confirmLabel:{},confirmClass:{},loading:{type:Boolean},hideCancel:{type:Boolean}},emits:["confirm","cancel"],setup(e){return(t,n)=>(Q(),fs(uf,{to:"body"},[C("div",{class:"modal-overlay",onClick:n[2]||(n[2]=xd(s=>t.$emit("cancel"),["self"]))},[C("div",Z_,[C("div",ey,ue(e.title),1),C("div",ty,ue(e.message),1),C("div",ny,[e.hideCancel?Ie("",!0):(Q(),ne("button",{key:0,class:"btn btn-secondary btn-sm",disabled:e.loading,onClick:n[0]||(n[0]=s=>t.$emit("cancel"))}," Cancel ",8,sy)),C("button",{class:ze(["btn btn-sm",e.confirmClass||"btn-danger"]),disabled:e.loading,onClick:n[1]||(n[1]=s=>t.$emit("confirm"))},ue(e.loading?"Processing...":e.confirmLabel||"Confirm"),11,ry)])])])]))}}),to=(e,t)=>{const n=e.__vccOpts||e;for(const[s,r]of t)n[s]=r;return n},Ba=to(iy,[["__scopeId","data-v-a1be75d5"]]),oy={class:"scrcpy-header"},ay={class:"device-label"},cy={key:0,class:"wifi-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor"},ly={key:1,class:"status-dot connected",title:"Stream"},uy={key:2,class:"status-dot",title:"Stream"},fy=["disabled"],dy=["disabled"],hy={key:5,class:"header-volume"},py=["max","value","disabled"],gy={class:"volume-value"},my=["title"],_y={key:0,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},yy={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},vy={class:"scrcpy-video"},by={key:0,class:"error-overlay"},wy={key:1,class:"loading-overlay"},Ey={class:"info-row"},Iy={class:"info-value"},Sy={key:0,class:"info-row"},Ty=["title"],Cy={key:1,class:"info-row"},Ay={class:"info-value controller-batteries"},Ry={key:2,class:"info-row"},Py={class:"info-value"},Oy={class:"info-row"},ky={class:"info-row"},Ny={class:"info-value"},Dy={class:"info-row"},xy={key:3,class:"info-row"},Ly=["title"],My={key:4,class:"info-row"},Uy={class:"info-value"},Fy={style:{color:"var(--text-secondary)"}},$y={class:"info-row"},By={class:"overlay-actions"},Vy=["disabled","title"],Hy=["disabled"],jy=Mn({__name:"ScrcpyPlayer",props:{device:{},compact:{type:Boolean,default:!1}},setup(e){const t=e,n=eo(),s=fe(null),{state:r,connect:i,disconnect:o}=Q_(),a=fe(!1),c=fe(!1);function l(H){return H?H>50?"var(--success)":H>20?"var(--warning)":"var(--danger)":"var(--text-secondary)"}const u=be(()=>(t.device.sync_connected_via||"").includes("localhost")?"local":"remote"),f=be(()=>(t.device.sync_connected_via||"").includes("localhost")?"adb reverse":"WiFi direct"),d=be(()=>{const H=t.device.storage_used_gb,O=t.device.storage_total_gb;if(H==null||O==null||O===0)return"var(--text-secondary)";const re=H/O*100;return re>90?"var(--danger)":re>75?"var(--warning)":"var(--success)"}),g=be(()=>!n.userEmail||!t.device.app_account?!1:t.device.app_account===n.userEmail),_=fe("");async function w(){const H=n.userEmail;if(!H){_.value="Management UIにログインしてください";return}const O=t.device.sync_room||"",re=t.device.sync_client_id||0;if(!O||!re){_.value="デバイスがSync Serverに接続されていません";return}try{await qn("/api/remote/command",{room_name:O,command:"change_account",params:{email:H,target_client_id:re}})}catch(ke){_.value=`アカウント設定に失敗しました: ${ke.message}`}}const R=fe(t.device.volume_music??0);let P=null;on(()=>t.device.volume_music,H=>{H!=null&&!P&&(R.value=H)});function I(H){const O=parseInt(H.target.value);R.value=O,P&&clearTimeout(P),P=setTimeout(()=>{S(O),P=null},300)}async function S(H){const O=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(O)}/volume`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({volume:H})})}catch{}}async function k(){const H=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(H)}/launch`,{method:"POST"})}catch{}}async function V(){const H=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(H)}/stop`,{method:"POST"})}catch{}}const q=fe(!1);async function G(){const H=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(H)}/reboot`,{method:"POST"})}catch{}}const F=()=>t.device.adb_serial||t.device.serial;function M(){a.value=!a.value}function X(H){H.key==="Escape"&&a.value&&(a.value=!1)}return _r(()=>{s.value&&i(F(),s.value),window.addEventListener("keydown",X)}),Un(()=>{o(),window.removeEventListener("keydown",X)}),on(()=>t.device.serial,()=>{s.value&&i(F(),s.value)}),(H,O)=>(Q(),ne("div",{class:ze(["scrcpy-card",{fullscreen:a.value}])},[C("div",oy,[C("span",ay,ue(e.device.serial),1),e.device.connection_type==="wifi"?(Q(),ne("svg",cy,[...O[6]||(O[6]=[C("path",{d:"M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"},null,-1)])])):Ie("",!0),Pe(r).connected?(Q(),ne("span",ly)):(Q(),ne("span",uy)),C("span",{class:ze(["status-dot",e.device.sync_connected?"sync-on":"sync-off"]),title:"Sync Server"},null,2),O[9]||(O[9]=C("div",{class:"header-spacer"},null,-1)),e.device.app_running?(Q(),ne("button",{key:4,class:"btn btn-danger btn-xs",disabled:e.device.status!=="device",onClick:V},"Stop",8,dy)):(Q(),ne("button",{key:3,class:"btn btn-success btn-xs",disabled:!e.device.app_installed||e.device.status!=="device",onClick:k},"Launch",8,fy)),e.device.volume_music!=null?(Q(),ne("div",hy,[C("input",{type:"range",class:"volume-slider",min:0,max:e.device.volume_max??15,value:R.value,disabled:e.device.status!=="device",onInput:I},null,40,py),C("span",gy,ue(R.value),1)])):Ie("",!0),C("button",{class:"fullscreen-btn",onClick:M,title:a.value?"Exit fullscreen":"Fullscreen"},[a.value?(Q(),ne("svg",yy,[...O[8]||(O[8]=[C("polyline",{points:"4 14 10 14 10 20"},null,-1),C("polyline",{points:"20 10 14 10 14 4"},null,-1),C("line",{x1:"14",y1:"10",x2:"21",y2:"3"},null,-1),C("line",{x1:"3",y1:"21",x2:"10",y2:"14"},null,-1)])])):(Q(),ne("svg",_y,[...O[7]||(O[7]=[C("polyline",{points:"15 3 21 3 21 9"},null,-1),C("polyline",{points:"9 21 3 21 3 15"},null,-1),C("line",{x1:"21",y1:"3",x2:"14",y2:"10"},null,-1),C("line",{x1:"3",y1:"21",x2:"10",y2:"14"},null,-1)])]))],8,my)]),C("div",vy,[C("canvas",{ref_key:"canvasRef",ref:s,class:"scrcpy-canvas"},null,512),Pe(r).error?(Q(),ne("div",by,ue(Pe(r).error),1)):Pe(r).connected?Ie("",!0):(Q(),ne("div",wy,"Connecting...")),C("div",{class:ze(["device-info-overlay",{open:c.value}])},[C("div",Ey,[O[10]||(O[10]=C("span",{class:"info-label"},"Device",-1)),C("span",Iy,ue(e.device.model),1)]),e.device.battery_level!=null?(Q(),ne("div",Sy,[O[11]||(O[11]=C("span",{class:"info-label"},"Head Battery",-1)),C("span",{class:"info-value",style:Ye({color:l(e.device.battery_level)})},[at(ue(e.device.battery_level)+"% ",1),e.device.battery_plugged?(Q(),ne("span",{key:0,class:ze(["charger-badge",e.device.battery_weak_charger===!1?"fast":"slow"]),title:e.device.battery_charging_ma?`${e.device.battery_charging_ma}mA`:""}," ⚡"+ue(e.device.battery_weak_charger===!1?"Fast":"Slow"),11,Ty)):Ie("",!0)],4)])):Ie("",!0),e.device.controller_left_battery!=null||e.device.controller_right_battery!=null?(Q(),ne("div",Cy,[O[12]||(O[12]=C("span",{class:"info-label"},"Controller Batteries",-1)),C("span",Ay,[e.device.controller_left_battery!=null?(Q(),ne("span",{key:0,style:Ye({color:l(e.device.controller_left_battery)})}," L:"+ue(e.device.controller_left_battery)+"% ",5)):Ie("",!0),e.device.controller_right_battery!=null?(Q(),ne("span",{key:1,style:Ye({color:l(e.device.controller_right_battery)})}," R:"+ue(e.device.controller_right_battery)+"% ",5)):Ie("",!0)])])):Ie("",!0),e.device.wifi_ssid?(Q(),ne("div",Ry,[O[13]||(O[13]=C("span",{class:"info-label"},"WiFi",-1)),C("span",Py,ue(e.device.wifi_ssid),1)])):Ie("",!0),C("div",Oy,[O[14]||(O[14]=C("span",{class:"info-label"},"Provisioned",-1)),C("span",{class:"info-value",style:Ye({color:e.device.provisioned?"var(--success)":"var(--danger)"})},ue(e.device.provisioned?"Yes":"No"),5)]),C("div",ky,[O[15]||(O[15]=C("span",{class:"info-label"},"App",-1)),C("span",Ny,ue(e.device.app_installed?`v${e.device.app_version||"?"}`:"Not installed"),1)]),C("div",Dy,[O[16]||(O[16]=C("span",{class:"info-label"},"Poranos_LT",-1)),C("span",{class:"info-value",style:Ye({color:e.device.app_running?"var(--success)":"var(--text-secondary)"})},ue(e.device.app_running?"Running":"Stopped"),5)]),e.device.app_account?(Q(),ne("div",xy,[O[17]||(O[17]=C("span",{class:"info-label"},"Account",-1)),C("span",{class:"info-value account-value",title:e.device.app_account},ue(e.device.app_account),9,Ly)])):Ie("",!0),e.device.storage_total_gb!=null?(Q(),ne("div",My,[O[18]||(O[18]=C("span",{class:"info-label"},"Storage",-1)),C("span",Uy,[C("span",{style:Ye({color:d.value})},ue(e.device.storage_used_gb)+"GB",5),C("span",Fy," / "+ue(e.device.storage_total_gb)+"GB",1)])])):Ie("",!0),C("div",$y,[O[20]||(O[20]=C("span",{class:"info-label"},"Sync",-1)),C("span",{class:"info-value",style:Ye({color:e.device.sync_connected?"var(--success)":"var(--text-secondary)"})},[e.device.sync_connected?(Q(),ne(qe,{key:0},[O[19]||(O[19]=at(" Connected ",-1)),C("span",{class:ze(["sync-via-badge",u.value])},ue(f.value),3)],64)):(Q(),ne(qe,{key:1},[at("Disconnected")],64))],4)]),C("div",By,[C("button",{class:"btn btn-account btn-xs",disabled:!e.device.sync_connected||g.value,title:g.value?"Already set to this account":"Set account from logged-in user",onClick:w},"Account Change",8,Vy),C("button",{class:"btn btn-warning btn-xs",disabled:e.device.status!=="device",onClick:O[0]||(O[0]=re=>q.value=!0)},"Reboot",8,Hy)])],2)]),C("button",{class:ze(["info-toggle-btn",{open:c.value}]),onClick:O[1]||(O[1]=re=>c.value=!c.value),title:"Device info"},[...O[21]||(O[21]=[C("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"},[C("polyline",{points:"18 15 12 9 6 15"})],-1)])],2),q.value?(Q(),fs(Ba,{key:0,title:"Reboot Device",message:`${e.device.model} (${e.device.serial}) を再起動しますか？`,"confirm-label":"Reboot","confirm-class":"btn-warning",onConfirm:O[2]||(O[2]=re=>{q.value=!1,G()}),onCancel:O[3]||(O[3]=re=>q.value=!1)},null,8,["message"])):Ie("",!0),_.value?(Q(),fs(Ba,{key:1,title:"通知",message:_.value,"confirm-label":"OK","confirm-class":"btn-primary","hide-cancel":"",onConfirm:O[4]||(O[4]=re=>_.value=""),onCancel:O[5]||(O[5]=re=>_.value="")},null,8,["message"])):Ie("",!0)],2))}}),Wy=to(jy,[["__scopeId","data-v-119a7c33"]]),Gy={key:0,class:"sidebar-status"},Ky={key:1,class:"sidebar-status"},zy=Mn({__name:"DeviceSidebar",props:{expanded:{type:Boolean}},setup(e){const t=e,n=fe([]),s=fe(!1);let r=null;const i=fe(null),o=fe(0),a=fe(0);let c=null;const l=be(()=>{const d=n.value.length;if(!t.expanded||d===0)return 1;const g=o.value,_=a.value-40;if(g===0||_===0)return 1;const w=4/3.5;let R=1,P=0;for(let I=1;I<=d;I++){const S=Math.ceil(d/I),k=(g-(I-1)*16)/I,V=(_-(S-1)*16)/S,q=Math.min(k,V*w);q>P&&(P=q,R=I)}return R}),u=be(()=>t.expanded?{display:"grid",gridTemplateColumns:`repeat(${l.value}, 1fr)`,gap:"1rem",alignContent:"start"}:{});async function f(d=!1){try{const w=await(await fetch(d?"/api/devices/cached":"/api/devices")).json();n.value=w.devices||[]}catch{}s.value=!0}return _r(async()=>{await f(!0),f(),r=setInterval(f,5e3),i.value&&(c=new ResizeObserver(d=>{const g=d[0];g&&(o.value=g.contentRect.width,a.value=g.contentRect.height)}),c.observe(i.value))}),Un(()=>{r&&clearInterval(r),c==null||c.disconnect()}),(d,g)=>(Q(),ne("div",{ref_key:"containerRef",ref:i,class:"device-sidebar",style:Ye(u.value)},[s.value?n.value.length===0?(Q(),ne("div",Ky,"No devices")):(Q(!0),ne(qe,{key:2},Sf(n.value,_=>(Q(),fs(Wy,{key:_.serial,device:_,compact:!e.expanded,class:"sidebar-player"},null,8,["device","compact"]))),128)):(Q(),ne("div",Gy,"Connecting..."))],4))}}),qy=to(zy,[["__scopeId","data-v-97a7e8fa"]]),Jy={class:"sidebar"},Yy={class:"sidebar-nav"},Xy={key:0},Qy={key:1},Zy={key:2},ev={class:"sidebar-controls"},tv={class:"control-row"},nv=["disabled"],sv=["disabled"],rv={class:"control-group"},iv={class:"control-row"},ov={class:"volume-value"},av=["disabled"],cv={class:"sidebar-bottom"},lv={key:0,class:"auth-info"},uv={class:"auth-email"},fv=["title"],dv={class:"area-divider-btn"},hv={class:"main-content"},pv=["title"],gv={class:"area-divider-btn"},mv=["title"],_v={class:"area-divider-btn"},yv={key:2,class:"device-sidebar-area"},vv=Mn({__name:"App",setup(e){const t=eo(),n=Zh(),s=be(()=>n.path.startsWith("/operation")),r=fe(!1),i=fe(!1),o=fe(!1),a=fe(!!document.fullscreenElement),c=fe(!1),l=fe(!1),u=fe(!1),f=fe(8),d=fe(!1);_r(async()=>{try{const I=await X_("/api/devices/auto-launch");c.value=I.enabled}catch{}});async function g(){l.value=!0;try{const I=await qn("/api/devices/auto-launch",{enabled:!c.value});c.value=I.enabled}catch{}l.value=!1}async function _(){u.value=!0;try{await qn("/api/devices/stop-all"),await qn("/api/server/reset")}catch{}u.value=!1}async function w(){d.value=!0;try{await qn("/api/devices/volume-all",{volume:f.value})}catch{}d.value=!1}function R(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}document.addEventListener("fullscreenchange",()=>{a.value=!!document.fullscreenElement,a.value?sessionStorage.setItem("kiosk","1"):sessionStorage.removeItem("kiosk")}),sessionStorage.getItem("kiosk")&&document.addEventListener("click",function I(){document.documentElement.requestFullscreen().catch(()=>{}),document.removeEventListener("click",I)},{once:!0});function P(){document.fullscreenElement&&sessionStorage.setItem("kiosk","1"),window.location.reload()}return(I,S)=>{const k=yo("router-link"),V=yo("router-view");return Q(),ne("div",{class:ze(["app-layout",{"sidebar-collapsed":r.value,"content-collapsed":i.value,"mirror-collapsed":o.value}])},[C("aside",Jy,[S[13]||(S[13]=C("div",{class:"sidebar-title"},"Poranos",-1)),C("ul",Yy,[Pe(t).isAuthenticated?(Q(),ne("li",Xy,[ve(k,{to:"/operation"},{default:tn(()=>[...S[5]||(S[5]=[at("Operation",-1)])]),_:1})])):(Q(),ne("li",Qy,[ve(k,{to:"/login"},{default:tn(()=>[...S[6]||(S[6]=[at("Login",-1)])]),_:1})])),Pe(t).isAuthenticated?(Q(),ne("li",Zy,[ve(k,{to:"/files"},{default:tn(()=>[...S[7]||(S[7]=[at("Files",-1)])]),_:1})])):Ie("",!0),C("li",null,[ve(k,{to:"/devices"},{default:tn(()=>[...S[8]||(S[8]=[at("Devices",-1)])]),_:1})]),C("li",null,[ve(k,{to:"/mirroring"},{default:tn(()=>[...S[9]||(S[9]=[at("Mirroring",-1)])]),_:1})]),C("li",null,[ve(k,{to:"/sync-server"},{default:tn(()=>[...S[10]||(S[10]=[at("Sync Server",-1)])]),_:1})])]),C("div",ev,[C("div",tv,[S[11]||(S[11]=C("span",{class:"control-label"},"Auto Launch",-1)),C("button",{class:ze(["toggle-btn",{active:c.value}]),disabled:l.value,onClick:g},ue(c.value?"ON":"OFF"),11,nv)]),C("button",{class:"btn-fullscreen btn-danger-outline",disabled:u.value,onClick:_},ue(u.value?"Stopping...":"All Stop + Reset"),9,sv),C("div",rv,[S[12]||(S[12]=C("span",{class:"control-group-label"},"All Volume",-1)),C("div",iv,[fo(C("input",{type:"range",min:"0",max:"15","onUpdate:modelValue":S[0]||(S[0]=q=>f.value=q),class:"volume-slider"},null,512),[[kd,f.value,void 0,{number:!0}]]),C("span",ov,ue(f.value),1),C("button",{class:"btn-apply",disabled:d.value,onClick:w},ue(d.value?"...":"Apply"),9,av)])])]),C("div",cv,[Pe(t).isAuthenticated?(Q(),ne("div",lv,[C("span",uv,ue(Pe(t).userEmail),1),C("button",{class:"btn-fullscreen",onClick:S[1]||(S[1]=q=>Pe(t).logout())},"Logout")])):Ie("",!0),C("button",{class:"btn-fullscreen",onClick:R},ue(a.value?"Exit Fullscreen":"Kiosk Mode"),1),C("button",{class:"btn-fullscreen",onClick:P}," Reload ")])]),C("div",{class:"area-divider",onClick:S[2]||(S[2]=q=>r.value=!r.value),title:r.value?"Show sidebar":"Hide sidebar"},[C("button",dv,ue(r.value?"»":"«"),1)],8,fv),fo(C("main",hv,[ve(V)],512),[[md,!i.value]]),s.value&&!o.value?(Q(),ne("div",{key:0,class:"area-divider",onClick:S[3]||(S[3]=q=>i.value=!i.value),title:i.value?"Show content":"Hide content"},[C("button",gv,ue(i.value?"»":"«"),1)],8,pv)):Ie("",!0),s.value&&!i.value?(Q(),ne("div",{key:1,class:"area-divider",onClick:S[4]||(S[4]=q=>o.value=!o.value),title:o.value?"Show mirroring":"Hide mirroring"},[C("button",_v,ue(o.value?"«":"»"),1)],8,mv)):Ie("",!0),s.value&&!o.value?(Q(),ne("aside",yv,[ve(qy,{expanded:i.value},null,8,["expanded"])])):Ie("",!0)],2)}}}),bv="modulepreload",wv=function(e){return"/"+e},Va={},xt=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let o=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=o(n.map(l=>{if(l=wv(l),l in Va)return;Va[l]=!0;const u=l.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":bv,u||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((g,_)=>{d.addEventListener("load",g),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},Ev=[{path:"/",redirect:"/operation"},{path:"/dashboard",redirect:"/sync-server"},{path:"/sync-server",name:"Sync Server",component:()=>xt(()=>import("./DashboardView-P73AIm0M.js"),[])},{path:"/devices",name:"Devices",component:()=>xt(()=>import("./DevicesView-sphuEVzk.js"),__vite__mapDeps([0,1]))},{path:"/mirroring",name:"Mirroring",component:()=>xt(()=>import("./MirroringView-BD6p05u8.js"),__vite__mapDeps([2,3]))},{path:"/login",name:"Login",component:()=>xt(()=>import("./LoginView-oDd7d7oU.js"),__vite__mapDeps([4,5]))},{path:"/files",name:"Files",component:()=>xt(()=>import("./FilesView-Qj_kviei.js"),__vite__mapDeps([6,7]))},{path:"/operation",name:"Operation",component:()=>xt(()=>import("./OperationView-DWXPXFzS.js"),__vite__mapDeps([8,9,10]))},{path:"/operation/:roomId/files",name:"FilePlayer",component:()=>xt(()=>import("./FilePlayerView-D_DYlIF4.js"),__vite__mapDeps([11,9,12,13]))},{path:"/operation/:roomId/movie",name:"MoviePlayer",component:()=>xt(()=>import("./MoviePlayerView-r2ynZQvJ.js"),__vite__mapDeps([14,9,12,15]))}],Iv=Qh({history:Oh(),routes:Ev});var Sv="firebase",Tv="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */wn(Sv,Tv,"app");const Cv={apiKey:"AIzaSyAVcV2-gtKWze83DMlW3gGkEXqlGvTjv0k",authDomain:"poranos.com",projectId:"poranos-prod",storageBucket:"poranos-prod.firebasestorage.app",messagingSenderId:"495088231457",appId:"1:495088231457:web:6c043dc56c0df4c2e2ef60"},Av=Pl(Cv);Tn(Av);const no=Ud(vv);no.use(Bd());no.use(Iv);const Rv=eo();Rv.initAuth().then(()=>{no.mount("#app")});export{at as A,xd as B,Ba as C,Mv as D,Uv as E,qe as F,eo as G,fo as H,md as I,bs as J,Li as K,kd as L,Dv as M,Kd as N,Tn as O,Ov as P,kv as Q,Zh as R,Wy as S,Nv as T,Pv as U,xv as V,to as _,Un as a,Q as b,ne as c,Mn as d,C as e,se as f,X_ as g,Qc as h,hr as i,gr as j,ve as k,be as l,Sf as m,ze as n,_r as o,qn as p,Lv as q,fe as r,ju as s,ue as t,Pe as u,ud as v,on as w,Ye as x,fs as y,Ie as z};
