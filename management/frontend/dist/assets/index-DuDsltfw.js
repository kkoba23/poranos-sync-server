const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DevicesView-BaQIkPx0.js","assets/DevicesView-DOKCGnQp.css","assets/MirroringView-B8wnf3Xn.js","assets/MirroringView-BQIP4Fry.css","assets/LoginView-rH5-oWqi.js","assets/LoginView-D3ACE_aq.css","assets/OperationView-BY5khPcq.js","assets/roomStore-BdGtyRmQ.js","assets/OperationView-CNz3ssp0.css","assets/FilePlayerView-C_y6fYIi.js","assets/fileStore-B_VS1GL7.js","assets/FilePlayerView-B_98vZOF.css","assets/MoviePlayerView-DGJfFQol.js","assets/MoviePlayerView-B2wSgHRD.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wi(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const le={},_n=[],ct=()=>{},Ma=()=>!1,sr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Ei=e=>e.startsWith("onUpdate:"),Se=Object.assign,Ii=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},lu=Object.prototype.hasOwnProperty,se=(e,t)=>lu.call(e,t),j=Array.isArray,yn=e=>hs(e)==="[object Map]",rr=e=>hs(e)==="[object Set]",no=e=>hs(e)==="[object Date]",z=e=>typeof e=="function",ye=e=>typeof e=="string",dt=e=>typeof e=="symbol",re=e=>e!==null&&typeof e=="object",Ua=e=>(re(e)||z(e))&&z(e.then)&&z(e.catch),Fa=Object.prototype.toString,hs=e=>Fa.call(e),uu=e=>hs(e).slice(8,-1),$a=e=>hs(e)==="[object Object]",ir=e=>ye(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Gn=wi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),or=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},fu=/-\w/g,ze=or(e=>e.replace(fu,t=>t.slice(1).toUpperCase())),du=/\B([A-Z])/g,an=or(e=>e.replace(du,"-$1").toLowerCase()),ar=or(e=>e.charAt(0).toUpperCase()+e.slice(1)),Cr=or(e=>e?`on${ar(e)}`:""),Vt=(e,t)=>!Object.is(e,t),Os=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ba=(e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})},Si=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let so;const cr=()=>so||(so=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function qe(e){if(j(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=ye(s)?mu(s):qe(s);if(r)for(const i in r)t[i]=r[i]}return t}else if(ye(e)||re(e))return e}const hu=/;(?![^(]*\))/g,pu=/:([^]+)/,gu=/\/\*[^]*?\*\//g;function mu(e){const t={};return e.replace(gu,"").split(hu).forEach(n=>{if(n){const s=n.split(pu);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function It(e){let t="";if(ye(e))t=e;else if(j(e))for(let n=0;n<e.length;n++){const s=It(e[n]);s&&(t+=s+" ")}else if(re(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const _u="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",yu=wi(_u);function Va(e){return!!e||e===""}function vu(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=ps(e[s],t[s]);return n}function ps(e,t){if(e===t)return!0;let n=no(e),s=no(t);if(n||s)return n&&s?e.getTime()===t.getTime():!1;if(n=dt(e),s=dt(t),n||s)return e===t;if(n=j(e),s=j(t),n||s)return n&&s?vu(e,t):!1;if(n=re(e),s=re(t),n||s){if(!n||!s)return!1;const r=Object.keys(e).length,i=Object.keys(t).length;if(r!==i)return!1;for(const o in e){const a=e.hasOwnProperty(o),c=t.hasOwnProperty(o);if(a&&!c||!a&&c||!ps(e[o],t[o]))return!1}}return String(e)===String(t)}function Ha(e,t){return e.findIndex(n=>ps(n,t))}const ja=e=>!!(e&&e.__v_isRef===!0),de=e=>ye(e)?e:e==null?"":j(e)||re(e)&&(e.toString===Fa||!z(e.toString))?ja(e)?de(e.value):JSON.stringify(e,Wa,2):String(e),Wa=(e,t)=>ja(t)?Wa(e,t.value):yn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[s,r],i)=>(n[Ar(s,i)+" =>"]=r,n),{})}:rr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Ar(n))}:dt(t)?Ar(t):re(t)&&!j(t)&&!$a(t)?String(t):t,Ar=(e,t="")=>{var n;return dt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ce;class Ga{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Ce,!t&&Ce&&(this.index=(Ce.scopes||(Ce.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Ce;try{return Ce=this,t()}finally{Ce=n}}}on(){++this._on===1&&(this.prevScope=Ce,Ce=this)}off(){this._on>0&&--this._on===0&&(Ce=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Ka(e){return new Ga(e)}function za(){return Ce}function bu(e,t=!1){Ce&&Ce.cleanups.push(e)}let fe;const Rr=new WeakSet;class qa{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ce&&Ce.active&&Ce.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Rr.has(this)&&(Rr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ya(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ro(this),Xa(this);const t=fe,n=Xe;fe=this,Xe=!0;try{return this.fn()}finally{Qa(this),fe=t,Xe=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ai(t);this.deps=this.depsTail=void 0,ro(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Rr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){qr(this)&&this.run()}get dirty(){return qr(this)}}let Ja=0,Kn,zn;function Ya(e,t=!1){if(e.flags|=8,t){e.next=zn,zn=e;return}e.next=Kn,Kn=e}function Ti(){Ja++}function Ci(){if(--Ja>0)return;if(zn){let t=zn;for(zn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Kn;){let t=Kn;for(Kn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function Xa(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Qa(e){let t,n=e.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),Ai(s),wu(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}e.deps=t,e.depsTail=n}function qr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Za(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Za(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ss)||(e.globalVersion=ss,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!qr(e))))return;e.flags|=2;const t=e.dep,n=fe,s=Xe;fe=e,Xe=!0;try{Xa(e);const r=e.fn(e._value);(t.version===0||Vt(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{fe=n,Xe=s,Qa(e),e.flags&=-3}}function Ai(e,t=!1){const{dep:n,prevSub:s,nextSub:r}=e;if(s&&(s.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ai(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function wu(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Xe=!0;const ec=[];function St(){ec.push(Xe),Xe=!1}function Tt(){const e=ec.pop();Xe=e===void 0?!0:e}function ro(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=fe;fe=void 0;try{t()}finally{fe=n}}}let ss=0;class Eu{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ri{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!fe||!Xe||fe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==fe)n=this.activeLink=new Eu(fe,this),fe.deps?(n.prevDep=fe.depsTail,fe.depsTail.nextDep=n,fe.depsTail=n):fe.deps=fe.depsTail=n,tc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=fe.depsTail,n.nextDep=void 0,fe.depsTail.nextDep=n,fe.depsTail=n,fe.deps===n&&(fe.deps=s)}return n}trigger(t){this.version++,ss++,this.notify(t)}notify(t){Ti();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ci()}}}function tc(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)tc(s)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const $s=new WeakMap,nn=Symbol(""),Jr=Symbol(""),rs=Symbol("");function Ae(e,t,n){if(Xe&&fe){let s=$s.get(e);s||$s.set(e,s=new Map);let r=s.get(n);r||(s.set(n,r=new Ri),r.map=s,r.key=n),r.track()}}function yt(e,t,n,s,r,i){const o=$s.get(e);if(!o){ss++;return}const a=c=>{c&&c.trigger()};if(Ti(),t==="clear")o.forEach(a);else{const c=j(e),l=c&&ir(n);if(c&&n==="length"){const u=Number(s);o.forEach((f,d)=>{(d==="length"||d===rs||!dt(d)&&d>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),l&&a(o.get(rs)),t){case"add":c?l&&a(o.get("length")):(a(o.get(nn)),yn(e)&&a(o.get(Jr)));break;case"delete":c||(a(o.get(nn)),yn(e)&&a(o.get(Jr)));break;case"set":yn(e)&&a(o.get(nn));break}}Ci()}function Iu(e,t){const n=$s.get(e);return n&&n.get(t)}function fn(e){const t=Z(e);return t===e?t:(Ae(t,"iterate",rs),je(e)?t:t.map(Qe))}function lr(e){return Ae(e=Z(e),"iterate",rs),e}function xt(e,t){return Ct(e)?Cn(lt(e)?Qe(t):t):Qe(t)}const Su={__proto__:null,[Symbol.iterator](){return Pr(this,Symbol.iterator,e=>xt(this,e))},concat(...e){return fn(this).concat(...e.map(t=>j(t)?fn(t):t))},entries(){return Pr(this,"entries",e=>(e[1]=xt(this,e[1]),e))},every(e,t){return pt(this,"every",e,t,void 0,arguments)},filter(e,t){return pt(this,"filter",e,t,n=>n.map(s=>xt(this,s)),arguments)},find(e,t){return pt(this,"find",e,t,n=>xt(this,n),arguments)},findIndex(e,t){return pt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return pt(this,"findLast",e,t,n=>xt(this,n),arguments)},findLastIndex(e,t){return pt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return pt(this,"forEach",e,t,void 0,arguments)},includes(...e){return Or(this,"includes",e)},indexOf(...e){return Or(this,"indexOf",e)},join(e){return fn(this).join(e)},lastIndexOf(...e){return Or(this,"lastIndexOf",e)},map(e,t){return pt(this,"map",e,t,void 0,arguments)},pop(){return Fn(this,"pop")},push(...e){return Fn(this,"push",e)},reduce(e,...t){return io(this,"reduce",e,t)},reduceRight(e,...t){return io(this,"reduceRight",e,t)},shift(){return Fn(this,"shift")},some(e,t){return pt(this,"some",e,t,void 0,arguments)},splice(...e){return Fn(this,"splice",e)},toReversed(){return fn(this).toReversed()},toSorted(e){return fn(this).toSorted(e)},toSpliced(...e){return fn(this).toSpliced(...e)},unshift(...e){return Fn(this,"unshift",e)},values(){return Pr(this,"values",e=>xt(this,e))}};function Pr(e,t,n){const s=lr(e),r=s[t]();return s!==e&&!je(e)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const Tu=Array.prototype;function pt(e,t,n,s,r,i){const o=lr(e),a=o!==e&&!je(e),c=o[t];if(c!==Tu[t]){const f=c.apply(e,i);return a?Qe(f):f}let l=n;o!==e&&(a?l=function(f,d){return n.call(this,xt(e,f),d,e)}:n.length>2&&(l=function(f,d){return n.call(this,f,d,e)}));const u=c.call(o,l,s);return a&&r?r(u):u}function io(e,t,n,s){const r=lr(e);let i=n;return r!==e&&(je(e)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,e)}):i=function(o,a,c){return n.call(this,o,xt(e,a),c,e)}),r[t](i,...s)}function Or(e,t,n){const s=Z(e);Ae(s,"iterate",rs);const r=s[t](...n);return(r===-1||r===!1)&&ur(n[0])?(n[0]=Z(n[0]),s[t](...n)):r}function Fn(e,t,n=[]){St(),Ti();const s=Z(e)[t].apply(e,n);return Ci(),Tt(),s}const Cu=wi("__proto__,__v_isRef,__isVue"),nc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(dt));function Au(e){dt(e)||(e=String(e));const t=Z(this);return Ae(t,"has",e),t.hasOwnProperty(e)}class sc{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?Uu:ac:i?oc:ic).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=j(t);if(!r){let c;if(o&&(c=Su[n]))return c;if(n==="hasOwnProperty")return Au}const a=Reflect.get(t,n,pe(t)?t:s);if((dt(n)?nc.has(n):Cu(n))||(r||Ae(t,"get",n),i))return a;if(pe(a)){const c=o&&ir(n)?a:a.value;return r&&re(c)?Xr(c):c}return re(a)?r?Xr(a):gs(a):a}}class rc extends sc{constructor(t=!1){super(!1,t)}set(t,n,s,r){let i=t[n];const o=j(t)&&ir(n);if(!this._isShallow){const l=Ct(i);if(!je(s)&&!Ct(s)&&(i=Z(i),s=Z(s)),!o&&pe(i)&&!pe(s))return l||(i.value=s),!0}const a=o?Number(n)<t.length:se(t,n),c=Reflect.set(t,n,s,pe(t)?t:r);return t===Z(r)&&(a?Vt(s,i)&&yt(t,"set",n,s):yt(t,"add",n,s)),c}deleteProperty(t,n){const s=se(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&s&&yt(t,"delete",n,void 0),r}has(t,n){const s=Reflect.has(t,n);return(!dt(n)||!nc.has(n))&&Ae(t,"has",n),s}ownKeys(t){return Ae(t,"iterate",j(t)?"length":nn),Reflect.ownKeys(t)}}class Ru extends sc{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Pu=new rc,Ou=new Ru,ku=new rc(!0);const Yr=e=>e,Ss=e=>Reflect.getPrototypeOf(e);function Nu(e,t,n){return function(...s){const r=this.__v_raw,i=Z(r),o=yn(i),a=e==="entries"||e===Symbol.iterator&&o,c=e==="keys"&&o,l=r[e](...s),u=n?Yr:t?Cn:Qe;return!t&&Ae(i,"iterate",c?Jr:nn),Se(Object.create(l),{next(){const{value:f,done:d}=l.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}}})}}function Ts(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Du(e,t){const n={get(r){const i=this.__v_raw,o=Z(i),a=Z(r);e||(Vt(r,a)&&Ae(o,"get",r),Ae(o,"get",a));const{has:c}=Ss(o),l=t?Yr:e?Cn:Qe;if(c.call(o,r))return l(i.get(r));if(c.call(o,a))return l(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!e&&Ae(Z(r),"iterate",nn),r.size},has(r){const i=this.__v_raw,o=Z(i),a=Z(r);return e||(Vt(r,a)&&Ae(o,"has",r),Ae(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,c=Z(a),l=t?Yr:e?Cn:Qe;return!e&&Ae(c,"iterate",nn),a.forEach((u,f)=>r.call(i,l(u),l(f),o))}};return Se(n,e?{add:Ts("add"),set:Ts("set"),delete:Ts("delete"),clear:Ts("clear")}:{add(r){!t&&!je(r)&&!Ct(r)&&(r=Z(r));const i=Z(this);return Ss(i).has.call(i,r)||(i.add(r),yt(i,"add",r,r)),this},set(r,i){!t&&!je(i)&&!Ct(i)&&(i=Z(i));const o=Z(this),{has:a,get:c}=Ss(o);let l=a.call(o,r);l||(r=Z(r),l=a.call(o,r));const u=c.call(o,r);return o.set(r,i),l?Vt(i,u)&&yt(o,"set",r,i):yt(o,"add",r,i),this},delete(r){const i=Z(this),{has:o,get:a}=Ss(i);let c=o.call(i,r);c||(r=Z(r),c=o.call(i,r)),a&&a.call(i,r);const l=i.delete(r);return c&&yt(i,"delete",r,void 0),l},clear(){const r=Z(this),i=r.size!==0,o=r.clear();return i&&yt(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Nu(r,e,t)}),n}function Pi(e,t){const n=Du(e,t);return(s,r,i)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(se(n,r)&&r in s?n:s,r,i)}const xu={get:Pi(!1,!1)},Lu={get:Pi(!1,!0)},Mu={get:Pi(!0,!1)};const ic=new WeakMap,oc=new WeakMap,ac=new WeakMap,Uu=new WeakMap;function Fu(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function $u(e){return e.__v_skip||!Object.isExtensible(e)?0:Fu(uu(e))}function gs(e){return Ct(e)?e:Oi(e,!1,Pu,xu,ic)}function cc(e){return Oi(e,!1,ku,Lu,oc)}function Xr(e){return Oi(e,!0,Ou,Mu,ac)}function Oi(e,t,n,s,r){if(!re(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=$u(e);if(i===0)return e;const o=r.get(e);if(o)return o;const a=new Proxy(e,i===2?s:n);return r.set(e,a),a}function lt(e){return Ct(e)?lt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ct(e){return!!(e&&e.__v_isReadonly)}function je(e){return!!(e&&e.__v_isShallow)}function ur(e){return e?!!e.__v_raw:!1}function Z(e){const t=e&&e.__v_raw;return t?Z(t):e}function ki(e){return!se(e,"__v_skip")&&Object.isExtensible(e)&&Ba(e,"__v_skip",!0),e}const Qe=e=>re(e)?gs(e):e,Cn=e=>re(e)?Xr(e):e;function pe(e){return e?e.__v_isRef===!0:!1}function ce(e){return lc(e,!1)}function Bu(e){return lc(e,!0)}function lc(e,t){return pe(e)?e:new Vu(e,t)}class Vu{constructor(t,n){this.dep=new Ri,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Z(t),this._value=n?t:Qe(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,s=this.__v_isShallow||je(t)||Ct(t);t=s?t:Z(t),Vt(t,n)&&(this._rawValue=t,this._value=s?t:Qe(t),this.dep.trigger())}}function Ne(e){return pe(e)?e.value:e}const Hu={get:(e,t,n)=>t==="__v_raw"?e:Ne(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return pe(r)&&!pe(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function uc(e){return lt(e)?e:new Proxy(e,Hu)}function ju(e){const t=j(e)?new Array(e.length):{};for(const n in e)t[n]=fc(e,n);return t}class Wu{constructor(t,n,s){this._object=t,this._key=n,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._raw=Z(t);let r=!0,i=t;if(!j(t)||!ir(String(n)))do r=!ur(i)||je(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Ne(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&pe(this._raw[this._key])){const n=this._object[this._key];if(pe(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Iu(this._raw,this._key)}}class Gu{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Ku(e,t,n){return pe(e)?e:z(e)?new Gu(e):re(e)&&arguments.length>1?fc(e,t,n):ce(e)}function fc(e,t,n){return new Wu(e,t,n)}class zu{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ri(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ss-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&fe!==this)return Ya(this,!0),!0}get value(){const t=this.dep.track();return Za(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function qu(e,t,n=!1){let s,r;return z(e)?s=e:(s=e.get,r=e.set),new zu(s,r,n)}const Cs={},Bs=new WeakMap;let Qt;function Ju(e,t=!1,n=Qt){if(n){let s=Bs.get(n);s||Bs.set(n,s=[]),s.push(e)}}function Yu(e,t,n=le){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:c}=n,l=O=>r?O:je(O)||r===!1||r===0?vt(O,1):vt(O);let u,f,d,g,_=!1,w=!1;if(pe(e)?(f=()=>e.value,_=je(e)):lt(e)?(f=()=>l(e),_=!0):j(e)?(w=!0,_=e.some(O=>lt(O)||je(O)),f=()=>e.map(O=>{if(pe(O))return O.value;if(lt(O))return l(O);if(z(O))return c?c(O,2):O()})):z(e)?t?f=c?()=>c(e,2):e:f=()=>{if(d){St();try{d()}finally{Tt()}}const O=Qt;Qt=u;try{return c?c(e,3,[g]):e(g)}finally{Qt=O}}:f=ct,t&&r){const O=f,V=r===!0?1/0:r;f=()=>vt(O(),V)}const P=za(),N=()=>{u.stop(),P&&P.active&&Ii(P.effects,u)};if(i&&t){const O=t;t=(...V)=>{O(...V),N()}}let E=w?new Array(e.length).fill(Cs):Cs;const T=O=>{if(!(!(u.flags&1)||!u.dirty&&!O))if(t){const V=u.run();if(r||_||(w?V.some((q,x)=>Vt(q,E[x])):Vt(V,E))){d&&d();const q=Qt;Qt=u;try{const x=[V,E===Cs?void 0:w&&E[0]===Cs?[]:E,g];E=V,c?c(t,3,x):t(...x)}finally{Qt=q}}}else u.run()};return a&&a(T),u=new qa(f),u.scheduler=o?()=>o(T,!1):T,g=O=>Ju(O,!1,u),d=u.onStop=()=>{const O=Bs.get(u);if(O){if(c)c(O,4);else for(const V of O)V();Bs.delete(u)}},t?s?T(!0):E=u.run():o?o(T.bind(null,!0),!0):u.run(),N.pause=u.pause.bind(u),N.resume=u.resume.bind(u),N.stop=N,N}function vt(e,t=1/0,n){if(t<=0||!re(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,pe(e))vt(e.value,t,n);else if(j(e))for(let s=0;s<e.length;s++)vt(e[s],t,n);else if(rr(e)||yn(e))e.forEach(s=>{vt(s,t,n)});else if($a(e)){for(const s in e)vt(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&vt(e[s],t,n)}return e}/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ms(e,t,n,s){try{return s?e(...s):e()}catch(r){fr(r,t,n)}}function ht(e,t,n,s){if(z(e)){const r=ms(e,t,n,s);return r&&Ua(r)&&r.catch(i=>{fr(i,t,n)}),r}if(j(e)){const r=[];for(let i=0;i<e.length;i++)r.push(ht(e[i],t,n,s));return r}}function fr(e,t,n,s=!0){const r=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||le;if(t){let a=t.parent;const c=t.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,c,l)===!1)return}a=a.parent}if(i){St(),ms(i,null,10,[e,c,l]),Tt();return}}Xu(e,n,r,s,o)}function Xu(e,t,n,s=!0,r=!1){if(r)throw e;console.error(e)}const ke=[];let it=-1;const vn=[];let Lt=null,hn=0;const dc=Promise.resolve();let Vs=null;function Ni(e){const t=Vs||dc;return e?t.then(this?e.bind(this):e):t}function Qu(e){let t=it+1,n=ke.length;for(;t<n;){const s=t+n>>>1,r=ke[s],i=is(r);i<e||i===e&&r.flags&2?t=s+1:n=s}return t}function Di(e){if(!(e.flags&1)){const t=is(e),n=ke[ke.length-1];!n||!(e.flags&2)&&t>=is(n)?ke.push(e):ke.splice(Qu(t),0,e),e.flags|=1,hc()}}function hc(){Vs||(Vs=dc.then(gc))}function Zu(e){j(e)?vn.push(...e):Lt&&e.id===-1?Lt.splice(hn+1,0,e):e.flags&1||(vn.push(e),e.flags|=1),hc()}function oo(e,t,n=it+1){for(;n<ke.length;n++){const s=ke[n];if(s&&s.flags&2){if(e&&s.id!==e.uid)continue;ke.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function pc(e){if(vn.length){const t=[...new Set(vn)].sort((n,s)=>is(n)-is(s));if(vn.length=0,Lt){Lt.push(...t);return}for(Lt=t,hn=0;hn<Lt.length;hn++){const n=Lt[hn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Lt=null,hn=0}}const is=e=>e.id==null?e.flags&2?-1:1/0:e.id;function gc(e){try{for(it=0;it<ke.length;it++){const t=ke[it];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),ms(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;it<ke.length;it++){const t=ke[it];t&&(t.flags&=-2)}it=-1,ke.length=0,pc(),Vs=null,(ke.length||vn.length)&&gc()}}let Ve=null,mc=null;function Hs(e){const t=Ve;return Ve=e,mc=e&&e.type.__scopeId||null,t}function pn(e,t=Ve,n){if(!t||e._n)return e;const s=(...r)=>{s._d&&Gs(-1);const i=Hs(t);let o;try{o=e(...r)}finally{Hs(i),s._d&&Gs(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function ao(e,t){if(Ve===null)return e;const n=_r(Ve),s=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[i,o,a,c=le]=t[r];i&&(z(i)&&(i={mounted:i,updated:i}),i.deep&&vt(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return e}function Jt(e,t,n,s){const r=e.dirs,i=t&&t.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let c=a.dir[s];c&&(St(),ht(c,n,8,[e.el,a,e,t]),Tt())}}function ks(e,t){if(Re){let n=Re.provides;const s=Re.parent&&Re.parent.provides;s===n&&(n=Re.provides=Object.create(s)),n[e]=t}}function We(e,t,n=!1){const s=Wc();if(s||rn){let r=rn?rn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&z(t)?t.call(s&&s.proxy):t}}function ef(){return!!(Wc()||rn)}const tf=Symbol.for("v-scx"),nf=()=>We(tf);function sn(e,t,n){return _c(e,t,n)}function _c(e,t,n=le){const{immediate:s,deep:r,flush:i,once:o}=n,a=Se({},n),c=t&&s||!t&&i!=="post";let l;if(as){if(i==="sync"){const g=nf();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=ct,g.resume=ct,g.pause=ct,g}}const u=Re;a.call=(g,_,w)=>ht(g,u,_,w);let f=!1;i==="post"?a.scheduler=g=>{Te(g,u&&u.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(g,_)=>{_?g():Di(g)}),a.augmentJob=g=>{t&&(g.flags|=4),f&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const d=Yu(e,t,a);return as&&(l?l.push(d):c&&d()),d}function sf(e,t,n){const s=this.proxy,r=ye(e)?e.includes(".")?yc(s,e):()=>s[e]:e.bind(s,s);let i;z(t)?i=t:(i=t.handler,n=t);const o=_s(this),a=_c(r,i.bind(s),n);return o(),a}function yc(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const vc=Symbol("_vte"),rf=e=>e.__isTeleport,qn=e=>e&&(e.disabled||e.disabled===""),co=e=>e&&(e.defer||e.defer===""),lo=e=>typeof SVGElement<"u"&&e instanceof SVGElement,uo=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Qr=(e,t)=>{const n=e&&e.to;return ye(n)?t?t(n):null:n},bc={name:"Teleport",__isTeleport:!0,process(e,t,n,s,r,i,o,a,c,l){const{mc:u,pc:f,pbc:d,o:{insert:g,querySelector:_,createText:w,createComment:P}}=l,N=qn(t.props);let{shapeFlag:E,children:T,dynamicChildren:O}=t;if(e==null){const V=t.el=w(""),q=t.anchor=w("");g(V,n,s),g(q,n,s);const x=(U,J)=>{E&16&&u(T,U,J,r,i,o,a,c)},C=()=>{const U=t.target=Qr(t.props,_),J=Zr(U,t,w,g);U&&(o!=="svg"&&lo(U)?o="svg":o!=="mathml"&&uo(U)&&(o="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(U),N||(x(U,J),Ns(t,!1)))};N&&(x(n,q),Ns(t,!0)),co(t.props)?(t.el.__isMounted=!1,Te(()=>{C(),delete t.el.__isMounted},i)):C()}else{if(co(t.props)&&e.el.__isMounted===!1){Te(()=>{bc.process(e,t,n,s,r,i,o,a,c,l)},i);return}t.el=e.el,t.targetStart=e.targetStart;const V=t.anchor=e.anchor,q=t.target=e.target,x=t.targetAnchor=e.targetAnchor,C=qn(e.props),U=C?n:q,J=C?V:x;if(o==="svg"||lo(q)?o="svg":(o==="mathml"||uo(q))&&(o="mathml"),O?(d(e.dynamicChildren,O,U,r,i,o,a),Ui(e,t,!0)):c||f(e,t,U,J,r,i,o,a,!1),N)C?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):As(t,n,V,l,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const ge=t.target=Qr(t.props,_);ge&&As(t,ge,null,l,0)}else C&&As(t,q,x,l,1);Ns(t,N)}},remove(e,t,n,{um:s,o:{remove:r}},i){const{shapeFlag:o,children:a,anchor:c,targetStart:l,targetAnchor:u,target:f,props:d}=e;if(f&&(r(l),r(u)),i&&r(c),o&16){const g=i||!qn(d);for(let _=0;_<a.length;_++){const w=a[_];s(w,t,n,g,!!w.dynamicChildren)}}},move:As,hydrate:of};function As(e,t,n,{o:{insert:s},m:r},i=2){i===0&&s(e.targetAnchor,t,n);const{el:o,anchor:a,shapeFlag:c,children:l,props:u}=e,f=i===2;if(f&&s(o,t,n),(!f||qn(u))&&c&16)for(let d=0;d<l.length;d++)r(l[d],t,n,2);f&&s(a,t,n)}function of(e,t,n,s,r,i,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:l,createText:u}},f){function d(P,N){let E=N;for(;E;){if(E&&E.nodeType===8){if(E.data==="teleport start anchor")t.targetStart=E;else if(E.data==="teleport anchor"){t.targetAnchor=E,P._lpa=t.targetAnchor&&o(t.targetAnchor);break}}E=o(E)}}function g(P,N){N.anchor=f(o(P),N,a(P),n,s,r,i)}const _=t.target=Qr(t.props,c),w=qn(t.props);if(_){const P=_._lpa||_.firstChild;t.shapeFlag&16&&(w?(g(e,t),d(_,P),t.targetAnchor||Zr(_,t,u,l,a(e)===_?e:null)):(t.anchor=o(e),d(_,P),t.targetAnchor||Zr(_,t,u,l),f(P&&o(P),t,_,n,s,r,i))),Ns(t,w)}else w&&t.shapeFlag&16&&(g(e,t),t.targetStart=e,t.targetAnchor=o(e));return t.anchor&&o(t.anchor)}const af=bc;function Ns(e,t){const n=e.ctx;if(n&&n.ut){let s,r;for(t?(s=e.el,r=e.anchor):(s=e.targetStart,r=e.targetAnchor);s&&s!==r;)s.nodeType===1&&s.setAttribute("data-v-owner",n.uid),s=s.nextSibling;n.ut()}}function Zr(e,t,n,s,r=null){const i=t.targetStart=n(""),o=t.targetAnchor=n("");return i[vc]=o,e&&(s(i,e,r),s(o,e,r)),o}const cf=Symbol("_leaveCb");function xi(e,t){e.shapeFlag&6&&e.component?(e.transition=t,xi(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Dn(e,t){return z(e)?Se({name:e.name},t,{setup:e}):e}function wc(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function fo(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const js=new WeakMap;function Jn(e,t,n,s,r=!1){if(j(e)){e.forEach((w,P)=>Jn(w,t&&(j(t)?t[P]:t),n,s,r));return}if(Yn(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Jn(e,t,n,s.component.subTree);return}const i=s.shapeFlag&4?_r(s.component):s.el,o=r?null:i,{i:a,r:c}=e,l=t&&t.r,u=a.refs===le?a.refs={}:a.refs,f=a.setupState,d=Z(f),g=f===le?Ma:w=>fo(u,w)?!1:se(d,w),_=(w,P)=>!(P&&fo(u,P));if(l!=null&&l!==c){if(ho(t),ye(l))u[l]=null,g(l)&&(f[l]=null);else if(pe(l)){const w=t;_(l,w.k)&&(l.value=null),w.k&&(u[w.k]=null)}}if(z(c))ms(c,a,12,[o,u]);else{const w=ye(c),P=pe(c);if(w||P){const N=()=>{if(e.f){const E=w?g(c)?f[c]:u[c]:_()||!e.k?c.value:u[e.k];if(r)j(E)&&Ii(E,i);else if(j(E))E.includes(i)||E.push(i);else if(w)u[c]=[i],g(c)&&(f[c]=u[c]);else{const T=[i];_(c,e.k)&&(c.value=T),e.k&&(u[e.k]=T)}}else w?(u[c]=o,g(c)&&(f[c]=o)):P&&(_(c,e.k)&&(c.value=o),e.k&&(u[e.k]=o))};if(o){const E=()=>{N(),js.delete(e)};E.id=-1,js.set(e,E),Te(E,n)}else ho(e),N()}}}function ho(e){const t=js.get(e);t&&(t.flags|=8,js.delete(e))}cr().requestIdleCallback;cr().cancelIdleCallback;const Yn=e=>!!e.type.__asyncLoader,Ec=e=>e.type.__isKeepAlive;function Ic(e,t){Tc(e,"a",t)}function Sc(e,t){Tc(e,"da",t)}function Tc(e,t,n=Re){const s=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(dr(t,s,n),n){let r=n.parent;for(;r&&r.parent;)Ec(r.parent.vnode)&&lf(s,t,n,r),r=r.parent}}function lf(e,t,n,s){const r=dr(t,e,s,!0);xn(()=>{Ii(s[t],r)},n)}function dr(e,t,n=Re,s=!1){if(n){const r=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{St();const a=_s(n),c=ht(t,n,e,o);return a(),Tt(),c});return s?r.unshift(i):r.push(i),i}}const Pt=e=>(t,n=Re)=>{(!as||e==="sp")&&dr(e,(...s)=>t(...s),n)},uf=Pt("bm"),hr=Pt("m"),ff=Pt("bu"),df=Pt("u"),hf=Pt("bum"),xn=Pt("um"),pf=Pt("sp"),gf=Pt("rtg"),mf=Pt("rtc");function _f(e,t=Re){dr("ec",e,t)}const yf="components";function po(e,t){return bf(yf,e,!0,t)||e}const vf=Symbol.for("v-ndc");function bf(e,t,n=!0,s=!1){const r=Ve||Re;if(r){const i=r.type;{const a=id(i,!1);if(a&&(a===t||a===ze(t)||a===ar(ze(t))))return i}const o=go(r[e]||i[e],t)||go(r.appContext[e],t);return!o&&s?i:o}}function go(e,t){return e&&(e[t]||e[ze(t)]||e[ar(ze(t))])}function wf(e,t,n,s){let r;const i=n,o=j(e);if(o||ye(e)){const a=o&&lt(e);let c=!1,l=!1;a&&(c=!je(e),l=Ct(e),e=lr(e)),r=new Array(e.length);for(let u=0,f=e.length;u<f;u++)r[u]=t(c?l?Cn(Qe(e[u])):Qe(e[u]):e[u],u,void 0,i)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,i)}else if(re(e))if(e[Symbol.iterator])r=Array.from(e,(a,c)=>t(a,c,void 0,i));else{const a=Object.keys(e);r=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const u=a[c];r[c]=t(e[u],u,c,i)}}else r=[];return r}const ei=e=>e?Gc(e)?_r(e):ei(e.parent):null,Xn=Se(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ei(e.parent),$root:e=>ei(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ac(e),$forceUpdate:e=>e.f||(e.f=()=>{Di(e.update)}),$nextTick:e=>e.n||(e.n=Ni.bind(e.proxy)),$watch:e=>sf.bind(e)}),kr=(e,t)=>e!==le&&!e.__isScriptSetup&&se(e,t),Ef={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:c}=e;if(t[0]!=="$"){const d=o[t];if(d!==void 0)switch(d){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return i[t]}else{if(kr(s,t))return o[t]=1,s[t];if(r!==le&&se(r,t))return o[t]=2,r[t];if(se(i,t))return o[t]=3,i[t];if(n!==le&&se(n,t))return o[t]=4,n[t];ti&&(o[t]=0)}}const l=Xn[t];let u,f;if(l)return t==="$attrs"&&Ae(e.attrs,"get",""),l(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==le&&se(n,t))return o[t]=4,n[t];if(f=c.config.globalProperties,se(f,t))return f[t]},set({_:e},t,n){const{data:s,setupState:r,ctx:i}=e;return kr(r,t)?(r[t]=n,!0):s!==le&&se(s,t)?(s[t]=n,!0):se(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,props:i,type:o}},a){let c;return!!(n[a]||e!==le&&a[0]!=="$"&&se(e,a)||kr(t,a)||se(i,a)||se(s,a)||se(Xn,a)||se(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:se(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function mo(e){return j(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ti=!0;function If(e){const t=Ac(e),n=e.proxy,s=e.ctx;ti=!1,t.beforeCreate&&_o(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:f,mounted:d,beforeUpdate:g,updated:_,activated:w,deactivated:P,beforeDestroy:N,beforeUnmount:E,destroyed:T,unmounted:O,render:V,renderTracked:q,renderTriggered:x,errorCaptured:C,serverPrefetch:U,expose:J,inheritAttrs:ge,components:me,directives:be,filters:Fe}=t;if(l&&Sf(l,s,null),o)for(const K in o){const Y=o[K];z(Y)&&(s[K]=Y.bind(n))}if(r){const K=r.call(n,n);re(K)&&(e.data=gs(K))}if(ti=!0,i)for(const K in i){const Y=i[K],he=z(Y)?Y.bind(n,n):z(Y.get)?Y.get.bind(n,n):ct,$e=!z(Y)&&z(Y.set)?Y.set.bind(n):ct,xe=Ie({get:he,set:$e});Object.defineProperty(s,K,{enumerable:!0,configurable:!0,get:()=>xe.value,set:Ee=>xe.value=Ee})}if(a)for(const K in a)Cc(a[K],s,n,K);if(c){const K=z(c)?c.call(n):c;Reflect.ownKeys(K).forEach(Y=>{ks(Y,K[Y])})}u&&_o(u,e,"c");function te(K,Y){j(Y)?Y.forEach(he=>K(he.bind(n))):Y&&K(Y.bind(n))}if(te(uf,f),te(hr,d),te(ff,g),te(df,_),te(Ic,w),te(Sc,P),te(_f,C),te(mf,q),te(gf,x),te(hf,E),te(xn,O),te(pf,U),j(J))if(J.length){const K=e.exposed||(e.exposed={});J.forEach(Y=>{Object.defineProperty(K,Y,{get:()=>n[Y],set:he=>n[Y]=he,enumerable:!0})})}else e.exposed||(e.exposed={});V&&e.render===ct&&(e.render=V),ge!=null&&(e.inheritAttrs=ge),me&&(e.components=me),be&&(e.directives=be),U&&wc(e)}function Sf(e,t,n=ct){j(e)&&(e=ni(e));for(const s in e){const r=e[s];let i;re(r)?"default"in r?i=We(r.from||s,r.default,!0):i=We(r.from||s):i=We(r),pe(i)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[s]=i}}function _o(e,t,n){ht(j(e)?e.map(s=>s.bind(t.proxy)):e.bind(t.proxy),t,n)}function Cc(e,t,n,s){let r=s.includes(".")?yc(n,s):()=>n[s];if(ye(e)){const i=t[e];z(i)&&sn(r,i)}else if(z(e))sn(r,e.bind(n));else if(re(e))if(j(e))e.forEach(i=>Cc(i,t,n,s));else{const i=z(e.handler)?e.handler.bind(n):t[e.handler];z(i)&&sn(r,i,e)}}function Ac(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let c;return a?c=a:!r.length&&!n&&!s?c=t:(c={},r.length&&r.forEach(l=>Ws(c,l,o,!0)),Ws(c,t,o)),re(t)&&i.set(t,c),c}function Ws(e,t,n,s=!1){const{mixins:r,extends:i}=t;i&&Ws(e,i,n,!0),r&&r.forEach(o=>Ws(e,o,n,!0));for(const o in t)if(!(s&&o==="expose")){const a=Tf[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Tf={data:yo,props:vo,emits:vo,methods:Hn,computed:Hn,beforeCreate:Pe,created:Pe,beforeMount:Pe,mounted:Pe,beforeUpdate:Pe,updated:Pe,beforeDestroy:Pe,beforeUnmount:Pe,destroyed:Pe,unmounted:Pe,activated:Pe,deactivated:Pe,errorCaptured:Pe,serverPrefetch:Pe,components:Hn,directives:Hn,watch:Af,provide:yo,inject:Cf};function yo(e,t){return t?e?function(){return Se(z(e)?e.call(this,this):e,z(t)?t.call(this,this):t)}:t:e}function Cf(e,t){return Hn(ni(e),ni(t))}function ni(e){if(j(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Pe(e,t){return e?[...new Set([].concat(e,t))]:t}function Hn(e,t){return e?Se(Object.create(null),e,t):t}function vo(e,t){return e?j(e)&&j(t)?[...new Set([...e,...t])]:Se(Object.create(null),mo(e),mo(t??{})):t}function Af(e,t){if(!e)return t;if(!t)return e;const n=Se(Object.create(null),e);for(const s in t)n[s]=Pe(e[s],t[s]);return n}function Rc(){return{app:null,config:{isNativeTag:Ma,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Rf=0;function Pf(e,t){return function(s,r=null){z(s)||(s=Se({},s)),r!=null&&!re(r)&&(r=null);const i=Rc(),o=new WeakSet,a=[];let c=!1;const l=i.app={_uid:Rf++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:ad,get config(){return i.config},set config(u){},use(u,...f){return o.has(u)||(u&&z(u.install)?(o.add(u),u.install(l,...f)):z(u)&&(o.add(u),u(l,...f))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,f){return f?(i.components[u]=f,l):i.components[u]},directive(u,f){return f?(i.directives[u]=f,l):i.directives[u]},mount(u,f,d){if(!c){const g=l._ceVNode||ve(s,r);return g.appContext=i,d===!0?d="svg":d===!1&&(d=void 0),e(g,u,d),c=!0,l._container=u,u.__vue_app__=l,_r(g.component)}},onUnmount(u){a.push(u)},unmount(){c&&(ht(a,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(u,f){return i.provides[u]=f,l},runWithContext(u){const f=rn;rn=l;try{return u()}finally{rn=f}}};return l}}let rn=null;const Of=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ze(t)}Modifiers`]||e[`${an(t)}Modifiers`];function kf(e,t,...n){if(e.isUnmounted)return;const s=e.vnode.props||le;let r=n;const i=t.startsWith("update:"),o=i&&Of(s,t.slice(7));o&&(o.trim&&(r=n.map(u=>ye(u)?u.trim():u)),o.number&&(r=n.map(Si)));let a,c=s[a=Cr(t)]||s[a=Cr(ze(t))];!c&&i&&(c=s[a=Cr(an(t))]),c&&ht(c,e,6,r);const l=s[a+"Once"];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,ht(l,e,6,r)}}const Nf=new WeakMap;function Pc(e,t,n=!1){const s=n?Nf:t.emitsCache,r=s.get(e);if(r!==void 0)return r;const i=e.emits;let o={},a=!1;if(!z(e)){const c=l=>{const u=Pc(l,t,!0);u&&(a=!0,Se(o,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!a?(re(e)&&s.set(e,null),null):(j(i)?i.forEach(c=>o[c]=null):Se(o,i),re(e)&&s.set(e,o),o)}function pr(e,t){return!e||!sr(t)?!1:(t=t.slice(2).replace(/Once$/,""),se(e,t[0].toLowerCase()+t.slice(1))||se(e,an(t))||se(e,t))}function bo(e){const{type:t,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:c,render:l,renderCache:u,props:f,data:d,setupState:g,ctx:_,inheritAttrs:w}=e,P=Hs(e);let N,E;try{if(n.shapeFlag&4){const O=r||s,V=O;N=ot(l.call(V,O,u,f,g,d,_)),E=a}else{const O=t;N=ot(O.length>1?O(f,{attrs:a,slots:o,emit:c}):O(f,null)),E=t.props?a:Df(a)}}catch(O){Qn.length=0,fr(O,e,1),N=ve(Gt)}let T=N;if(E&&w!==!1){const O=Object.keys(E),{shapeFlag:V}=T;O.length&&V&7&&(i&&O.some(Ei)&&(E=xf(E,i)),T=An(T,E,!1,!0))}return n.dirs&&(T=An(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&xi(T,n.transition),N=T,Hs(P),N}const Df=e=>{let t;for(const n in e)(n==="class"||n==="style"||sr(n))&&((t||(t={}))[n]=e[n]);return t},xf=(e,t)=>{const n={};for(const s in e)(!Ei(s)||!(s.slice(9)in t))&&(n[s]=e[s]);return n};function Lf(e,t,n){const{props:s,children:r,component:i}=e,{props:o,children:a,patchFlag:c}=t,l=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?wo(s,o,l):!!o;if(c&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(Oc(o,s,d)&&!pr(l,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?wo(s,o,l):!0:!!o;return!1}function wo(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(Oc(t,e,i)&&!pr(n,i))return!0}return!1}function Oc(e,t,n){const s=e[n],r=t[n];return n==="style"&&re(s)&&re(r)?!ps(s,r):s!==r}function Mf({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s===e)(e=t.vnode).el=n,t=t.parent;else break}}const kc={},Nc=()=>Object.create(kc),Dc=e=>Object.getPrototypeOf(e)===kc;function Uf(e,t,n,s=!1){const r={},i=Nc();e.propsDefaults=Object.create(null),xc(e,t,r,i);for(const o in e.propsOptions[0])o in r||(r[o]=void 0);n?e.props=s?r:cc(r):e.type.props?e.props=r:e.props=i,e.attrs=i}function Ff(e,t,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=e,a=Z(r),[c]=e.propsOptions;let l=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(pr(e.emitsOptions,d))continue;const g=t[d];if(c)if(se(i,d))g!==i[d]&&(i[d]=g,l=!0);else{const _=ze(d);r[_]=si(c,a,_,g,e,!1)}else g!==i[d]&&(i[d]=g,l=!0)}}}else{xc(e,t,r,i)&&(l=!0);let u;for(const f in a)(!t||!se(t,f)&&((u=an(f))===f||!se(t,u)))&&(c?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=si(c,a,f,void 0,e,!0)):delete r[f]);if(i!==a)for(const f in i)(!t||!se(t,f))&&(delete i[f],l=!0)}l&&yt(e.attrs,"set","")}function xc(e,t,n,s){const[r,i]=e.propsOptions;let o=!1,a;if(t)for(let c in t){if(Gn(c))continue;const l=t[c];let u;r&&se(r,u=ze(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:pr(e.emitsOptions,c)||(!(c in s)||l!==s[c])&&(s[c]=l,o=!0)}if(i){const c=Z(n),l=a||le;for(let u=0;u<i.length;u++){const f=i[u];n[f]=si(r,c,f,l[f],e,!se(l,f))}}return o}function si(e,t,n,s,r,i){const o=e[n];if(o!=null){const a=se(o,"default");if(a&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&z(c)){const{propsDefaults:l}=r;if(n in l)s=l[n];else{const u=_s(r);s=l[n]=c.call(null,t),u()}}else s=c;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===an(n))&&(s=!0))}return s}const $f=new WeakMap;function Lc(e,t,n=!1){const s=n?$f:t.propsCache,r=s.get(e);if(r)return r;const i=e.props,o={},a=[];let c=!1;if(!z(e)){const u=f=>{c=!0;const[d,g]=Lc(f,t,!0);Se(o,d),g&&a.push(...g)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!c)return re(e)&&s.set(e,_n),_n;if(j(i))for(let u=0;u<i.length;u++){const f=ze(i[u]);Eo(f)&&(o[f]=le)}else if(i)for(const u in i){const f=ze(u);if(Eo(f)){const d=i[u],g=o[f]=j(d)||z(d)?{type:d}:Se({},d),_=g.type;let w=!1,P=!0;if(j(_))for(let N=0;N<_.length;++N){const E=_[N],T=z(E)&&E.name;if(T==="Boolean"){w=!0;break}else T==="String"&&(P=!1)}else w=z(_)&&_.name==="Boolean";g[0]=w,g[1]=P,(w||se(g,"default"))&&a.push(f)}}const l=[o,a];return re(e)&&s.set(e,l),l}function Eo(e){return e[0]!=="$"&&!Gn(e)}const Li=e=>e==="_"||e==="_ctx"||e==="$stable",Mi=e=>j(e)?e.map(ot):[ot(e)],Bf=(e,t,n)=>{if(t._n)return t;const s=pn((...r)=>Mi(t(...r)),n);return s._c=!1,s},Mc=(e,t,n)=>{const s=e._ctx;for(const r in e){if(Li(r))continue;const i=e[r];if(z(i))t[r]=Bf(r,i,s);else if(i!=null){const o=Mi(i);t[r]=()=>o}}},Uc=(e,t)=>{const n=Mi(t);e.slots.default=()=>n},Fc=(e,t,n)=>{for(const s in t)(n||!Li(s))&&(e[s]=t[s])},Vf=(e,t,n)=>{const s=e.slots=Nc();if(e.vnode.shapeFlag&32){const r=t._;r?(Fc(s,t,n),n&&Ba(s,"_",r,!0)):Mc(t,s)}else t&&Uc(e,t)},Hf=(e,t,n)=>{const{vnode:s,slots:r}=e;let i=!0,o=le;if(s.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:Fc(r,t,n):(i=!t.$stable,Mc(t,r)),o=t}else t&&(Uc(e,t),o={default:1});if(i)for(const a in r)!Li(a)&&o[a]==null&&delete r[a]},Te=zf;function jf(e){return Wf(e)}function Wf(e,t){const n=cr();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:f,nextSibling:d,setScopeId:g=ct,insertStaticContent:_}=e,w=(h,p,m,y=null,I=null,v=null,D=void 0,k=null,A=!!p.dynamicChildren)=>{if(h===p)return;h&&!$n(h,p)&&(y=b(h),Ee(h,I,v,!0),h=null),p.patchFlag===-2&&(A=!1,p.dynamicChildren=null);const{type:S,ref:H,shapeFlag:M}=p;switch(S){case gr:P(h,p,m,y);break;case Gt:N(h,p,m,y);break;case Dr:h==null&&E(p,m,y,D);break;case Je:me(h,p,m,y,I,v,D,k,A);break;default:M&1?V(h,p,m,y,I,v,D,k,A):M&6?be(h,p,m,y,I,v,D,k,A):(M&64||M&128)&&S.process(h,p,m,y,I,v,D,k,A,$)}H!=null&&I?Jn(H,h&&h.ref,v,p||h,!p):H==null&&h&&h.ref!=null&&Jn(h.ref,null,v,h,!0)},P=(h,p,m,y)=>{if(h==null)s(p.el=a(p.children),m,y);else{const I=p.el=h.el;p.children!==h.children&&l(I,p.children)}},N=(h,p,m,y)=>{h==null?s(p.el=c(p.children||""),m,y):p.el=h.el},E=(h,p,m,y)=>{[h.el,h.anchor]=_(h.children,p,m,y,h.el,h.anchor)},T=({el:h,anchor:p},m,y)=>{let I;for(;h&&h!==p;)I=d(h),s(h,m,y),h=I;s(p,m,y)},O=({el:h,anchor:p})=>{let m;for(;h&&h!==p;)m=d(h),r(h),h=m;r(p)},V=(h,p,m,y,I,v,D,k,A)=>{if(p.type==="svg"?D="svg":p.type==="math"&&(D="mathml"),h==null)q(p,m,y,I,v,D,k,A);else{const S=h.el&&h.el._isVueCE?h.el:null;try{S&&S._beginPatch(),U(h,p,I,v,D,k,A)}finally{S&&S._endPatch()}}},q=(h,p,m,y,I,v,D,k)=>{let A,S;const{props:H,shapeFlag:M,transition:B,dirs:G}=h;if(A=h.el=o(h.type,v,H&&H.is,H),M&8?u(A,h.children):M&16&&C(h.children,A,null,y,I,Nr(h,v),D,k),G&&Jt(h,null,y,"created"),x(A,h,h.scopeId,D,y),H){for(const ue in H)ue!=="value"&&!Gn(ue)&&i(A,ue,null,H[ue],v,y);"value"in H&&i(A,"value",null,H.value,v),(S=H.onVnodeBeforeMount)&&rt(S,y,h)}G&&Jt(h,null,y,"beforeMount");const Q=Gf(I,B);Q&&B.beforeEnter(A),s(A,p,m),((S=H&&H.onVnodeMounted)||Q||G)&&Te(()=>{S&&rt(S,y,h),Q&&B.enter(A),G&&Jt(h,null,y,"mounted")},I)},x=(h,p,m,y,I)=>{if(m&&g(h,m),y)for(let v=0;v<y.length;v++)g(h,y[v]);if(I){let v=I.subTree;if(p===v||Vc(v.type)&&(v.ssContent===p||v.ssFallback===p)){const D=I.vnode;x(h,D,D.scopeId,D.slotScopeIds,I.parent)}}},C=(h,p,m,y,I,v,D,k,A=0)=>{for(let S=A;S<h.length;S++){const H=h[S]=k?_t(h[S]):ot(h[S]);w(null,H,p,m,y,I,v,D,k)}},U=(h,p,m,y,I,v,D)=>{const k=p.el=h.el;let{patchFlag:A,dynamicChildren:S,dirs:H}=p;A|=h.patchFlag&16;const M=h.props||le,B=p.props||le;let G;if(m&&Yt(m,!1),(G=B.onVnodeBeforeUpdate)&&rt(G,m,p,h),H&&Jt(p,h,m,"beforeUpdate"),m&&Yt(m,!0),(M.innerHTML&&B.innerHTML==null||M.textContent&&B.textContent==null)&&u(k,""),S?J(h.dynamicChildren,S,k,m,y,Nr(p,I),v):D||Y(h,p,k,null,m,y,Nr(p,I),v,!1),A>0){if(A&16)ge(k,M,B,m,I);else if(A&2&&M.class!==B.class&&i(k,"class",null,B.class,I),A&4&&i(k,"style",M.style,B.style,I),A&8){const Q=p.dynamicProps;for(let ue=0;ue<Q.length;ue++){const ie=Q[ue],Le=M[ie],Me=B[ie];(Me!==Le||ie==="value")&&i(k,ie,Le,Me,I,m)}}A&1&&h.children!==p.children&&u(k,p.children)}else!D&&S==null&&ge(k,M,B,m,I);((G=B.onVnodeUpdated)||H)&&Te(()=>{G&&rt(G,m,p,h),H&&Jt(p,h,m,"updated")},y)},J=(h,p,m,y,I,v,D)=>{for(let k=0;k<p.length;k++){const A=h[k],S=p[k],H=A.el&&(A.type===Je||!$n(A,S)||A.shapeFlag&198)?f(A.el):m;w(A,S,H,null,y,I,v,D,!0)}},ge=(h,p,m,y,I)=>{if(p!==m){if(p!==le)for(const v in p)!Gn(v)&&!(v in m)&&i(h,v,p[v],null,I,y);for(const v in m){if(Gn(v))continue;const D=m[v],k=p[v];D!==k&&v!=="value"&&i(h,v,k,D,I,y)}"value"in m&&i(h,"value",p.value,m.value,I)}},me=(h,p,m,y,I,v,D,k,A)=>{const S=p.el=h?h.el:a(""),H=p.anchor=h?h.anchor:a("");let{patchFlag:M,dynamicChildren:B,slotScopeIds:G}=p;G&&(k=k?k.concat(G):G),h==null?(s(S,m,y),s(H,m,y),C(p.children||[],m,H,I,v,D,k,A)):M>0&&M&64&&B&&h.dynamicChildren&&h.dynamicChildren.length===B.length?(J(h.dynamicChildren,B,m,I,v,D,k),(p.key!=null||I&&p===I.subTree)&&Ui(h,p,!0)):Y(h,p,m,H,I,v,D,k,A)},be=(h,p,m,y,I,v,D,k,A)=>{p.slotScopeIds=k,h==null?p.shapeFlag&512?I.ctx.activate(p,m,y,D,A):Fe(p,m,y,I,v,D,A):Ge(h,p,A)},Fe=(h,p,m,y,I,v,D)=>{const k=h.component=ed(h,y,I);if(Ec(h)&&(k.ctx.renderer=$),td(k,!1,D),k.asyncDep){if(I&&I.registerDep(k,te,D),!h.el){const A=k.subTree=ve(Gt);N(null,A,p,m),h.placeholder=A.el}}else te(k,h,p,m,I,v,D)},Ge=(h,p,m)=>{const y=p.component=h.component;if(Lf(h,p,m))if(y.asyncDep&&!y.asyncResolved){K(y,p,m);return}else y.next=p,y.update();else p.el=h.el,y.vnode=p},te=(h,p,m,y,I,v,D)=>{const k=()=>{if(h.isMounted){let{next:M,bu:B,u:G,parent:Q,vnode:ue}=h;{const nt=$c(h);if(nt){M&&(M.el=ue.el,K(h,M,D)),nt.asyncDep.then(()=>{Te(()=>{h.isUnmounted||S()},I)});return}}let ie=M,Le;Yt(h,!1),M?(M.el=ue.el,K(h,M,D)):M=ue,B&&Os(B),(Le=M.props&&M.props.onVnodeBeforeUpdate)&&rt(Le,Q,M,ue),Yt(h,!0);const Me=bo(h),tt=h.subTree;h.subTree=Me,w(tt,Me,f(tt.el),b(tt),h,I,v),M.el=Me.el,ie===null&&Mf(h,Me.el),G&&Te(G,I),(Le=M.props&&M.props.onVnodeUpdated)&&Te(()=>rt(Le,Q,M,ue),I)}else{let M;const{el:B,props:G}=p,{bm:Q,m:ue,parent:ie,root:Le,type:Me}=h,tt=Yn(p);Yt(h,!1),Q&&Os(Q),!tt&&(M=G&&G.onVnodeBeforeMount)&&rt(M,ie,p),Yt(h,!0);{Le.ce&&Le.ce._hasShadowRoot()&&Le.ce._injectChildStyle(Me);const nt=h.subTree=bo(h);w(null,nt,m,y,h,I,v),p.el=nt.el}if(ue&&Te(ue,I),!tt&&(M=G&&G.onVnodeMounted)){const nt=p;Te(()=>rt(M,ie,nt),I)}(p.shapeFlag&256||ie&&Yn(ie.vnode)&&ie.vnode.shapeFlag&256)&&h.a&&Te(h.a,I),h.isMounted=!0,p=m=y=null}};h.scope.on();const A=h.effect=new qa(k);h.scope.off();const S=h.update=A.run.bind(A),H=h.job=A.runIfDirty.bind(A);H.i=h,H.id=h.uid,A.scheduler=()=>Di(H),Yt(h,!0),S()},K=(h,p,m)=>{p.component=h;const y=h.vnode.props;h.vnode=p,h.next=null,Ff(h,p.props,y,m),Hf(h,p.children,m),St(),oo(h),Tt()},Y=(h,p,m,y,I,v,D,k,A=!1)=>{const S=h&&h.children,H=h?h.shapeFlag:0,M=p.children,{patchFlag:B,shapeFlag:G}=p;if(B>0){if(B&128){$e(S,M,m,y,I,v,D,k,A);return}else if(B&256){he(S,M,m,y,I,v,D,k,A);return}}G&8?(H&16&&Ke(S,I,v),M!==S&&u(m,M)):H&16?G&16?$e(S,M,m,y,I,v,D,k,A):Ke(S,I,v,!0):(H&8&&u(m,""),G&16&&C(M,m,y,I,v,D,k,A))},he=(h,p,m,y,I,v,D,k,A)=>{h=h||_n,p=p||_n;const S=h.length,H=p.length,M=Math.min(S,H);let B;for(B=0;B<M;B++){const G=p[B]=A?_t(p[B]):ot(p[B]);w(h[B],G,m,null,I,v,D,k,A)}S>H?Ke(h,I,v,!0,!1,M):C(p,m,y,I,v,D,k,A,M)},$e=(h,p,m,y,I,v,D,k,A)=>{let S=0;const H=p.length;let M=h.length-1,B=H-1;for(;S<=M&&S<=B;){const G=h[S],Q=p[S]=A?_t(p[S]):ot(p[S]);if($n(G,Q))w(G,Q,m,null,I,v,D,k,A);else break;S++}for(;S<=M&&S<=B;){const G=h[M],Q=p[B]=A?_t(p[B]):ot(p[B]);if($n(G,Q))w(G,Q,m,null,I,v,D,k,A);else break;M--,B--}if(S>M){if(S<=B){const G=B+1,Q=G<H?p[G].el:y;for(;S<=B;)w(null,p[S]=A?_t(p[S]):ot(p[S]),m,Q,I,v,D,k,A),S++}}else if(S>B)for(;S<=M;)Ee(h[S],I,v,!0),S++;else{const G=S,Q=S,ue=new Map;for(S=Q;S<=B;S++){const Be=p[S]=A?_t(p[S]):ot(p[S]);Be.key!=null&&ue.set(Be.key,S)}let ie,Le=0;const Me=B-Q+1;let tt=!1,nt=0;const Un=new Array(Me);for(S=0;S<Me;S++)Un[S]=0;for(S=G;S<=M;S++){const Be=h[S];if(Le>=Me){Ee(Be,I,v,!0);continue}let st;if(Be.key!=null)st=ue.get(Be.key);else for(ie=Q;ie<=B;ie++)if(Un[ie-Q]===0&&$n(Be,p[ie])){st=ie;break}st===void 0?Ee(Be,I,v,!0):(Un[st-Q]=S+1,st>=nt?nt=st:tt=!0,w(Be,p[st],m,null,I,v,D,k,A),Le++)}const Zi=tt?Kf(Un):_n;for(ie=Zi.length-1,S=Me-1;S>=0;S--){const Be=Q+S,st=p[Be],eo=p[Be+1],to=Be+1<H?eo.el||Bc(eo):y;Un[S]===0?w(null,st,m,to,I,v,D,k,A):tt&&(ie<0||S!==Zi[ie]?xe(st,m,to,2):ie--)}}},xe=(h,p,m,y,I=null)=>{const{el:v,type:D,transition:k,children:A,shapeFlag:S}=h;if(S&6){xe(h.component.subTree,p,m,y);return}if(S&128){h.suspense.move(p,m,y);return}if(S&64){D.move(h,p,m,$);return}if(D===Je){s(v,p,m);for(let M=0;M<A.length;M++)xe(A[M],p,m,y);s(h.anchor,p,m);return}if(D===Dr){T(h,p,m);return}if(y!==2&&S&1&&k)if(y===0)k.beforeEnter(v),s(v,p,m),Te(()=>k.enter(v),I);else{const{leave:M,delayLeave:B,afterLeave:G}=k,Q=()=>{h.ctx.isUnmounted?r(v):s(v,p,m)},ue=()=>{v._isLeaving&&v[cf](!0),M(v,()=>{Q(),G&&G()})};B?B(v,Q,ue):ue()}else s(v,p,m)},Ee=(h,p,m,y=!1,I=!1)=>{const{type:v,props:D,ref:k,children:A,dynamicChildren:S,shapeFlag:H,patchFlag:M,dirs:B,cacheIndex:G}=h;if(M===-2&&(I=!1),k!=null&&(St(),Jn(k,null,m,h,!0),Tt()),G!=null&&(p.renderCache[G]=void 0),H&256){p.ctx.deactivate(h);return}const Q=H&1&&B,ue=!Yn(h);let ie;if(ue&&(ie=D&&D.onVnodeBeforeUnmount)&&rt(ie,p,h),H&6)qt(h.component,m,y);else{if(H&128){h.suspense.unmount(m,y);return}Q&&Jt(h,null,p,"beforeUnmount"),H&64?h.type.remove(h,p,m,$,y):S&&!S.hasOnce&&(v!==Je||M>0&&M&64)?Ke(S,p,m,!1,!0):(v===Je&&M&384||!I&&H&16)&&Ke(A,p,m),y&&ln(h)}(ue&&(ie=D&&D.onVnodeUnmounted)||Q)&&Te(()=>{ie&&rt(ie,p,h),Q&&Jt(h,null,p,"unmounted")},m)},ln=h=>{const{type:p,el:m,anchor:y,transition:I}=h;if(p===Je){un(m,y);return}if(p===Dr){O(h);return}const v=()=>{r(m),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(h.shapeFlag&1&&I&&!I.persisted){const{leave:D,delayLeave:k}=I,A=()=>D(m,v);k?k(h.el,v,A):A()}else v()},un=(h,p)=>{let m;for(;h!==p;)m=d(h),r(h),h=m;r(p)},qt=(h,p,m)=>{const{bum:y,scope:I,job:v,subTree:D,um:k,m:A,a:S}=h;Io(A),Io(S),y&&Os(y),I.stop(),v&&(v.flags|=8,Ee(D,h,p,m)),k&&Te(k,p),Te(()=>{h.isUnmounted=!0},p)},Ke=(h,p,m,y=!1,I=!1,v=0)=>{for(let D=v;D<h.length;D++)Ee(h[D],p,m,y,I)},b=h=>{if(h.shapeFlag&6)return b(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=d(h.anchor||h.el),m=p&&p[vc];return m?d(m):p};let F=!1;const L=(h,p,m)=>{let y;h==null?p._vnode&&(Ee(p._vnode,null,null,!0),y=p._vnode.component):w(p._vnode||null,h,p,null,null,null,m),p._vnode=h,F||(F=!0,oo(y),pc(),F=!1)},$={p:w,um:Ee,m:xe,r:ln,mt:Fe,mc:C,pc:Y,pbc:J,n:b,o:e};return{render:L,hydrate:void 0,createApp:Pf(L)}}function Nr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Yt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Gf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Ui(e,t,n=!1){const s=e.children,r=t.children;if(j(s)&&j(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=_t(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Ui(o,a)),a.type===gr&&(a.patchFlag===-1&&(a=r[i]=_t(a)),a.el=o.el),a.type===Gt&&!a.el&&(a.el=o.el)}}function Kf(e){const t=e.slice(),n=[0];let s,r,i,o,a;const c=e.length;for(s=0;s<c;s++){const l=e[s];if(l!==0){if(r=n[n.length-1],e[r]<l){t[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,e[n[a]]<l?i=a+1:o=a;l<e[n[i]]&&(i>0&&(t[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function $c(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:$c(t)}function Io(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Bc(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Bc(t.subTree):null}const Vc=e=>e.__isSuspense;function zf(e,t){t&&t.pendingBranch?j(e)?t.effects.push(...e):t.effects.push(e):Zu(e)}const Je=Symbol.for("v-fgt"),gr=Symbol.for("v-txt"),Gt=Symbol.for("v-cmt"),Dr=Symbol.for("v-stc"),Qn=[];let He=null;function ee(e=!1){Qn.push(He=e?null:[])}function qf(){Qn.pop(),He=Qn[Qn.length-1]||null}let os=1;function Gs(e,t=!1){os+=e,e<0&&He&&t&&(He.hasOnce=!0)}function Hc(e){return e.dynamicChildren=os>0?He||_n:null,qf(),os>0&&He&&He.push(e),e}function oe(e,t,n,s,r,i){return Hc(R(e,t,n,s,r,i,!0))}function mr(e,t,n,s,r){return Hc(ve(e,t,n,s,r,!0))}function Ks(e){return e?e.__v_isVNode===!0:!1}function $n(e,t){return e.type===t.type&&e.key===t.key}const jc=({key:e})=>e??null,Ds=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ye(e)||pe(e)||z(e)?{i:Ve,r:e,k:t,f:!!n}:e:null);function R(e,t=null,n=null,s=0,r=null,i=e===Je?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&jc(t),ref:t&&Ds(t),scopeId:mc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ve};return a?(Fi(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=ye(n)?8:16),os>0&&!o&&He&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&He.push(c),c}const ve=Jf;function Jf(e,t=null,n=null,s=0,r=null,i=!1){if((!e||e===vf)&&(e=Gt),Ks(e)){const a=An(e,t,!0);return n&&Fi(a,n),os>0&&!i&&He&&(a.shapeFlag&6?He[He.indexOf(e)]=a:He.push(a)),a.patchFlag=-2,a}if(od(e)&&(e=e.__vccOpts),t){t=Yf(t);let{class:a,style:c}=t;a&&!ye(a)&&(t.class=It(a)),re(c)&&(ur(c)&&!j(c)&&(c=Se({},c)),t.style=qe(c))}const o=ye(e)?1:Vc(e)?128:rf(e)?64:re(e)?4:z(e)?2:0;return R(e,t,n,s,r,o,i,!0)}function Yf(e){return e?ur(e)||Dc(e)?Se({},e):e:null}function An(e,t,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:c}=e,l=t?Xf(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&jc(l),ref:t&&t.ref?n&&i?j(i)?i.concat(Ds(t)):[i,Ds(t)]:Ds(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Je?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&An(e.ssContent),ssFallback:e.ssFallback&&An(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&s&&xi(u,c.clone(u)),u}function bt(e=" ",t=0){return ve(gr,null,e,t)}function Ue(e="",t=!1){return t?(ee(),mr(Gt,null,e)):ve(Gt,null,e)}function ot(e){return e==null||typeof e=="boolean"?ve(Gt):j(e)?ve(Je,null,e.slice()):Ks(e)?_t(e):ve(gr,null,String(e))}function _t(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:An(e)}function Fi(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(j(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),Fi(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!Dc(t)?t._ctx=Ve:r===3&&Ve&&(Ve.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else z(t)?(t={default:t,_ctx:Ve},n=32):(t=String(t),s&64?(n=16,t=[bt(t)]):n=8);e.children=t,e.shapeFlag|=n}function Xf(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=It([t.class,s.class]));else if(r==="style")t.style=qe([t.style,s.style]);else if(sr(r)){const i=t[r],o=s[r];o&&i!==o&&!(j(i)&&i.includes(o))&&(t[r]=i?[].concat(i,o):o)}else r!==""&&(t[r]=s[r])}return t}function rt(e,t,n,s=null){ht(e,t,7,[n,s])}const Qf=Rc();let Zf=0;function ed(e,t,n){const s=e.type,r=(t?t.appContext:e.appContext)||Qf,i={uid:Zf++,vnode:e,type:s,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ga(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Lc(s,r),emitsOptions:Pc(s,r),emit:null,emitted:null,propsDefaults:le,inheritAttrs:s.inheritAttrs,ctx:le,data:le,props:le,attrs:le,slots:le,refs:le,setupState:le,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=kf.bind(null,i),e.ce&&e.ce(i),i}let Re=null;const Wc=()=>Re||Ve;let zs,ri;{const e=cr(),t=(n,s)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};zs=t("__VUE_INSTANCE_SETTERS__",n=>Re=n),ri=t("__VUE_SSR_SETTERS__",n=>as=n)}const _s=e=>{const t=Re;return zs(e),e.scope.on(),()=>{e.scope.off(),zs(t)}},So=()=>{Re&&Re.scope.off(),zs(null)};function Gc(e){return e.vnode.shapeFlag&4}let as=!1;function td(e,t=!1,n=!1){t&&ri(t);const{props:s,children:r}=e.vnode,i=Gc(e);Uf(e,s,i,t),Vf(e,r,n||t);const o=i?nd(e,t):void 0;return t&&ri(!1),o}function nd(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ef);const{setup:s}=n;if(s){St();const r=e.setupContext=s.length>1?rd(e):null,i=_s(e),o=ms(s,e,0,[e.props,r]),a=Ua(o);if(Tt(),i(),(a||e.sp)&&!Yn(e)&&wc(e),a){if(o.then(So,So),t)return o.then(c=>{To(e,c)}).catch(c=>{fr(c,e,0)});e.asyncDep=o}else To(e,o)}else Kc(e)}function To(e,t,n){z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:re(t)&&(e.setupState=uc(t)),Kc(e)}function Kc(e,t,n){const s=e.type;e.render||(e.render=s.render||ct);{const r=_s(e);St();try{If(e)}finally{Tt(),r()}}}const sd={get(e,t){return Ae(e,"get",""),e[t]}};function rd(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,sd),slots:e.slots,emit:e.emit,expose:t}}function _r(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(uc(ki(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Xn)return Xn[n](e)},has(t,n){return n in t||n in Xn}})):e.proxy}function id(e,t=!0){return z(e)?e.displayName||e.name:e.name||t&&e.__name}function od(e){return z(e)&&"__vccOpts"in e}const Ie=(e,t)=>qu(e,t,as);function zc(e,t,n){try{Gs(-1);const s=arguments.length;return s===2?re(t)&&!j(t)?Ks(t)?ve(e,null,[t]):ve(e,t):ve(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Ks(n)&&(n=[n]),ve(e,t,n))}finally{Gs(1)}}const ad="3.5.28";/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ii;const Co=typeof window<"u"&&window.trustedTypes;if(Co)try{ii=Co.createPolicy("vue",{createHTML:e=>e})}catch{}const qc=ii?e=>ii.createHTML(e):e=>e,cd="http://www.w3.org/2000/svg",ld="http://www.w3.org/1998/Math/MathML",mt=typeof document<"u"?document:null,Ao=mt&&mt.createElement("template"),ud={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const r=t==="svg"?mt.createElementNS(cd,e):t==="mathml"?mt.createElementNS(ld,e):n?mt.createElement(e,{is:n}):mt.createElement(e);return e==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:e=>mt.createTextNode(e),createComment:e=>mt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>mt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,r,i){const o=n?n.previousSibling:t.lastChild;if(r&&(r===i||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Ao.innerHTML=qc(s==="svg"?`<svg>${e}</svg>`:s==="mathml"?`<math>${e}</math>`:e);const a=Ao.content;if(s==="svg"||s==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},fd=Symbol("_vtc");function dd(e,t,n){const s=e[fd];s&&(t=(t?[t,...s]:[...s]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const qs=Symbol("_vod"),Jc=Symbol("_vsh"),hd={name:"show",beforeMount(e,{value:t},{transition:n}){e[qs]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Bn(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:s}){!t!=!n&&(s?t?(s.beforeEnter(e),Bn(e,!0),s.enter(e)):s.leave(e,()=>{Bn(e,!1)}):Bn(e,t))},beforeUnmount(e,{value:t}){Bn(e,t)}};function Bn(e,t){e.style.display=t?e[qs]:"none",e[Jc]=!t}const pd=Symbol(""),gd=/(?:^|;)\s*display\s*:/;function md(e,t,n){const s=e.style,r=ye(n);let i=!1;if(n&&!r){if(t)if(ye(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&xs(s,a,"")}else for(const o in t)n[o]==null&&xs(s,o,"");for(const o in n)o==="display"&&(i=!0),xs(s,o,n[o])}else if(r){if(t!==n){const o=s[pd];o&&(n+=";"+o),s.cssText=n,i=gd.test(n)}}else t&&e.removeAttribute("style");qs in e&&(e[qs]=i?s.display:"",e[Jc]&&(s.display="none"))}const Ro=/\s*!important$/;function xs(e,t,n){if(j(n))n.forEach(s=>xs(e,t,s));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=_d(e,t);Ro.test(n)?e.setProperty(an(s),n.replace(Ro,""),"important"):e[s]=n}}const Po=["Webkit","Moz","ms"],xr={};function _d(e,t){const n=xr[t];if(n)return n;let s=ze(t);if(s!=="filter"&&s in e)return xr[t]=s;s=ar(s);for(let r=0;r<Po.length;r++){const i=Po[r]+s;if(i in e)return xr[t]=i}return t}const Oo="http://www.w3.org/1999/xlink";function ko(e,t,n,s,r,i=yu(t)){s&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Oo,t.slice(6,t.length)):e.setAttributeNS(Oo,t,n):n==null||i&&!Va(n)?e.removeAttribute(t):e.setAttribute(t,i?"":dt(n)?String(n):n)}function No(e,t,n,s,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?qc(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Va(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(r||t)}function en(e,t,n,s){e.addEventListener(t,n,s)}function yd(e,t,n,s){e.removeEventListener(t,n,s)}const Do=Symbol("_vei");function vd(e,t,n,s,r=null){const i=e[Do]||(e[Do]={}),o=i[t];if(s&&o)o.value=s;else{const[a,c]=bd(t);if(s){const l=i[t]=Id(s,r);en(e,a,l,c)}else o&&(yd(e,a,o,c),i[t]=void 0)}}const xo=/(?:Once|Passive|Capture)$/;function bd(e){let t;if(xo.test(e)){t={};let s;for(;s=e.match(xo);)e=e.slice(0,e.length-s[0].length),t[s[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):an(e.slice(2)),t]}let Lr=0;const wd=Promise.resolve(),Ed=()=>Lr||(wd.then(()=>Lr=0),Lr=Date.now());function Id(e,t){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;ht(Sd(s,n.value),t,5,[s])};return n.value=e,n.attached=Ed(),n}function Sd(e,t){if(j(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(s=>r=>!r._stopped&&s&&s(r))}else return t}const Lo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Td=(e,t,n,s,r,i)=>{const o=r==="svg";t==="class"?dd(e,s,o):t==="style"?md(e,n,s):sr(t)?Ei(t)||vd(e,t,n,s,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Cd(e,t,s,o))?(No(e,t,s),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&ko(e,t,s,o,i,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!ye(s))?No(e,ze(t),s,i,t):(t==="true-value"?e._trueValue=s:t==="false-value"&&(e._falseValue=s),ko(e,t,s,o))};function Cd(e,t,n,s){if(s)return!!(t==="innerHTML"||t==="textContent"||t in e&&Lo(t)&&z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Lo(t)&&ye(n)?!1:t in e}const Js=e=>{const t=e.props["onUpdate:modelValue"]||!1;return j(t)?n=>Os(t,n):t};function Ad(e){e.target.composing=!0}function Mo(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const bn=Symbol("_assign");function Uo(e,t,n){return t&&(e=e.trim()),n&&(e=Si(e)),e}const Rd={created(e,{modifiers:{lazy:t,trim:n,number:s}},r){e[bn]=Js(r);const i=s||r.props&&r.props.type==="number";en(e,t?"change":"input",o=>{o.target.composing||e[bn](Uo(e.value,n,i))}),(n||i)&&en(e,"change",()=>{e.value=Uo(e.value,n,i)}),t||(en(e,"compositionstart",Ad),en(e,"compositionend",Mo),en(e,"change",Mo))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(e[bn]=Js(o),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?Si(e.value):e.value,c=t??"";a!==c&&(document.activeElement===e&&e.type!=="range"&&(s&&t===n||r&&e.value.trim()===c)||(e.value=c))}},vv={deep:!0,created(e,t,n){e[bn]=Js(n),en(e,"change",()=>{const s=e._modelValue,r=Pd(e),i=e.checked,o=e[bn];if(j(s)){const a=Ha(s,r),c=a!==-1;if(i&&!c)o(s.concat(r));else if(!i&&c){const l=[...s];l.splice(a,1),o(l)}}else if(rr(s)){const a=new Set(s);i?a.add(r):a.delete(r),o(a)}else o(Yc(e,i))})},mounted:Fo,beforeUpdate(e,t,n){e[bn]=Js(n),Fo(e,t,n)}};function Fo(e,{value:t,oldValue:n},s){e._modelValue=t;let r;if(j(t))r=Ha(t,s.props.value)>-1;else if(rr(t))r=t.has(s.props.value);else{if(t===n)return;r=ps(t,Yc(e,!0))}e.checked!==r&&(e.checked=r)}function Pd(e){return"_value"in e?e._value:e.value}function Yc(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Od=["ctrl","shift","alt","meta"],kd={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Od.some(n=>e[`${n}Key`]&&!t.includes(n))},Nd=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=((r,...i)=>{for(let o=0;o<t.length;o++){const a=kd[t[o]];if(a&&a(r,t))return}return e(r,...i)}))},Dd=Se({patchProp:Td},ud);let $o;function xd(){return $o||($o=jf(Dd))}const Ld=((...e)=>{const t=xd().createApp(...e),{mount:n}=t;return t.mount=s=>{const r=Ud(s);if(!r)return;const i=t._component;!z(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Md(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t});function Md(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Ud(e){return ye(e)?document.querySelector(e):e}/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Xc;const yr=e=>Xc=e,Qc=Symbol();function oi(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var Zn;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(Zn||(Zn={}));function Fd(){const e=Ka(!0),t=e.run(()=>ce({}));let n=[],s=[];const r=ki({install(i){yr(r),r._a=i,i.provide(Qc,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return this._a?n.push(i):s.push(i),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return r}const Zc=()=>{};function Bo(e,t,n,s=Zc){e.add(t);const r=()=>{e.delete(t)&&s()};return!n&&za()&&bu(r),r}function dn(e,...t){e.forEach(n=>{n(...t)})}const $d=e=>e(),Vo=Symbol(),Mr=Symbol();function ai(e,t){e instanceof Map&&t instanceof Map?t.forEach((n,s)=>e.set(s,n)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const s=t[n],r=e[n];oi(r)&&oi(s)&&e.hasOwnProperty(n)&&!pe(s)&&!lt(s)?e[n]=ai(r,s):e[n]=s}return e}const Bd=Symbol();function Vd(e){return!oi(e)||!Object.prototype.hasOwnProperty.call(e,Bd)}const{assign:Dt}=Object;function Hd(e){return!!(pe(e)&&e.effect)}function jd(e,t,n,s){const{state:r,actions:i,getters:o}=t,a=n.state.value[e];let c;function l(){a||(n.state.value[e]=r?r():{});const u=ju(n.state.value[e]);return Dt(u,i,Object.keys(o||{}).reduce((f,d)=>(f[d]=ki(Ie(()=>{yr(n);const g=n._s.get(e);return o[d].call(g,g)})),f),{}))}return c=el(e,l,t,n,s,!0),c}function el(e,t,n={},s,r,i){let o;const a=Dt({actions:{}},n),c={deep:!0};let l,u,f=new Set,d=new Set,g;const _=s.state.value[e];!i&&!_&&(s.state.value[e]={});let w;function P(C){let U;l=u=!1,typeof C=="function"?(C(s.state.value[e]),U={type:Zn.patchFunction,storeId:e,events:g}):(ai(s.state.value[e],C),U={type:Zn.patchObject,payload:C,storeId:e,events:g});const J=w=Symbol();Ni().then(()=>{w===J&&(l=!0)}),u=!0,dn(f,U,s.state.value[e])}const N=i?function(){const{state:U}=n,J=U?U():{};this.$patch(ge=>{Dt(ge,J)})}:Zc;function E(){o.stop(),f.clear(),d.clear(),s._s.delete(e)}const T=(C,U="")=>{if(Vo in C)return C[Mr]=U,C;const J=function(){yr(s);const ge=Array.from(arguments),me=new Set,be=new Set;function Fe(K){me.add(K)}function Ge(K){be.add(K)}dn(d,{args:ge,name:J[Mr],store:V,after:Fe,onError:Ge});let te;try{te=C.apply(this&&this.$id===e?this:V,ge)}catch(K){throw dn(be,K),K}return te instanceof Promise?te.then(K=>(dn(me,K),K)).catch(K=>(dn(be,K),Promise.reject(K))):(dn(me,te),te)};return J[Vo]=!0,J[Mr]=U,J},O={_p:s,$id:e,$onAction:Bo.bind(null,d),$patch:P,$reset:N,$subscribe(C,U={}){const J=Bo(f,C,U.detached,()=>ge()),ge=o.run(()=>sn(()=>s.state.value[e],me=>{(U.flush==="sync"?u:l)&&C({storeId:e,type:Zn.direct,events:g},me)},Dt({},c,U)));return J},$dispose:E},V=gs(O);s._s.set(e,V);const x=(s._a&&s._a.runWithContext||$d)(()=>s._e.run(()=>(o=Ka()).run(()=>t({action:T}))));for(const C in x){const U=x[C];if(pe(U)&&!Hd(U)||lt(U))i||(_&&Vd(U)&&(pe(U)?U.value=_[C]:ai(U,_[C])),s.state.value[e][C]=U);else if(typeof U=="function"){const J=T(U,C);x[C]=J,a.actions[C]=U}}return Dt(V,x),Dt(Z(V),x),Object.defineProperty(V,"$state",{get:()=>s.state.value[e],set:C=>{P(U=>{Dt(U,C)})}}),s._p.forEach(C=>{Dt(V,o.run(()=>C({store:V,app:s._a,pinia:s,options:a})))}),_&&i&&n.hydrate&&n.hydrate(V.$state,_),l=!0,u=!0,V}/*! #__NO_SIDE_EFFECTS__ */function Wd(e,t,n){let s;const r=typeof t=="function";s=r?n:t;function i(o,a){const c=ef();return o=o||(c?We(Qc,null):null),o&&yr(o),o=Xc,o._s.has(e)||(r?el(e,t,s,o):jd(e,s,o)),o._s.get(e)}return i.$id=e,i}function bv(e){const t=Z(e),n={};for(const s in t){const r=t[s];r.effect?n[s]=Ie({get:()=>e[s],set(i){e[s]=i}}):(pe(r)||lt(r))&&(n[s]=Ku(e,s))}return n}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const gn=typeof document<"u";function tl(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Gd(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&tl(e.default)}const ne=Object.assign;function Ur(e,t){const n={};for(const s in t){const r=t[s];n[s]=Ze(r)?r.map(e):e(r)}return n}const es=()=>{},Ze=Array.isArray;function Ho(e,t){const n={};for(const s in e)n[s]=s in t?t[s]:e[s];return n}const nl=/#/g,Kd=/&/g,zd=/\//g,qd=/=/g,Jd=/\?/g,sl=/\+/g,Yd=/%5B/g,Xd=/%5D/g,rl=/%5E/g,Qd=/%60/g,il=/%7B/g,Zd=/%7C/g,ol=/%7D/g,eh=/%20/g;function $i(e){return e==null?"":encodeURI(""+e).replace(Zd,"|").replace(Yd,"[").replace(Xd,"]")}function th(e){return $i(e).replace(il,"{").replace(ol,"}").replace(rl,"^")}function ci(e){return $i(e).replace(sl,"%2B").replace(eh,"+").replace(nl,"%23").replace(Kd,"%26").replace(Qd,"`").replace(il,"{").replace(ol,"}").replace(rl,"^")}function nh(e){return ci(e).replace(qd,"%3D")}function sh(e){return $i(e).replace(nl,"%23").replace(Jd,"%3F")}function rh(e){return sh(e).replace(zd,"%2F")}function cs(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const ih=/\/$/,oh=e=>e.replace(ih,"");function Fr(e,t,n="/"){let s,r={},i="",o="";const a=t.indexOf("#");let c=t.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(s=t.slice(0,c),i=t.slice(c,a>0?a:t.length),r=e(i.slice(1))),a>=0&&(s=s||t.slice(0,a),o=t.slice(a,t.length)),s=uh(s??t,n),{fullPath:s+i+o,path:s,query:r,hash:cs(o)}}function ah(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function jo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function ch(e,t,n){const s=t.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&Rn(t.matched[s],n.matched[r])&&al(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Rn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function al(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!lh(e[n],t[n]))return!1;return!0}function lh(e,t){return Ze(e)?Wo(e,t):Ze(t)?Wo(t,e):(e==null?void 0:e.valueOf())===(t==null?void 0:t.valueOf())}function Wo(e,t){return Ze(t)?e.length===t.length&&e.every((n,s)=>n===t[s]):e.length===1&&e[0]===t}function uh(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),s=e.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const kt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let li=(function(e){return e.pop="pop",e.push="push",e})({}),$r=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function fh(e){if(!e)if(gn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),oh(e)}const dh=/^[^#]+#/;function hh(e,t){return e.replace(dh,"#")+t}function ph(e,t){const n=document.documentElement.getBoundingClientRect(),s=e.getBoundingClientRect();return{behavior:t.behavior,left:s.left-n.left-(t.left||0),top:s.top-n.top-(t.top||0)}}const vr=()=>({left:window.scrollX,top:window.scrollY});function gh(e){let t;if("el"in e){const n=e.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;t=ph(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Go(e,t){return(history.state?history.state.position-t:-1)+e}const ui=new Map;function mh(e,t){ui.set(e,t)}function _h(e){const t=ui.get(e);return ui.delete(e),t}function yh(e){return typeof e=="string"||e&&typeof e=="object"}function cl(e){return typeof e=="string"||typeof e=="symbol"}let _e=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const ll=Symbol("");_e.MATCHER_NOT_FOUND+"",_e.NAVIGATION_GUARD_REDIRECT+"",_e.NAVIGATION_ABORTED+"",_e.NAVIGATION_CANCELLED+"",_e.NAVIGATION_DUPLICATED+"";function Pn(e,t){return ne(new Error,{type:e,[ll]:!0},t)}function gt(e,t){return e instanceof Error&&ll in e&&(t==null||!!(e.type&t))}const vh=["params","query","hash"];function bh(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of vh)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function wh(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<n.length;++s){const r=n[s].replace(sl," "),i=r.indexOf("="),o=cs(i<0?r:r.slice(0,i)),a=i<0?null:cs(r.slice(i+1));if(o in t){let c=t[o];Ze(c)||(c=t[o]=[c]),c.push(a)}else t[o]=a}return t}function Ko(e){let t="";for(let n in e){const s=e[n];if(n=nh(n),s==null){s!==void 0&&(t+=(t.length?"&":"")+n);continue}(Ze(s)?s.map(r=>r&&ci(r)):[s&&ci(s)]).forEach(r=>{r!==void 0&&(t+=(t.length?"&":"")+n,r!=null&&(t+="="+r))})}return t}function Eh(e){const t={};for(const n in e){const s=e[n];s!==void 0&&(t[n]=Ze(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return t}const ul=Symbol(""),zo=Symbol(""),br=Symbol(""),Bi=Symbol(""),fi=Symbol("");function Vn(){let e=[];function t(s){return e.push(s),()=>{const r=e.indexOf(s);r>-1&&e.splice(r,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Ih(e,t,n){const s=()=>{e[t].delete(n)};xn(s),Sc(s),Ic(()=>{e[t].add(n)}),e[t].add(n)}function wv(e){const t=We(ul,{}).value;t&&Ih(t,"leaveGuards",e)}function Mt(e,t,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((a,c)=>{const l=d=>{d===!1?c(Pn(_e.NAVIGATION_ABORTED,{from:n,to:t})):d instanceof Error?c(d):yh(d)?c(Pn(_e.NAVIGATION_GUARD_REDIRECT,{from:t,to:d})):(o&&s.enterCallbacks[r]===o&&typeof d=="function"&&o.push(d),a())},u=i(()=>e.call(s&&s.instances[r],t,n,l));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch(d=>c(d))})}function Br(e,t,n,s,r=i=>i()){const i=[];for(const o of e)for(const a in o.components){let c=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(tl(c)){const l=(c.__vccOpts||c)[t];l&&i.push(Mt(l,n,s,o,a,r))}else{let l=c();i.push(()=>l.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=Gd(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[t];return d&&Mt(d,n,s,o,a,r)()}))}}return i}function Sh(e,t){const n=[],s=[],r=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const a=t.matched[o];a&&(e.matched.find(l=>Rn(l,a))?s.push(a):n.push(a));const c=e.matched[o];c&&(t.matched.find(l=>Rn(l,c))||r.push(c))}return[n,s,r]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Th=()=>location.protocol+"//"+location.host;function fl(e,t){const{pathname:n,search:s,hash:r}=t,i=e.indexOf("#");if(i>-1){let o=r.includes(e.slice(i))?e.slice(i).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),jo(a,"")}return jo(n,e)+s+r}function Ch(e,t,n,s){let r=[],i=[],o=null;const a=({state:d})=>{const g=fl(e,location),_=n.value,w=t.value;let P=0;if(d){if(n.value=g,t.value=d,o&&o===_){o=null;return}P=w?d.position-w.position:0}else s(g);r.forEach(N=>{N(n.value,_,{delta:P,type:li.pop,direction:P?P>0?$r.forward:$r.back:$r.unknown})})};function c(){o=n.value}function l(d){r.push(d);const g=()=>{const _=r.indexOf(d);_>-1&&r.splice(_,1)};return i.push(g),g}function u(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(ne({},d.state,{scroll:vr()}),"")}}function f(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:c,listen:l,destroy:f}}function qo(e,t,n,s=!1,r=!1){return{back:e,current:t,forward:n,replaced:s,position:window.history.length,scroll:r?vr():null}}function Ah(e){const{history:t,location:n}=window,s={value:fl(e,n)},r={value:t.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+c:Th()+e+c;try{t[u?"replaceState":"pushState"](l,"",d),r.value=l}catch(g){console.error(g),n[u?"replace":"assign"](d)}}function o(c,l){i(c,ne({},t.state,qo(r.value.back,c,r.value.forward,!0),l,{position:r.value.position}),!0),s.value=c}function a(c,l){const u=ne({},r.value,t.state,{forward:c,scroll:vr()});i(u.current,u,!0),i(c,ne({},qo(s.value,c,null),{position:u.position+1},l),!1),s.value=c}return{location:s,state:r,push:a,replace:o}}function Rh(e){e=fh(e);const t=Ah(e),n=Ch(e,t.state,t.location,t.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=ne({location:"",base:e,go:s,createHref:hh.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}let tn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var we=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(we||{});const Ph={type:tn.Static,value:""},Oh=/[a-zA-Z0-9_]/;function kh(e){if(!e)return[[]];if(e==="/")return[[Ph]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${l}": ${g}`)}let n=we.Static,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,c,l="",u="";function f(){l&&(n===we.Static?i.push({type:tn.Static,value:l}):n===we.Param||n===we.ParamRegExp||n===we.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:tn.Param,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==we.ParamRegExp){s=n,n=we.EscapeNext;continue}switch(n){case we.Static:c==="/"?(l&&f(),o()):c===":"?(f(),n=we.Param):d();break;case we.EscapeNext:d(),n=s;break;case we.Param:c==="("?n=we.ParamRegExp:Oh.test(c)?d():(f(),n=we.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case we.ParamRegExp:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=we.ParamRegExpEnd:u+=c;break;case we.ParamRegExpEnd:f(),n=we.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===we.ParamRegExp&&t(`Unfinished custom RegExp for param "${l}"`),f(),o(),r}const Jo="[^/]+?",Nh={sensitive:!1,strict:!1,start:!0,end:!0};var Oe=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Oe||{});const Dh=/[.+*?^${}()[\]/\\]/g;function xh(e,t){const n=ne({},Nh,t),s=[];let r=n.start?"^":"";const i=[];for(const l of e){const u=l.length?[]:[Oe.Root];n.strict&&!l.length&&(r+="/");for(let f=0;f<l.length;f++){const d=l[f];let g=Oe.Segment+(n.sensitive?Oe.BonusCaseSensitive:0);if(d.type===tn.Static)f||(r+="/"),r+=d.value.replace(Dh,"\\$&"),g+=Oe.Static;else if(d.type===tn.Param){const{value:_,repeatable:w,optional:P,regexp:N}=d;i.push({name:_,repeatable:w,optional:P});const E=N||Jo;if(E!==Jo){g+=Oe.BonusCustomRegExp;try{`${E}`}catch(O){throw new Error(`Invalid custom RegExp for param "${_}" (${E}): `+O.message)}}let T=w?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;f||(T=P&&l.length<2?`(?:/${T})`:"/"+T),P&&(T+="?"),r+=T,g+=Oe.Dynamic,P&&(g+=Oe.BonusOptional),w&&(g+=Oe.BonusRepeatable),E===".*"&&(g+=Oe.BonusWildcard)}u.push(g)}s.push(u)}if(n.strict&&n.end){const l=s.length-1;s[l][s[l].length-1]+=Oe.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(l){const u=l.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const g=u[d]||"",_=i[d-1];f[_.name]=g&&_.repeatable?g.split("/"):g}return f}function c(l){let u="",f=!1;for(const d of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const g of d)if(g.type===tn.Static)u+=g.value;else if(g.type===tn.Param){const{value:_,repeatable:w,optional:P}=g,N=_ in l?l[_]:"";if(Ze(N)&&!w)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const E=Ze(N)?N.join("/"):N;if(!E)if(P)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=E}}return u||"/"}return{re:o,score:s,keys:i,parse:a,stringify:c}}function Lh(e,t){let n=0;for(;n<e.length&&n<t.length;){const s=t[n]-e[n];if(s)return s;n++}return e.length<t.length?e.length===1&&e[0]===Oe.Static+Oe.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===Oe.Static+Oe.Segment?1:-1:0}function dl(e,t){let n=0;const s=e.score,r=t.score;for(;n<s.length&&n<r.length;){const i=Lh(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(Yo(s))return 1;if(Yo(r))return-1}return r.length-s.length}function Yo(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Mh={strict:!1,end:!0,sensitive:!1};function Uh(e,t,n){const s=xh(kh(e.path),n),r=ne(s,{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function Fh(e,t){const n=[],s=new Map;t=Ho(Mh,t);function r(f){return s.get(f)}function i(f,d,g){const _=!g,w=Qo(f);w.aliasOf=g&&g.record;const P=Ho(t,f),N=[w];if("alias"in f){const O=typeof f.alias=="string"?[f.alias]:f.alias;for(const V of O)N.push(Qo(ne({},w,{components:g?g.record.components:w.components,path:V,aliasOf:g?g.record:w})))}let E,T;for(const O of N){const{path:V}=O;if(d&&V[0]!=="/"){const q=d.record.path,x=q[q.length-1]==="/"?"":"/";O.path=d.record.path+(V&&x+V)}if(E=Uh(O,d,P),g?g.alias.push(E):(T=T||E,T!==E&&T.alias.push(E),_&&f.name&&!Zo(E)&&o(f.name)),hl(E)&&c(E),w.children){const q=w.children;for(let x=0;x<q.length;x++)i(q[x],E,g&&g.children[x])}g=g||E}return T?()=>{o(T)}:es}function o(f){if(cl(f)){const d=s.get(f);d&&(s.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&s.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function c(f){const d=Vh(f,n);n.splice(d,0,f),f.record.name&&!Zo(f)&&s.set(f.record.name,f)}function l(f,d){let g,_={},w,P;if("name"in f&&f.name){if(g=s.get(f.name),!g)throw Pn(_e.MATCHER_NOT_FOUND,{location:f});P=g.record.name,_=ne(Xo(d.params,g.keys.filter(T=>!T.optional).concat(g.parent?g.parent.keys.filter(T=>T.optional):[]).map(T=>T.name)),f.params&&Xo(f.params,g.keys.map(T=>T.name))),w=g.stringify(_)}else if(f.path!=null)w=f.path,g=n.find(T=>T.re.test(w)),g&&(_=g.parse(w),P=g.record.name);else{if(g=d.name?s.get(d.name):n.find(T=>T.re.test(d.path)),!g)throw Pn(_e.MATCHER_NOT_FOUND,{location:f,currentLocation:d});P=g.record.name,_=ne({},d.params,f.params),w=g.stringify(_)}const N=[];let E=g;for(;E;)N.unshift(E.record),E=E.parent;return{name:P,path:w,params:_,matched:N,meta:Bh(N)}}e.forEach(f=>i(f));function u(){n.length=0,s.clear()}return{addRoute:i,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function Xo(e,t){const n={};for(const s of t)s in e&&(n[s]=e[s]);return n}function Qo(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:$h(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function $h(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const s in e.components)t[s]=typeof n=="object"?n[s]:n;return t}function Zo(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Bh(e){return e.reduce((t,n)=>ne(t,n.meta),{})}function Vh(e,t){let n=0,s=t.length;for(;n!==s;){const i=n+s>>1;dl(e,t[i])<0?s=i:n=i+1}const r=Hh(e);return r&&(s=t.lastIndexOf(r,s-1)),s}function Hh(e){let t=e;for(;t=t.parent;)if(hl(t)&&dl(e,t)===0)return t}function hl({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function ea(e){const t=We(br),n=We(Bi),s=Ie(()=>{const c=Ne(e.to);return t.resolve(c)}),r=Ie(()=>{const{matched:c}=s.value,{length:l}=c,u=c[l-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(Rn.bind(null,u));if(d>-1)return d;const g=ta(c[l-2]);return l>1&&ta(u)===g&&f[f.length-1].path!==g?f.findIndex(Rn.bind(null,c[l-2])):d}),i=Ie(()=>r.value>-1&&zh(n.params,s.value.params)),o=Ie(()=>r.value>-1&&r.value===n.matched.length-1&&al(n.params,s.value.params));function a(c={}){if(Kh(c)){const l=t[Ne(e.replace)?"replace":"push"](Ne(e.to)).catch(es);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:s,href:Ie(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}function jh(e){return e.length===1?e[0]:e}const Wh=Dn({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:ea,setup(e,{slots:t}){const n=gs(ea(e)),{options:s}=We(br),r=Ie(()=>({[na(e.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[na(e.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&jh(t.default(n));return e.custom?i:zc("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),Gh=Wh;function Kh(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function zh(e,t){for(const n in t){const s=t[n],r=e[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Ze(r)||r.length!==s.length||s.some((i,o)=>i.valueOf()!==r[o].valueOf()))return!1}return!0}function ta(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const na=(e,t,n)=>e??t??n,qh=Dn({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const s=We(fi),r=Ie(()=>e.route||s.value),i=We(zo,0),o=Ie(()=>{let l=Ne(i);const{matched:u}=r.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),a=Ie(()=>r.value.matched[o.value]);ks(zo,Ie(()=>o.value+1)),ks(ul,a),ks(fi,r);const c=ce();return sn(()=>[c.value,a.value,e.name],([l,u,f],[d,g,_])=>{u&&(u.instances[f]=l,g&&g!==u&&l&&l===d&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),l&&u&&(!g||!Rn(u,g)||!d)&&(u.enterCallbacks[f]||[]).forEach(w=>w(l))},{flush:"post"}),()=>{const l=r.value,u=e.name,f=a.value,d=f&&f.components[u];if(!d)return sa(n.default,{Component:d,route:l});const g=f.props[u],_=g?g===!0?l.params:typeof g=="function"?g(l):g:null,P=zc(d,ne({},_,t,{onVnodeUnmounted:N=>{N.component.isUnmounted&&(f.instances[u]=null)},ref:c}));return sa(n.default,{Component:P,route:l})||P}}});function sa(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const Jh=qh;function Yh(e){const t=Fh(e.routes,e),n=e.parseQuery||wh,s=e.stringifyQuery||Ko,r=e.history,i=Vn(),o=Vn(),a=Vn(),c=Bu(kt);let l=kt;gn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ur.bind(null,b=>""+b),f=Ur.bind(null,rh),d=Ur.bind(null,cs);function g(b,F){let L,$;return cl(b)?(L=t.getRecordMatcher(b),$=F):$=b,t.addRoute($,L)}function _(b){const F=t.getRecordMatcher(b);F&&t.removeRoute(F)}function w(){return t.getRoutes().map(b=>b.record)}function P(b){return!!t.getRecordMatcher(b)}function N(b,F){if(F=ne({},F||c.value),typeof b=="string"){const m=Fr(n,b,F.path),y=t.resolve({path:m.path},F),I=r.createHref(m.fullPath);return ne(m,y,{params:d(y.params),hash:cs(m.hash),redirectedFrom:void 0,href:I})}let L;if(b.path!=null)L=ne({},b,{path:Fr(n,b.path,F.path).path});else{const m=ne({},b.params);for(const y in m)m[y]==null&&delete m[y];L=ne({},b,{params:f(m)}),F.params=f(F.params)}const $=t.resolve(L,F),X=b.hash||"";$.params=u(d($.params));const h=ah(s,ne({},b,{hash:th(X),path:$.path})),p=r.createHref(h);return ne({fullPath:h,hash:X,query:s===Ko?Eh(b.query):b.query||{}},$,{redirectedFrom:void 0,href:p})}function E(b){return typeof b=="string"?Fr(n,b,c.value.path):ne({},b)}function T(b,F){if(l!==b)return Pn(_e.NAVIGATION_CANCELLED,{from:F,to:b})}function O(b){return x(b)}function V(b){return O(ne(E(b),{replace:!0}))}function q(b,F){const L=b.matched[b.matched.length-1];if(L&&L.redirect){const{redirect:$}=L;let X=typeof $=="function"?$(b,F):$;return typeof X=="string"&&(X=X.includes("?")||X.includes("#")?X=E(X):{path:X},X.params={}),ne({query:b.query,hash:b.hash,params:X.path!=null?{}:b.params},X)}}function x(b,F){const L=l=N(b),$=c.value,X=b.state,h=b.force,p=b.replace===!0,m=q(L,$);if(m)return x(ne(E(m),{state:typeof m=="object"?ne({},X,m.state):X,force:h,replace:p}),F||L);const y=L;y.redirectedFrom=F;let I;return!h&&ch(s,$,L)&&(I=Pn(_e.NAVIGATION_DUPLICATED,{to:y,from:$}),xe($,$,!0,!1)),(I?Promise.resolve(I):J(y,$)).catch(v=>gt(v)?gt(v,_e.NAVIGATION_GUARD_REDIRECT)?v:$e(v):Y(v,y,$)).then(v=>{if(v){if(gt(v,_e.NAVIGATION_GUARD_REDIRECT))return x(ne({replace:p},E(v.to),{state:typeof v.to=="object"?ne({},X,v.to.state):X,force:h}),F||y)}else v=me(y,$,!0,p,X);return ge(y,$,v),v})}function C(b,F){const L=T(b,F);return L?Promise.reject(L):Promise.resolve()}function U(b){const F=un.values().next().value;return F&&typeof F.runWithContext=="function"?F.runWithContext(b):b()}function J(b,F){let L;const[$,X,h]=Sh(b,F);L=Br($.reverse(),"beforeRouteLeave",b,F);for(const m of $)m.leaveGuards.forEach(y=>{L.push(Mt(y,b,F))});const p=C.bind(null,b,F);return L.push(p),Ke(L).then(()=>{L=[];for(const m of i.list())L.push(Mt(m,b,F));return L.push(p),Ke(L)}).then(()=>{L=Br(X,"beforeRouteUpdate",b,F);for(const m of X)m.updateGuards.forEach(y=>{L.push(Mt(y,b,F))});return L.push(p),Ke(L)}).then(()=>{L=[];for(const m of h)if(m.beforeEnter)if(Ze(m.beforeEnter))for(const y of m.beforeEnter)L.push(Mt(y,b,F));else L.push(Mt(m.beforeEnter,b,F));return L.push(p),Ke(L)}).then(()=>(b.matched.forEach(m=>m.enterCallbacks={}),L=Br(h,"beforeRouteEnter",b,F,U),L.push(p),Ke(L))).then(()=>{L=[];for(const m of o.list())L.push(Mt(m,b,F));return L.push(p),Ke(L)}).catch(m=>gt(m,_e.NAVIGATION_CANCELLED)?m:Promise.reject(m))}function ge(b,F,L){a.list().forEach($=>U(()=>$(b,F,L)))}function me(b,F,L,$,X){const h=T(b,F);if(h)return h;const p=F===kt,m=gn?history.state:{};L&&($||p?r.replace(b.fullPath,ne({scroll:p&&m&&m.scroll},X)):r.push(b.fullPath,X)),c.value=b,xe(b,F,L,p),$e()}let be;function Fe(){be||(be=r.listen((b,F,L)=>{if(!qt.listening)return;const $=N(b),X=q($,qt.currentRoute.value);if(X){x(ne(X,{replace:!0,force:!0}),$).catch(es);return}l=$;const h=c.value;gn&&mh(Go(h.fullPath,L.delta),vr()),J($,h).catch(p=>gt(p,_e.NAVIGATION_ABORTED|_e.NAVIGATION_CANCELLED)?p:gt(p,_e.NAVIGATION_GUARD_REDIRECT)?(x(ne(E(p.to),{force:!0}),$).then(m=>{gt(m,_e.NAVIGATION_ABORTED|_e.NAVIGATION_DUPLICATED)&&!L.delta&&L.type===li.pop&&r.go(-1,!1)}).catch(es),Promise.reject()):(L.delta&&r.go(-L.delta,!1),Y(p,$,h))).then(p=>{p=p||me($,h,!1),p&&(L.delta&&!gt(p,_e.NAVIGATION_CANCELLED)?r.go(-L.delta,!1):L.type===li.pop&&gt(p,_e.NAVIGATION_ABORTED|_e.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),ge($,h,p)}).catch(es)}))}let Ge=Vn(),te=Vn(),K;function Y(b,F,L){$e(b);const $=te.list();return $.length?$.forEach(X=>X(b,F,L)):console.error(b),Promise.reject(b)}function he(){return K&&c.value!==kt?Promise.resolve():new Promise((b,F)=>{Ge.add([b,F])})}function $e(b){return K||(K=!b,Fe(),Ge.list().forEach(([F,L])=>b?L(b):F()),Ge.reset()),b}function xe(b,F,L,$){const{scrollBehavior:X}=e;if(!gn||!X)return Promise.resolve();const h=!L&&_h(Go(b.fullPath,0))||($||!L)&&history.state&&history.state.scroll||null;return Ni().then(()=>X(b,F,h)).then(p=>p&&gh(p)).catch(p=>Y(p,b,F))}const Ee=b=>r.go(b);let ln;const un=new Set,qt={currentRoute:c,listening:!0,addRoute:g,removeRoute:_,clearRoutes:t.clearRoutes,hasRoute:P,getRoutes:w,resolve:N,options:e,push:O,replace:V,go:Ee,back:()=>Ee(-1),forward:()=>Ee(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:te.add,isReady:he,install(b){b.component("RouterLink",Gh),b.component("RouterView",Jh),b.config.globalProperties.$router=qt,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>Ne(c)}),gn&&!ln&&c.value===kt&&(ln=!0,O(r.location).catch($=>{}));const F={};for(const $ in kt)Object.defineProperty(F,$,{get:()=>c.value[$],enumerable:!0});b.provide(br,qt),b.provide(Bi,cc(F)),b.provide(fi,c);const L=b.unmount;un.add(b),b.unmount=function(){un.delete(b),un.size<1&&(l=kt,be&&be(),be=null,c.value=kt,ln=!1,K=!1),L()}}};function Ke(b){return b.reduce((F,L)=>F.then(()=>U(L)),Promise.resolve())}return qt}function Ev(){return We(br)}function Xh(e){return We(Bi)}const Qh=()=>{};var ra={};/**
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
 */const pl=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let r=e.charCodeAt(s);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=r&63|128):(r&64512)===55296&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=r&63|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=r&63|128)}return t},Zh=function(e){const t=[];let n=0,s=0;for(;n<e.length;){const r=e[n++];if(r<128)t[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=e[n++],o=e[n++],a=e[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;t[s++]=String.fromCharCode(55296+(c>>10)),t[s++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],o=e[n++];t[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return t.join("")},gl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<e.length;r+=3){const i=e[r],o=r+1<e.length,a=o?e[r+1]:0,c=r+2<e.length,l=c?e[r+2]:0,u=i>>2,f=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(d=64)),s.push(n[u],n[f],n[d],n[g])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(pl(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Zh(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<e.length;){const i=n[e.charAt(r++)],a=r<e.length?n[e.charAt(r)]:0;++r;const l=r<e.length?n[e.charAt(r)]:64;++r;const f=r<e.length?n[e.charAt(r)]:64;if(++r,i==null||a==null||l==null||f==null)throw new ep;const d=i<<2|a>>4;if(s.push(d),l!==64){const g=a<<4&240|l>>2;if(s.push(g),f!==64){const _=l<<6&192|f;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class ep extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const tp=function(e){const t=pl(e);return gl.encodeByteArray(t,!0)},ml=function(e){return tp(e).replace(/\./g,"")},_l=function(e){try{return gl.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function np(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const sp=()=>np().__FIREBASE_DEFAULTS__,rp=()=>{if(typeof process>"u"||typeof ra>"u")return;const e=ra.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},ip=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&_l(e[1]);return t&&JSON.parse(t)},Vi=()=>{try{return Qh()||sp()||rp()||ip()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},op=e=>{var t,n;return(n=(t=Vi())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},yl=()=>{var e;return(e=Vi())==null?void 0:e.config},vl=e=>{var t;return(t=Vi())==null?void 0:t[`_${e}`]};/**
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
 */class ap{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,s))}}}/**
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
 */function wr(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cp(e){return(await fetch(e,{credentials:"include"})).ok}const ts={};function lp(){const e={prod:[],emulator:[]};for(const t of Object.keys(ts))ts[t]?e.emulator.push(t):e.prod.push(t);return e}function up(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let ia=!1;function fp(e,t){if(typeof window>"u"||typeof document>"u"||!wr(window.location.host)||ts[e]===t||ts[e]||ia)return;ts[e]=t;function n(d){return`__firebase__banner__${d}`}const s="__firebase__banner",i=lp().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,g){d.setAttribute("width","24"),d.setAttribute("id",g),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{ia=!0,o()},d}function u(d,g){d.setAttribute("id",g),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function f(){const d=up(s),g=n("text"),_=document.getElementById(g)||document.createElement("span"),w=n("learnmore"),P=document.getElementById(w)||document.createElement("a"),N=n("preprendIcon"),E=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const T=d.element;a(T),u(P,w);const O=l();c(E,N),T.append(E,_,P,O),document.body.appendChild(T)}i?(_.innerText="Preview backend disconnected.",E.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(E.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function dp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function hp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pp(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function gp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mp(){const e=De();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function _p(){try{return typeof indexedDB=="object"}catch{return!1}}function yp(){return new Promise((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;t(((i=r.error)==null?void 0:i.message)||"")}}catch(n){t(n)}})}/**
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
 */const vp="FirebaseError";class Kt extends Error{constructor(t,n,s){super(n),this.code=t,this.customData=s,this.name=vp,Object.setPrototypeOf(this,Kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ys.prototype.create)}}class ys{constructor(t,n,s){this.service=t,this.serviceName=n,this.errors=s}create(t,...n){const s=n[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?bp(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Kt(r,a,s)}}function bp(e,t){return e.replace(wp,(n,s)=>{const r=t[s];return r!=null?String(r):`<${s}?>`})}const wp=/\{\$([^}]+)}/g;function Ep(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function On(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const r of n){if(!s.includes(r))return!1;const i=e[r],o=t[r];if(oa(i)&&oa(o)){if(!On(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function oa(e){return e!==null&&typeof e=="object"}/**
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
 */function vs(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach(r=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function jn(e){const t={};return e.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");t[decodeURIComponent(r)]=decodeURIComponent(i)}}),t}function Wn(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function Ip(e,t){const n=new Sp(e,t);return n.subscribe.bind(n)}class Sp{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(s=>{this.error(s)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,s){let r;if(t===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Tp(t,["next","error","complete"])?r=t:r={next:t,error:n,complete:s},r.next===void 0&&(r.next=Vr),r.error===void 0&&(r.error=Vr),r.complete===void 0&&(r.complete=Vr);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Tp(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Vr(){}/**
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
 */function Ot(e){return e&&e._delegate?e._delegate:e}class kn{constructor(t,n,s){this.name=t,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Zt="[DEFAULT]";/**
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
 */class Cp{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const s=new ap;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Rp(t))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(t=Zt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Zt){return this.instances.has(t)}getOptions(t=Zt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(t,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ap(t),options:n}),this.instances.set(t,s),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=Zt){return this.component?this.component.multipleInstances?t:Zt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ap(e){return e===Zt?void 0:e}function Rp(e){return e.instantiationMode==="EAGER"}/**
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
 */class Pp{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Cp(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ae;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(ae||(ae={}));const Op={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},kp=ae.INFO,Np={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},Dp=(e,t,...n)=>{if(t<e.logLevel)return;const s=new Date().toISOString(),r=Np[t];if(r)console[r](`[${s}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class bl{constructor(t){this.name=t,this._logLevel=kp,this._logHandler=Dp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in ae))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Op[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...t),this._logHandler(this,ae.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...t),this._logHandler(this,ae.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...t),this._logHandler(this,ae.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...t),this._logHandler(this,ae.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...t),this._logHandler(this,ae.ERROR,...t)}}const xp=(e,t)=>t.some(n=>e instanceof n);let aa,ca;function Lp(){return aa||(aa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mp(){return ca||(ca=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wl=new WeakMap,di=new WeakMap,El=new WeakMap,Hr=new WeakMap,Hi=new WeakMap;function Up(e){const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{n(Ht(e.result)),r()},o=()=>{s(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&wl.set(n,e)}).catch(()=>{}),Hi.set(t,e),t}function Fp(e){if(di.has(e))return;const t=new Promise((n,s)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)});di.set(e,t)}let hi={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return di.get(e);if(t==="objectStoreNames")return e.objectStoreNames||El.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ht(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function $p(e){hi=e(hi)}function Bp(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const s=e.call(jr(this),t,...n);return El.set(s,t.sort?t.sort():[t]),Ht(s)}:Mp().includes(e)?function(...t){return e.apply(jr(this),t),Ht(wl.get(this))}:function(...t){return Ht(e.apply(jr(this),t))}}function Vp(e){return typeof e=="function"?Bp(e):(e instanceof IDBTransaction&&Fp(e),xp(e,Lp())?new Proxy(e,hi):e)}function Ht(e){if(e instanceof IDBRequest)return Up(e);if(Hr.has(e))return Hr.get(e);const t=Vp(e);return t!==e&&(Hr.set(e,t),Hi.set(t,e)),t}const jr=e=>Hi.get(e);function Hp(e,t,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(e,t),a=Ht(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Ht(o.result),c.oldVersion,c.newVersion,Ht(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const jp=["get","getKey","getAll","getAllKeys","count"],Wp=["put","add","delete","clear"],Wr=new Map;function la(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Wr.get(t))return Wr.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,r=Wp.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||jp.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Wr.set(t,i),i}$p(e=>({...e,get:(t,n,s)=>la(t,n)||e.get(t,n,s),has:(t,n)=>!!la(t,n)||e.has(t,n)}));/**
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
 */class Gp{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Kp(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Kp(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const pi="@firebase/app",ua="0.14.9";/**
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
 */const At=new bl("@firebase/app"),zp="@firebase/app-compat",qp="@firebase/analytics-compat",Jp="@firebase/analytics",Yp="@firebase/app-check-compat",Xp="@firebase/app-check",Qp="@firebase/auth",Zp="@firebase/auth-compat",eg="@firebase/database",tg="@firebase/data-connect",ng="@firebase/database-compat",sg="@firebase/functions",rg="@firebase/functions-compat",ig="@firebase/installations",og="@firebase/installations-compat",ag="@firebase/messaging",cg="@firebase/messaging-compat",lg="@firebase/performance",ug="@firebase/performance-compat",fg="@firebase/remote-config",dg="@firebase/remote-config-compat",hg="@firebase/storage",pg="@firebase/storage-compat",gg="@firebase/firestore",mg="@firebase/ai",_g="@firebase/firestore-compat",yg="firebase",vg="12.10.0";/**
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
 */const gi="[DEFAULT]",bg={[pi]:"fire-core",[zp]:"fire-core-compat",[Jp]:"fire-analytics",[qp]:"fire-analytics-compat",[Xp]:"fire-app-check",[Yp]:"fire-app-check-compat",[Qp]:"fire-auth",[Zp]:"fire-auth-compat",[eg]:"fire-rtdb",[tg]:"fire-data-connect",[ng]:"fire-rtdb-compat",[sg]:"fire-fn",[rg]:"fire-fn-compat",[ig]:"fire-iid",[og]:"fire-iid-compat",[ag]:"fire-fcm",[cg]:"fire-fcm-compat",[lg]:"fire-perf",[ug]:"fire-perf-compat",[fg]:"fire-rc",[dg]:"fire-rc-compat",[hg]:"fire-gcs",[pg]:"fire-gcs-compat",[gg]:"fire-fst",[_g]:"fire-fst-compat",[mg]:"fire-vertex","fire-js":"fire-js",[yg]:"fire-js-all"};/**
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
 */const Ys=new Map,wg=new Map,mi=new Map;function fa(e,t){try{e.container.addComponent(t)}catch(n){At.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function ls(e){const t=e.name;if(mi.has(t))return At.debug(`There were multiple attempts to register component ${t}.`),!1;mi.set(t,e);for(const n of Ys.values())fa(n,e);for(const n of wg.values())fa(n,e);return!0}function Il(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function at(e){return e==null?!1:e.settings!==void 0}/**
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
 */const Eg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},jt=new ys("app","Firebase",Eg);/**
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
 */class Ig{constructor(t,n,s){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new kn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw jt.create("app-deleted",{appName:this._name})}}/**
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
 */const bs=vg;function Sl(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const s={name:gi,automaticDataCollectionEnabled:!0,...t},r=s.name;if(typeof r!="string"||!r)throw jt.create("bad-app-name",{appName:String(r)});if(n||(n=yl()),!n)throw jt.create("no-options");const i=Ys.get(r);if(i){if(On(n,i.options)&&On(s,i.config))return i;throw jt.create("duplicate-app",{appName:r})}const o=new Pp(r);for(const c of mi.values())o.addComponent(c);const a=new Ig(n,s,o);return Ys.set(r,a),a}function Sg(e=gi){const t=Ys.get(e);if(!t&&e===gi&&yl())return Sl();if(!t)throw jt.create("no-app",{appName:e});return t}function wn(e,t,n){let s=bg[e]??e;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=t.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${t}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),At.warn(o.join(" "));return}ls(new kn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Tg="firebase-heartbeat-database",Cg=1,us="firebase-heartbeat-store";let Gr=null;function Tl(){return Gr||(Gr=Hp(Tg,Cg,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(us)}catch(n){console.warn(n)}}}}).catch(e=>{throw jt.create("idb-open",{originalErrorMessage:e.message})})),Gr}async function Ag(e){try{const n=(await Tl()).transaction(us),s=await n.objectStore(us).get(Cl(e));return await n.done,s}catch(t){if(t instanceof Kt)At.warn(t.message);else{const n=jt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});At.warn(n.message)}}}async function da(e,t){try{const s=(await Tl()).transaction(us,"readwrite");await s.objectStore(us).put(t,Cl(e)),await s.done}catch(n){if(n instanceof Kt)At.warn(n.message);else{const s=jt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});At.warn(s.message)}}}function Cl(e){return`${e.name}!${e.options.appId}`}/**
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
 */const Rg=1024,Pg=30;class Og{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ng(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var t,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ha();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Pg){const o=Dg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){At.warn(s)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ha(),{heartbeatsToSend:s,unsentEntries:r}=kg(this._heartbeatsCache.heartbeats),i=ml(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return At.warn(n),""}}}function ha(){return new Date().toISOString().substring(0,10)}function kg(e,t=Rg){const n=[];let s=e.slice();for(const r of e){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),pa(n)>t){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),pa(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Ng{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _p()?yp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ag(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return da(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return da(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function pa(e){return ml(JSON.stringify({version:2,heartbeats:e})).length}function Dg(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let s=1;s<e.length;s++)e[s].date<n&&(n=e[s].date,t=s);return t}/**
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
 */function xg(e){ls(new kn("platform-logger",t=>new Gp(t),"PRIVATE")),ls(new kn("heartbeat",t=>new Og(t),"PRIVATE")),wn(pi,ua,e),wn(pi,ua,"esm2020"),wn("fire-js","")}xg("");function Al(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Lg=Al,Rl=new ys("auth","Firebase",Al());/**
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
 */const Xs=new bl("@firebase/auth");function Mg(e,...t){Xs.logLevel<=ae.WARN&&Xs.warn(`Auth (${bs}): ${e}`,...t)}function Ls(e,...t){Xs.logLevel<=ae.ERROR&&Xs.error(`Auth (${bs}): ${e}`,...t)}/**
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
 */function et(e,...t){throw ji(e,...t)}function ut(e,...t){return ji(e,...t)}function Pl(e,t,n){const s={...Lg(),[t]:n};return new ys("auth","Firebase",s).create(t,{appName:e.name})}function Wt(e){return Pl(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ji(e,...t){if(typeof e!="string"){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return Rl.create(e,...t)}function W(e,t,...n){if(!e)throw ji(t,...n)}function wt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Ls(t),new Error(t)}function Rt(e,t){e||wt(t)}/**
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
 */function _i(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.href)||""}function Ug(){return ga()==="http:"||ga()==="https:"}function ga(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.protocol)||null}/**
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
 */function Fg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ug()||pp()||"connection"in navigator)?navigator.onLine:!0}function $g(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
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
 */class ws{constructor(t,n){this.shortDelay=t,this.longDelay=n,Rt(n>t,"Short delay should be less than long delay!"),this.isMobile=dp()||gp()}get(){return Fg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wi(e,t){Rt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
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
 */class Ol{static initialize(t,n,s){this.fetchImpl=t,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Bg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Vg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Hg=new ws(3e4,6e4);function cn(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function zt(e,t,n,s,r={}){return kl(e,r,async()=>{let i={},o={};s&&(t==="GET"?o=s:i={body:JSON.stringify(s)});const a=vs({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const l={method:t,headers:c,...i};return hp()||(l.referrerPolicy="no-referrer"),e.emulatorConfig&&wr(e.emulatorConfig.host)&&(l.credentials="include"),Ol.fetch()(await Nl(e,e.config.apiHost,n,a),l)})}async function kl(e,t,n){e._canInitEmulator=!1;const s={...Bg,...t};try{const r=new Wg(e),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Rs(e,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Rs(e,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Rs(e,"email-already-in-use",o);if(c==="USER_DISABLED")throw Rs(e,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Pl(e,u,l);et(e,u)}}catch(r){if(r instanceof Kt)throw r;et(e,"network-request-failed",{message:String(r)})}}async function Er(e,t,n,s,r={}){const i=await zt(e,t,n,s,r);return"mfaPendingCredential"in i&&et(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function Nl(e,t,n,s){const r=`${t}${n}?${s}`,i=e,o=i.config.emulator?Wi(e.config,r):`${e.config.apiScheme}://${r}`;return Vg.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function jg(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Wg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(ut(this.auth,"network-request-failed")),Hg.get())})}}function Rs(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=ut(e,t,s);return r.customData._tokenResponse=n,r}function ma(e){return e!==void 0&&e.enterprise!==void 0}class Gg{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===t)return jg(n.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Kg(e,t){return zt(e,"GET","/v2/recaptchaConfig",cn(e,t))}/**
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
 */async function zg(e,t){return zt(e,"POST","/v1/accounts:delete",t)}async function Qs(e,t){return zt(e,"POST","/v1/accounts:lookup",t)}/**
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
 */function ns(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function qg(e,t=!1){const n=Ot(e),s=await n.getIdToken(t),r=Gi(s);W(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:ns(Kr(r.auth_time)),issuedAtTime:ns(Kr(r.iat)),expirationTime:ns(Kr(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Kr(e){return Number(e)*1e3}function Gi(e){const[t,n,s]=e.split(".");if(t===void 0||n===void 0||s===void 0)return Ls("JWT malformed, contained fewer than 3 sections"),null;try{const r=_l(n);return r?JSON.parse(r):(Ls("Failed to decode base64 JWT payload"),null)}catch(r){return Ls("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function _a(e){const t=Gi(e);return W(t,"internal-error"),W(typeof t.exp<"u","internal-error"),W(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function fs(e,t,n=!1){if(n)return t;try{return await t}catch(s){throw s instanceof Kt&&Jg(s)&&e.auth.currentUser===e&&await e.auth.signOut(),s}}function Jg({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
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
 */class Yg{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class yi{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ns(this.lastLoginAt),this.creationTime=ns(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Zs(e){var f;const t=e.auth,n=await e.getIdToken(),s=await fs(e,Qs(t,{idToken:n}));W(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];e._notifyReloadListener(r);const i=(f=r.providerUserInfo)!=null&&f.length?Dl(r.providerUserInfo):[],o=Qg(e.providerData,i),a=e.isAnonymous,c=!(e.email&&r.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new yi(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(e,u)}async function Xg(e){const t=Ot(e);await Zs(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Qg(e,t){return[...e.filter(s=>!t.some(r=>r.providerId===s.providerId)),...t]}function Dl(e){return e.map(({providerId:t,...n})=>({providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function Zg(e,t){const n=await kl(e,{},async()=>{const s=vs({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,o=await Nl(e,r,"/v1/token",`key=${i}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return e.emulatorConfig&&wr(e.emulatorConfig.host)&&(c.credentials="include"),Ol.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function em(e,t){return zt(e,"POST","/v2/accounts:revokeToken",cn(e,t))}/**
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
 */class En{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){W(t.idToken,"internal-error"),W(typeof t.idToken<"u","internal-error"),W(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):_a(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){W(t.length!==0,"internal-error");const n=_a(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await Zg(t,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(t,n,s){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(t,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new En;return s&&(W(typeof s=="string","internal-error",{appName:t}),o.refreshToken=s),r&&(W(typeof r=="string","internal-error",{appName:t}),o.accessToken=r),i&&(W(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new En,this.toJSON())}_performRefresh(){return wt("not implemented")}}/**
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
 */function Nt(e,t){W(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class Ye{constructor({uid:t,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Yg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new yi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(t){const n=await fs(this,this.stsTokenManager.getToken(this.auth,t));return W(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return qg(this,t)}reload(){return Xg(this)}_assign(t){this!==t&&(W(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>({...n})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new Ye({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(t){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let s=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),s=!0),n&&await Zs(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(at(this.auth.app))return Promise.reject(Wt(this.auth));const t=await this.getIdToken();return await fs(this,zg(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:f,emailVerified:d,isAnonymous:g,providerData:_,stsTokenManager:w}=n;W(f&&w,t,"internal-error");const P=En.fromJSON(this.name,w);W(typeof f=="string",t,"internal-error"),Nt(s,t.name),Nt(r,t.name),W(typeof d=="boolean",t,"internal-error"),W(typeof g=="boolean",t,"internal-error"),Nt(i,t.name),Nt(o,t.name),Nt(a,t.name),Nt(c,t.name),Nt(l,t.name),Nt(u,t.name);const N=new Ye({uid:f,auth:t,email:r,emailVerified:d,displayName:s,isAnonymous:g,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:P,createdAt:l,lastLoginAt:u});return _&&Array.isArray(_)&&(N.providerData=_.map(E=>({...E}))),c&&(N._redirectEventId=c),N}static async _fromIdTokenResponse(t,n,s=!1){const r=new En;r.updateFromServerResponse(n);const i=new Ye({uid:n.localId,auth:t,stsTokenManager:r,isAnonymous:s});return await Zs(i),i}static async _fromGetAccountInfoResponse(t,n,s){const r=n.users[0];W(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Dl(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),a=new En;a.updateFromIdToken(s);const c=new Ye({uid:r.localId,auth:t,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new yi(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,l),c}}/**
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
 */const ya=new Map;function Et(e){Rt(e instanceof Function,"Expected a class definition");let t=ya.get(e);return t?(Rt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ya.set(e,t),t)}/**
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
 */class xl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}xl.type="NONE";const va=xl;/**
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
 */function Ms(e,t,n){return`firebase:${e}:${t}:${n}`}class In{constructor(t,n,s){this.persistence=t,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Ms(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ms("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const n=await Qs(this.auth,{idToken:t}).catch(()=>{});return n?Ye._fromGetAccountInfoResponse(this.auth,n,t):null}return Ye._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,s="authUser"){if(!n.length)return new In(Et(va),t,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||Et(va);const o=Ms(s,t.config.apiKey,t.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let f;if(typeof u=="string"){const d=await Qs(t,{idToken:u}).catch(()=>{});if(!d)break;f=await Ye._fromGetAccountInfoResponse(t,d,u)}else f=Ye._fromJSON(t,u);l!==i&&(a=f),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new In(i,t,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new In(i,t,s))}}/**
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
 */function ba(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Fl(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Ll(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Bl(t))return"Blackberry";if(Vl(t))return"Webos";if(Ml(t))return"Safari";if((t.includes("chrome/")||Ul(t))&&!t.includes("edge/"))return"Chrome";if($l(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=e.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Ll(e=De()){return/firefox\//i.test(e)}function Ml(e=De()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Ul(e=De()){return/crios\//i.test(e)}function Fl(e=De()){return/iemobile/i.test(e)}function $l(e=De()){return/android/i.test(e)}function Bl(e=De()){return/blackberry/i.test(e)}function Vl(e=De()){return/webos/i.test(e)}function Ki(e=De()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function tm(e=De()){var t;return Ki(e)&&!!((t=window.navigator)!=null&&t.standalone)}function nm(){return mp()&&document.documentMode===10}function Hl(e=De()){return Ki(e)||$l(e)||Vl(e)||Bl(e)||/windows phone/i.test(e)||Fl(e)}/**
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
 */function jl(e,t=[]){let n;switch(e){case"Browser":n=ba(De());break;case"Worker":n=`${ba(De())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${bs}/${s}`}/**
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
 */class sm{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const s=i=>new Promise((o,a)=>{try{const c=t(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const s of this.queue)await s(t),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function rm(e,t={}){return zt(e,"GET","/v2/passwordPolicy",cn(e,t))}/**
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
 */const im=6;class om{constructor(t){var s;const n=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??im,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=t.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,n),this.validatePasswordCharacterOptions(t,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(t,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=t.length>=s),r&&(n.meetsMaxPasswordLength=t.length<=r)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<t.length;r++)s=t.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(t,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
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
 */class am{constructor(t,n,s,r){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new wa(this),this.idTokenSubscription=new wa(this),this.beforeStateQueue=new sm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=Et(n)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await In.create(this,t),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await Qs(this,{idToken:t}),s=await Ye._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(at(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(t);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await Zs(t)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=$g()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(at(this.app))return Promise.reject(Wt(this));const n=t?Ot(t):null;return n&&W(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&W(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return at(this.app)?Promise.reject(Wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return at(this.app)?Promise.reject(Wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Et(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await rm(this),n=new om(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new ys("auth","Firebase",t())}onAuthStateChanged(t,n,s){return this.registerStateListener(this.authStateSubscription,t,n,s)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,s){return this.registerStateListener(this.idTokenSubscription,t,n,s)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const s=this.onAuthStateChanged(()=>{s(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await em(this,s)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,n){const s=await this.getOrInitRedirectPersistenceManager(n);return t===null?s.removeCurrentUser():s.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&Et(t)||this._popupRedirectResolver;W(n,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[Et(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===t?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=t.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=t.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=jl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var n;if(at(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return t!=null&&t.error&&Mg(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ln(e){return Ot(e)}class wa{constructor(t){this.auth=t,this.observer=null,this.addObserver=Ip(n=>this.observer=n)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ir={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function cm(e){Ir=e}function Wl(e){return Ir.loadJS(e)}function lm(){return Ir.recaptchaEnterpriseScript}function um(){return Ir.gapiScript}function fm(e){return`__${e}${Math.floor(Math.random()*1e6)}`}class dm{constructor(){this.enterprise=new hm}ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}class hm{ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}const pm="recaptcha-enterprise",Gl="NO_RECAPTCHA";class gm{constructor(t){this.type=pm,this.auth=Ln(t)}async verify(t="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Kg(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Gg(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(i,o,a){const c=window.grecaptcha;ma(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:t}).then(l=>{o(l)}).catch(()=>{o(Gl)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new dm().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&ma(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=lm();c.length!==0&&(c+=a),Wl(c).then(()=>{r(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Ea(e,t,n,s=!1,r=!1){const i=new gm(e);let o;if(r)o=Gl;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...t};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ia(e,t,n,s,r){var i;if((i=e._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ea(e,t,n,n==="getOobCode");return s(e,o)}else return s(e,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Ea(e,t,n,n==="getOobCode");return s(e,a)}else return Promise.reject(o)})}/**
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
 */function mm(e,t){const n=Il(e,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(On(i,t??{}))return r;et(r,"already-initialized")}return n.initialize({options:t})}function _m(e,t){const n=(t==null?void 0:t.persistence)||[],s=(Array.isArray(n)?n:[n]).map(Et);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,t==null?void 0:t.popupRedirectResolver)}function ym(e,t,n){const s=Ln(e);W(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const r=!1,i=Kl(t),{host:o,port:a}=vm(t),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){W(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),W(On(l,s.config.emulator)&&On(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,wr(o)?(cp(`${i}//${o}${c}`),fp("Auth",!0)):bm()}function Kl(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function vm(e){const t=Kl(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Sa(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Sa(o)}}}function Sa(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function bm(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
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
 */class zi{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return wt("not implemented")}_getIdTokenResponse(t){return wt("not implemented")}_linkToIdToken(t,n){return wt("not implemented")}_getReauthenticationResolver(t){return wt("not implemented")}}async function wm(e,t){return zt(e,"POST","/v1/accounts:signUp",t)}/**
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
 */async function Em(e,t){return Er(e,"POST","/v1/accounts:signInWithPassword",cn(e,t))}/**
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
 */async function Im(e,t){return Er(e,"POST","/v1/accounts:signInWithEmailLink",cn(e,t))}async function Sm(e,t){return Er(e,"POST","/v1/accounts:signInWithEmailLink",cn(e,t))}/**
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
 */class ds extends zi{constructor(t,n,s,r=null){super("password",s),this._email=t,this._password=n,this._tenantId=r}static _fromEmailAndPassword(t,n){return new ds(t,n,"password")}static _fromEmailAndCode(t,n,s=null){return new ds(t,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ia(t,n,"signInWithPassword",Em);case"emailLink":return Im(t,{email:this._email,oobCode:this._password});default:et(t,"internal-error")}}async _linkToIdToken(t,n){switch(this.signInMethod){case"password":const s={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ia(t,s,"signUpPassword",wm);case"emailLink":return Sm(t,{idToken:n,email:this._email,oobCode:this._password});default:et(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
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
 */async function Sn(e,t){return Er(e,"POST","/v1/accounts:signInWithIdp",cn(e,t))}/**
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
 */const Tm="http://localhost";class on extends zi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new on(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):et("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new on(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const n=this.buildRequest();return Sn(t,n)}_linkToIdToken(t,n){const s=this.buildRequest();return s.idToken=n,Sn(t,s)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,Sn(t,n)}buildRequest(){const t={requestUri:Tm,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=vs(n)}return t}}/**
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
 */function Cm(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Am(e){const t=jn(Wn(e)).link,n=t?jn(Wn(t)).deep_link_id:null,s=jn(Wn(e)).deep_link_id;return(s?jn(Wn(s)).link:null)||s||n||t||e}class qi{constructor(t){const n=jn(Wn(t)),s=n.apiKey??null,r=n.oobCode??null,i=Cm(n.mode??null);W(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(t){const n=Am(t);try{return new qi(n)}catch{return null}}}/**
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
 */class Mn{constructor(){this.providerId=Mn.PROVIDER_ID}static credential(t,n){return ds._fromEmailAndPassword(t,n)}static credentialWithLink(t,n){const s=qi.parseLink(n);return W(s,"argument-error"),ds._fromEmailAndCode(t,s.code,s.tenantId)}}Mn.PROVIDER_ID="password";Mn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class zl{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Es extends zl{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ut extends Es{constructor(){super("facebook.com")}static credential(t){return on._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Ut.credentialFromTaggedObject(t)}static credentialFromError(t){return Ut.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Ut.credential(t.oauthAccessToken)}catch{return null}}}Ut.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ut.PROVIDER_ID="facebook.com";/**
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
 */class Ft extends Es{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return on._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return Ft.credentialFromTaggedObject(t)}static credentialFromError(t){return Ft.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:s}=t;if(!n&&!s)return null;try{return Ft.credential(n,s)}catch{return null}}}Ft.GOOGLE_SIGN_IN_METHOD="google.com";Ft.PROVIDER_ID="google.com";/**
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
 */class $t extends Es{constructor(){super("github.com")}static credential(t){return on._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return $t.credentialFromTaggedObject(t)}static credentialFromError(t){return $t.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return $t.credential(t.oauthAccessToken)}catch{return null}}}$t.GITHUB_SIGN_IN_METHOD="github.com";$t.PROVIDER_ID="github.com";/**
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
 */class Bt extends Es{constructor(){super("twitter.com")}static credential(t,n){return on._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return Bt.credentialFromTaggedObject(t)}static credentialFromError(t){return Bt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=t;if(!n||!s)return null;try{return Bt.credential(n,s)}catch{return null}}}Bt.TWITTER_SIGN_IN_METHOD="twitter.com";Bt.PROVIDER_ID="twitter.com";/**
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
 */class Nn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,s,r=!1){const i=await Ye._fromIdTokenResponse(t,s,r),o=Ta(s);return new Nn({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(t,n,s){await t._updateTokensIfNecessary(s,!0);const r=Ta(s);return new Nn({user:t,providerId:r,_tokenResponse:s,operationType:n})}}function Ta(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
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
 */class er extends Kt{constructor(t,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,er.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(t,n,s,r){return new er(t,n,s,r)}}function ql(e,t,n,s){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?er._fromErrorAndOperation(e,i,t,s):i})}async function Rm(e,t,n=!1){const s=await fs(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Nn._forOperation(e,"link",s)}/**
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
 */async function Pm(e,t,n=!1){const{auth:s}=e;if(at(s.app))return Promise.reject(Wt(s));const r="reauthenticate";try{const i=await fs(e,ql(s,r,t,e),n);W(i.idToken,s,"internal-error");const o=Gi(i.idToken);W(o,s,"internal-error");const{sub:a}=o;return W(e.uid===a,s,"user-mismatch"),Nn._forOperation(e,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&et(s,"user-mismatch"),i}}/**
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
 */async function Jl(e,t,n=!1){if(at(e.app))return Promise.reject(Wt(e));const s="signIn",r=await ql(e,s,t),i=await Nn._fromIdTokenResponse(e,s,r);return n||await e._updateCurrentUser(i.user),i}async function Om(e,t){return Jl(Ln(e),t)}/**
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
 */async function km(e){const t=Ln(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}function Nm(e,t,n){return at(e.app)?Promise.reject(Wt(e)):Om(Ot(e),Mn.credential(t,n)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&km(e),s})}function Dm(e,t,n,s){return Ot(e).onIdTokenChanged(t,n,s)}function xm(e,t,n){return Ot(e).beforeAuthStateChanged(t,n)}function Lm(e,t,n,s){return Ot(e).onAuthStateChanged(t,n,s)}function Mm(e){return Ot(e).signOut()}const tr="__sak";/**
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
 */class Yl{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(tr,"1"),this.storage.removeItem(tr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Um=1e3,Fm=10;class Xl extends Yl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hl(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&t(n,r,s)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=t.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);nm()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,Fm):r()}notifyListeners(t,n){this.localCache[t]=n;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:s}),!0)})},Um)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}Xl.type="LOCAL";const $m=Xl;/**
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
 */class Ql extends Yl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}Ql.type="SESSION";const Zl=Ql;/**
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
 */function Bm(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Sr{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(r=>r.isListeningto(t));if(n)return n;const s=new Sr(t);return this.receivers.push(s),s}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await Bm(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sr.receivers=[];/**
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
 */function Ji(e="",t=10){let n="";for(let s=0;s<t;s++)n+=Math.floor(Math.random()*10);return e+n}/**
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
 */class Vm{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Ji("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const d=f;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ft(){return window}function Hm(e){ft().location.href=e}/**
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
 */function eu(){return typeof ft().WorkerGlobalScope<"u"&&typeof ft().importScripts=="function"}async function jm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Wm(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)==null?void 0:e.controller)||null}function Gm(){return eu()?self:null}/**
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
 */const tu="firebaseLocalStorageDb",Km=1,nr="firebaseLocalStorage",nu="fbase_key";class Is{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Tr(e,t){return e.transaction([nr],t?"readwrite":"readonly").objectStore(nr)}function zm(){const e=indexedDB.deleteDatabase(tu);return new Is(e).toPromise()}function vi(){const e=indexedDB.open(tu,Km);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const s=e.result;try{s.createObjectStore(nr,{keyPath:nu})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const s=e.result;s.objectStoreNames.contains(nr)?t(s):(s.close(),await zm(),t(await vi()))})})}async function Ca(e,t,n){const s=Tr(e,!0).put({[nu]:t,value:n});return new Is(s).toPromise()}async function qm(e,t){const n=Tr(e,!1).get(t),s=await new Is(n).toPromise();return s===void 0?null:s.value}function Aa(e,t){const n=Tr(e,!0).delete(t);return new Is(n).toPromise()}const Jm=800,Ym=3;class su{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vi(),this.db)}async _withRetries(t){let n=0;for(;;)try{const s=await this._openDb();return await t(s)}catch(s){if(n++>Ym)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return eu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sr._getInstance(Gm()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var n,s;if(this.activeServiceWorker=await jm(),!this.activeServiceWorker)return;this.sender=new Vm(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(n=t[0])!=null&&n.fulfilled&&(s=t[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||Wm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await vi();return await Ca(t,tr,"1"),await Aa(t,tr),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ca(s,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(s=>qm(s,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Aa(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(r=>{const i=Tr(r,!1).getAll();return new Is(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(t.length!==0)for(const{fbase_key:r,value:i}of t)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(t,n){this.localCache[t]=n;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}su.type="LOCAL";const Xm=su;new ws(3e4,6e4);/**
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
 */function Qm(e,t){return t?Et(t):(W(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
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
 */class Yi extends zi{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Sn(t,this._buildIdpRequest())}_linkToIdToken(t,n){return Sn(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return Sn(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function Zm(e){return Jl(e.auth,new Yi(e),e.bypassAuthState)}function e_(e){const{auth:t,user:n}=e;return W(n,t,"internal-error"),Pm(n,new Yi(e),e.bypassAuthState)}async function t_(e){const{auth:t,user:n}=e;return W(n,t,"internal-error"),Rm(n,new Yi(e),e.bypassAuthState)}/**
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
 */class ru{constructor(t,n,s,r,i=!1){this.auth=t,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return Zm;case"linkViaPopup":case"linkViaRedirect":return t_;case"reauthViaPopup":case"reauthViaRedirect":return e_;default:et(this.auth,"internal-error")}}resolve(t){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const n_=new ws(2e3,1e4);class mn extends ru{constructor(t,n,s,r,i){super(t,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,mn.currentPopupAction&&mn.currentPopupAction.cancel(),mn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return W(t,this.auth,"internal-error"),t}async onExecution(){Rt(this.filter.length===1,"Popup operations only handle one event");const t=Ji();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,s;if((s=(n=this.authWindow)==null?void 0:n.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,n_.get())};t()}}mn.currentPopupAction=null;/**
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
 */const s_="pendingRedirect",Us=new Map;class r_ extends ru{constructor(t,n,s=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let t=Us.get(this.auth._key());if(!t){try{const s=await i_(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(s)}catch(n){t=()=>Promise.reject(n)}Us.set(this.auth._key(),t)}return this.bypassAuthState||Us.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function i_(e,t){const n=c_(t),s=a_(e);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function o_(e,t){Us.set(e._key(),t)}function a_(e){return Et(e._redirectPersistence)}function c_(e){return Ms(s_,e.config.apiKey,e.name)}async function l_(e,t,n=!1){if(at(e.app))return Promise.reject(Wt(e));const s=Ln(e),r=Qm(s,t),o=await new r_(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}/**
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
 */const u_=600*1e3;class f_{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(t,s)&&(n=!0,this.sendToConsumer(t,s),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!d_(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var s;if(t.error&&!iu(t)){const r=((s=t.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";n.onError(ut(this.auth,r))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const s=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&s}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=u_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ra(t))}saveEventToCache(t){this.cachedEventUids.add(Ra(t)),this.lastProcessedEventTime=Date.now()}}function Ra(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function iu({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function d_(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return iu(e);default:return!1}}/**
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
 */async function h_(e,t={}){return zt(e,"GET","/v1/projects",t)}/**
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
 */const p_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,g_=/^https?/;async function m_(e){if(e.config.emulator)return;const{authorizedDomains:t}=await h_(e);for(const n of t)try{if(__(n))return}catch{}et(e,"unauthorized-domain")}function __(e){const t=_i(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const o=new URL(e);return o.hostname===""&&s===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!g_.test(n))return!1;if(p_.test(e))return s===e;const r=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const y_=new ws(3e4,6e4);function Pa(){const e=ft().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function v_(e){return new Promise((t,n)=>{var r,i,o;function s(){Pa(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Pa(),n(ut(e,"network-request-failed"))},timeout:y_.get()})}if((i=(r=ft().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=ft().gapi)!=null&&o.load)s();else{const a=fm("iframefcb");return ft()[a]=()=>{gapi.load?s():n(ut(e,"network-request-failed"))},Wl(`${um()}?onload=${a}`).catch(c=>n(c))}}).catch(t=>{throw Fs=null,t})}let Fs=null;function b_(e){return Fs=Fs||v_(e),Fs}/**
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
 */const w_=new ws(5e3,15e3),E_="__/auth/iframe",I_="emulator/auth/iframe",S_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},T_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function C_(e){const t=e.config;W(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Wi(t,I_):`https://${e.config.authDomain}/${E_}`,s={apiKey:t.apiKey,appName:e.name,v:bs},r=T_.get(e.config.apiHost);r&&(s.eid=r);const i=e._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${vs(s).slice(1)}`}async function A_(e){const t=await b_(e),n=ft().gapi;return W(n,e,"internal-error"),t.open({where:document.body,url:C_(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:S_,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=ut(e,"network-request-failed"),a=ft().setTimeout(()=>{i(o)},w_.get());function c(){ft().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const R_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},P_=500,O_=600,k_="_blank",N_="http://localhost";class Oa{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function D_(e,t,n,s=P_,r=O_){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...R_,width:s.toString(),height:r.toString(),top:i,left:o},l=De().toLowerCase();n&&(a=Ul(l)?k_:n),Ll(l)&&(t=t||N_,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[g,_])=>`${d}${g}=${_},`,"");if(tm(l)&&a!=="_self")return x_(t||"",a),new Oa(null);const f=window.open(t||"",a,u);W(f,e,"popup-blocked");try{f.focus()}catch{}return new Oa(f)}function x_(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const L_="__/auth/handler",M_="emulator/auth/handler",U_=encodeURIComponent("fac");async function ka(e,t,n,s,r,i){W(e.config.authDomain,e,"auth-domain-config-required"),W(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:bs,eventId:r};if(t instanceof zl){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",Ep(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[u,f]of Object.entries({}))o[u]=f}if(t instanceof Es){const u=t.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await e._getAppCheckToken(),l=c?`#${U_}=${encodeURIComponent(c)}`:"";return`${F_(e)}?${vs(a).slice(1)}${l}`}function F_({config:e}){return e.emulator?Wi(e,M_):`https://${e.authDomain}/${L_}`}/**
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
 */const zr="webStorageSupport";class $_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zl,this._completeRedirectFn=l_,this._overrideRedirectResult=o_}async _openPopup(t,n,s,r){var o;Rt((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await ka(t,n,s,_i(),r);return D_(t,i,Ji())}async _openRedirect(t,n,s,r){await this._originValidation(t);const i=await ka(t,n,s,_i(),r);return Hm(i),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Rt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(t);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(t){const n=await A_(t),s=new f_(t);return n.register("authEvent",r=>(W(r==null?void 0:r.authEvent,t,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:s},this.iframes[t._key()]=n,s}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(zr,{type:zr},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[zr];i!==void 0&&n(!!i),et(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=m_(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return Hl()||Ml()||Ki()}}const B_=$_;var Na="@firebase/auth",Da="1.12.1";/**
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
 */class V_{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(s=>{t((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function H_(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function j_(e){ls(new kn("auth",(t,{options:n})=>{const s=t.getProvider("app").getImmediate(),r=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jl(e)},l=new am(s,r,i,c);return _m(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,s)=>{t.getProvider("auth-internal").initialize()})),ls(new kn("auth-internal",t=>{const n=Ln(t.getProvider("auth").getImmediate());return(s=>new V_(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),wn(Na,Da,H_(e)),wn(Na,Da,"esm2020")}/**
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
 */const W_=300,G_=vl("authIdTokenMaxAge")||W_;let xa=null;const K_=e=>async t=>{const n=t&&await t.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>G_)return;const r=n==null?void 0:n.token;xa!==r&&(xa=r,await fetch(e,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Tn(e=Sg()){const t=Il(e,"auth");if(t.isInitialized())return t.getImmediate();const n=mm(e,{popupRedirectResolver:B_,persistence:[Xm,$m,Zl]}),s=vl("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=K_(i.toString());xm(n,o,()=>o(n.currentUser)),Dm(n,a=>o(a))}}const r=op("auth");return r&&ym(n,`http://${r}`),n}function z_(){var e;return((e=document.getElementsByTagName("head"))==null?void 0:e[0])??document}cm({loadJS(e){return new Promise((t,n)=>{const s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=r=>{const i=ut("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",z_().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});j_("Browser");const bi="https://api.poranos.com";async function ou(){const t=Tn().currentUser;if(!t)throw new Error("Not authenticated");return t.getIdToken()}async function Iv(e){const t=await ou(),n=await fetch(`${bi}${e}`,{headers:{Authorization:`Bearer ${t}`,Accept:"application/json"}});if(n.status===401){const r=await Tn().currentUser.getIdToken(!0),i=await fetch(`${bi}${e}`,{headers:{Authorization:`Bearer ${r}`,Accept:"application/json"}});if(!i.ok)throw new Error(`GET ${e}: ${i.status}`);return i.json()}if(!n.ok)throw new Error(`GET ${e}: ${n.status}`);return n.json()}async function q_(e,t){const n=await ou(),s=await fetch(`${bi}${e}`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json",Accept:"application/json"},body:t?JSON.stringify(t):void 0});if(!s.ok)throw new Error(`POST ${e}: ${s.status}`);return s.json()}const au=Wd("auth",()=>{const e=ce(null),t=ce(!1),n=ce(!1),s=ce(""),r=Ie(()=>{var c;return((c=e.value)==null?void 0:c.email)||""});async function i(c,l){s.value="";try{const u=Tn(),f=await Nm(u,c,l),d=await f.user.getIdToken(!0);localStorage.setItem("idToken",d);try{await q_("/login/",{idToken:d})}catch{}e.value=f.user,t.value=!0}catch(u){switch(u.code){case"auth/invalid-credential":case"auth/user-not-found":s.value="メールアドレスまたはパスワードが正しくありません";break;case"auth/too-many-requests":s.value="ログイン試行が多すぎます。しばらくお待ちください";break;default:s.value=u.message||"ログインに失敗しました"}throw u}}async function o(){const c=Tn();await Mm(c),localStorage.removeItem("idToken"),e.value=null,t.value=!1}function a(){return new Promise(c=>{const l=Tn();Lm(l,async u=>{if(u){e.value=u,t.value=!0;try{const f=await u.getIdToken();localStorage.setItem("idToken",f)}catch{}}else e.value=null,t.value=!1;n.value=!0,c()})})}return{user:e,isAuthenticated:t,initialized:n,error:s,userEmail:r,login:i,logout:o,initAuth:a}}),cu="";async function J_(e){const t=await fetch(`${cu}${e}`);if(!t.ok)throw new Error(`GET ${e} failed: ${t.status}`);return t.json()}async function Ps(e,t){const n=await fetch(`${cu}${e}`,{method:"POST",headers:t instanceof FormData?{}:{"Content-Type":"application/json"},body:t instanceof FormData?t:t?JSON.stringify(t):void 0});if(!n.ok)throw new Error(`POST ${e} failed: ${n.status}`);return n.json()}function Sv(e){return`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}${e}`}function Y_(){const e=ce({connected:!1,width:0,height:0,error:null,fps:0});let t=null,n=null,s=null,r=null,i=null,o=!1,a=0,c=null,l=0,u=null,f=0,d=null,g=640,_=!1,w=null,P=null;function N(x,C,U=640){_=!1,q(),_=!1,d=x,g=U,s=C,r=s.getContext("2d"),f=0,E(x,U)}function E(x,C){e.value={connected:!1,width:0,height:0,error:null,fps:0},o=!1,i=null,a=0,l=0,c&&clearInterval(c),c=setInterval(()=>{e.value.fps=a,a=0},1e3);const U=`${location.protocol==="https:"?"wss:":"ws:"}//${location.host}/api/mirror/stream/${x}?max_size=${C}`;t=new WebSocket(U),t.binaryType="arraybuffer";let J=!1;t.onopen=()=>{e.value.connected=!0,f=0,console.log(`[ScrcpyStream] Connected: ${x}`)},t.onmessage=ge=>{const me=ge.data;if(me.byteLength===0)return;if(!J){if(me.byteLength>=12){const he=new DataView(me),$e=he.getUint32(0),xe=he.getUint32(4),Ee=he.getUint32(8);e.value.width=xe,e.value.height=Ee,console.log(`[ScrcpyStream] Codec: 0x${$e.toString(16)}, Size: ${xe}x${Ee}`),s.width=Math.floor(xe/2),s.height=Ee,T($e),J=!0}return}if(me.byteLength<5)return;const be=new DataView(me),Fe=be.getUint8(0),Ge=be.getUint32(1);if(me.byteLength<5+Ge)return;const te=new Uint8Array(me,5,Ge),K=(Fe&1)!==0,Y=(Fe&2)!==0;if(K){i=new Uint8Array(te),console.log(`[ScrcpyStream] SPS/PPS received: ${i.length} bytes, first bytes:`,Array.from(i.slice(0,16)).map(he=>he.toString(16).padStart(2,"0")).join(" "));return}if(!n||n.state!=="configured"){a===0&&console.warn(`[ScrcpyStream] Decoder not ready: state=${n==null?void 0:n.state}`);return}if(a<3&&console.log(`[ScrcpyStream] Packet: config=${K} key=${Y} size=${Ge} first bytes:`,Array.from(te.slice(0,8)).map(he=>he.toString(16).padStart(2,"0")).join(" ")),!o){if(!Y||!i){a===0&&console.log(`[ScrcpyStream] Waiting for keyframe+SPS (key=${Y}, hasSPS=${!!i})`);return}o=!0,console.log("[ScrcpyStream] First keyframe! Decoding starts")}try{let he;Y&&i?(he=new Uint8Array(i.length+te.length),he.set(i,0),he.set(te,i.length)):he=te;const $e=new EncodedVideoChunk({type:Y?"key":"delta",timestamp:l,data:he});l+=33333,n.decode($e),a++}catch(he){console.error("[ScrcpyStream] Decode error:",he)}},t.onerror=()=>{},t.onclose=ge=>{if(e.value.connected=!1,console.log(`[ScrcpyStream] Disconnected: ${x} (code=${ge.code})`),!_&&d&&s)if(f<10){f++;const be=ge.code===1013?15e3:2e3*f,Fe=Math.min(be,3e4);console.log(`[ScrcpyStream] Retry ${f}/10 in ${Fe}ms...`),e.value.error=null,u=setTimeout(()=>{!_&&d&&s&&E(d,g)},Fe)}else e.value.error="Connection failed after retries"}}function T(x){n&&n.state!=="closed"&&n.close();const C=x===1748121140?"avc1.640029":"hev1.1.6.L120.90";n=new VideoDecoder({output:U=>{w&&w.close(),w=U},error:U=>{console.error("[ScrcpyDecoder] error:",U),e.value.error=U.message}}),n.configure({codec:C,optimizeForLatency:!0}),console.log(`[ScrcpyStream] Decoder configured: ${C}`),O()}function O(){if(P!==null)return;function x(){if(w&&r&&s){const C=w;w=null;const U=C.displayWidth/2,J=C.displayHeight;(s.width!==U||s.height!==J)&&(s.width=U,s.height=J),r.drawImage(C,0,0,U,J,0,0,U,J),C.close()}P=requestAnimationFrame(x)}P=requestAnimationFrame(x)}function V(){P!==null&&(cancelAnimationFrame(P),P=null),w&&(w.close(),w=null)}function q(){if(_=!0,V(),u&&(clearTimeout(u),u=null),c&&(clearInterval(c),c=null),t&&(t.onmessage=null,t.onerror=null,t.onclose=null,t.close(),t=null),n&&n.state!=="closed")try{n.close()}catch{}n=null,s=null,r=null,i=null,o=!1,d=null,f=0,e.value={connected:!1,width:0,height:0,error:null,fps:0}}return xn(()=>{q()}),{state:e,connect:N,disconnect:q}}const X_={class:"modal-dialog"},Q_={class:"modal-title"},Z_={class:"modal-message"},ey={class:"modal-actions"},ty=["disabled"],ny=["disabled"],sy=Dn({__name:"ConfirmModal",props:{title:{},message:{},confirmLabel:{},confirmClass:{},loading:{type:Boolean}},emits:["confirm","cancel"],setup(e){return(t,n)=>(ee(),mr(af,{to:"body"},[R("div",{class:"modal-overlay",onClick:n[2]||(n[2]=Nd(s=>t.$emit("cancel"),["self"]))},[R("div",X_,[R("div",Q_,de(e.title),1),R("div",Z_,de(e.message),1),R("div",ey,[R("button",{class:"btn btn-secondary btn-sm",disabled:e.loading,onClick:n[0]||(n[0]=s=>t.$emit("cancel"))}," Cancel ",8,ty),R("button",{class:It(["btn btn-sm",e.confirmClass||"btn-danger"]),disabled:e.loading,onClick:n[1]||(n[1]=s=>t.$emit("confirm"))},de(e.loading?"Processing...":e.confirmLabel||"Confirm"),11,ny)])])])]))}}),Xi=(e,t)=>{const n=e.__vccOpts||e;for(const[s,r]of t)n[s]=r;return n},ry=Xi(sy,[["__scopeId","data-v-cea21af1"]]),iy={class:"scrcpy-header"},oy={class:"device-label"},ay={key:0,class:"wifi-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor"},cy={key:1,class:"status-dot connected"},ly={key:2,class:"status-dot"},uy=["disabled"],fy=["disabled"],dy={key:5,class:"header-volume"},hy=["max","value","disabled"],py={class:"volume-value"},gy=["title"],my={key:0,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},_y={key:1,width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},yy={class:"scrcpy-video"},vy={key:0,class:"error-overlay"},by={key:1,class:"loading-overlay"},wy={class:"info-row"},Ey={key:0,class:"info-row"},Iy={class:"info-value controller-batteries"},Sy={key:1,class:"info-row"},Ty={class:"info-value"},Cy={class:"info-row"},Ay={class:"info-row"},Ry={key:2,class:"info-row"},Py=["disabled"],Oy={class:"info-row"},ky={class:"overlay-actions"},Ny=["disabled"],Dy=["disabled"],xy=Dn({__name:"ScrcpyPlayer",props:{device:{},compact:{type:Boolean,default:!1}},setup(e){const t=e,n=ce(null),{state:s,connect:r,disconnect:i}=Y_(),o=ce(!1),a=ce(!1);function c(x){return x?x>50?"var(--success)":x>20?"var(--warning)":"var(--danger)":"var(--text-secondary)"}const l=Ie(()=>(t.device.sync_connected_via||"").includes("localhost")?"adb reverse":"WiFi direct"),u=ce(t.device.volume_music??0);let f=null;sn(()=>t.device.volume_music,x=>{x!=null&&!f&&(u.value=x)});function d(x){const C=parseInt(x.target.value);u.value=C,f&&clearTimeout(f),f=setTimeout(()=>{g(C),f=null},300)}async function g(x){const C=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(C)}/volume`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({volume:x})})}catch{}}async function _(){const x=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(x)}/launch`,{method:"POST"})}catch{}}async function w(){const x=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(x)}/stop`,{method:"POST"})}catch{}}async function P(){const x=t.device.adb_serial||t.device.serial,C=t.device.wakefulness==="Awake"?"sleep":"wake";try{await fetch(`/api/devices/${encodeURIComponent(x)}/${C}`,{method:"POST"})}catch{}}async function N(){const x=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(x)}/menu`,{method:"POST"})}catch{}}const E=ce(!1);async function T(){const x=t.device.adb_serial||t.device.serial;try{await fetch(`/api/devices/${encodeURIComponent(x)}/reboot`,{method:"POST"})}catch{}}const O=()=>t.device.adb_serial||t.device.serial;function V(){o.value=!o.value}function q(x){x.key==="Escape"&&o.value&&(o.value=!1)}return hr(()=>{n.value&&r(O(),n.value),window.addEventListener("keydown",q)}),xn(()=>{i(),window.removeEventListener("keydown",q)}),sn(()=>t.device.serial,()=>{n.value&&r(O(),n.value)}),(x,C)=>(ee(),oe("div",{class:It(["scrcpy-card",{fullscreen:o.value}])},[R("div",iy,[R("span",oy,de(e.device.serial),1),e.device.connection_type==="wifi"?(ee(),oe("svg",ay,[...C[4]||(C[4]=[R("path",{d:"M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"},null,-1)])])):Ue("",!0),Ne(s).connected?(ee(),oe("span",cy)):(ee(),oe("span",ly)),C[7]||(C[7]=R("div",{class:"header-spacer"},null,-1)),e.device.app_running?(ee(),oe("button",{key:4,class:"btn btn-danger btn-xs",disabled:e.device.status!=="device",onClick:w},"Stop",8,fy)):(ee(),oe("button",{key:3,class:"btn btn-success btn-xs",disabled:!e.device.app_installed||e.device.status!=="device",onClick:_},"Launch",8,uy)),e.device.volume_music!=null?(ee(),oe("div",dy,[R("input",{type:"range",class:"volume-slider",min:0,max:e.device.volume_max??15,value:u.value,disabled:e.device.status!=="device",onInput:d},null,40,hy),R("span",py,de(u.value),1)])):Ue("",!0),R("button",{class:"fullscreen-btn",onClick:V,title:o.value?"Exit fullscreen":"Fullscreen"},[o.value?(ee(),oe("svg",_y,[...C[6]||(C[6]=[R("polyline",{points:"4 14 10 14 10 20"},null,-1),R("polyline",{points:"20 10 14 10 14 4"},null,-1),R("line",{x1:"14",y1:"10",x2:"21",y2:"3"},null,-1),R("line",{x1:"3",y1:"21",x2:"10",y2:"14"},null,-1)])])):(ee(),oe("svg",my,[...C[5]||(C[5]=[R("polyline",{points:"15 3 21 3 21 9"},null,-1),R("polyline",{points:"9 21 3 21 3 15"},null,-1),R("line",{x1:"21",y1:"3",x2:"14",y2:"10"},null,-1),R("line",{x1:"3",y1:"21",x2:"10",y2:"14"},null,-1)])]))],8,gy)]),R("div",yy,[R("canvas",{ref_key:"canvasRef",ref:n,class:"scrcpy-canvas"},null,512),Ne(s).error?(ee(),oe("div",vy,de(Ne(s).error),1)):Ne(s).connected?Ue("",!0):(ee(),oe("div",by,"Connecting...")),R("div",{class:It(["device-info-overlay",{open:a.value}])},[R("div",wy,[C[8]||(C[8]=R("span",{class:"info-label"},"Battery",-1)),R("span",{class:"info-value",style:qe({color:c(e.device.battery_level)})},de(e.device.battery_level!=null?`${e.device.battery_level}%`:"—"),5)]),e.device.controller_left_battery!=null||e.device.controller_right_battery!=null?(ee(),oe("div",Ey,[C[9]||(C[9]=R("span",{class:"info-label"},"Controllers",-1)),R("span",Iy,[e.device.controller_left_battery!=null?(ee(),oe("span",{key:0,style:qe({color:c(e.device.controller_left_battery)})}," L:"+de(e.device.controller_left_battery)+"% ",5)):Ue("",!0),e.device.controller_right_battery!=null?(ee(),oe("span",{key:1,style:qe({color:c(e.device.controller_right_battery)})}," R:"+de(e.device.controller_right_battery)+"% ",5)):Ue("",!0)])])):Ue("",!0),e.device.wifi_ssid?(ee(),oe("div",Sy,[C[10]||(C[10]=R("span",{class:"info-label"},"WiFi",-1)),R("span",Ty,de(e.device.wifi_ssid),1)])):Ue("",!0),R("div",Cy,[C[11]||(C[11]=R("span",{class:"info-label"},"Provisioned",-1)),R("span",{class:"info-value",style:qe({color:e.device.provisioned?"var(--success)":"var(--danger)"})},de(e.device.provisioned?"Yes":"No"),5)]),R("div",Ay,[C[12]||(C[12]=R("span",{class:"info-label"},"App",-1)),R("span",{class:"info-value",style:qe({color:e.device.app_running?"var(--success)":"var(--text-secondary)"})},[bt(de(e.device.app_running?"Running":e.device.app_installed?"Stopped":"Not installed")+" ",1),e.device.app_installed&&e.device.app_version?(ee(),oe(Je,{key:0},[bt(" v"+de(e.device.app_version),1)],64)):Ue("",!0)],4)]),e.device.wakefulness?(ee(),oe("div",Ry,[C[13]||(C[13]=R("span",{class:"info-label"},"Headset",-1)),R("span",{class:"info-value",style:qe({color:e.device.wakefulness==="Awake"?"var(--success)":"var(--text-secondary)"})},[bt(de(e.device.wakefulness)+" ",1),R("button",{class:"sleep-btn",disabled:e.device.status!=="device",onClick:P},de(e.device.wakefulness==="Awake"?"Sleep":"Awake"),9,Py)],4)])):Ue("",!0),R("div",Oy,[C[14]||(C[14]=R("span",{class:"info-label"},"Sync",-1)),R("span",{class:"info-value",style:qe({color:e.device.sync_connected?"var(--success)":"var(--text-secondary)"})},de(e.device.sync_connected?`Connected (${l.value})`:"Disconnected"),5)]),R("div",ky,[R("button",{class:"btn btn-secondary btn-xs",disabled:e.device.status!=="device",onClick:N,title:"Send Meta button (toggle menu)"},"Menu",8,Ny),R("button",{class:"btn btn-warning btn-xs",disabled:e.device.status!=="device",onClick:C[0]||(C[0]=U=>E.value=!0)},"Reboot",8,Dy)])],2)]),R("button",{class:It(["info-toggle-btn",{open:a.value}]),onClick:C[1]||(C[1]=U=>a.value=!a.value),title:"Device info"},[...C[15]||(C[15]=[R("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.5","stroke-linecap":"round","stroke-linejoin":"round"},[R("polyline",{points:"18 15 12 9 6 15"})],-1)])],2),E.value?(ee(),mr(ry,{key:0,title:"Reboot Device",message:`${e.device.model} (${e.device.serial}) を再起動しますか？`,"confirm-label":"Reboot","confirm-class":"btn-warning",onConfirm:C[2]||(C[2]=U=>{E.value=!1,T()}),onCancel:C[3]||(C[3]=U=>E.value=!1)},null,8,["message"])):Ue("",!0)],2))}}),Ly=Xi(xy,[["__scopeId","data-v-be521f19"]]),My={key:0,class:"sidebar-status"},Uy={key:1,class:"sidebar-status"},Fy=Dn({__name:"DeviceSidebar",props:{expanded:{type:Boolean}},setup(e){const t=e,n=ce([]),s=ce(!1);let r=null;const i=ce(null),o=ce(0),a=ce(0);let c=null;const l=Ie(()=>{const d=n.value.length;if(!t.expanded||d===0)return 1;const g=o.value,_=a.value-40;if(g===0||_===0)return 1;const w=4/3.5;let P=1,N=0;for(let E=1;E<=d;E++){const T=Math.ceil(d/E),O=(g-(E-1)*16)/E,V=(_-(T-1)*16)/T,q=Math.min(O,V*w);q>N&&(N=q,P=E)}return P}),u=Ie(()=>t.expanded?{display:"grid",gridTemplateColumns:`repeat(${l.value}, 1fr)`,gap:"1rem",alignContent:"start"}:{});async function f(d=!1){try{const w=await(await fetch(d?"/api/devices/cached":"/api/devices")).json();n.value=w.devices||[]}catch{}s.value=!0}return hr(async()=>{await f(!0),f(),r=setInterval(f,5e3),i.value&&(c=new ResizeObserver(d=>{const g=d[0];g&&(o.value=g.contentRect.width,a.value=g.contentRect.height)}),c.observe(i.value))}),xn(()=>{r&&clearInterval(r),c==null||c.disconnect()}),(d,g)=>(ee(),oe("div",{ref_key:"containerRef",ref:i,class:"device-sidebar",style:qe(u.value)},[s.value?n.value.length===0?(ee(),oe("div",Uy,"No devices")):(ee(!0),oe(Je,{key:2},wf(n.value,_=>(ee(),mr(Ly,{key:_.serial,device:_,compact:!e.expanded,class:"sidebar-player"},null,8,["device","compact"]))),128)):(ee(),oe("div",My,"Connecting..."))],4))}}),$y=Xi(Fy,[["__scopeId","data-v-97a7e8fa"]]),By={class:"sidebar"},Vy={class:"sidebar-nav"},Hy={key:0},jy={key:1},Wy={class:"sidebar-controls"},Gy={class:"control-row"},Ky=["disabled"],zy=["disabled"],qy={class:"control-group"},Jy={class:"control-row"},Yy={class:"volume-value"},Xy=["disabled"],Qy={class:"sidebar-bottom"},Zy={key:0,class:"auth-info"},ev={class:"auth-email"},tv=["title"],nv={class:"area-divider-btn"},sv={class:"main-content"},rv=["title"],iv={class:"area-divider-btn"},ov=["title"],av={class:"area-divider-btn"},cv={key:2,class:"device-sidebar-area"},lv=Dn({__name:"App",setup(e){const t=au(),n=Xh(),s=Ie(()=>n.path.startsWith("/operation")),r=ce(!1),i=ce(!1),o=ce(!1),a=ce(!!document.fullscreenElement),c=ce(!1),l=ce(!1),u=ce(!1),f=ce(8),d=ce(!1);hr(async()=>{try{const E=await J_("/api/devices/auto-launch");c.value=E.enabled}catch{}});async function g(){l.value=!0;try{const E=await Ps("/api/devices/auto-launch",{enabled:!c.value});c.value=E.enabled}catch{}l.value=!1}async function _(){u.value=!0;try{await Ps("/api/devices/stop-all"),await Ps("/api/server/reset")}catch{}u.value=!1}async function w(){d.value=!0;try{await Ps("/api/devices/volume-all",{volume:f.value})}catch{}d.value=!1}function P(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}document.addEventListener("fullscreenchange",()=>{a.value=!!document.fullscreenElement,a.value?sessionStorage.setItem("kiosk","1"):sessionStorage.removeItem("kiosk")}),sessionStorage.getItem("kiosk")&&document.addEventListener("click",function E(){document.documentElement.requestFullscreen().catch(()=>{}),document.removeEventListener("click",E)},{once:!0});function N(){document.fullscreenElement&&sessionStorage.setItem("kiosk","1"),window.location.reload()}return(E,T)=>{const O=po("router-link"),V=po("router-view");return ee(),oe("div",{class:It(["app-layout",{"sidebar-collapsed":r.value,"content-collapsed":i.value,"mirror-collapsed":o.value}])},[R("aside",By,[T[12]||(T[12]=R("div",{class:"sidebar-title"},"Poranos",-1)),R("ul",Vy,[Ne(t).isAuthenticated?(ee(),oe("li",Hy,[ve(O,{to:"/operation"},{default:pn(()=>[...T[5]||(T[5]=[bt("Operation",-1)])]),_:1})])):(ee(),oe("li",jy,[ve(O,{to:"/login"},{default:pn(()=>[...T[6]||(T[6]=[bt("Login",-1)])]),_:1})])),R("li",null,[ve(O,{to:"/devices"},{default:pn(()=>[...T[7]||(T[7]=[bt("Devices",-1)])]),_:1})]),R("li",null,[ve(O,{to:"/mirroring"},{default:pn(()=>[...T[8]||(T[8]=[bt("Mirroring",-1)])]),_:1})]),R("li",null,[ve(O,{to:"/sync-server"},{default:pn(()=>[...T[9]||(T[9]=[bt("Sync Server",-1)])]),_:1})])]),R("div",Wy,[R("div",Gy,[T[10]||(T[10]=R("span",{class:"control-label"},"Auto Launch",-1)),R("button",{class:It(["toggle-btn",{active:c.value}]),disabled:l.value,onClick:g},de(c.value?"ON":"OFF"),11,Ky)]),R("button",{class:"btn-fullscreen btn-danger-outline",disabled:u.value,onClick:_},de(u.value?"Stopping...":"All Stop + Reset"),9,zy),R("div",qy,[T[11]||(T[11]=R("span",{class:"control-group-label"},"All Volume",-1)),R("div",Jy,[ao(R("input",{type:"range",min:"0",max:"15","onUpdate:modelValue":T[0]||(T[0]=q=>f.value=q),class:"volume-slider"},null,512),[[Rd,f.value,void 0,{number:!0}]]),R("span",Yy,de(f.value),1),R("button",{class:"btn-apply",disabled:d.value,onClick:w},de(d.value?"...":"Apply"),9,Xy)])])]),R("div",Qy,[Ne(t).isAuthenticated?(ee(),oe("div",Zy,[R("span",ev,de(Ne(t).userEmail),1),R("button",{class:"btn-fullscreen",onClick:T[1]||(T[1]=q=>Ne(t).logout())},"Logout")])):Ue("",!0),R("button",{class:"btn-fullscreen",onClick:P},de(a.value?"Exit Fullscreen":"Kiosk Mode"),1),R("button",{class:"btn-fullscreen",onClick:N}," Reload ")])]),R("div",{class:"area-divider",onClick:T[2]||(T[2]=q=>r.value=!r.value),title:r.value?"Show sidebar":"Hide sidebar"},[R("button",nv,de(r.value?"»":"«"),1)],8,tv),ao(R("main",sv,[ve(V)],512),[[hd,!i.value]]),s.value&&!o.value?(ee(),oe("div",{key:0,class:"area-divider",onClick:T[3]||(T[3]=q=>i.value=!i.value),title:i.value?"Show content":"Hide content"},[R("button",iv,de(i.value?"»":"«"),1)],8,rv)):Ue("",!0),s.value&&!i.value?(ee(),oe("div",{key:1,class:"area-divider",onClick:T[4]||(T[4]=q=>o.value=!o.value),title:o.value?"Show mirroring":"Hide mirroring"},[R("button",av,de(o.value?"«":"»"),1)],8,ov)):Ue("",!0),s.value&&!o.value?(ee(),oe("aside",cv,[ve($y,{expanded:i.value},null,8,["expanded"])])):Ue("",!0)],2)}}}),uv="modulepreload",fv=function(e){return"/"+e},La={},Xt=function(t,n,s){let r=Promise.resolve();if(n&&n.length>0){let o=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=o(n.map(l=>{if(l=fv(l),l in La)return;La[l]=!0;const u=l.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":uv,u||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((g,_)=>{d.addEventListener("load",g),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},dv=[{path:"/",redirect:"/operation"},{path:"/dashboard",redirect:"/sync-server"},{path:"/sync-server",name:"Sync Server",component:()=>Xt(()=>import("./DashboardView-DJ9cguhF.js"),[])},{path:"/devices",name:"Devices",component:()=>Xt(()=>import("./DevicesView-BaQIkPx0.js"),__vite__mapDeps([0,1]))},{path:"/mirroring",name:"Mirroring",component:()=>Xt(()=>import("./MirroringView-B8wnf3Xn.js"),__vite__mapDeps([2,3]))},{path:"/login",name:"Login",component:()=>Xt(()=>import("./LoginView-rH5-oWqi.js"),__vite__mapDeps([4,5]))},{path:"/operation",name:"Operation",component:()=>Xt(()=>import("./OperationView-BY5khPcq.js"),__vite__mapDeps([6,7,8]))},{path:"/operation/:roomId/files",name:"FilePlayer",component:()=>Xt(()=>import("./FilePlayerView-C_y6fYIi.js"),__vite__mapDeps([9,7,10,11]))},{path:"/operation/:roomId/movie",name:"MoviePlayer",component:()=>Xt(()=>import("./MoviePlayerView-DGJfFQol.js"),__vite__mapDeps([12,7,10,13]))}],hv=Yh({history:Rh(),routes:dv});var pv="firebase",gv="12.10.0";/**
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
 */wn(pv,gv,"app");const mv={apiKey:"AIzaSyAVcV2-gtKWze83DMlW3gGkEXqlGvTjv0k",authDomain:"poranos.com",projectId:"poranos-prod",storageBucket:"poranos-prod.firebasestorage.app",messagingSenderId:"495088231457",appId:"1:495088231457:web:6c043dc56c0df4c2e2ef60"},_v=Sl(mv);Tn(_v);const Qi=Ld(lv);Qi.use(Fd());Qi.use(hv);const yv=au();yv.initAuth().then(()=>{Qi.mount("#app")});export{bt as A,Nd as B,ry as C,ao as D,Rd as E,Je as F,hd as G,gs as H,ki as I,au as J,Ev as K,bv as L,Xh as M,wv as N,vv as O,Wd as P,Iv as Q,Tn as R,Ly as S,Xi as _,xn as a,ee as b,oe as c,Dn as d,R as e,Z as f,J_ as g,zc as h,ur as i,Ni as j,ve as k,Ie as l,wf as m,It as n,hr as o,Ps as p,Sv as q,ce as r,Bu as s,de as t,Ne as u,ad as v,sn as w,qe as x,mr as y,Ue as z};
