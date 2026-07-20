(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="172",Hu=0,Bl=1,Wu=2,Rd=1,Xu=2,wn=3,Kn=0,It=1,kt=2,Xn=0,Vi=1,ln=2,zl=3,Gl=4,qu=5,li=100,Ku=101,Yu=102,ju=103,$u=104,Zu=200,Ju=201,Qu=202,eh=203,Wa=204,Xa=205,th=206,nh=207,ih=208,rh=209,sh=210,ah=211,oh=212,lh=213,ch=214,qa=0,Ka=1,Ya=2,Ki=3,ja=4,$a=5,Za=6,Ja=7,Cd=0,dh=1,uh=2,qn=0,hh=1,fh=2,ph=3,Ld=4,mh=5,gh=6,_h=7,Pd=300,Yi=301,ji=302,Qa=303,eo=304,qs=306,wr=1e3,Ot=1001,to=1002,Yt=1003,vh=1004,Gr=1005,Et=1006,sa=1007,Rn=1008,Un=1009,Id=1010,Dd=1011,Rr=1012,Ko=1013,fi=1014,_n=1015,Fr=1016,Yo=1017,jo=1018,$i=1020,Ud=35902,Fd=1021,Nd=1022,fn=1023,kd=1024,Od=1025,Hi=1026,Zi=1027,$o=1028,Zo=1029,Bd=1030,Jo=1031,Qo=1033,Ms=33776,Ss=33777,bs=33778,Es=33779,no=35840,io=35841,ro=35842,so=35843,ao=36196,oo=37492,lo=37496,co=37808,uo=37809,ho=37810,fo=37811,po=37812,mo=37813,go=37814,_o=37815,vo=37816,yo=37817,xo=37818,Mo=37819,So=37820,bo=37821,Ts=36492,Eo=36494,To=36495,zd=36283,Ao=36284,wo=36285,Ro=36286,yh=3200,xh=3201,Gd=0,Mh=1,cn="",nt="srgb",Ji="srgb-linear",Ds="linear",tt="srgb",Mi=7680,Vl=519,Sh=512,bh=513,Eh=514,Vd=515,Th=516,Ah=517,wh=518,Rh=519,Co=35044,Ch=35048,Hl="300 es",Cn=2e3,Us=2001;class nr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wl=1234567;const br=Math.PI/180,Cr=180/Math.PI;function Pn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function ke(i,e,t){return Math.max(e,Math.min(t,i))}function el(i,e){return(i%e+e)%e}function Lh(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Ph(i,e,t){return i!==e?(t-i)/(e-i):0}function Er(i,e,t){return(1-t)*i+t*e}function Ih(i,e,t,n){return Er(i,e,1-Math.exp(-t*n))}function Dh(i,e=1){return e-Math.abs(el(i,e*2)-e)}function Uh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Nh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function kh(i,e){return i+Math.random()*(e-i)}function Oh(i){return i*(.5-Math.random())}function Bh(i){i!==void 0&&(Wl=i);let e=Wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zh(i){return i*br}function Gh(i){return i*Cr}function Vh(i){return(i&i-1)===0&&i!==0}function Hh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xh(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),d=a((e+n)/2),u=s((e-n)/2),f=a((e-n)/2),m=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*d,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Je(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const st={DEG2RAD:br,RAD2DEG:Cr,generateUUID:Pn,clamp:ke,euclideanModulo:el,mapLinear:Lh,inverseLerp:Ph,lerp:Er,damp:Ih,pingpong:Dh,smoothstep:Uh,smootherstep:Fh,randInt:Nh,randFloat:kh,randFloatSpread:Oh,seededRandom:Bh,degToRad:zh,radToDeg:Gh,isPowerOfTwo:Vh,ceilPowerOfTwo:Hh,floorPowerOfTwo:Wh,setQuaternionFromProperEuler:Xh,normalize:Je,denormalize:dn};class Ie{constructor(e=0,t=0){Ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,r,s,a,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],m=n[5],g=n[8],_=r[0],p=r[3],h=r[6],b=r[1],E=r[4],M=r[7],P=r[2],R=r[5],w=r[8];return s[0]=a*_+o*b+l*P,s[3]=a*p+o*E+l*R,s[6]=a*h+o*M+l*w,s[1]=c*_+d*b+u*P,s[4]=c*p+d*E+u*R,s[7]=c*h+d*M+u*w,s[2]=f*_+m*b+g*P,s[5]=f*p+m*E+g*R,s[8]=f*h+m*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*s*d+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,f=o*l-d*s,m=c*s-a*l,g=t*u+n*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-d*n)*_,e[2]=(o*n-r*a)*_,e[3]=f*_,e[4]=(d*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(aa.makeScale(e,t)),this}rotate(e){return this.premultiply(aa.makeRotation(-e)),this}translate(e,t){return this.premultiply(aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const aa=new Ue;function Hd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qh(){const i=Lr("canvas");return i.style.display="block",i}const Xl={};function zi(i){i in Xl||(Xl[i]=!0,console.warn(i))}function Kh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Yh(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function jh(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ql=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $h(){const i={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===tt&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(r.r=Wi(r.r),r.g=Wi(r.g),r.b=Wi(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===cn?Ds:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ji]:{primaries:e,whitePoint:n,transfer:Ds,toXYZ:ql,fromXYZ:Kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:ql,fromXYZ:Kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}}),i}const Ke=$h();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Si;class Zh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Si===void 0&&(Si=Lr("canvas")),Si.width=e.width,Si.height=e.height;const n=Si.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Si}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jh=0;class Wd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Pn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(oa(r[a].image)):s.push(oa(r[a]))}else s=oa(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function oa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;class Rt extends nr{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Ot,r=Ot,s=Et,a=Rn,o=fn,l=Un,c=Rt.DEFAULT_ANISOTROPY,d=cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Pn(),this.name="",this.source=new Wd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wr:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wr:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Pd;Rt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],h=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(m+1)/2,P=(h+1)/2,R=(d+f)/4,w=(u+_)/4,I=(g+p)/4;return E>M&&E>P?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=R/n,s=w/n):M>P?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=R/r,s=I/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=w/s,r=I/s),this.set(n,r,s,t),this}let b=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-_)/b,this.z=(f-d)/b,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ef extends nr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Et,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Rt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Wd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends ef{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xd extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tf extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],d=n[r+2],u=n[r+3];const f=s[a+0],m=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==f||c!==m||d!==g){let p=1-o;const h=l*f+c*m+d*g+u*_,b=h>=0?1:-1,E=1-h*h;if(E>Number.EPSILON){const P=Math.sqrt(E),R=Math.atan2(P,h*b);p=Math.sin(p*R)/P,o=Math.sin(o*R)/P}const M=o*b;if(l=l*p+f*M,c=c*p+m*M,d=d*p+g*M,u=u*p+_*M,p===1-o){const P=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=P,c*=P,d*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],u=s[a],f=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+d*u+l*m-c*f,e[t+1]=l*g+d*f+c*u-o*m,e[t+2]=c*g+d*m+o*f-l*u,e[t+3]=d*g-o*u-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),u=o(s/2),f=l(n/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*d*u+c*m*g,this._y=c*m*u-f*d*g,this._z=c*d*g+f*m*u,this._w=c*d*u-f*m*g;break;case"YXZ":this._x=f*d*u+c*m*g,this._y=c*m*u-f*d*g,this._z=c*d*g-f*m*u,this._w=c*d*u+f*m*g;break;case"ZXY":this._x=f*d*u-c*m*g,this._y=c*m*u+f*d*g,this._z=c*d*g+f*m*u,this._w=c*d*u-f*m*g;break;case"ZYX":this._x=f*d*u-c*m*g,this._y=c*m*u+f*d*g,this._z=c*d*g-f*m*u,this._w=c*d*u+f*m*g;break;case"YZX":this._x=f*d*u+c*m*g,this._y=c*m*u+f*d*g,this._z=c*d*g-f*m*u,this._w=c*d*u-f*m*g;break;case"XZY":this._x=f*d*u-c*m*g,this._y=c*m*u-f*d*g,this._z=c*d*g+f*m*u,this._w=c*d*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-n*c,this._z=s*d+a*c+n*l-r*o,this._w=a*d-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),d=2*(o*t-s*r),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-s*u,this.z=r+l*u+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return la.copy(this).projectOnVector(e),this.sub(la)}reflect(e){return this.sub(la.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new A,Yl=new Yn;class gi{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(s,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vr.copy(n.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lr),Hr.subVectors(this.max,lr),bi.subVectors(e.a,lr),Ei.subVectors(e.b,lr),Ti.subVectors(e.c,lr),kn.subVectors(Ei,bi),On.subVectors(Ti,Ei),ei.subVectors(bi,Ti);let t=[0,-kn.z,kn.y,0,-On.z,On.y,0,-ei.z,ei.y,kn.z,0,-kn.x,On.z,0,-On.x,ei.z,0,-ei.x,-kn.y,kn.x,0,-On.y,On.x,0,-ei.y,ei.x,0];return!ca(t,bi,Ei,Ti,Hr)||(t=[1,0,0,0,1,0,0,0,1],!ca(t,bi,Ei,Ti,Hr))?!1:(Wr.crossVectors(kn,On),t=[Wr.x,Wr.y,Wr.z],ca(t,bi,Ei,Ti,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mn=[new A,new A,new A,new A,new A,new A,new A,new A],sn=new A,Vr=new gi,bi=new A,Ei=new A,Ti=new A,kn=new A,On=new A,ei=new A,lr=new A,Hr=new A,Wr=new A,ti=new A;function ca(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ti.fromArray(i,s);const o=r.x*Math.abs(ti.x)+r.y*Math.abs(ti.y)+r.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),d=n.dot(ti);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const nf=new gi,cr=new A,da=new A;class _i{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cr.subVectors(e,this.center);const t=cr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(cr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(da.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cr.copy(e.center).add(da)),this.expandByPoint(cr.copy(e.center).sub(da))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new A,ua=new A,Xr=new A,Bn=new A,ha=new A,qr=new A,fa=new A;class Ks{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ua.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(ua);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=Bn.dot(this.direction),l=-Bn.dot(Xr),c=Bn.lengthSq(),d=Math.abs(1-a*a);let u,f,m,g;if(d>0)if(u=a*l-o,f=a*o-l,g=s*d,u>=0)if(f>=-g)if(f<=g){const _=1/d;u*=_,f*=_,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*s+o)),f=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(u=Math.max(0,-(a*s+o)),f=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+f*(f+2*l)+c);else f=a>0?-s:s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ua).addScaledVector(Xr,f),m}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),r=Sn.dot(Sn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,r,s){ha.subVectors(t,e),qr.subVectors(n,e),fa.crossVectors(ha,qr);let a=this.direction.dot(fa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,e);const l=o*this.direction.dot(qr.crossVectors(Bn,qr));if(l<0)return null;const c=o*this.direction.dot(ha.cross(Bn));if(c<0||l+c>a)return null;const d=-o*Bn.dot(fa);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ye{constructor(e,t,n,r,s,a,o,l,c,d,u,f,m,g,_,p){Ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,d,u,f,m,g,_,p)}set(e,t,n,r,s,a,o,l,c,d,u,f,m,g,_,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=u,h[14]=f,h[3]=m,h[7]=g,h[11]=_,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ye().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Ai.setFromMatrixColumn(e,0).length(),s=1/Ai.setFromMatrixColumn(e,1).length(),a=1/Ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=a*d,m=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,m=l*u,g=c*d,_=c*u;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,m=l*u,g=c*d,_=c*u;t[0]=f-_*o,t[4]=-a*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*d,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,m=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=_-f*u,t[8]=g*u+m,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=m*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+_,t[5]=a*d,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*d,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rf,e,sf)}lookAt(e,t,n){const r=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),zn.crossVectors(n,Wt),zn.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),zn.crossVectors(n,Wt)),zn.normalize(),Kr.crossVectors(Wt,zn),r[0]=zn.x,r[4]=Kr.x,r[8]=Wt.x,r[1]=zn.y,r[5]=Kr.y,r[9]=Wt.y,r[2]=zn.z,r[6]=Kr.z,r[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],h=n[14],b=n[3],E=n[7],M=n[11],P=n[15],R=r[0],w=r[4],I=r[8],S=r[12],x=r[1],L=r[5],V=r[9],B=r[13],Y=r[2],j=r[6],X=r[10],Z=r[14],G=r[3],ae=r[7],he=r[11],Me=r[15];return s[0]=a*R+o*x+l*Y+c*G,s[4]=a*w+o*L+l*j+c*ae,s[8]=a*I+o*V+l*X+c*he,s[12]=a*S+o*B+l*Z+c*Me,s[1]=d*R+u*x+f*Y+m*G,s[5]=d*w+u*L+f*j+m*ae,s[9]=d*I+u*V+f*X+m*he,s[13]=d*S+u*B+f*Z+m*Me,s[2]=g*R+_*x+p*Y+h*G,s[6]=g*w+_*L+p*j+h*ae,s[10]=g*I+_*V+p*X+h*he,s[14]=g*S+_*B+p*Z+h*Me,s[3]=b*R+E*x+M*Y+P*G,s[7]=b*w+E*L+M*j+P*ae,s[11]=b*I+E*V+M*X+P*he,s[15]=b*S+E*B+M*Z+P*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],h=e[15];return g*(+s*l*u-r*c*u-s*o*f+n*c*f+r*o*m-n*l*m)+_*(+t*l*m-t*c*f+s*a*f-r*a*m+r*c*d-s*l*d)+p*(+t*c*u-t*o*m-s*a*u+n*a*m+s*o*d-n*c*d)+h*(-r*o*d-t*l*u+t*o*f+r*a*u-n*a*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],h=e[15],b=u*p*c-_*f*c+_*l*m-o*p*m-u*l*h+o*f*h,E=g*f*c-d*p*c-g*l*m+a*p*m+d*l*h-a*f*h,M=d*_*c-g*u*c+g*o*m-a*_*m-d*o*h+a*u*h,P=g*u*l-d*_*l-g*o*f+a*_*f+d*o*p-a*u*p,R=t*b+n*E+r*M+s*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=b*w,e[1]=(_*f*s-u*p*s-_*r*m+n*p*m+u*r*h-n*f*h)*w,e[2]=(o*p*s-_*l*s+_*r*c-n*p*c-o*r*h+n*l*h)*w,e[3]=(u*l*s-o*f*s-u*r*c+n*f*c+o*r*m-n*l*m)*w,e[4]=E*w,e[5]=(d*p*s-g*f*s+g*r*m-t*p*m-d*r*h+t*f*h)*w,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*h-t*l*h)*w,e[7]=(a*f*s-d*l*s+d*r*c-t*f*c-a*r*m+t*l*m)*w,e[8]=M*w,e[9]=(g*u*s-d*_*s-g*n*m+t*_*m+d*n*h-t*u*h)*w,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*h+t*o*h)*w,e[11]=(d*o*s-a*u*s-d*n*c+t*u*c+a*n*m-t*o*m)*w,e[12]=P*w,e[13]=(d*_*r-g*u*r+g*n*f-t*_*f-d*n*p+t*u*p)*w,e[14]=(g*o*r-a*_*r-g*n*l+t*_*l+a*n*p-t*o*p)*w,e[15]=(a*u*r-d*o*r+d*n*l-t*u*l-a*n*f+t*o*f)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,u=o+o,f=s*c,m=s*d,g=s*u,_=a*d,p=a*u,h=o*u,b=l*c,E=l*d,M=l*u,P=n.x,R=n.y,w=n.z;return r[0]=(1-(_+h))*P,r[1]=(m+M)*P,r[2]=(g-E)*P,r[3]=0,r[4]=(m-M)*R,r[5]=(1-(f+h))*R,r[6]=(p+b)*R,r[7]=0,r[8]=(g+E)*w,r[9]=(p-b)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Ai.set(r[0],r[1],r[2]).length();const a=Ai.set(r[4],r[5],r[6]).length(),o=Ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],an.copy(this);const c=1/s,d=1/a,u=1/o;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=d,an.elements[5]*=d,an.elements[6]*=d,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Cn){const l=this.elements,c=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),f=(n+r)/(n-r);let m,g;if(o===Cn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Us)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Cn){const l=this.elements,c=1/(t-e),d=1/(n-r),u=1/(a-s),f=(t+e)*c,m=(n+r)*d;let g,_;if(o===Cn)g=(a+s)*u,_=-2*u;else if(o===Us)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ai=new A,an=new Ye,rf=new A(0,0,0),sf=new A(1,1,1),zn=new A,Kr=new A,Wt=new A,jl=new Ye,$l=new Yn;class tn{constructor(e=0,t=0,n=0,r=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $l.setFromEuler(this),this.setFromQuaternion($l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class tl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let af=0;const Zl=new A,wi=new Yn,bn=new Ye,Yr=new A,dr=new A,of=new A,lf=new Yn,Jl=new A(1,0,0),Ql=new A(0,1,0),ec=new A(0,0,1),tc={type:"added"},cf={type:"removed"},Ri={type:"childadded",child:null},pa={type:"childremoved",child:null};class mt extends nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new A,t=new tn,n=new Yn,r=new A(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Ue}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(Jl,e)}rotateY(e){return this.rotateOnAxis(Ql,e)}rotateZ(e){return this.rotateOnAxis(ec,e)}translateOnAxis(e,t){return Zl.copy(e).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jl,e)}translateY(e){return this.translateOnAxis(Ql,e)}translateZ(e){return this.translateOnAxis(ec,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yr.copy(e):Yr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(dr,Yr,this.up):bn.lookAt(Yr,dr,this.up),this.quaternion.setFromRotationMatrix(bn),r&&(bn.extractRotation(r.matrixWorld),wi.setFromRotationMatrix(bn),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cf),pa.child=e,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,e,of),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,lf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}mt.DEFAULT_UP=new A(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new A,En=new A,ma=new A,Tn=new A,Ci=new A,Li=new A,nc=new A,ga=new A,_a=new A,va=new A,ya=new it,xa=new it,Ma=new it;class Qt{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){on.subVectors(r,t),En.subVectors(n,t),ma.subVectors(e,t);const a=on.dot(on),o=on.dot(En),l=on.dot(ma),c=En.dot(En),d=En.dot(ma),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const f=1/u,m=(c*l-o*d)*f,g=(a*d-o*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Tn.x),l.addScaledVector(a,Tn.y),l.addScaledVector(o,Tn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return ya.setScalar(0),xa.setScalar(0),Ma.setScalar(0),ya.fromBufferAttribute(e,t),xa.fromBufferAttribute(e,n),Ma.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ya,s.x),a.addScaledVector(xa,s.y),a.addScaledVector(Ma,s.z),a}static isFrontFacing(e,t,n,r){return on.subVectors(n,t),En.subVectors(e,t),on.cross(En).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),En.subVectors(this.a,this.b),on.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ci.subVectors(r,n),Li.subVectors(s,n),ga.subVectors(e,n);const l=Ci.dot(ga),c=Li.dot(ga);if(l<=0&&c<=0)return t.copy(n);_a.subVectors(e,r);const d=Ci.dot(_a),u=Li.dot(_a);if(d>=0&&u<=d)return t.copy(r);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Ci,a);va.subVectors(e,s);const m=Ci.dot(va),g=Li.dot(va);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Li,o);const p=d*g-m*u;if(p<=0&&u-d>=0&&m-g>=0)return nc.subVectors(s,r),o=(u-d)/(u-d+(m-g)),t.copy(r).addScaledVector(nc,o);const h=1/(p+_+f);return a=_*h,o=f*h,t.copy(n).addScaledVector(Ci,a).addScaledVector(Li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Sa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ke.workingColorSpace){if(e=el(e,1),t=ke(t,0,1),n=ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Sa(a,s,e+1/3),this.g=Sa(a,s,e),this.b=Sa(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=nt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){const n=qd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return Ke.fromWorkingColorSpace(Pt.copy(this),e),Math.round(ke(Pt.r*255,0,255))*65536+Math.round(ke(Pt.g*255,0,255))*256+Math.round(ke(Pt.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,r=Pt.g,s=Pt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=nt){Ke.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,r=Pt.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(jr);const n=Er(Gn.h,jr.h,t),r=Er(Gn.s,jr.s,t),s=Er(Gn.l,jr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new ye;ye.NAMES=qd;let df=0;class $n extends nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=Vi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=Ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qt extends $n{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Cd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new A,$r=new Ie;class pt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$r.fromBufferAttribute(this,t),$r.applyMatrix3(e),this.setXY(t,$r.x,$r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Co&&(e.usage=this.usage),e}}class Kd extends pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yd extends pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uf=0;const Jt=new Ye,ba=new mt,Pi=new A,Xt=new gi,ur=new gi,bt=new A;class gt extends nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hd(e)?Yd:Kd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ue().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return ba.lookAt(e),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ur.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Xt.min,ur.min),Xt.expandByPoint(bt),bt.addVectors(Xt.max,ur.max),Xt.expandByPoint(bt)):(Xt.expandByPoint(ur.min),Xt.expandByPoint(ur.max))}Xt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)bt.fromBufferAttribute(o,c),l&&(Pi.fromBufferAttribute(e,c),bt.add(Pi)),r=Math.max(r,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new A,l[I]=new A;const c=new A,d=new A,u=new A,f=new Ie,m=new Ie,g=new Ie,_=new A,p=new A;function h(I,S,x){c.fromBufferAttribute(n,I),d.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),f.fromBufferAttribute(s,I),m.fromBufferAttribute(s,S),g.fromBufferAttribute(s,x),d.sub(c),u.sub(c),m.sub(f),g.sub(f);const L=1/(m.x*g.y-g.x*m.y);isFinite(L)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(L),p.copy(u).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(L),o[I].add(_),o[S].add(_),o[x].add(_),l[I].add(p),l[S].add(p),l[x].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,S=b.length;I<S;++I){const x=b[I],L=x.start,V=x.count;for(let B=L,Y=L+V;B<Y;B+=3)h(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const E=new A,M=new A,P=new A,R=new A;function w(I){P.fromBufferAttribute(r,I),R.copy(P);const S=o[I];E.copy(S),E.sub(P.multiplyScalar(P.dot(S))).normalize(),M.crossVectors(R,S);const L=M.dot(l[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,S=b.length;I<S;++I){const x=b[I],L=x.start,V=x.count;for(let B=L,Y=L+V;B<Y;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new A,s=new A,a=new A,o=new A,l=new A,c=new A,d=new A,u=new A;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*d;for(let h=0;h<d;h++)f[g++]=c[m++]}return new pt(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];d.push(m.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],u=s[c];for(let f=0,m=u.length;f<m;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ic=new Ye,ni=new Ks,Zr=new _i,rc=new A,Jr=new A,Qr=new A,es=new A,Ea=new A,ts=new A,sc=new A,ns=new A;class Qe extends mt{constructor(e=new gt,t=new qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ts.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],u=s[l];d!==0&&(Ea.fromBufferAttribute(u,e),a?ts.addScaledVector(Ea,d):ts.addScaledVector(Ea.sub(t),d))}t.add(ts)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(s),ni.copy(e.ray).recast(e.near),!(Zr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Zr,rc)===null||ni.origin.distanceToSquared(rc)>(e.far-e.near)**2))&&(ic.copy(s).invert(),ni.copy(e.ray).applyMatrix4(ic),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let M=b,P=E;M<P;M+=3){const R=o.getX(M),w=o.getX(M+1),I=o.getX(M+2);r=is(this,h,e,n,c,d,u,R,w,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){const b=o.getX(p),E=o.getX(p+1),M=o.getX(p+2);r=is(this,a,e,n,c,d,u,b,E,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],h=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=b,P=E;M<P;M+=3){const R=M,w=M+1,I=M+2;r=is(this,h,e,n,c,d,u,R,w,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){const b=p,E=p+1,M=p+2;r=is(this,a,e,n,c,d,u,b,E,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function hf(i,e,t,n,r,s,a,o){let l;if(e.side===It?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Kn,o),l===null)return null;ns.copy(o),ns.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ns);return c<t.near||c>t.far?null:{distance:c,point:ns.clone(),object:i}}function is(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Jr),i.getVertexPosition(l,Qr),i.getVertexPosition(c,es);const d=hf(i,e,t,n,Jr,Qr,es,sc);if(d){const u=new A;Qt.getBarycoord(sc,Jr,Qr,es,u),r&&(d.uv=Qt.getInterpolatedAttribute(r,o,l,c,u,new Ie)),s&&(d.uv1=Qt.getInterpolatedAttribute(s,o,l,c,u,new Ie)),a&&(d.normal=Qt.getInterpolatedAttribute(a,o,l,c,u,new A),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new A,materialIndex:0};Qt.getNormal(Jr,Qr,es,f.normal),d.face=f,d.barycoord=u}return d}class Nr extends gt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(d,3)),this.setAttribute("uv",new ct(u,2));function g(_,p,h,b,E,M,P,R,w,I,S){const x=M/w,L=P/I,V=M/2,B=P/2,Y=R/2,j=w+1,X=I+1;let Z=0,G=0;const ae=new A;for(let he=0;he<X;he++){const Me=he*L-B;for(let Oe=0;Oe<j;Oe++){const rt=Oe*x-V;ae[_]=rt*b,ae[p]=Me*E,ae[h]=Y,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[p]=0,ae[h]=R>0?1:-1,d.push(ae.x,ae.y,ae.z),u.push(Oe/w),u.push(1-he/I),Z+=1}}for(let he=0;he<I;he++)for(let Me=0;Me<w;Me++){const Oe=f+Me+j*he,rt=f+Me+j*(he+1),W=f+(Me+1)+j*(he+1),ne=f+(Me+1)+j*he;l.push(Oe,rt,ne),l.push(rt,W,ne),G+=6}o.addGroup(m,G,S),m+=G,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const r in n)e[r]=n[r]}return e}function ff(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function jd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const pf={clone:Qi,merge:Nt};var mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pn extends $n{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mf,this.fragmentShader=gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class $d extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=Cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new A,ac=new Ie,oc=new Ie;class Kt extends $d{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cr*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,ac,oc),t.subVectors(oc,ac)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(br*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ii=-90,Di=1;class _f extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt(Ii,Di,e,t);r.layers=this.layers,this.add(r);const s=new Kt(Ii,Di,e,t);s.layers=this.layers,this.add(s);const a=new Kt(Ii,Di,e,t);a.layers=this.layers,this.add(a);const o=new Kt(Ii,Di,e,t);o.layers=this.layers,this.add(o);const l=new Kt(Ii,Di,e,t);l.layers=this.layers,this.add(l);const c=new Kt(Ii,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(u,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Zd extends Rt{constructor(e,t,n,r,s,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Yi,super(e,t,n,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vf extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Zd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Et}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Nr(5,5,5),s=new pn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:Xn});s.uniforms.tEquirect.value=t;const a=new Qe(r,s),o=t.minFilter;return t.minFilter===Rn&&(t.minFilter=Et),new _f(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class er{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ye(e),this.density=t}clone(){return new er(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yf extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Co,this.updateRanges=[],this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new A;class Fs{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Lo extends $n{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ui;const hr=new A,Fi=new A,Ni=new A,ki=new Ie,fr=new Ie,Jd=new Ye,rs=new A,pr=new A,ss=new A,lc=new Ie,Ta=new Ie,cc=new Ie;class dc extends mt{constructor(e=new Lo){if(super(),this.isSprite=!0,this.type="Sprite",Ui===void 0){Ui=new gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xf(t,5);Ui.setIndex([0,1,2,0,2,3]),Ui.setAttribute("position",new Fs(n,3,0,!1)),Ui.setAttribute("uv",new Fs(n,2,3,!1))}this.geometry=Ui,this.material=e,this.center=new Ie(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fi.setFromMatrixScale(this.matrixWorld),Jd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ni.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fi.multiplyScalar(-Ni.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;as(rs.set(-.5,-.5,0),Ni,a,Fi,r,s),as(pr.set(.5,-.5,0),Ni,a,Fi,r,s),as(ss.set(.5,.5,0),Ni,a,Fi,r,s),lc.set(0,0),Ta.set(1,0),cc.set(1,1);let o=e.ray.intersectTriangle(rs,pr,ss,!1,hr);if(o===null&&(as(pr.set(-.5,.5,0),Ni,a,Fi,r,s),Ta.set(0,1),o=e.ray.intersectTriangle(rs,ss,pr,!1,hr),o===null))return;const l=e.ray.origin.distanceTo(hr);l<e.near||l>e.far||t.push({distance:l,point:hr.clone(),uv:Qt.getInterpolation(hr,rs,pr,ss,lc,Ta,cc,new Ie),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function as(i,e,t,n,r,s){ki.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(fr.x=s*ki.x-r*ki.y,fr.y=r*ki.x+s*ki.y):fr.copy(ki),i.copy(e),i.x+=fr.x,i.y+=fr.y,i.applyMatrix4(Jd)}class Mf extends Rt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Yt,d=Yt,u,f){super(null,a,o,l,c,d,r,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uc extends pt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Oi=new Ye,hc=new Ye,os=[],fc=new gi,Sf=new Ye,mr=new Qe,gr=new _i;class bf extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Sf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new gi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Oi),fc.copy(e.boundingBox).applyMatrix4(Oi),this.boundingBox.union(fc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _i),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Oi),gr.copy(e.boundingSphere).applyMatrix4(Oi),this.boundingSphere.union(gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(n),e.ray.intersectsSphere(gr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Oi),hc.multiplyMatrices(n,Oi),mr.matrixWorld=hc,mr.raycast(e,os);for(let a=0,o=os.length;a<o;a++){const l=os[a];l.instanceId=s,l.object=this,t.push(l)}os.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Mf(new Float32Array(r*this.count),r,this.count,$o,_n));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Aa=new A,Ef=new A,Tf=new Ue;class ai{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Aa.subVectors(n,t).cross(Ef.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Aa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Tf.getNormalMatrix(e),r=this.coplanarPoint(Aa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new _i,ls=new A;class nl{constructor(e=new ai,t=new ai,n=new ai,r=new ai,s=new ai,a=new ai){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],u=r[6],f=r[7],m=r[8],g=r[9],_=r[10],p=r[11],h=r[12],b=r[13],E=r[14],M=r[15];if(n[0].setComponents(l-s,f-c,p-m,M-h).normalize(),n[1].setComponents(l+s,f+c,p+m,M+h).normalize(),n[2].setComponents(l+a,f+d,p+g,M+b).normalize(),n[3].setComponents(l-a,f-d,p-g,M-b).normalize(),n[4].setComponents(l-o,f-u,p-_,M-E).normalize(),t===Cn)n[5].setComponents(l+o,f+u,p+_,M+E).normalize();else if(t===Us)n[5].setComponents(o,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ls.x=r.normal.x>0?e.max.x:e.min.x,ls.y=r.normal.y>0?e.max.y:e.min.y,ls.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ls)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class il extends $n{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ns=new A,ks=new A,pc=new Ye,_r=new Ks,cs=new _i,wa=new A,mc=new A;class Qd extends mt{constructor(e=new gt,t=new il){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ns.fromBufferAttribute(t,r-1),ks.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ns.distanceTo(ks);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cs.copy(n.boundingSphere),cs.applyMatrix4(r),cs.radius+=s,e.ray.intersectsSphere(cs)===!1)return;pc.copy(r).invert(),_r.copy(e.ray).applyMatrix4(pc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,f=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const h=d.getX(_),b=d.getX(_+1),E=ds(this,e,_r,l,h,b);E&&t.push(E)}if(this.isLineLoop){const _=d.getX(g-1),p=d.getX(m),h=ds(this,e,_r,l,_,p);h&&t.push(h)}}else{const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const h=ds(this,e,_r,l,_,_+1);h&&t.push(h)}if(this.isLineLoop){const _=ds(this,e,_r,l,g-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ds(i,e,t,n,r,s){const a=i.geometry.attributes.position;if(Ns.fromBufferAttribute(a,r),ks.fromBufferAttribute(a,s),t.distanceSqToSegment(Ns,ks,wa,mc)>n)return;wa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(wa);if(!(l<e.near||l>e.far))return{distance:l,point:mc.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const gc=new A,_c=new A;class Af extends Qd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)gc.fromBufferAttribute(t,r),_c.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+gc.distanceTo(_c);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class hi extends $n{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vc=new Ye,Po=new Ks,us=new _i,hs=new A;class Xi extends mt{constructor(e=new gt,t=new hi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),us.copy(n.boundingSphere),us.applyMatrix4(r),us.radius+=s,e.ray.intersectsSphere(us)===!1)return;vc.copy(r).invert(),Po.copy(e.ray).applyMatrix4(vc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);hs.fromBufferAttribute(u,p),yc(hs,p,l,r,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=f,_=m;g<_;g++)hs.fromBufferAttribute(u,g),yc(hs,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function yc(i,e,t,n,r,s,a){const o=Po.distanceSqToPoint(i);if(o<t){const l=new A;Po.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class en extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Vt extends Rt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class eu extends Rt{constructor(e,t,n,r,s,a,o,l,c,d=Hi){if(d!==Hi&&d!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Hi&&(n=fi),n===void 0&&d===Zi&&(n=$i),super(null,r,s,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Yt,this.minFilter=l!==void 0?l:Yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Pr extends gt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new A,d=new Ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const m=n+u/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[f]/e+1)/2,d.y=(a[f+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class rl extends gt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),c(n),d(),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(s.slice(),3)),this.setAttribute("uv",new ct(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const E=new A,M=new A,P=new A;for(let R=0;R<t.length;R+=3)m(t[R+0],E),m(t[R+1],M),m(t[R+2],P),l(E,M,P,b)}function l(b,E,M,P){const R=P+1,w=[];for(let I=0;I<=R;I++){w[I]=[];const S=b.clone().lerp(M,I/R),x=E.clone().lerp(M,I/R),L=R-I;for(let V=0;V<=L;V++)V===0&&I===R?w[I][V]=S:w[I][V]=S.clone().lerp(x,V/L)}for(let I=0;I<R;I++)for(let S=0;S<2*(R-I)-1;S++){const x=Math.floor(S/2);S%2===0?(f(w[I][x+1]),f(w[I+1][x]),f(w[I][x])):(f(w[I][x+1]),f(w[I+1][x+1]),f(w[I+1][x]))}}function c(b){const E=new A;for(let M=0;M<s.length;M+=3)E.x=s[M+0],E.y=s[M+1],E.z=s[M+2],E.normalize().multiplyScalar(b),s[M+0]=E.x,s[M+1]=E.y,s[M+2]=E.z}function d(){const b=new A;for(let E=0;E<s.length;E+=3){b.x=s[E+0],b.y=s[E+1],b.z=s[E+2];const M=p(b)/2/Math.PI+.5,P=h(b)/Math.PI+.5;a.push(M,1-P)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){const E=a[b+0],M=a[b+2],P=a[b+4],R=Math.max(E,M,P),w=Math.min(E,M,P);R>.9&&w<.1&&(E<.2&&(a[b+0]+=1),M<.2&&(a[b+2]+=1),P<.2&&(a[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function m(b,E){const M=b*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function g(){const b=new A,E=new A,M=new A,P=new A,R=new Ie,w=new Ie,I=new Ie;for(let S=0,x=0;S<s.length;S+=9,x+=6){b.set(s[S+0],s[S+1],s[S+2]),E.set(s[S+3],s[S+4],s[S+5]),M.set(s[S+6],s[S+7],s[S+8]),R.set(a[x+0],a[x+1]),w.set(a[x+2],a[x+3]),I.set(a[x+4],a[x+5]),P.copy(b).add(E).add(M).divideScalar(3);const L=p(P);_(R,x+0,b,L),_(w,x+2,E,L),_(I,x+4,M,L)}}function _(b,E,M,P){P<0&&b.x===1&&(a[E]=b.x-1),M.x===0&&M.z===0&&(a[E]=P/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function h(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rl(e.vertices,e.indices,e.radius,e.details)}}class sl extends rl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new sl(e.radius,e.detail)}}class vi extends gt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,u=e/o,f=t/l,m=[],g=[],_=[],p=[];for(let h=0;h<d;h++){const b=h*f-a;for(let E=0;E<c;E++){const M=E*u-s;g.push(M,-b,0),_.push(0,0,1),p.push(E/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<o;b++){const E=b+c*h,M=b+c*(h+1),P=b+1+c*(h+1),R=b+1+c*h;m.push(E,M,R),m.push(M,P,R)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.width,e.height,e.widthSegments,e.heightSegments)}}class al extends gt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],l=[],c=[],d=[];let u=e;const f=(t-e)/r,m=new A,g=new Ie;for(let _=0;_<=r;_++){for(let p=0;p<=n;p++){const h=s+p/n*a;m.x=u*Math.cos(h),m.y=u*Math.sin(h),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,d.push(g.x,g.y)}u+=f}for(let _=0;_<r;_++){const p=_*(n+1);for(let h=0;h<n;h++){const b=h+p,E=b,M=b+n+1,P=b+n+2,R=b+1;o.push(E,M,R),o.push(M,P,R)}}this.setIndex(o),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new al(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class un extends gt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new A,f=new A,m=[],g=[],_=[],p=[];for(let h=0;h<=n;h++){const b=[],E=h/n;let M=0;h===0&&a===0?M=.5/t:h===n&&l===Math.PI&&(M=-.5/t);for(let P=0;P<=t;P++){const R=P/t;u.x=-e*Math.cos(r+R*s)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(r+R*s)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(R+M,1-E),b.push(c++)}d.push(b)}for(let h=0;h<n;h++)for(let b=0;b<t;b++){const E=d[h][b+1],M=d[h][b],P=d[h+1][b],R=d[h+1][b+1];(h!==0||a>0)&&m.push(E,M,R),(h!==n-1||l<Math.PI)&&m.push(M,P,R)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ir extends $n{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gd,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wf extends $n{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rf extends $n{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xc={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Cf{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,f=c.length;u<f;u+=2){const m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const Lf=new Cf;class ol{constructor(e){this.manager=e!==void 0?e:Lf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ol.DEFAULT_MATERIAL_NAME="__DEFAULT";class Pf extends ol{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=xc.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Lr("img");function l(){d(),xc.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){d(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class ll extends ol{constructor(e){super(e)}load(e,t,n,r){const s=new Rt,a=new Pf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Ys extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class cl extends Ys{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new Ye,Mc=new A,Sc=new A;class tu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nl,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),Sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sc),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const bc=new Ye,vr=new A,Ca=new A;class If extends tu{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ie(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(vr),Ca.copy(n.position),Ca.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ca),n.updateMatrixWorld(),r.makeTranslation(-vr.x,-vr.y,-vr.z),bc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bc)}}class Df extends Ys{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new If}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class nu extends $d{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Uf extends tu{constructor(){super(new nu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class iu extends Ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Uf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ru extends Ys{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ff extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const Ec=new Ye;class Nf{constructor(e,t,n=0,r=1/0){this.ray=new Ks(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new tl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(e,t=!0,n=[]){return Io(e,this,n,t),n.sort(Tc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Io(e[r],this,n,t);return n.sort(Tc),n}}function Tc(i,e){return i.distance-e.distance}function Io(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Io(s[a],e,t,!0)}}class kf{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function Ac(i,e,t,n){const r=Of(n);switch(t){case Fd:return i*e;case kd:return i*e;case Od:return i*e*2;case $o:return i*e/r.components*r.byteLength;case Zo:return i*e/r.components*r.byteLength;case Bd:return i*e*2/r.components*r.byteLength;case Jo:return i*e*2/r.components*r.byteLength;case Nd:return i*e*3/r.components*r.byteLength;case fn:return i*e*4/r.components*r.byteLength;case Qo:return i*e*4/r.components*r.byteLength;case Ms:case Ss:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case bs:case Es:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case io:case so:return Math.max(i,16)*Math.max(e,8)/4;case no:case ro:return Math.max(i,8)*Math.max(e,8)/2;case ao:case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _o:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case So:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ts:case Eo:case To:return Math.ceil(i/4)*Math.ceil(e/4)*16;case zd:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wo:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Of(i){switch(i){case Un:case Id:return{byteLength:1,components:1};case Rr:case Dd:case Fr:return{byteLength:2,components:1};case Yo:case jo:return{byteLength:2,components:4};case fi:case Ko:case _n:return{byteLength:4,components:1};case Ud:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function su(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Bf(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<u.length;m++){const g=u[f],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];i.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$f=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ep=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,up=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gp="gl_FragColor = linearToOutputTexel( gl_FragColor );",_p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ip=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Dp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Up=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Op=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$p=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,em=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,om=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_m=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Em=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Am=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Im=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Um=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Km=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ym=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ag=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,og=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_g=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:zf,alphahash_pars_fragment:Gf,alphamap_fragment:Vf,alphamap_pars_fragment:Hf,alphatest_fragment:Wf,alphatest_pars_fragment:Xf,aomap_fragment:qf,aomap_pars_fragment:Kf,batching_pars_vertex:Yf,batching_vertex:jf,begin_vertex:$f,beginnormal_vertex:Zf,bsdfs:Jf,iridescence_fragment:Qf,bumpmap_pars_fragment:ep,clipping_planes_fragment:tp,clipping_planes_pars_fragment:np,clipping_planes_pars_vertex:ip,clipping_planes_vertex:rp,color_fragment:sp,color_pars_fragment:ap,color_pars_vertex:op,color_vertex:lp,common:cp,cube_uv_reflection_fragment:dp,defaultnormal_vertex:up,displacementmap_pars_vertex:hp,displacementmap_vertex:fp,emissivemap_fragment:pp,emissivemap_pars_fragment:mp,colorspace_fragment:gp,colorspace_pars_fragment:_p,envmap_fragment:vp,envmap_common_pars_fragment:yp,envmap_pars_fragment:xp,envmap_pars_vertex:Mp,envmap_physical_pars_fragment:Ip,envmap_vertex:Sp,fog_vertex:bp,fog_pars_vertex:Ep,fog_fragment:Tp,fog_pars_fragment:Ap,gradientmap_pars_fragment:wp,lightmap_pars_fragment:Rp,lights_lambert_fragment:Cp,lights_lambert_pars_fragment:Lp,lights_pars_begin:Pp,lights_toon_fragment:Dp,lights_toon_pars_fragment:Up,lights_phong_fragment:Fp,lights_phong_pars_fragment:Np,lights_physical_fragment:kp,lights_physical_pars_fragment:Op,lights_fragment_begin:Bp,lights_fragment_maps:zp,lights_fragment_end:Gp,logdepthbuf_fragment:Vp,logdepthbuf_pars_fragment:Hp,logdepthbuf_pars_vertex:Wp,logdepthbuf_vertex:Xp,map_fragment:qp,map_pars_fragment:Kp,map_particle_fragment:Yp,map_particle_pars_fragment:jp,metalnessmap_fragment:$p,metalnessmap_pars_fragment:Zp,morphinstance_vertex:Jp,morphcolor_vertex:Qp,morphnormal_vertex:em,morphtarget_pars_vertex:tm,morphtarget_vertex:nm,normal_fragment_begin:im,normal_fragment_maps:rm,normal_pars_fragment:sm,normal_pars_vertex:am,normal_vertex:om,normalmap_pars_fragment:lm,clearcoat_normal_fragment_begin:cm,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:um,iridescence_pars_fragment:hm,opaque_fragment:fm,packing:pm,premultiplied_alpha_fragment:mm,project_vertex:gm,dithering_fragment:_m,dithering_pars_fragment:vm,roughnessmap_fragment:ym,roughnessmap_pars_fragment:xm,shadowmap_pars_fragment:Mm,shadowmap_pars_vertex:Sm,shadowmap_vertex:bm,shadowmask_pars_fragment:Em,skinbase_vertex:Tm,skinning_pars_vertex:Am,skinning_vertex:wm,skinnormal_vertex:Rm,specularmap_fragment:Cm,specularmap_pars_fragment:Lm,tonemapping_fragment:Pm,tonemapping_pars_fragment:Im,transmission_fragment:Dm,transmission_pars_fragment:Um,uv_pars_fragment:Fm,uv_pars_vertex:Nm,uv_vertex:km,worldpos_vertex:Om,background_vert:Bm,background_frag:zm,backgroundCube_vert:Gm,backgroundCube_frag:Vm,cube_vert:Hm,cube_frag:Wm,depth_vert:Xm,depth_frag:qm,distanceRGBA_vert:Km,distanceRGBA_frag:Ym,equirect_vert:jm,equirect_frag:$m,linedashed_vert:Zm,linedashed_frag:Jm,meshbasic_vert:Qm,meshbasic_frag:eg,meshlambert_vert:tg,meshlambert_frag:ng,meshmatcap_vert:ig,meshmatcap_frag:rg,meshnormal_vert:sg,meshnormal_frag:ag,meshphong_vert:og,meshphong_frag:lg,meshphysical_vert:cg,meshphysical_frag:dg,meshtoon_vert:ug,meshtoon_frag:hg,points_vert:fg,points_frag:pg,shadow_vert:mg,shadow_frag:gg,sprite_vert:_g,sprite_frag:vg},ie={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},gn={basic:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ye(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Nt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Nt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Nt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new ye(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Nt([ie.points,ie.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Nt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Nt([ie.common,ie.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Nt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Nt([ie.sprite,ie.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Nt([ie.common,ie.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Nt([ie.lights,ie.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};gn.physical={uniforms:Nt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const fs={r:0,b:0,g:0},ri=new tn,yg=new Ye;function xg(i,e,t,n,r,s,a){const o=new ye(0);let l=s===!0?0:1,c,d,u=null,f=0,m=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?t:e).get(M)),M}function _(E){let M=!1;const P=g(E);P===null?h(o,l):P&&P.isColor&&(h(P,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,M){const P=g(M);P&&(P.isCubeTexture||P.mapping===qs)?(d===void 0&&(d=new Qe(new Nr(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:Qi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),ri.copy(M.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),d.material.uniforms.envMap.value=P,d.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(ri)),d.material.toneMapped=Ke.getTransfer(P.colorSpace)!==tt,(u!==P||f!==P.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,u=P,f=P.version,m=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new Qe(new vi(2,2),new pn({name:"BackgroundMaterial",uniforms:Qi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(P.colorSpace)!==tt,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||f!==P.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=P,f=P.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function h(E,M){E.getRGB(fs,jd(i)),n.buffers.color.setClear(fs.r,fs.g,fs.b,M,a)}function b(){d!==void 0&&(d.geometry.dispose(),d.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),l=M,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,h(o,l)},render:_,addToRenderList:p,dispose:b}}function Mg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(x,L,V,B,Y){let j=!1;const X=u(B,V,L);s!==X&&(s=X,c(s.object)),j=m(x,B,V,Y),j&&g(x,B,V,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,M(x,L,V,B),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,L,V){const B=V.wireframe===!0;let Y=n[x.id];Y===void 0&&(Y={},n[x.id]=Y);let j=Y[L.id];j===void 0&&(j={},Y[L.id]=j);let X=j[B];return X===void 0&&(X=f(l()),j[B]=X),X}function f(x){const L=[],V=[],B=[];for(let Y=0;Y<t;Y++)L[Y]=0,V[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:B,object:x,attributes:{},index:null}}function m(x,L,V,B){const Y=s.attributes,j=L.attributes;let X=0;const Z=V.getAttributes();for(const G in Z)if(Z[G].location>=0){const he=Y[G];let Me=j[G];if(Me===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(Me=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(Me=x.instanceColor)),he===void 0||he.attribute!==Me||Me&&he.data!==Me.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function g(x,L,V,B){const Y={},j=L.attributes;let X=0;const Z=V.getAttributes();for(const G in Z)if(Z[G].location>=0){let he=j[G];he===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(he=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(he=x.instanceColor));const Me={};Me.attribute=he,he&&he.data&&(Me.data=he.data),Y[G]=Me,X++}s.attributes=Y,s.attributesNum=X,s.index=B}function _(){const x=s.newAttributes;for(let L=0,V=x.length;L<V;L++)x[L]=0}function p(x){h(x,0)}function h(x,L){const V=s.newAttributes,B=s.enabledAttributes,Y=s.attributeDivisors;V[x]=1,B[x]===0&&(i.enableVertexAttribArray(x),B[x]=1),Y[x]!==L&&(i.vertexAttribDivisor(x,L),Y[x]=L)}function b(){const x=s.newAttributes,L=s.enabledAttributes;for(let V=0,B=L.length;V<B;V++)L[V]!==x[V]&&(i.disableVertexAttribArray(V),L[V]=0)}function E(x,L,V,B,Y,j,X){X===!0?i.vertexAttribIPointer(x,L,V,Y,j):i.vertexAttribPointer(x,L,V,B,Y,j)}function M(x,L,V,B){_();const Y=B.attributes,j=V.getAttributes(),X=L.defaultAttributeValues;for(const Z in j){const G=j[Z];if(G.location>=0){let ae=Y[Z];if(ae===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(ae=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(ae=x.instanceColor)),ae!==void 0){const he=ae.normalized,Me=ae.itemSize,Oe=e.get(ae);if(Oe===void 0)continue;const rt=Oe.buffer,W=Oe.type,ne=Oe.bytesPerElement,_e=W===i.INT||W===i.UNSIGNED_INT||ae.gpuType===Ko;if(ae.isInterleavedBufferAttribute){const oe=ae.data,Ae=oe.stride,Le=ae.offset;if(oe.isInstancedInterleavedBuffer){for(let Be=0;Be<G.locationSize;Be++)h(G.location+Be,oe.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Be=0;Be<G.locationSize;Be++)p(G.location+Be);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let Be=0;Be<G.locationSize;Be++)E(G.location+Be,Me/G.locationSize,W,he,Ae*ne,(Le+Me/G.locationSize*Be)*ne,_e)}else{if(ae.isInstancedBufferAttribute){for(let oe=0;oe<G.locationSize;oe++)h(G.location+oe,ae.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let oe=0;oe<G.locationSize;oe++)p(G.location+oe);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let oe=0;oe<G.locationSize;oe++)E(G.location+oe,Me/G.locationSize,W,he,Me*ne,Me/G.locationSize*oe*ne,_e)}}else if(X!==void 0){const he=X[Z];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(G.location,he);break;case 3:i.vertexAttrib3fv(G.location,he);break;case 4:i.vertexAttrib4fv(G.location,he);break;default:i.vertexAttrib1fv(G.location,he)}}}}b()}function P(){I();for(const x in n){const L=n[x];for(const V in L){const B=L[V];for(const Y in B)d(B[Y].object),delete B[Y];delete L[V]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const L=n[x.id];for(const V in L){const B=L[V];for(const Y in B)d(B[Y].object),delete B[Y];delete L[V]}delete n[x.id]}function w(x){for(const L in n){const V=n[L];if(V[x.id]===void 0)continue;const B=V[x.id];for(const Y in B)d(B[Y].object),delete B[Y];delete V[x.id]}}function I(){S(),a=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function Sg(i,e,t){let n;function r(c){n=c}function s(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=d[g];t.update(m,n,1)}function l(c,d,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],d[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,d,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*f[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function bg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==fn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const I=w===Fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Un&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==_n&&!I)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:P,maxSamples:R}}function Eg(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new ai,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||n!==0||r;return r=f,n=u.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,h=i.get(u);if(!r||g===null||g.length===0||s&&!p)s?d(null):c();else{const b=s?0:n,E=b*4;let M=h.clippingState||null;l.value=M,M=d(g,f,E,m);for(let P=0;P!==E;++P)M[P]=t[P];h.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const h=m+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<h)&&(p=new Float32Array(h));for(let E=0,M=m;E!==_;++E,M+=4)a.copy(u[E]).applyMatrix4(b,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Tg(i){let e=new WeakMap;function t(a,o){return o===Qa?a.mapping=Yi:o===eo&&(a.mapping=ji),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Qa||o===eo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new vf(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Gi=4,wc=[.125,.215,.35,.446,.526,.582],ci=20,La=new nu,Rc=new ye;let Pa=null,Ia=0,Da=0,Ua=!1;const oi=(1+Math.sqrt(5))/2,Bi=1/oi,Cc=[new A(-oi,Bi,0),new A(oi,Bi,0),new A(-Bi,0,oi),new A(Bi,0,oi),new A(0,oi,-Bi),new A(0,oi,Bi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class Lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Pa=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,Ia,Da),this._renderer.xr.enabled=Ua,e.scissorTest=!1,ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Et,minFilter:Et,generateMipmaps:!1,type:Fr,format:fn,colorSpace:Ji,depthBuffer:!1},r=Pc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ag(s)),this._blurMaterial=wg(s,e,t)}return r}_compileMaterial(e){const t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,La)}_sceneToCubeUV(e,t,n,r){const o=new Kt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Rc),d.toneMapping=qn,d.autoClear=!1;const m=new qt({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),g=new Qe(new Nr,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Rc),_=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):b===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const E=this._cubeSize;ps(r,b*E,h>2?E:0,E,E),d.setRenderTarget(r),_&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Yi||e.mapping===ji;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ic());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Qe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ps(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,La)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Cc[(r-s-1)%Cc.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Qe(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ci-1),_=s/g,p=isFinite(s)?1+Math.floor(d*_):ci;p>ci&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ci}`);const h=[];let b=0;for(let w=0;w<ci;++w){const I=w/_,S=Math.exp(-I*I/2);h.push(S),w===0?b+=S:w<p&&(b+=2*S)}for(let w=0;w<h.length;w++)h[w]=h[w]/b;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const M=this._sizeLods[r],P=3*M*(r>E-Gi?r-E+Gi:0),R=4*(this._cubeSize-M);ps(t,P,R,3*M,2*M),l.setRenderTarget(t),l.render(u,La)}}function Ag(i){const e=[],t=[],n=[];let r=i;const s=i-Gi+1+wc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Gi?l=wc[a-i+Gi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,g=6,_=3,p=2,h=1,b=new Float32Array(_*g*m),E=new Float32Array(p*g*m),M=new Float32Array(h*g*m);for(let R=0;R<m;R++){const w=R%3*2/3-1,I=R>2?0:-1,S=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];b.set(S,_*g*R),E.set(f,p*g*R);const x=[R,R,R,R,R,R];M.set(x,h*g*R)}const P=new gt;P.setAttribute("position",new pt(b,_)),P.setAttribute("uv",new pt(E,p)),P.setAttribute("faceIndex",new pt(M,h)),e.push(P),r>Gi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Pc(i,e,t){const n=new pi(i,e,t);return n.texture.mapping=qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ps(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function wg(i,e,t){const n=new Float32Array(ci),r=new A(0,1,0);return new pn({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ic(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Dc(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function dl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Qa||l===eo,d=l===Yi||l===ji;if(c||d){let u=e.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Lc(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(t===null&&(t=new Lc(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Cg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&zi("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Lg(i,e,t,n){const r={},s=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const m in f)e.update(f[m],i.ARRAY_BUFFER)}function c(u){const f=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const b=m.array;_=m.version;for(let E=0,M=b.length;E<M;E+=3){const P=b[E+0],R=b[E+1],w=b[E+2];f.push(P,R,R,w,w,P)}}else if(g!==void 0){const b=g.array;_=g.version;for(let E=0,M=b.length/3-1;E<M;E+=3){const P=E+0,R=E+1,w=E+2;f.push(P,R,R,w,w,P)}}else return;const p=new(Hd(f)?Yd:Kd)(f,1);p.version=_;const h=s.get(u);h&&e.remove(h),s.set(u,p)}function d(u){const f=s.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Pg(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,m){i.drawElements(n,m,s,f*a),t.update(m,n,1)}function c(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,f*a,g),t.update(m,n,g))}function d(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,f,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];t.update(p,n,1)}function u(f,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<f.length;h++)c(f[h]/a,m[h],_[h]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,s,f,0,_,0,g);let h=0;for(let b=0;b<g;b++)h+=m[b]*_[b];t.update(h,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Ig(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Dg(i,e,t){const n=new WeakMap,r=new it;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let x=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var m=x;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let P=o.attributes.position.count*M,R=1;P>e.maxTextureSize&&(R=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const w=new Float32Array(P*R*4*u),I=new Xd(w,P,R,u);I.type=_n,I.needsUpdate=!0;const S=M*4;for(let L=0;L<u;L++){const V=h[L],B=b[L],Y=E[L],j=P*R*4*L;for(let X=0;X<V.count;X++){const Z=X*S;g===!0&&(r.fromBufferAttribute(V,X),w[j+Z+0]=r.x,w[j+Z+1]=r.y,w[j+Z+2]=r.z,w[j+Z+3]=0),_===!0&&(r.fromBufferAttribute(B,X),w[j+Z+4]=r.x,w[j+Z+5]=r.y,w[j+Z+6]=r.z,w[j+Z+7]=0),p===!0&&(r.fromBufferAttribute(Y,X),w[j+Z+8]=r.x,w[j+Z+9]=r.y,w[j+Z+10]=r.z,w[j+Z+11]=Y.itemSize===4?r.w:1)}}f={count:u,texture:I,size:new Ie(P,R)},n.set(o,f),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Ug(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const au=new Rt,Uc=new eu(1,1),ou=new Xd,lu=new tf,cu=new Zd,Fc=[],Nc=[],kc=new Float32Array(16),Oc=new Float32Array(9),Bc=new Float32Array(4);function ir(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Fc[r];if(s===void 0&&(s=new Float32Array(r),Fc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function js(i,e){let t=Nc[e];t===void 0&&(t=new Int32Array(e),Nc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function Og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Bg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Bc.set(n),i.uniformMatrix2fv(this.addr,!1,Bc),St(t,n)}}function zg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Oc.set(n),i.uniformMatrix3fv(this.addr,!1,Oc),St(t,n)}}function Gg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;kc.set(n),i.uniformMatrix4fv(this.addr,!1,kc),St(t,n)}}function Vg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function qg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function jg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function $g(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Uc.compareFunction=Vd,s=Uc):s=au,t.setTexture2D(e||s,r)}function Zg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||lu,r)}function Jg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||cu,r)}function Qg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ou,r)}function e0(i){switch(i){case 5126:return Fg;case 35664:return Ng;case 35665:return kg;case 35666:return Og;case 35674:return Bg;case 35675:return zg;case 35676:return Gg;case 5124:case 35670:return Vg;case 35667:case 35671:return Hg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return qg;case 36294:return Kg;case 36295:return Yg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Zg;case 35680:case 36300:case 36308:case 36293:return Jg;case 36289:case 36303:case 36311:case 36292:return Qg}}function t0(i,e){i.uniform1fv(this.addr,e)}function n0(i,e){const t=ir(e,this.size,2);i.uniform2fv(this.addr,t)}function i0(i,e){const t=ir(e,this.size,3);i.uniform3fv(this.addr,t)}function r0(i,e){const t=ir(e,this.size,4);i.uniform4fv(this.addr,t)}function s0(i,e){const t=ir(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function a0(i,e){const t=ir(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function o0(i,e){const t=ir(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function l0(i,e){i.uniform1iv(this.addr,e)}function c0(i,e){i.uniform2iv(this.addr,e)}function d0(i,e){i.uniform3iv(this.addr,e)}function u0(i,e){i.uniform4iv(this.addr,e)}function h0(i,e){i.uniform1uiv(this.addr,e)}function f0(i,e){i.uniform2uiv(this.addr,e)}function p0(i,e){i.uniform3uiv(this.addr,e)}function m0(i,e){i.uniform4uiv(this.addr,e)}function g0(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||au,s[a])}function _0(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||lu,s[a])}function v0(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||cu,s[a])}function y0(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ou,s[a])}function x0(i){switch(i){case 5126:return t0;case 35664:return n0;case 35665:return i0;case 35666:return r0;case 35674:return s0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return d0;case 35669:case 35673:return u0;case 5125:return h0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return y0}}class M0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=e0(t.type)}}class S0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=x0(t.type)}}class b0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function zc(i,e){i.seq.push(e),i.map[e.id]=e}function E0(i,e,t){const n=i.name,r=n.length;for(Fa.lastIndex=0;;){const s=Fa.exec(n),a=Fa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){zc(t,c===void 0?new M0(o,i,e):new S0(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new b0(o),zc(t,u)),t=u}}}class As{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);E0(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Gc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const T0=37297;let A0=0;function w0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vc=new Ue;function R0(i){Ke._getMatrix(Vc,Ke.workingColorSpace,i);const e=`mat3( ${Vc.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Ds:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+w0(i.getShaderSource(e),a)}else return r}function C0(i,e){const t=R0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function L0(i,e){let t;switch(e){case hh:t="Linear";break;case fh:t="Reinhard";break;case ph:t="Cineon";break;case Ld:t="ACESFilmic";break;case gh:t="AgX";break;case _h:t="Neutral";break;case mh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ms=new A;function P0(){Ke.getLuminanceCoefficients(ms);const i=ms.x.toFixed(4),e=ms.y.toFixed(4),t=ms.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function D0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function U0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xr(i){return i!==""}function Wc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const F0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(F0,k0)}const N0=new Map;function k0(i,e){let t=Ne[e];if(t===void 0){const n=N0.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const O0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(i){return i.replace(O0,B0)}function B0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Kc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function z0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function G0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Yi:case ji:e="ENVMAP_TYPE_CUBE";break;case qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function V0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ji:e="ENVMAP_MODE_REFRACTION";break}return e}function H0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Cd:e="ENVMAP_BLENDING_MULTIPLY";break;case dh:e="ENVMAP_BLENDING_MIX";break;case uh:e="ENVMAP_BLENDING_ADD";break}return e}function W0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function X0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=z0(t),c=G0(t),d=V0(t),u=H0(t),f=W0(t),m=I0(t),g=D0(s),_=r.createProgram();let p,h,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),h.length>0&&(h+=`
`)):(p=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),h=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==qn?L0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,C0("linearToOutputTexel",t.outputColorSpace),P0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xr).join(`
`)),a=Do(a),a=Wc(a,t),a=Xc(a,t),o=Do(o),o=Wc(o,t),o=Xc(o,t),a=qc(a),o=qc(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const E=b+p+a,M=b+h+o,P=Gc(r,r.VERTEX_SHADER,E),R=Gc(r,r.FRAGMENT_SHADER,M);r.attachShader(_,P),r.attachShader(_,R),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(L){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(_).trim(),B=r.getShaderInfoLog(P).trim(),Y=r.getShaderInfoLog(R).trim();let j=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,P,R);else{const Z=Hc(r,P,"vertex"),G=Hc(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+Z+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||Y==="")&&(X=!1);X&&(L.diagnostics={runnable:j,programLog:V,vertexShader:{log:B,prefix:p},fragmentShader:{log:Y,prefix:h}})}r.deleteShader(P),r.deleteShader(R),I=new As(r,_),S=U0(r,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,T0)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=A0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=R,this}let q0=0;class K0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Y0(e),t.set(e,n)),n}}class Y0{constructor(e){this.id=q0++,this.code=e,this.usedTimes=0}}function j0(i,e,t,n,r,s,a){const o=new tl,l=new K0,c=new Set,d=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,x,L,V,B){const Y=V.fog,j=B.geometry,X=S.isMeshStandardMaterial?V.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),G=Z&&Z.mapping===qs?Z.image.height:null,ae=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const he=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Me=he!==void 0?he.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let rt,W,ne,_e;if(ae){const Ze=gn[ae];rt=Ze.vertexShader,W=Ze.fragmentShader}else rt=S.vertexShader,W=S.fragmentShader,l.update(S),ne=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const oe=i.getRenderTarget(),Ae=i.state.buffers.depth.getReversed(),Le=B.isInstancedMesh===!0,Be=B.isBatchedMesh===!0,dt=!!S.map,He=!!S.matcap,_t=!!Z,C=!!S.aoMap,jt=!!S.lightMap,ze=!!S.bumpMap,Ge=!!S.normalMap,Se=!!S.displacementMap,ot=!!S.emissiveMap,xe=!!S.metalnessMap,T=!!S.roughnessMap,v=S.anisotropy>0,N=S.clearcoat>0,q=S.dispersion>0,$=S.iridescence>0,H=S.sheen>0,ve=S.transmission>0,le=v&&!!S.anisotropyMap,fe=N&&!!S.clearcoatMap,We=N&&!!S.clearcoatNormalMap,ee=N&&!!S.clearcoatRoughnessMap,pe=$&&!!S.iridescenceMap,Te=$&&!!S.iridescenceThicknessMap,Re=H&&!!S.sheenColorMap,me=H&&!!S.sheenRoughnessMap,Ve=!!S.specularMap,Fe=!!S.specularColorMap,at=!!S.specularIntensityMap,D=ve&&!!S.transmissionMap,re=ve&&!!S.thicknessMap,z=!!S.gradientMap,K=!!S.alphaMap,de=S.alphaTest>0,ce=!!S.alphaHash,De=!!S.extensions;let ut=qn;S.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ut=i.toneMapping);const Ct={shaderID:ae,shaderType:S.type,shaderName:S.name,vertexShader:rt,fragmentShader:W,defines:S.defines,customVertexShaderID:ne,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Be,batchingColor:Be&&B._colorsTexture!==null,instancing:Le,instancingColor:Le&&B.instanceColor!==null,instancingMorph:Le&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Ji,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:He,envMap:_t,envMapMode:_t&&Z.mapping,envMapCubeUVHeight:G,aoMap:C,lightMap:jt,bumpMap:ze,normalMap:Ge,displacementMap:f&&Se,emissiveMap:ot,normalMapObjectSpace:Ge&&S.normalMapType===Mh,normalMapTangentSpace:Ge&&S.normalMapType===Gd,metalnessMap:xe,roughnessMap:T,anisotropy:v,anisotropyMap:le,clearcoat:N,clearcoatMap:fe,clearcoatNormalMap:We,clearcoatRoughnessMap:ee,dispersion:q,iridescence:$,iridescenceMap:pe,iridescenceThicknessMap:Te,sheen:H,sheenColorMap:Re,sheenRoughnessMap:me,specularMap:Ve,specularColorMap:Fe,specularIntensityMap:at,transmission:ve,transmissionMap:D,thicknessMap:re,gradientMap:z,opaque:S.transparent===!1&&S.blending===Vi&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:de,alphaHash:ce,combine:S.combine,mapUv:dt&&_(S.map.channel),aoMapUv:C&&_(S.aoMap.channel),lightMapUv:jt&&_(S.lightMap.channel),bumpMapUv:ze&&_(S.bumpMap.channel),normalMapUv:Ge&&_(S.normalMap.channel),displacementMapUv:Se&&_(S.displacementMap.channel),emissiveMapUv:ot&&_(S.emissiveMap.channel),metalnessMapUv:xe&&_(S.metalnessMap.channel),roughnessMapUv:T&&_(S.roughnessMap.channel),anisotropyMapUv:le&&_(S.anisotropyMap.channel),clearcoatMapUv:fe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(S.sheenRoughnessMap.channel),specularMapUv:Ve&&_(S.specularMap.channel),specularColorMapUv:Fe&&_(S.specularColorMap.channel),specularIntensityMapUv:at&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:re&&_(S.thicknessMap.channel),alphaMapUv:K&&_(S.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ge||v),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(dt||K),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ae,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Oe,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ut,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===tt,decodeVideoTextureEmissive:ot&&S.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(S.emissiveMap.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===kt,flipSided:S.side===It,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function h(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)x.push(L),x.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(b(x,S),E(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function b(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function E(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function M(S){const x=g[S.type];let L;if(x){const V=gn[x];L=pf.clone(V.uniforms)}else L=S.uniforms;return L}function P(S,x){let L;for(let V=0,B=d.length;V<B;V++){const Y=d[V];if(Y.cacheKey===x){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new X0(i,x,S,s),d.push(L)),L}function R(S){if(--S.usedTimes===0){const x=d.indexOf(S);d[x]=d[d.length-1],d.pop(),S.destroy()}}function w(S){l.remove(S)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:M,acquireProgram:P,releaseProgram:R,releaseShaderCache:w,programs:d,dispose:I}}function $0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Z0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Yc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u,f,m,g,_,p){let h=i[e];return h===void 0?(h={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[e]=h):(h.id=u.id,h.object=u,h.geometry=f,h.material=m,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=_,h.group=p),e++,h}function o(u,f,m,g,_,p){const h=a(u,f,m,g,_,p);m.transmission>0?n.push(h):m.transparent===!0?r.push(h):t.push(h)}function l(u,f,m,g,_,p){const h=a(u,f,m,g,_,p);m.transmission>0?n.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function c(u,f){t.length>1&&t.sort(u||Z0),n.length>1&&n.sort(f||Yc),r.length>1&&r.sort(f||Yc)}function d(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function J0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new jc,i.set(n,[a])):r>=s.length?(a=new jc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Q0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new ye};break;case"SpotLight":t={position:new A,direction:new A,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new A,halfWidth:new A,halfHeight:new A};break}return i[e.id]=t,t}}}function e_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let t_=0;function n_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function i_(i){const e=new Q0,t=e_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const r=new A,s=new Ye,a=new Ye;function o(c){let d=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let m=0,g=0,_=0,p=0,h=0,b=0,E=0,M=0,P=0,R=0,w=0;c.sort(n_);for(let S=0,x=c.length;S<x;S++){const L=c[S],V=L.color,B=L.intensity,Y=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=V.r*B,u+=V.g*B,f+=V.b*B;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],B);w++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=L.shadow.matrix,b++}n.directional[m]=X,m++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(V).multiplyScalar(B),X.distance=Y,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[_]=X;const Z=L.shadow;if(L.map&&(n.spotLightMap[P]=L.map,P++,Z.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[_]=Z.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=j,M++}_++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(V).multiplyScalar(B),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=X,p++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const Z=L.shadow,G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=L.shadow.matrix,E++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(B),X.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[h]=X,h++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==h||I.numDirectionalShadows!==b||I.numPointShadows!==E||I.numSpotShadows!==M||I.numSpotMaps!==P||I.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=h,I.numDirectionalShadows=b,I.numPointShadows=E,I.numSpotShadows=M,I.numSpotMaps=P,I.numLightProbes=w,n.version=t_++)}function l(c,d){let u=0,f=0,m=0,g=0,_=0;const p=d.matrixWorldInverse;for(let h=0,b=c.length;h<b;h++){const E=c[h];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),u++}else if(E.isSpotLight){const M=n.spot[m];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(E.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function $c(i){const e=new i_(i),t=[],n=[];function r(d){c.camera=d,t.length=0,n.length=0}function s(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function r_(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new $c(i),e.set(r,[o])):s>=a.length?(o=new $c(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function o_(i,e,t){let n=new nl;const r=new Ie,s=new Ie,a=new it,o=new wf({depthPacking:xh}),l=new Rf,c={},d=t.maxTextureSize,u={[Kn]:It,[It]:Kn,[kt]:kt},f=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:s_,fragmentShader:a_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rd;let h=this.type;this.render=function(R,w,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Xn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=h!==wn&&this.type===wn,Y=h===wn&&this.type!==wn;for(let j=0,X=R.length;j<X;j++){const Z=R[j],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const ae=G.getFrameExtents();if(r.multiply(ae),s.copy(G.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/ae.x),r.x=s.x*ae.x,G.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/ae.y),r.y=s.y*ae.y,G.mapSize.y=s.y)),G.map===null||B===!0||Y===!0){const Me=this.type!==wn?{minFilter:Yt,magFilter:Yt}:{};G.map!==null&&G.map.dispose(),G.map=new pi(r.x,r.y,Me),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const he=G.getViewportCount();for(let Me=0;Me<he;Me++){const Oe=G.getViewport(Me);a.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),V.viewport(a),G.updateMatrices(Z,Me),n=G.getFrustum(),M(w,I,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===wn&&b(G,I),G.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(S,x,L)};function b(R,w){const I=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new pi(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,I,f,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,I,m,_,null)}function E(R,w,I,S){let x=null;const L=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)x=L;else if(x=I.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=x.uuid,B=w.uuid;let Y=c[V];Y===void 0&&(Y={},c[V]=Y);let j=Y[B];j===void 0&&(j=x.clone(),Y[B]=j,w.addEventListener("dispose",P)),x=j}if(x.visible=w.visible,x.wireframe=w.wireframe,S===wn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:u[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const V=i.properties.get(x);V.light=I}return x}function M(R,w,I,S,x){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===wn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const B=e.update(R),Y=R.material;if(Array.isArray(Y)){const j=B.groups;for(let X=0,Z=j.length;X<Z;X++){const G=j[X],ae=Y[G.materialIndex];if(ae&&ae.visible){const he=E(R,ae,S,x);R.onBeforeShadow(i,R,w,I,B,he,G),i.renderBufferDirect(I,null,B,he,R,G),R.onAfterShadow(i,R,w,I,B,he,G)}}}else if(Y.visible){const j=E(R,Y,S,x);R.onBeforeShadow(i,R,w,I,B,j,null),i.renderBufferDirect(I,null,B,j,R,null),R.onAfterShadow(i,R,w,I,B,j,null)}}const V=R.children;for(let B=0,Y=V.length;B<Y;B++)M(V[B],w,I,S,x)}function P(R){R.target.removeEventListener("dispose",P);for(const I in c){const S=c[I],x=R.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const l_={[qa]:Ka,[Ya]:Za,[ja]:Ja,[Ki]:$a,[Ka]:qa,[Za]:Ya,[Ja]:ja,[$a]:Ki};function c_(i,e){function t(){let D=!1;const re=new it;let z=null;const K=new it(0,0,0,0);return{setMask:function(de){z!==de&&!D&&(i.colorMask(de,de,de,de),z=de)},setLocked:function(de){D=de},setClear:function(de,ce,De,ut,Ct){Ct===!0&&(de*=ut,ce*=ut,De*=ut),re.set(de,ce,De,ut),K.equals(re)===!1&&(i.clearColor(de,ce,De,ut),K.copy(re))},reset:function(){D=!1,z=null,K.set(-1,0,0,0)}}}function n(){let D=!1,re=!1,z=null,K=null,de=null;return{setReversed:function(ce){if(re!==ce){const De=e.get("EXT_clip_control");re?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ut=de;de=null,this.setClear(ut)}re=ce},getReversed:function(){return re},setTest:function(ce){ce?oe(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(ce){z!==ce&&!D&&(i.depthMask(ce),z=ce)},setFunc:function(ce){if(re&&(ce=l_[ce]),K!==ce){switch(ce){case qa:i.depthFunc(i.NEVER);break;case Ka:i.depthFunc(i.ALWAYS);break;case Ya:i.depthFunc(i.LESS);break;case Ki:i.depthFunc(i.LEQUAL);break;case ja:i.depthFunc(i.EQUAL);break;case $a:i.depthFunc(i.GEQUAL);break;case Za:i.depthFunc(i.GREATER);break;case Ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=ce}},setLocked:function(ce){D=ce},setClear:function(ce){de!==ce&&(re&&(ce=1-ce),i.clearDepth(ce),de=ce)},reset:function(){D=!1,z=null,K=null,de=null,re=!1}}}function r(){let D=!1,re=null,z=null,K=null,de=null,ce=null,De=null,ut=null,Ct=null;return{setTest:function(Ze){D||(Ze?oe(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Ze){re!==Ze&&!D&&(i.stencilMask(Ze),re=Ze)},setFunc:function(Ze,nn,xn){(z!==Ze||K!==nn||de!==xn)&&(i.stencilFunc(Ze,nn,xn),z=Ze,K=nn,de=xn)},setOp:function(Ze,nn,xn){(ce!==Ze||De!==nn||ut!==xn)&&(i.stencilOp(Ze,nn,xn),ce=Ze,De=nn,ut=xn)},setLocked:function(Ze){D=Ze},setClear:function(Ze){Ct!==Ze&&(i.clearStencil(Ze),Ct=Ze)},reset:function(){D=!1,re=null,z=null,K=null,de=null,ce=null,De=null,ut=null,Ct=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let d={},u={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,b=null,E=null,M=null,P=null,R=null,w=new ye(0,0,0),I=0,S=!1,x=null,L=null,V=null,B=null,Y=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Z=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=Z>=2);let ae=null,he={};const Me=i.getParameter(i.SCISSOR_BOX),Oe=i.getParameter(i.VIEWPORT),rt=new it().fromArray(Me),W=new it().fromArray(Oe);function ne(D,re,z,K){const de=new Uint8Array(4),ce=i.createTexture();i.bindTexture(D,ce),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<z;De++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(re+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return ce}const _e={};_e[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(i.DEPTH_TEST),a.setFunc(Ki),ze(!1),Ge(Bl),oe(i.CULL_FACE),C(Xn);function oe(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function Ae(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Le(D,re){return u[D]!==re?(i.bindFramebuffer(D,re),u[D]=re,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=re),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Be(D,re){let z=m,K=!1;if(D){z=f.get(re),z===void 0&&(z=[],f.set(re,z));const de=D.textures;if(z.length!==de.length||z[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,De=de.length;ce<De;ce++)z[ce]=i.COLOR_ATTACHMENT0+ce;z.length=de.length,K=!0}}else z[0]!==i.BACK&&(z[0]=i.BACK,K=!0);K&&i.drawBuffers(z)}function dt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const He={[li]:i.FUNC_ADD,[Ku]:i.FUNC_SUBTRACT,[Yu]:i.FUNC_REVERSE_SUBTRACT};He[ju]=i.MIN,He[$u]=i.MAX;const _t={[Zu]:i.ZERO,[Ju]:i.ONE,[Qu]:i.SRC_COLOR,[Wa]:i.SRC_ALPHA,[sh]:i.SRC_ALPHA_SATURATE,[ih]:i.DST_COLOR,[th]:i.DST_ALPHA,[eh]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[rh]:i.ONE_MINUS_DST_COLOR,[nh]:i.ONE_MINUS_DST_ALPHA,[ah]:i.CONSTANT_COLOR,[oh]:i.ONE_MINUS_CONSTANT_COLOR,[lh]:i.CONSTANT_ALPHA,[ch]:i.ONE_MINUS_CONSTANT_ALPHA};function C(D,re,z,K,de,ce,De,ut,Ct,Ze){if(D===Xn){_===!0&&(Ae(i.BLEND),_=!1);return}if(_===!1&&(oe(i.BLEND),_=!0),D!==qu){if(D!==p||Ze!==S){if((h!==li||M!==li)&&(i.blendEquation(i.FUNC_ADD),h=li,M=li),Ze)switch(D){case Vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,E=null,P=null,R=null,w.set(0,0,0),I=0,p=D,S=Ze}return}de=de||re,ce=ce||z,De=De||K,(re!==h||de!==M)&&(i.blendEquationSeparate(He[re],He[de]),h=re,M=de),(z!==b||K!==E||ce!==P||De!==R)&&(i.blendFuncSeparate(_t[z],_t[K],_t[ce],_t[De]),b=z,E=K,P=ce,R=De),(ut.equals(w)===!1||Ct!==I)&&(i.blendColor(ut.r,ut.g,ut.b,Ct),w.copy(ut),I=Ct),p=D,S=!1}function jt(D,re){D.side===kt?Ae(i.CULL_FACE):oe(i.CULL_FACE);let z=D.side===It;re&&(z=!z),ze(z),D.blending===Vi&&D.transparent===!1?C(Xn):C(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;o.setTest(K),K&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ot(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function Ge(D){D!==Hu?(oe(i.CULL_FACE),D!==L&&(D===Bl?i.cullFace(i.BACK):D===Wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),L=D}function Se(D){D!==V&&(X&&i.lineWidth(D),V=D)}function ot(D,re,z){D?(oe(i.POLYGON_OFFSET_FILL),(B!==re||Y!==z)&&(i.polygonOffset(re,z),B=re,Y=z)):Ae(i.POLYGON_OFFSET_FILL)}function xe(D){D?oe(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+j-1),ae!==D&&(i.activeTexture(D),ae=D)}function v(D,re,z){z===void 0&&(ae===null?z=i.TEXTURE0+j-1:z=ae);let K=he[z];K===void 0&&(K={type:void 0,texture:void 0},he[z]=K),(K.type!==D||K.texture!==re)&&(ae!==z&&(i.activeTexture(z),ae=z),i.bindTexture(D,re||_e[D]),K.type=D,K.texture=re)}function N(){const D=he[ae];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(D){rt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),rt.copy(D))}function me(D){W.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),W.copy(D))}function Ve(D,re){let z=c.get(re);z===void 0&&(z=new WeakMap,c.set(re,z));let K=z.get(D);K===void 0&&(K=i.getUniformBlockIndex(re,D.name),z.set(D,K))}function Fe(D,re){const K=c.get(re).get(D);l.get(re)!==K&&(i.uniformBlockBinding(re,K,D.__bindingPointIndex),l.set(re,K))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ae=null,he={},u={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,b=null,E=null,M=null,P=null,R=null,w=new ye(0,0,0),I=0,S=!1,x=null,L=null,V=null,B=null,Y=null,rt.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:oe,disable:Ae,bindFramebuffer:Le,drawBuffers:Be,useProgram:dt,setBlending:C,setMaterial:jt,setFlipSided:ze,setCullFace:Ge,setLineWidth:Se,setPolygonOffset:ot,setScissorTest:xe,activeTexture:T,bindTexture:v,unbindTexture:N,compressedTexImage2D:q,compressedTexImage3D:$,texImage2D:pe,texImage3D:Te,updateUBOMapping:Ve,uniformBlockBinding:Fe,texStorage2D:We,texStorage3D:ee,texSubImage2D:H,texSubImage3D:ve,compressedTexSubImage2D:le,compressedTexSubImage3D:fe,scissor:Re,viewport:me,reset:at}}function d_(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ie,d=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return m?new OffscreenCanvas(T,v):Lr("canvas")}function _(T,v,N){let q=1;const $=xe(T);if(($.width>N||$.height>N)&&(q=N/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const H=Math.floor(q*$.width),ve=Math.floor(q*$.height);u===void 0&&(u=g(H,ve));const le=v?g(H,ve):u;return le.width=H,le.height=ve,le.getContext("2d").drawImage(T,0,0,H,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+H+"x"+ve+")."),le}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function p(T){return T.generateMipmaps}function h(T){i.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,v,N,q,$=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let H=v;if(v===i.RED&&(N===i.FLOAT&&(H=i.R32F),N===i.HALF_FLOAT&&(H=i.R16F),N===i.UNSIGNED_BYTE&&(H=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(H=i.R8UI),N===i.UNSIGNED_SHORT&&(H=i.R16UI),N===i.UNSIGNED_INT&&(H=i.R32UI),N===i.BYTE&&(H=i.R8I),N===i.SHORT&&(H=i.R16I),N===i.INT&&(H=i.R32I)),v===i.RG&&(N===i.FLOAT&&(H=i.RG32F),N===i.HALF_FLOAT&&(H=i.RG16F),N===i.UNSIGNED_BYTE&&(H=i.RG8)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(H=i.RG8UI),N===i.UNSIGNED_SHORT&&(H=i.RG16UI),N===i.UNSIGNED_INT&&(H=i.RG32UI),N===i.BYTE&&(H=i.RG8I),N===i.SHORT&&(H=i.RG16I),N===i.INT&&(H=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(H=i.RGB8UI),N===i.UNSIGNED_SHORT&&(H=i.RGB16UI),N===i.UNSIGNED_INT&&(H=i.RGB32UI),N===i.BYTE&&(H=i.RGB8I),N===i.SHORT&&(H=i.RGB16I),N===i.INT&&(H=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),N===i.UNSIGNED_INT&&(H=i.RGBA32UI),N===i.BYTE&&(H=i.RGBA8I),N===i.SHORT&&(H=i.RGBA16I),N===i.INT&&(H=i.RGBA32I)),v===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),v===i.RGBA){const ve=$?Ds:Ke.getTransfer(q);N===i.FLOAT&&(H=i.RGBA32F),N===i.HALF_FLOAT&&(H=i.RGBA16F),N===i.UNSIGNED_BYTE&&(H=ve===tt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function M(T,v){let N;return T?v===null||v===fi||v===$i?N=i.DEPTH24_STENCIL8:v===_n?N=i.DEPTH32F_STENCIL8:v===Rr&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===fi||v===$i?N=i.DEPTH_COMPONENT24:v===_n?N=i.DEPTH_COMPONENT32F:v===Rr&&(N=i.DEPTH_COMPONENT16),N}function P(T,v){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Yt&&T.minFilter!==Et?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function R(T){const v=T.target;v.removeEventListener("dispose",R),I(v),v.isVideoTexture&&d.delete(v)}function w(T){const v=T.target;v.removeEventListener("dispose",w),x(v)}function I(T){const v=n.get(T);if(v.__webglInit===void 0)return;const N=T.source,q=f.get(N);if(q){const $=q[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(T),Object.keys(q).length===0&&f.delete(N)}n.remove(T)}function S(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const N=T.source,q=f.get(N);delete q[v.__cacheKey],a.memory.textures--}function x(T){const v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let $=0;$<v.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(v.__webglFramebuffer[q][$]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=T.textures;for(let q=0,$=N.length;q<$;q++){const H=n.get(N[q]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(N[q])}n.remove(T)}let L=0;function V(){L=0}function B(){const T=L;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function Y(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function j(T,v){const N=n.get(T);if(T.isVideoTexture&&Se(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(N,T,v);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function X(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){W(N,T,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function Z(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){W(N,T,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function G(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){ne(N,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const ae={[wr]:i.REPEAT,[Ot]:i.CLAMP_TO_EDGE,[to]:i.MIRRORED_REPEAT},he={[Yt]:i.NEAREST,[vh]:i.NEAREST_MIPMAP_NEAREST,[Gr]:i.NEAREST_MIPMAP_LINEAR,[Et]:i.LINEAR,[sa]:i.LINEAR_MIPMAP_NEAREST,[Rn]:i.LINEAR_MIPMAP_LINEAR},Me={[Sh]:i.NEVER,[Rh]:i.ALWAYS,[bh]:i.LESS,[Vd]:i.LEQUAL,[Eh]:i.EQUAL,[wh]:i.GEQUAL,[Th]:i.GREATER,[Ah]:i.NOTEQUAL};function Oe(T,v){if(v.type===_n&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Et||v.magFilter===sa||v.magFilter===Gr||v.magFilter===Rn||v.minFilter===Et||v.minFilter===sa||v.minFilter===Gr||v.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ae[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ae[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ae[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,he[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,he[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Yt||v.minFilter!==Gr&&v.minFilter!==Rn||v.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function rt(T,v){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));const q=v.source;let $=f.get(q);$===void 0&&($={},f.set(q,$));const H=Y(v);if(H!==T.__cacheKey){$[H]===void 0&&($[H]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),$[H].usedTimes++;const ve=$[T.__cacheKey];ve!==void 0&&($[T.__cacheKey].usedTimes--,ve.usedTimes===0&&S(v)),T.__cacheKey=H,T.__webglTexture=$[H].texture}return N}function W(T,v,N){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const $=rt(T,v),H=v.source;t.bindTexture(q,T.__webglTexture,i.TEXTURE0+N);const ve=n.get(H);if(H.version!==ve.__version||$===!0){t.activeTexture(i.TEXTURE0+N);const le=Ke.getPrimaries(Ke.workingColorSpace),fe=v.colorSpace===cn?null:Ke.getPrimaries(v.colorSpace),We=v.colorSpace===cn||le===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ee=_(v.image,!1,r.maxTextureSize);ee=ot(v,ee);const pe=s.convert(v.format,v.colorSpace),Te=s.convert(v.type);let Re=E(v.internalFormat,pe,Te,v.colorSpace,v.isVideoTexture);Oe(q,v);let me;const Ve=v.mipmaps,Fe=v.isVideoTexture!==!0,at=ve.__version===void 0||$===!0,D=H.dataReady,re=P(v,ee);if(v.isDepthTexture)Re=M(v.format===Zi,v.type),at&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,Re,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Re,ee.width,ee.height,0,pe,Te,null));else if(v.isDataTexture)if(Ve.length>0){Fe&&at&&t.texStorage2D(i.TEXTURE_2D,re,Re,Ve[0].width,Ve[0].height);for(let z=0,K=Ve.length;z<K;z++)me=Ve[z],Fe?D&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,me.width,me.height,pe,Te,me.data):t.texImage2D(i.TEXTURE_2D,z,Re,me.width,me.height,0,pe,Te,me.data);v.generateMipmaps=!1}else Fe?(at&&t.texStorage2D(i.TEXTURE_2D,re,Re,ee.width,ee.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,pe,Te,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Re,ee.width,ee.height,0,pe,Te,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Fe&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Re,Ve[0].width,Ve[0].height,ee.depth);for(let z=0,K=Ve.length;z<K;z++)if(me=Ve[z],v.format!==fn)if(pe!==null)if(Fe){if(D)if(v.layerUpdates.size>0){const de=Ac(me.width,me.height,v.format,v.type);for(const ce of v.layerUpdates){const De=me.data.subarray(ce*de/me.data.BYTES_PER_ELEMENT,(ce+1)*de/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,ce,me.width,me.height,1,pe,De)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,me.width,me.height,ee.depth,pe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,z,Re,me.width,me.height,ee.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,z,0,0,0,me.width,me.height,ee.depth,pe,Te,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,z,Re,me.width,me.height,ee.depth,0,pe,Te,me.data)}else{Fe&&at&&t.texStorage2D(i.TEXTURE_2D,re,Re,Ve[0].width,Ve[0].height);for(let z=0,K=Ve.length;z<K;z++)me=Ve[z],v.format!==fn?pe!==null?Fe?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,z,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,z,Re,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?D&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,me.width,me.height,pe,Te,me.data):t.texImage2D(i.TEXTURE_2D,z,Re,me.width,me.height,0,pe,Te,me.data)}else if(v.isDataArrayTexture)if(Fe){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Re,ee.width,ee.height,ee.depth),D)if(v.layerUpdates.size>0){const z=Ac(ee.width,ee.height,v.format,v.type);for(const K of v.layerUpdates){const de=ee.data.subarray(K*z/ee.data.BYTES_PER_ELEMENT,(K+1)*z/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,ee.width,ee.height,1,pe,Te,de)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,pe,Te,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ee.width,ee.height,ee.depth,0,pe,Te,ee.data);else if(v.isData3DTexture)Fe?(at&&t.texStorage3D(i.TEXTURE_3D,re,Re,ee.width,ee.height,ee.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,pe,Te,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ee.width,ee.height,ee.depth,0,pe,Te,ee.data);else if(v.isFramebufferTexture){if(at)if(Fe)t.texStorage2D(i.TEXTURE_2D,re,Re,ee.width,ee.height);else{let z=ee.width,K=ee.height;for(let de=0;de<re;de++)t.texImage2D(i.TEXTURE_2D,de,Re,z,K,0,pe,Te,null),z>>=1,K>>=1}}else if(Ve.length>0){if(Fe&&at){const z=xe(Ve[0]);t.texStorage2D(i.TEXTURE_2D,re,Re,z.width,z.height)}for(let z=0,K=Ve.length;z<K;z++)me=Ve[z],Fe?D&&t.texSubImage2D(i.TEXTURE_2D,z,0,0,pe,Te,me):t.texImage2D(i.TEXTURE_2D,z,Re,pe,Te,me);v.generateMipmaps=!1}else if(Fe){if(at){const z=xe(ee);t.texStorage2D(i.TEXTURE_2D,re,Re,z.width,z.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Te,ee)}else t.texImage2D(i.TEXTURE_2D,0,Re,pe,Te,ee);p(v)&&h(q),ve.__version=H.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ne(T,v,N){if(v.image.length!==6)return;const q=rt(T,v),$=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+N);const H=n.get($);if($.version!==H.__version||q===!0){t.activeTexture(i.TEXTURE0+N);const ve=Ke.getPrimaries(Ke.workingColorSpace),le=v.colorSpace===cn?null:Ke.getPrimaries(v.colorSpace),fe=v.colorSpace===cn||ve===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const We=v.isCompressedTexture||v.image[0].isCompressedTexture,ee=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let K=0;K<6;K++)!We&&!ee?pe[K]=_(v.image[K],!0,r.maxCubemapSize):pe[K]=ee?v.image[K].image:v.image[K],pe[K]=ot(v,pe[K]);const Te=pe[0],Re=s.convert(v.format,v.colorSpace),me=s.convert(v.type),Ve=E(v.internalFormat,Re,me,v.colorSpace),Fe=v.isVideoTexture!==!0,at=H.__version===void 0||q===!0,D=$.dataReady;let re=P(v,Te);Oe(i.TEXTURE_CUBE_MAP,v);let z;if(We){Fe&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,Ve,Te.width,Te.height);for(let K=0;K<6;K++){z=pe[K].mipmaps;for(let de=0;de<z.length;de++){const ce=z[de];v.format!==fn?Re!==null?Fe?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de,0,0,ce.width,ce.height,Re,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de,Ve,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de,0,0,ce.width,ce.height,Re,me,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de,Ve,ce.width,ce.height,0,Re,me,ce.data)}}}else{if(z=v.mipmaps,Fe&&at){z.length>0&&re++;const K=xe(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,Ve,K.width,K.height)}for(let K=0;K<6;K++)if(ee){Fe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,pe[K].width,pe[K].height,Re,me,pe[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,pe[K].width,pe[K].height,0,Re,me,pe[K].data);for(let de=0;de<z.length;de++){const De=z[de].image[K].image;Fe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de+1,0,0,De.width,De.height,Re,me,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de+1,Ve,De.width,De.height,0,Re,me,De.data)}}else{Fe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Re,me,pe[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,Re,me,pe[K]);for(let de=0;de<z.length;de++){const ce=z[de];Fe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de+1,0,0,Re,me,ce.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,de+1,Ve,Re,me,ce.image[K])}}}p(v)&&h(i.TEXTURE_CUBE_MAP),H.__version=$.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function _e(T,v,N,q,$,H){const ve=s.convert(N.format,N.colorSpace),le=s.convert(N.type),fe=E(N.internalFormat,ve,le,N.colorSpace),We=n.get(v),ee=n.get(N);if(ee.__renderTarget=v,!We.__hasExternalTextures){const pe=Math.max(1,v.width>>H),Te=Math.max(1,v.height>>H);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,H,fe,pe,Te,v.depth,0,ve,le,null):t.texImage2D($,H,fe,pe,Te,0,ve,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,ee.__webglTexture,0,ze(v)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,ee.__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(T,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const q=v.depthTexture,$=q&&q.isDepthTexture?q.type:null,H=M(v.stencilBuffer,$),ve=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=ze(v);Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,H,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,H,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,H,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,T)}else{const q=v.textures;for(let $=0;$<q.length;$++){const H=q[$],ve=s.convert(H.format,H.colorSpace),le=s.convert(H.type),fe=E(H.internalFormat,ve,le,H.colorSpace),We=ze(v);N&&Ge(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,fe,v.width,v.height):Ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,fe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,fe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const $=q.__webglTexture,H=ze(v);if(v.depthTexture.format===Hi)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(v.depthTexture.format===Zi)Ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Le(T){const v=n.get(T),N=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const $=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),v.__depthDisposeCallback=$}v.__boundDepthTexture=q}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ae(v.__webglFramebuffer,T)}else if(N){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),oe(v.__webglDepthbuffer[q],T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,H)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),oe(v.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,$)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(T,v,N){const q=n.get(T);v!==void 0&&_e(q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Le(T)}function dt(T){const v=T.texture,N=n.get(T),q=n.get(v);T.addEventListener("dispose",w);const $=T.textures,H=T.isWebGLCubeRenderTarget===!0,ve=$.length>1;if(ve||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,a.memory.textures++),H){N.__webglFramebuffer=[];for(let le=0;le<6;le++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[le]=[];for(let fe=0;fe<v.mipmaps.length;fe++)N.__webglFramebuffer[le][fe]=i.createFramebuffer()}else N.__webglFramebuffer[le]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let le=0;le<v.mipmaps.length;le++)N.__webglFramebuffer[le]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ve)for(let le=0,fe=$.length;le<fe;le++){const We=n.get($[le]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Ge(T)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let le=0;le<$.length;le++){const fe=$[le];N.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[le]);const We=s.convert(fe.format,fe.colorSpace),ee=s.convert(fe.type),pe=E(fe.internalFormat,We,ee,fe.colorSpace,T.isXRRenderTarget===!0),Te=ze(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,pe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,N.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),oe(N.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Oe(i.TEXTURE_CUBE_MAP,v);for(let le=0;le<6;le++)if(v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)_e(N.__webglFramebuffer[le][fe],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,fe);else _e(N.__webglFramebuffer[le],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);p(v)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let le=0,fe=$.length;le<fe;le++){const We=$[le],ee=n.get(We);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Oe(i.TEXTURE_2D,We),_e(N.__webglFramebuffer,T,We,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,0),p(We)&&h(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,q.__webglTexture),Oe(le,v),v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)_e(N.__webglFramebuffer[fe],T,v,i.COLOR_ATTACHMENT0,le,fe);else _e(N.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,le,0);p(v)&&h(le),t.unbindTexture()}T.depthBuffer&&Le(T)}function He(T){const v=T.textures;for(let N=0,q=v.length;N<q;N++){const $=v[N];if(p($)){const H=b(T),ve=n.get($).__webglTexture;t.bindTexture(H,ve),h(H),t.unbindTexture()}}}const _t=[],C=[];function jt(T){if(T.samples>0){if(Ge(T)===!1){const v=T.textures,N=T.width,q=T.height;let $=i.COLOR_BUFFER_BIT;const H=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(T),le=v.length>1;if(le)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[fe]);const We=n.get(v[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,N,q,0,0,N,q,$,i.NEAREST),l===!0&&(_t.length=0,C.length=0,_t.push(i.COLOR_ATTACHMENT0+fe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(_t.push(H),C.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ve.__webglColorRenderbuffer[fe]);const We=n.get(v[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ze(T){return Math.min(r.maxSamples,T.samples)}function Ge(T){const v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Se(T){const v=a.render.frame;d.get(T)!==v&&(d.set(T,v),T.update())}function ot(T,v){const N=T.colorSpace,q=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==Ji&&N!==cn&&(Ke.getTransfer(N)===tt?(q!==fn||$!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function xe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=Be,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ge}function u_(i,e){function t(n,r=cn){let s;const a=Ke.getTransfer(r);if(n===Un)return i.UNSIGNED_BYTE;if(n===Yo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===jo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ud)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Id)return i.BYTE;if(n===Dd)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===Ko)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Fr)return i.HALF_FLOAT;if(n===Fd)return i.ALPHA;if(n===Nd)return i.RGB;if(n===fn)return i.RGBA;if(n===kd)return i.LUMINANCE;if(n===Od)return i.LUMINANCE_ALPHA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===Bd)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===Qo)return i.RGBA_INTEGER;if(n===Ms||n===Ss||n===bs||n===Es)if(a===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ms)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ms)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ss)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===no||n===io||n===ro||n===so)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===no)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===io)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===so)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ao||n===oo||n===lo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ao||n===oo)return a===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===lo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===co||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===yo||n===xo||n===Mo||n===So||n===bo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===co)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_o)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===So)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bo)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ts||n===Eo||n===To)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ts)return a===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===To)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zd||n===Ao||n===wo||n===Ro)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ts)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ao)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ro)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const h_={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),h=this._getHandJoint(c,_);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(h_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const f_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class m_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Rt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new pn({vertexShader:f_,fragmentShader:p_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class g_ extends nr{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,m=null,g=null;const _=new m_,p=t.getContextAttributes();let h=null,b=null;const E=[],M=[],P=new Ie;let R=null;const w=new Kt;w.viewport=new it;const I=new Kt;I.viewport=new it;const S=[w,I],x=new Ff;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ne=E[W];return ne===void 0&&(ne=new Na,E[W]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(W){let ne=E[W];return ne===void 0&&(ne=new Na,E[W]=ne),ne.getGripSpace()},this.getHand=function(W){let ne=E[W];return ne===void 0&&(ne=new Na,E[W]=ne),ne.getHandSpace()};function B(W){const ne=M.indexOf(W.inputSource);if(ne===-1)return;const _e=E[ne];_e!==void 0&&(_e.update(W.inputSource,W.frame,c||a),_e.dispatchEvent({type:W.type,data:W.inputSource}))}function Y(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",j);for(let W=0;W<E.length;W++){const ne=M[W];ne!==null&&(M[W]=null,E[W].disconnect(ne))}L=null,V=null,_.reset(),e.setRenderTarget(h),m=null,f=null,u=null,r=null,b=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),r.enabledFeatures!==void 0&&r.enabledFeatures.includes("layers")){let _e=null,oe=null,Ae=null;p.depth&&(Ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=p.stencil?Zi:Hi,oe=p.stencil?$i:fi);const Le={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(Le),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new pi(f.textureWidth,f.textureHeight,{format:fn,type:Un,depthTexture:new eu(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const _e={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,_e),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new pi(m.framebufferWidth,m.framebufferHeight,{format:fn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),rt.setContext(r),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(W){for(let ne=0;ne<W.removed.length;ne++){const _e=W.removed[ne],oe=M.indexOf(_e);oe>=0&&(M[oe]=null,E[oe].disconnect(_e))}for(let ne=0;ne<W.added.length;ne++){const _e=W.added[ne];let oe=M.indexOf(_e);if(oe===-1){for(let Le=0;Le<E.length;Le++)if(Le>=M.length){M.push(_e),oe=Le;break}else if(M[Le]===null){M[Le]=_e,oe=Le;break}if(oe===-1)break}const Ae=E[oe];Ae&&Ae.connect(_e)}}const X=new A,Z=new A;function G(W,ne,_e){X.setFromMatrixPosition(ne.matrixWorld),Z.setFromMatrixPosition(_e.matrixWorld);const oe=X.distanceTo(Z),Ae=ne.projectionMatrix.elements,Le=_e.projectionMatrix.elements,Be=Ae[14]/(Ae[10]-1),dt=Ae[14]/(Ae[10]+1),He=(Ae[9]+1)/Ae[5],_t=(Ae[9]-1)/Ae[5],C=(Ae[8]-1)/Ae[0],jt=(Le[8]+1)/Le[0],ze=Be*C,Ge=Be*jt,Se=oe/(-C+jt),ot=Se*-C;if(ne.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ot),W.translateZ(Se),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ae[10]===-1)W.projectionMatrix.copy(ne.projectionMatrix),W.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const xe=Be+Se,T=dt+Se,v=ze-ot,N=Ge+(oe-ot),q=He*dt/T*xe,$=_t*dt/T*xe;W.projectionMatrix.makePerspective(v,N,q,$,xe,T),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ae(W,ne){ne===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ne.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let ne=W.near,_e=W.far;_.texture!==null&&(_.depthNear>0&&(ne=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),x.near=I.near=w.near=ne,x.far=I.far=w.far=_e,(L!==x.near||V!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),L=x.near,V=x.far),w.layers.mask=W.layers.mask|2,I.layers.mask=W.layers.mask|4,x.layers.mask=w.layers.mask|I.layers.mask;const oe=W.parent,Ae=x.cameras;ae(x,oe);for(let Le=0;Le<Ae.length;Le++)ae(Ae[Le],oe);Ae.length===2?G(x,w,I):x.projectionMatrix.copy(w.projectionMatrix),he(W,x,oe)};function he(W,ne,_e){_e===null?W.matrix.copy(ne.matrixWorld):(W.matrix.copy(_e.matrixWorld),W.matrix.invert(),W.matrix.multiply(ne.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ne.projectionMatrix),W.projectionMatrixInverse.copy(ne.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Cr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let Me=null;function Oe(W,ne){if(d=ne.getViewerPose(c||a),g=ne,d!==null){const _e=d.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let oe=!1;_e.length!==x.cameras.length&&(x.cameras.length=0,oe=!0);for(let Le=0;Le<_e.length;Le++){const Be=_e[Le];let dt=null;if(m!==null)dt=m.getViewport(Be);else{const _t=u.getViewSubImage(f,Be);dt=_t.viewport,Le===0&&(e.setRenderTargetTextures(b,_t.colorTexture,f.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(b))}let He=S[Le];He===void 0&&(He=new Kt,He.layers.enable(Le),He.viewport=new it,S[Le]=He),He.matrix.fromArray(Be.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Be.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(dt.x,dt.y,dt.width,dt.height),Le===0&&(x.matrix.copy(He.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),oe===!0&&x.cameras.push(He)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){const Le=u.getDepthInformation(_e[0]);Le&&Le.isValid&&Le.texture&&_.init(e,Le,r.renderState)}}for(let _e=0;_e<E.length;_e++){const oe=M[_e],Ae=E[_e];oe!==null&&Ae!==void 0&&Ae.update(oe,ne,c||a)}Me&&Me(W,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const rt=new su;rt.setAnimationLoop(Oe),this.setAnimationLoop=function(W){Me=W},this.dispose=function(){}}}const si=new tn,__=new Ye;function v_(i,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,jd(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,b,E,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),u(p,h)):h.isMeshPhongMaterial?(s(p,h),d(p,h)):h.isMeshStandardMaterial?(s(p,h),f(p,h),h.isMeshPhysicalMaterial&&m(p,h,M)):h.isMeshMatcapMaterial?(s(p,h),g(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),_(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,b,E):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===It&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===It&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const b=e.get(h),E=b.envMap,M=b.envMapRotation;E&&(p.envMap.value=E,si.copy(M),si.x*=-1,si.y*=-1,si.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),p.envMapRotation.value.setFromMatrix4(__.makeRotationFromEuler(si)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,b,E){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*b,p.scale.value=E*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function d(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function u(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,b){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===It&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function _(p,h){const b=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function y_(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const M=E.program;n.uniformBlockBinding(b,M)}function c(b,E){let M=r[b.id];M===void 0&&(g(b),M=d(b),r[b.id]=M,b.addEventListener("dispose",p));const P=E.program;n.updateUBOMapping(b,P);const R=e.render.frame;s[b.id]!==R&&(f(b),s[b.id]=R)}function d(b){const E=u();b.__bindingPointIndex=E;const M=i.createBuffer(),P=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const E=r[b.id],M=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,w=M.length;R<w;R++){const I=Array.isArray(M[R])?M[R]:[M[R]];for(let S=0,x=I.length;S<x;S++){const L=I[S];if(m(L,R,S,P)===!0){const V=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let j=0;j<B.length;j++){const X=B[j],Z=_(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,V+Y,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,Y),Y+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,E,M,P){const R=b.value,w=E+"_"+M;if(P[w]===void 0)return typeof R=="number"||typeof R=="boolean"?P[w]=R:P[w]=R.clone(),!0;{const I=P[w];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return P[w]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(b){const E=b.uniforms;let M=0;const P=16;for(let w=0,I=E.length;w<I;w++){const S=Array.isArray(E[w])?E[w]:[E[w]];for(let x=0,L=S.length;x<L;x++){const V=S[x],B=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,j=B.length;Y<j;Y++){const X=B[Y],Z=_(X),G=M%P,ae=G%Z.boundary,he=G+ae;M+=ae,he!==0&&P-he<Z.storage&&(M+=P-he),V.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=Z.storage}}}const R=M%P;return R>0&&(M+=P-R),b.__size=M,b.__cache={},this}function _(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function p(b){const E=b.target;E.removeEventListener("dispose",p);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function h(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class x_{constructor(e={}){const{canvas:t=qh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,h=null;const b=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this.toneMapping=qn,this.toneMappingExposure=1;const M=this;let P=!1,R=0,w=0,I=null,S=-1,x=null;const L=new it,V=new it;let B=null;const Y=new ye(0);let j=0,X=t.width,Z=t.height,G=1,ae=null,he=null;const Me=new it(0,0,X,Z),Oe=new it(0,0,X,Z);let rt=!1;const W=new nl;let ne=!1,_e=!1;this.transmissionResolutionScale=1;const oe=new Ye,Ae=new Ye,Le=new A,Be=new it,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function _t(){return I===null?G:1}let C=n;function jt(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",ce,!1),C===null){const U="webgl2";if(C=jt(U,y),C===null)throw jt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ze,Ge,Se,ot,xe,T,v,N,q,$,H,ve,le,fe,We,ee,pe,Te,Re,me,Ve,Fe,at,D;function re(){ze=new Cg(C),ze.init(),Fe=new u_(C,ze),Ge=new bg(C,ze,e,Fe),Se=new c_(C,ze),Ge.reverseDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),ot=new Ig(C),xe=new $0,T=new d_(C,ze,Se,xe,Ge,Fe,ot),v=new Tg(M),N=new Rg(M),q=new Bf(C),at=new Mg(C,q),$=new Lg(C,q,ot,at),H=new Ug(C,$,q,ot),Re=new Dg(C,Ge,T),ee=new Eg(xe),ve=new j0(M,v,N,ze,Ge,at,ee),le=new v_(M,xe),fe=new J0,We=new r_(ze),Te=new xg(M,v,N,Se,H,m,l),pe=new o_(M,H,Ge),D=new y_(C,ot,Ge,Se),me=new Sg(C,ze,ot),Ve=new Pg(C,ze,ot),ot.programs=ve.programs,M.capabilities=Ge,M.extensions=ze,M.properties=xe,M.renderLists=fe,M.shadowMap=pe,M.state=Se,M.info=ot}re();const z=new g_(M,C);this.xr=z,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(X,Z,!1))},this.getSize=function(y){return y.set(X,Z)},this.setSize=function(y,U,k=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,Z=U,t.width=Math.floor(y*G),t.height=Math.floor(U*G),k===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(X*G,Z*G).floor()},this.setDrawingBufferSize=function(y,U,k){X=y,Z=U,G=k,t.width=Math.floor(y*k),t.height=Math.floor(U*k),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(Me)},this.setViewport=function(y,U,k,O){y.isVector4?Me.set(y.x,y.y,y.z,y.w):Me.set(y,U,k,O),Se.viewport(L.copy(Me).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(Oe)},this.setScissor=function(y,U,k,O){y.isVector4?Oe.set(y.x,y.y,y.z,y.w):Oe.set(y,U,k,O),Se.scissor(V.copy(Oe).multiplyScalar(G).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(y){Se.setScissorTest(rt=y)},this.setOpaqueSort=function(y){ae=y},this.setTransparentSort=function(y){he=y},this.getClearColor=function(y){return y.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor.apply(Te,arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha.apply(Te,arguments)},this.clear=function(y=!0,U=!0,k=!0){let O=0;if(y){let F=!1;if(I!==null){const J=I.texture.format;F=J===Qo||J===Jo||J===Zo}if(F){const J=I.texture.type,se=J===Un||J===fi||J===Rr||J===$i||J===Yo||J===jo,ue=Te.getClearColor(),ge=Te.getClearAlpha(),Ce=ue.r,Pe=ue.g,be=ue.b;se?(g[0]=Ce,g[1]=Pe,g[2]=be,g[3]=ge,C.clearBufferuiv(C.COLOR,0,g)):(_[0]=Ce,_[1]=Pe,_[2]=be,_[3]=ge,C.clearBufferiv(C.COLOR,0,_))}else O|=C.COLOR_BUFFER_BIT}U&&(O|=C.DEPTH_BUFFER_BIT),k&&(O|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),Te.dispose(),fe.dispose(),We.dispose(),xe.dispose(),v.dispose(),N.dispose(),H.dispose(),at.dispose(),D.dispose(),ve.dispose(),z.dispose(),z.removeEventListener("sessionstart",Il),z.removeEventListener("sessionend",Dl),Jn.stop()};function K(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const y=ot.autoReset,U=pe.enabled,k=pe.autoUpdate,O=pe.needsUpdate,F=pe.type;re(),ot.autoReset=y,pe.enabled=U,pe.autoUpdate=k,pe.needsUpdate=O,pe.type=F}function ce(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function De(y){const U=y.target;U.removeEventListener("dispose",De),ut(U)}function ut(y){Ct(y),xe.remove(y)}function Ct(y){const U=xe.get(y).programs;U!==void 0&&(U.forEach(function(k){ve.releaseProgram(k)}),y.isShaderMaterial&&ve.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,k,O,F,J){U===null&&(U=dt);const se=F.isMesh&&F.matrixWorld.determinant()<0,ue=ku(y,U,k,O,F);Se.setMaterial(O,se);let ge=k.index,Ce=1;if(O.wireframe===!0){if(ge=$.getWireframeAttribute(k),ge===void 0)return;Ce=2}const Pe=k.drawRange,be=k.attributes.position;let Xe=Pe.start*Ce,je=(Pe.start+Pe.count)*Ce;J!==null&&(Xe=Math.max(Xe,J.start*Ce),je=Math.min(je,(J.start+J.count)*Ce)),ge!==null?(Xe=Math.max(Xe,0),je=Math.min(je,ge.count)):be!=null&&(Xe=Math.max(Xe,0),je=Math.min(je,be.count));const vt=je-Xe;if(vt<0||vt===1/0)return;at.setup(F,O,ue,k,ge);let ht,qe=me;if(ge!==null&&(ht=q.get(ge),qe=Ve,qe.setIndex(ht)),F.isMesh)O.wireframe===!0?(Se.setLineWidth(O.wireframeLinewidth*_t()),qe.setMode(C.LINES)):qe.setMode(C.TRIANGLES);else if(F.isLine){let Ee=O.linewidth;Ee===void 0&&(Ee=1),Se.setLineWidth(Ee*_t()),F.isLineSegments?qe.setMode(C.LINES):F.isLineLoop?qe.setMode(C.LINE_LOOP):qe.setMode(C.LINE_STRIP)}else F.isPoints?qe.setMode(C.POINTS):F.isSprite&&qe.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)qe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))qe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ee=F._multiDrawStarts,At=F._multiDrawCounts,$e=F._multiDrawCount,rn=ge?q.get(ge).bytesPerElement:1,xi=xe.get(O).currentProgram.getUniforms();for(let Ht=0;Ht<$e;Ht++)xi.setValue(C,"_gl_DrawID",Ht),qe.render(Ee[Ht]/rn,At[Ht])}else if(F.isInstancedMesh)qe.renderInstances(Xe,vt,F.count);else if(k.isInstancedBufferGeometry){const Ee=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,At=Math.min(k.instanceCount,Ee);qe.renderInstances(Xe,vt,At)}else qe.render(Xe,vt)};function Ze(y,U,k){y.transparent===!0&&y.side===kt&&y.forceSinglePass===!1?(y.side=It,y.needsUpdate=!0,zr(y,U,k),y.side=Kn,y.needsUpdate=!0,zr(y,U,k),y.side=kt):zr(y,U,k)}this.compile=function(y,U,k=null){k===null&&(k=y),h=We.get(k),h.init(U),E.push(h),k.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),y!==k&&y.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),h.setupLights();const O=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const J=F.material;if(J)if(Array.isArray(J))for(let se=0;se<J.length;se++){const ue=J[se];Ze(ue,k,F),O.add(ue)}else Ze(J,k,F),O.add(J)}),E.pop(),h=null,O},this.compileAsync=function(y,U,k=null){const O=this.compile(y,U,k);return new Promise(F=>{function J(){if(O.forEach(function(se){xe.get(se).currentProgram.isReady()&&O.delete(se)}),O.size===0){F(y);return}setTimeout(J,10)}ze.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let nn=null;function xn(y){nn&&nn(y)}function Il(){Jn.stop()}function Dl(){Jn.start()}const Jn=new su;Jn.setAnimationLoop(xn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(y){nn=y,z.setAnimationLoop(y),y===null?Jn.stop():Jn.start()},z.addEventListener("sessionstart",Il),z.addEventListener("sessionend",Dl),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(U),U=z.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,U,I),h=We.get(y,E.length),h.init(U),E.push(h),Ae.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),W.setFromProjectionMatrix(Ae),_e=this.localClippingEnabled,ne=ee.init(this.clippingPlanes,_e),p=fe.get(y,b.length),p.init(),b.push(p),z.enabled===!0&&z.isPresenting===!0){const J=M.xr.getDepthSensingMesh();J!==null&&ia(J,U,-1/0,M.sortObjects)}ia(y,U,0,M.sortObjects),p.finish(),M.sortObjects===!0&&p.sort(ae,he),He=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,He&&Te.addToRenderList(p,y),this.info.render.frame++,ne===!0&&ee.beginShadows();const k=h.state.shadowsArray;pe.render(k,y,U),ne===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=p.opaque,F=p.transmissive;if(h.setupLights(),U.isArrayCamera){const J=U.cameras;if(F.length>0)for(let se=0,ue=J.length;se<ue;se++){const ge=J[se];Fl(O,F,y,ge)}He&&Te.render(y);for(let se=0,ue=J.length;se<ue;se++){const ge=J[se];Ul(p,y,ge,ge.viewport)}}else F.length>0&&Fl(O,F,y,U),He&&Te.render(y),Ul(p,y,U);I!==null&&w===0&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(M,y,U),at.resetDefaultState(),S=-1,x=null,E.pop(),E.length>0?(h=E[E.length-1],ne===!0&&ee.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function ia(y,U,k,O){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)k=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)h.pushLight(y),y.castShadow&&h.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||W.intersectsSprite(y)){O&&Be.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ae);const se=H.update(y),ue=y.material;ue.visible&&p.push(y,se,ue,k,Be.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||W.intersectsObject(y))){const se=H.update(y),ue=y.material;if(O&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Be.copy(y.boundingSphere.center)):(se.boundingSphere===null&&se.computeBoundingSphere(),Be.copy(se.boundingSphere.center)),Be.applyMatrix4(y.matrixWorld).applyMatrix4(Ae)),Array.isArray(ue)){const ge=se.groups;for(let Ce=0,Pe=ge.length;Ce<Pe;Ce++){const be=ge[Ce],Xe=ue[be.materialIndex];Xe&&Xe.visible&&p.push(y,se,Xe,k,Be.z,be)}}else ue.visible&&p.push(y,se,ue,k,Be.z,null)}}const J=y.children;for(let se=0,ue=J.length;se<ue;se++)ia(J[se],U,k,O)}function Ul(y,U,k,O){const F=y.opaque,J=y.transmissive,se=y.transparent;h.setupLightsView(k),ne===!0&&ee.setGlobalState(M.clippingPlanes,k),O&&Se.viewport(L.copy(O)),F.length>0&&Br(F,U,k),J.length>0&&Br(J,U,k),se.length>0&&Br(se,U,k),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Fl(y,U,k,O){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[O.id]===void 0&&(h.state.transmissionRenderTarget[O.id]=new pi(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Fr:Un,minFilter:Rn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const J=h.state.transmissionRenderTarget[O.id],se=O.viewport||L;J.setSize(se.z*M.transmissionResolutionScale,se.w*M.transmissionResolutionScale);const ue=M.getRenderTarget();M.setRenderTarget(J),M.getClearColor(Y),j=M.getClearAlpha(),j<1&&M.setClearColor(16777215,.5),M.clear(),He&&Te.render(k);const ge=M.toneMapping;M.toneMapping=qn;const Ce=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),h.setupLightsView(O),ne===!0&&ee.setGlobalState(M.clippingPlanes,O),Br(y,k,O),T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let be=0,Xe=U.length;be<Xe;be++){const je=U[be],vt=je.object,ht=je.geometry,qe=je.material,Ee=je.group;if(qe.side===kt&&vt.layers.test(O.layers)){const At=qe.side;qe.side=It,qe.needsUpdate=!0,Nl(vt,k,O,ht,qe,Ee),qe.side=At,qe.needsUpdate=!0,Pe=!0}}Pe===!0&&(T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J))}M.setRenderTarget(ue),M.setClearColor(Y,j),Ce!==void 0&&(O.viewport=Ce),M.toneMapping=ge}function Br(y,U,k){const O=U.isScene===!0?U.overrideMaterial:null;for(let F=0,J=y.length;F<J;F++){const se=y[F],ue=se.object,ge=se.geometry,Ce=O===null?se.material:O,Pe=se.group;ue.layers.test(k.layers)&&Nl(ue,U,k,ge,Ce,Pe)}}function Nl(y,U,k,O,F,J){y.onBeforeRender(M,U,k,O,F,J),y.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(M,U,k,O,y,J),F.transparent===!0&&F.side===kt&&F.forceSinglePass===!1?(F.side=It,F.needsUpdate=!0,M.renderBufferDirect(k,U,O,F,y,J),F.side=Kn,F.needsUpdate=!0,M.renderBufferDirect(k,U,O,F,y,J),F.side=kt):M.renderBufferDirect(k,U,O,F,y,J),y.onAfterRender(M,U,k,O,F,J)}function zr(y,U,k){U.isScene!==!0&&(U=dt);const O=xe.get(y),F=h.state.lights,J=h.state.shadowsArray,se=F.state.version,ue=ve.getParameters(y,F.state,J,U,k),ge=ve.getProgramCacheKey(ue);let Ce=O.programs;O.environment=y.isMeshStandardMaterial?U.environment:null,O.fog=U.fog,O.envMap=(y.isMeshStandardMaterial?N:v).get(y.envMap||O.environment),O.envMapRotation=O.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ce===void 0&&(y.addEventListener("dispose",De),Ce=new Map,O.programs=Ce);let Pe=Ce.get(ge);if(Pe!==void 0){if(O.currentProgram===Pe&&O.lightsStateVersion===se)return Ol(y,ue),Pe}else ue.uniforms=ve.getUniforms(y),y.onBeforeCompile(ue,M),Pe=ve.acquireProgram(ue,ge),Ce.set(ge,Pe),O.uniforms=ue.uniforms;const be=O.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(be.clippingPlanes=ee.uniform),Ol(y,ue),O.needsLights=Bu(y),O.lightsStateVersion=se,O.needsLights&&(be.ambientLightColor.value=F.state.ambient,be.lightProbe.value=F.state.probe,be.directionalLights.value=F.state.directional,be.directionalLightShadows.value=F.state.directionalShadow,be.spotLights.value=F.state.spot,be.spotLightShadows.value=F.state.spotShadow,be.rectAreaLights.value=F.state.rectArea,be.ltc_1.value=F.state.rectAreaLTC1,be.ltc_2.value=F.state.rectAreaLTC2,be.pointLights.value=F.state.point,be.pointLightShadows.value=F.state.pointShadow,be.hemisphereLights.value=F.state.hemi,be.directionalShadowMap.value=F.state.directionalShadowMap,be.directionalShadowMatrix.value=F.state.directionalShadowMatrix,be.spotShadowMap.value=F.state.spotShadowMap,be.spotLightMatrix.value=F.state.spotLightMatrix,be.spotLightMap.value=F.state.spotLightMap,be.pointShadowMap.value=F.state.pointShadowMap,be.pointShadowMatrix.value=F.state.pointShadowMatrix),O.currentProgram=Pe,O.uniformsList=null,Pe}function kl(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=As.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Ol(y,U){const k=xe.get(y);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function ku(y,U,k,O,F){U.isScene!==!0&&(U=dt),T.resetTextureUnits();const J=U.fog,se=O.isMeshStandardMaterial?U.environment:null,ue=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ji,ge=(O.isMeshStandardMaterial?N:v).get(O.envMap||se),Ce=O.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Pe=!!k.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),be=!!k.morphAttributes.position,Xe=!!k.morphAttributes.normal,je=!!k.morphAttributes.color;let vt=qn;O.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(vt=M.toneMapping);const ht=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,qe=ht!==void 0?ht.length:0,Ee=xe.get(O),At=h.state.lights;if(ne===!0&&(_e===!0||y!==x)){const Dt=y===x&&O.id===S;ee.setState(O,y,Dt)}let $e=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==At.state.version||Ee.outputColorSpace!==ue||F.isBatchedMesh&&Ee.batching===!1||!F.isBatchedMesh&&Ee.batching===!0||F.isBatchedMesh&&Ee.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ee.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ee.instancing===!1||!F.isInstancedMesh&&Ee.instancing===!0||F.isSkinnedMesh&&Ee.skinning===!1||!F.isSkinnedMesh&&Ee.skinning===!0||F.isInstancedMesh&&Ee.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ee.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ee.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ee.instancingMorph===!1&&F.morphTexture!==null||Ee.envMap!==ge||O.fog===!0&&Ee.fog!==J||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Ce||Ee.vertexTangents!==Pe||Ee.morphTargets!==be||Ee.morphNormals!==Xe||Ee.morphColors!==je||Ee.toneMapping!==vt||Ee.morphTargetsCount!==qe)&&($e=!0):($e=!0,Ee.__version=O.version);let rn=Ee.currentProgram;$e===!0&&(rn=zr(O,U,F));let xi=!1,Ht=!1,or=!1;const lt=rn.getUniforms(),$t=Ee.uniforms;if(Se.useProgram(rn.program)&&(xi=!0,Ht=!0,or=!0),O.id!==S&&(S=O.id,Ht=!0),xi||x!==y){Se.buffers.depth.getReversed()?(oe.copy(y.projectionMatrix),Yh(oe),jh(oe),lt.setValue(C,"projectionMatrix",oe)):lt.setValue(C,"projectionMatrix",y.projectionMatrix),lt.setValue(C,"viewMatrix",y.matrixWorldInverse);const Gt=lt.map.cameraPosition;Gt!==void 0&&Gt.setValue(C,Le.setFromMatrixPosition(y.matrixWorld)),Ge.logarithmicDepthBuffer&&lt.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&lt.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),x!==y&&(x=y,Ht=!0,or=!0)}if(F.isSkinnedMesh){lt.setOptional(C,F,"bindMatrix"),lt.setOptional(C,F,"bindMatrixInverse");const Dt=F.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),lt.setValue(C,"boneTexture",Dt.boneTexture,T))}F.isBatchedMesh&&(lt.setOptional(C,F,"batchingTexture"),lt.setValue(C,"batchingTexture",F._matricesTexture,T),lt.setOptional(C,F,"batchingIdTexture"),lt.setValue(C,"batchingIdTexture",F._indirectTexture,T),lt.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&lt.setValue(C,"batchingColorTexture",F._colorsTexture,T));const Zt=k.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0)&&Re.update(F,k,rn),(Ht||Ee.receiveShadow!==F.receiveShadow)&&(Ee.receiveShadow=F.receiveShadow,lt.setValue(C,"receiveShadow",F.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&($t.envMap.value=ge,$t.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&U.environment!==null&&($t.envMapIntensity.value=U.environmentIntensity),Ht&&(lt.setValue(C,"toneMappingExposure",M.toneMappingExposure),Ee.needsLights&&Ou($t,or),J&&O.fog===!0&&le.refreshFogUniforms($t,J),le.refreshMaterialUniforms($t,O,G,Z,h.state.transmissionRenderTarget[y.id]),As.upload(C,kl(Ee),$t,T)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(As.upload(C,kl(Ee),$t,T),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&lt.setValue(C,"center",F.center),lt.setValue(C,"modelViewMatrix",F.modelViewMatrix),lt.setValue(C,"normalMatrix",F.normalMatrix),lt.setValue(C,"modelMatrix",F.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Dt=O.uniformsGroups;for(let Gt=0,ra=Dt.length;Gt<ra;Gt++){const Qn=Dt[Gt];D.update(Qn,rn),D.bind(Qn,rn)}}return rn}function Ou(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Bu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,U,k){xe.get(y.texture).__webglTexture=U,xe.get(y.depthTexture).__webglTexture=k;const O=xe.get(y);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=k===void 0,O.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,U){const k=xe.get(y);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const zu=C.createFramebuffer();this.setRenderTarget=function(y,U=0,k=0){I=y,R=U,w=k;let O=!0,F=null,J=!1,se=!1;if(y){const ge=xe.get(y);if(ge.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(C.FRAMEBUFFER,null),O=!1;else if(ge.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(ge.__hasExternalTextures)T.rebindTextures(y,xe.get(y.texture).__webglTexture,xe.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const be=y.depthTexture;if(ge.__boundDepthTexture!==be){if(be!==null&&xe.has(be)&&(y.width!==be.image.width||y.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Ce=y.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(se=!0);const Pe=xe.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?F=Pe[U][k]:F=Pe[U],J=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?F=xe.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?F=Pe[k]:F=Pe,L.copy(y.viewport),V.copy(y.scissor),B=y.scissorTest}else L.copy(Me).multiplyScalar(G).floor(),V.copy(Oe).multiplyScalar(G).floor(),B=rt;if(k!==0&&(F=zu),Se.bindFramebuffer(C.FRAMEBUFFER,F)&&O&&Se.drawBuffers(y,F),Se.viewport(L),Se.scissor(V),Se.setScissorTest(B),J){const ge=xe.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,k)}else if(se){const ge=xe.get(y.texture),Ce=U;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,ge.__webglTexture,k,Ce)}else if(y!==null&&k!==0){const ge=xe.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ge.__webglTexture,k)}S=-1},this.readRenderTargetPixels=function(y,U,k,O,F,J,se){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=xe.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&se!==void 0&&(ue=ue[se]),ue){Se.bindFramebuffer(C.FRAMEBUFFER,ue);try{const ge=y.texture,Ce=ge.format,Pe=ge.type;if(!Ge.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-O&&k>=0&&k<=y.height-F&&C.readPixels(U,k,O,F,Fe.convert(Ce),Fe.convert(Pe),J)}finally{const ge=I!==null?xe.get(I).__webglFramebuffer:null;Se.bindFramebuffer(C.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(y,U,k,O,F,J,se){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=xe.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&se!==void 0&&(ue=ue[se]),ue){const ge=y.texture,Ce=ge.format,Pe=ge.type;if(!Ge.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=y.width-O&&k>=0&&k<=y.height-F){Se.bindFramebuffer(C.FRAMEBUFFER,ue);const be=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,be),C.bufferData(C.PIXEL_PACK_BUFFER,J.byteLength,C.STREAM_READ),C.readPixels(U,k,O,F,Fe.convert(Ce),Fe.convert(Pe),0);const Xe=I!==null?xe.get(I).__webglFramebuffer:null;Se.bindFramebuffer(C.FRAMEBUFFER,Xe);const je=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Kh(C,je,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,be),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,J),C.deleteBuffer(be),C.deleteSync(je),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,U=null,k=0){y.isTexture!==!0&&(zi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,y=arguments[1]);const O=Math.pow(2,-k),F=Math.floor(y.image.width*O),J=Math.floor(y.image.height*O),se=U!==null?U.x:0,ue=U!==null?U.y:0;T.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,k,0,0,se,ue,F,J),Se.unbindTexture()};const Gu=C.createFramebuffer(),Vu=C.createFramebuffer();this.copyTextureToTexture=function(y,U,k=null,O=null,F=0,J=null){y.isTexture!==!0&&(zi("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1],U=arguments[2],J=arguments[3]||0,k=null),J===null&&(F!==0?(zi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=F,F=0):J=0);let se,ue,ge,Ce,Pe,be,Xe,je,vt;const ht=y.isCompressedTexture?y.mipmaps[J]:y.image;if(k!==null)se=k.max.x-k.min.x,ue=k.max.y-k.min.y,ge=k.isBox3?k.max.z-k.min.z:1,Ce=k.min.x,Pe=k.min.y,be=k.isBox3?k.min.z:0;else{const Zt=Math.pow(2,-F);se=Math.floor(ht.width*Zt),ue=Math.floor(ht.height*Zt),y.isDataArrayTexture?ge=ht.depth:y.isData3DTexture?ge=Math.floor(ht.depth*Zt):ge=1,Ce=0,Pe=0,be=0}O!==null?(Xe=O.x,je=O.y,vt=O.z):(Xe=0,je=0,vt=0);const qe=Fe.convert(U.format),Ee=Fe.convert(U.type);let At;U.isData3DTexture?(T.setTexture3D(U,0),At=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),At=C.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),At=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const $e=C.getParameter(C.UNPACK_ROW_LENGTH),rn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),xi=C.getParameter(C.UNPACK_SKIP_PIXELS),Ht=C.getParameter(C.UNPACK_SKIP_ROWS),or=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ht.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ht.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,be);const lt=y.isDataArrayTexture||y.isData3DTexture,$t=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const Zt=xe.get(y),Dt=xe.get(U),Gt=xe.get(Zt.__renderTarget),ra=xe.get(Dt.__renderTarget);Se.bindFramebuffer(C.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,ra.__webglFramebuffer);for(let Qn=0;Qn<ge;Qn++)lt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xe.get(y).__webglTexture,F,be+Qn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xe.get(U).__webglTexture,J,vt+Qn)),C.blitFramebuffer(Ce,Pe,se,ue,Xe,je,se,ue,C.DEPTH_BUFFER_BIT,C.NEAREST);Se.bindFramebuffer(C.READ_FRAMEBUFFER,null),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(F!==0||y.isRenderTargetTexture||xe.has(y)){const Zt=xe.get(y),Dt=xe.get(U);Se.bindFramebuffer(C.READ_FRAMEBUFFER,Gu),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,Vu);for(let Gt=0;Gt<ge;Gt++)lt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Zt.__webglTexture,F,be+Gt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Zt.__webglTexture,F),$t?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Dt.__webglTexture,J,vt+Gt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Dt.__webglTexture,J),F!==0?C.blitFramebuffer(Ce,Pe,se,ue,Xe,je,se,ue,C.COLOR_BUFFER_BIT,C.NEAREST):$t?C.copyTexSubImage3D(At,J,Xe,je,vt+Gt,Ce,Pe,se,ue):C.copyTexSubImage2D(At,J,Xe,je,Ce,Pe,se,ue);Se.bindFramebuffer(C.READ_FRAMEBUFFER,null),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else $t?y.isDataTexture||y.isData3DTexture?C.texSubImage3D(At,J,Xe,je,vt,se,ue,ge,qe,Ee,ht.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(At,J,Xe,je,vt,se,ue,ge,qe,ht.data):C.texSubImage3D(At,J,Xe,je,vt,se,ue,ge,qe,Ee,ht):y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,J,Xe,je,se,ue,qe,Ee,ht.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,J,Xe,je,ht.width,ht.height,qe,ht.data):C.texSubImage2D(C.TEXTURE_2D,J,Xe,je,se,ue,qe,Ee,ht);C.pixelStorei(C.UNPACK_ROW_LENGTH,$e),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,rn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,xi),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ht),C.pixelStorei(C.UNPACK_SKIP_IMAGES,or),J===0&&U.generateMipmaps&&C.generateMipmap(At),Se.unbindTexture()},this.copyTextureToTexture3D=function(y,U,k=null,O=null,F=0){return y.isTexture!==!0&&(zi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,O=arguments[1]||null,y=arguments[2],U=arguments[3],F=arguments[4]||0),zi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,U,k,O,F)},this.initRenderTarget=function(y){xe.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),Se.unbindTexture()},this.resetState=function(){R=0,w=0,I=null,Se.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const du={mercury:{a:.38709927,aDot:37e-8,e:.20563593,eDot:1906e-8,I:7.00497902,IDot:-.00594749,L:252.2503235,LDot:149472.67411175,peri:77.45779628,periDot:.16047689,node:48.33076593,nodeDot:-.12534081},venus:{a:.72333566,aDot:39e-7,e:.00677672,eDot:-4107e-8,I:3.39467605,IDot:-7889e-7,L:181.9790995,LDot:58517.81538729,peri:131.60246718,periDot:.00268329,node:76.67984255,nodeDot:-.27769418},earth:{a:1.00000261,aDot:562e-8,e:.01671123,eDot:-4392e-8,I:-1531e-8,IDot:-.01294668,L:100.46457166,LDot:35999.37244981,peri:102.93768193,periDot:.32327364,node:0,nodeDot:0},mars:{a:1.52371034,aDot:1847e-8,e:.0933941,eDot:7882e-8,I:1.84969142,IDot:-.00813131,L:-4.55343205,LDot:19140.30268499,peri:-23.94362959,periDot:.44441088,node:49.55953891,nodeDot:-.29257343},jupiter:{a:5.202887,aDot:-11607e-8,e:.04838624,eDot:-13253e-8,I:1.30439695,IDot:-.00183714,L:34.39644051,LDot:3034.74612775,peri:14.72847983,periDot:.21252668,node:100.47390909,nodeDot:.20469106},saturn:{a:9.53667594,aDot:-.0012506,e:.05386179,eDot:-50991e-8,I:2.48599187,IDot:.00193609,L:49.95424423,LDot:1222.49362201,peri:92.59887831,periDot:-.41897216,node:113.66242448,nodeDot:-.28867794},uranus:{a:19.18916464,aDot:-.00196176,e:.04725744,eDot:-4397e-8,I:.77263783,IDot:-.00242939,L:313.23810451,LDot:428.48202785,peri:170.9542763,periDot:.40805281,node:74.01692503,nodeDot:.04240589},neptune:{a:30.06992276,aDot:26291e-8,e:.00859048,eDot:5105e-8,I:1.77004347,IDot:35372e-8,L:-55.12002969,LDot:218.45945325,peri:44.96476227,periDot:-.32241464,node:131.78422574,nodeDot:-.00508664},pluto:{a:39.48211675,aDot:-31596e-8,e:.2488273,eDot:517e-7,I:17.14001206,IDot:4818e-8,L:238.92903833,LDot:145.20780515,peri:224.06891629,periDot:-.04062942,node:110.30393684,nodeDot:-.01183482}},M_=Object.keys(du);function S_(i){return i.getTime()/864e5+24405875e-1}function ka(i){const e=i%360;return e<0?e+360:e}function Zc(i){let e=i%(Math.PI*2);return e>Math.PI&&(e-=Math.PI*2),e<-Math.PI&&(e+=Math.PI*2),e}function Jc(i){return i*Math.PI/180}function b_(i,e){let t=e<.8?i:Math.PI;for(let n=0;n<12;n++){const r=(t-e*Math.sin(t)-i)/(1-e*Math.cos(t));if(t-=r,Math.abs(r)<1e-10)break}return t}function E_(i,e){const t=Math.cos(i),n=Math.sin(i);return Math.atan2(Math.sqrt(1-e*e)*n,t-e)}function T_(i,e){const t=du[i];if(!t)return null;const n=(S_(e)-2451545)/36525,r=t.e+t.eDot*n,s=ka(t.L+t.LDot*n),a=ka(t.peri+t.periDot*n),o=ka(s-a),l=Zc(Jc(o)),c=b_(l,r),d=E_(c,r);return Zc(Jc(a)+d)}function A_(i){const e={};for(const t of M_){const n=T_(t,i);n!==null&&(e[t]=n)}return e}function ws(i){return i.toISOString().slice(0,10)}function w_(i,e=5){const t=Tr(new Date),n=new Date(t);n.setUTCFullYear(n.getUTCFullYear()+e);const r=Tr(i).getTime();return r<t.getTime()?t:r>n.getTime()?n:Tr(i)}function Tr(i){return new Date(Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()))}function R_(i=5){const e=Tr(new Date),t=new Date(e);return t.setUTCFullYear(t.getUTCFullYear()+i),{today:ws(e),min:ws(e),max:ws(t)}}function yi(i){if(/^(https?:|data:|blob:)/i.test(i))return i;const e="/Mark-e-Mark/cosmos-explorer/",t=i.replace(/^\//,"");return`${e}${t}`}const C_=yi("audio/event-horizon-drift.wav"),Qc="cosmos-music",ed="cosmos-music-volume",td=.08,L_=.28;class P_{audio;enabled=!0;volume=td;started=!1;constructor(){this.audio=new Audio(C_),this.audio.loop=!0,this.audio.preload="auto",this.enabled=!0,this.volume=td,localStorage.setItem(Qc,"on"),localStorage.setItem(ed,String(this.volume)),this.applyOutputVolume()}applyOutputVolume(){this.audio.volume=this.enabled?this.volume*L_:0}get isEnabled(){return this.enabled}getVolume(){return this.volume}setEnabled(e){this.enabled=e,localStorage.setItem(Qc,e?"on":"off"),this.applyOutputVolume(),e?this.play():this.audio.pause()}toggle(){return this.setEnabled(!this.enabled),this.enabled}setVolume(e){this.volume=Math.min(1,Math.max(0,e)),localStorage.setItem(ed,String(this.volume)),this.applyOutputVolume()}async play(){if(this.enabled){this.applyOutputVolume();try{await this.audio.play(),this.started=!0}catch{}}}async ensurePlaying(){this.enabled&&(this.audio.paused||!this.started)&&await this.play()}}const nd=2.6;class I_{ctx=null;master=null;enabled=!1;coreBass=null;coreMid=null;coreHigh=null;corePulse=null;corePulseGain=null;coreGain=null;coreFilter=null;ventNoise=null;ventGain=null;bridgeOsc=null;bridgeGain=null;bridgeTimer=null;humRunning=!1;ambienceRunning=!1;wasWarping=!1;idleLevel=.28;volume=.5;constructor(){const e=localStorage.getItem("cosmos-sfx-volume");if(e!==null){const t=Number(e);Number.isNaN(t)||(this.volume=Math.min(1,Math.max(0,t)))}}get isEnabled(){return this.enabled}getVolume(){return this.volume}setVolume(e){this.volume=Math.min(1,Math.max(0,e)),localStorage.setItem("cosmos-sfx-volume",String(this.volume)),this.applyMasterGain()}setEnabled(e){this.enabled=e,localStorage.setItem("cosmos-audio",e?"on":"off"),e?(this.unlock(),this.startAmbience(),this.ensureHum(),this.setEngine(this.idleLevel,!1),this.applyMasterGain()):(this.stopHum(!0),this.stopAmbience(!0),this.applyMasterGain())}toggle(){return this.setEnabled(!this.enabled),this.enabled}async unlock(){if(!this.enabled)return;const e=this.ensureContext();e.state==="suspended"&&await e.resume(),this.applyMasterGain(),this.startAmbience(),this.ensureHum(),this.setEngine(this.idleLevel,!1)}applyMasterGain(){this.master&&(this.master.gain.value=this.enabled?this.volume*nd:0)}ensureContext(){return this.ctx||(this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=this.enabled?this.volume*nd:0,this.master.connect(this.ctx.destination)),this.ctx}destination(){return this.ensureContext(),this.master}startAmbience(){if(!this.enabled||this.ambienceRunning)return;const e=this.ensureContext();if(e.state==="suspended")return;this.bridgeOsc=e.createOscillator(),this.bridgeGain=e.createGain();const t=e.createBiquadFilter();t.type="lowpass",t.frequency.value=140,this.bridgeOsc.type="sine",this.bridgeOsc.frequency.value=52,this.bridgeGain.gain.value=1e-4,this.bridgeOsc.connect(t),t.connect(this.bridgeGain),this.bridgeGain.connect(this.destination()),this.bridgeOsc.start(),this.ambienceRunning=!0;const n=e.currentTime;this.bridgeGain.gain.exponentialRampToValueAtTime(.022,n+2.8),this.scheduleBridgeChirp()}scheduleBridgeChirp(){if(this.bridgeTimer!==null&&window.clearTimeout(this.bridgeTimer),!this.enabled||!this.ambienceRunning)return;const e=7+Math.random()*14;this.bridgeTimer=window.setTimeout(()=>{this.bridgeTimer=null,!(!this.enabled||!this.ambienceRunning)&&(this.playComputerChirp(.01+Math.random()*.008,!0),this.scheduleBridgeChirp())},e*1e3)}stopAmbience(e=!1){if(this.bridgeTimer!==null&&(window.clearTimeout(this.bridgeTimer),this.bridgeTimer=null),!this.ambienceRunning)return;const t=this.ctx,n=this.bridgeGain,r=this.bridgeOsc;if(this.ambienceRunning=!1,this.bridgeOsc=null,this.bridgeGain=null,!t||!n||!r)return;const s=t.currentTime;try{n.gain.cancelScheduledValues(s),n.gain.setValueAtTime(Math.max(1e-4,n.gain.value),s),n.gain.exponentialRampToValueAtTime(1e-4,s+(e?.05:.9)),r.stop(s+(e?.08:1.1))}catch{}}ensureHum(){if(this.humRunning||!this.enabled)return;const e=this.ensureContext();this.coreBass=e.createOscillator(),this.coreMid=e.createOscillator(),this.coreHigh=e.createOscillator(),this.corePulse=e.createOscillator(),this.corePulseGain=e.createGain(),this.coreGain=e.createGain(),this.coreFilter=e.createBiquadFilter(),this.coreBass.type="sine",this.coreBass.frequency.value=28,this.coreMid.type="triangle",this.coreMid.frequency.value=56,this.coreHigh.type="sine",this.coreHigh.frequency.value=84,this.corePulse.type="sine",this.corePulse.frequency.value=.52,this.corePulseGain.gain.value=.58,this.coreFilter.type="lowpass",this.coreFilter.frequency.value=180,this.coreFilter.Q.value=.7,this.coreGain.gain.value=1e-4;const t=e.createGain();t.gain.value=.55,this.corePulse.connect(this.corePulseGain),this.corePulseGain.connect(t.gain),this.coreBass.connect(this.coreFilter),this.coreMid.connect(t),t.connect(this.coreFilter),this.coreHigh.connect(this.coreFilter),this.coreFilter.connect(this.coreGain),this.coreGain.connect(this.destination());const r=e.createBuffer(1,e.sampleRate*3,e.sampleRate),s=r.getChannelData(0);for(let o=0;o<s.length;o++)s[o]=Math.random()*2-1;this.ventNoise=e.createBufferSource(),this.ventNoise.buffer=r,this.ventNoise.loop=!0,this.ventGain=e.createGain(),this.ventGain.gain.value=1e-4;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=110,a.Q.value=.5,this.ventNoise.connect(a),a.connect(this.ventGain),this.ventGain.connect(this.destination()),this.coreBass.start(),this.coreMid.start(),this.coreHigh.start(),this.corePulse.start(),this.ventNoise.start(),this.humRunning=!0}stopHum(e=!1){if(!this.humRunning)return;const t=this.ctx,n=this.coreGain,r=this.ventGain,s=[this.coreBass,this.coreMid,this.coreHigh,this.corePulse],a=this.ventNoise;if(this.humRunning=!1,this.coreBass=null,this.coreMid=null,this.coreHigh=null,this.corePulse=null,this.corePulseGain=null,this.coreGain=null,this.coreFilter=null,this.ventNoise=null,this.ventGain=null,!t)return;const o=t.currentTime;try{n&&(n.gain.cancelScheduledValues(o),n.gain.setValueAtTime(Math.max(1e-4,n.gain.value),o),n.gain.exponentialRampToValueAtTime(1e-4,o+(e?.05:.5))),r&&(r.gain.cancelScheduledValues(o),r.gain.setValueAtTime(Math.max(1e-4,r.gain.value),o),r.gain.exponentialRampToValueAtTime(1e-4,o+(e?.05:.5)));for(const l of s)l?.stop(o+.6);a?.stop(o+.6)}catch{}}setEngine(e,t=!1){if(!this.enabled){this.stopHum(!0);return}if(t&&!this.wasWarping&&this.playWarpWhoosh(),this.wasWarping=t,t){if(this.ensureHum(),this.ctx&&this.coreGain){const a=this.ctx.currentTime;this.coreGain.gain.setTargetAtTime(.11,a,.22),this.ventGain?.gain.setTargetAtTime(.045,a,.22),this.coreBass?.frequency.setTargetAtTime(36,a,.35),this.coreMid?.frequency.setTargetAtTime(72,a,.35),this.coreHigh?.frequency.setTargetAtTime(108,a,.35),this.corePulse?.frequency.setTargetAtTime(.85,a,.3),this.coreFilter&&this.coreFilter.frequency.setTargetAtTime(280,a,.35)}return}const n=Math.max(0,Math.min(1,e)),r=this.idleLevel+n*(1-this.idleLevel);if(this.ensureHum(),!this.ctx||!this.coreGain||!this.coreBass||!this.coreMid||!this.coreHigh)return;const s=this.ctx.currentTime;this.coreGain.gain.setTargetAtTime(.03+r*.065,s,.28),this.ventGain?.gain.setTargetAtTime(.008+r*.022,s,.28),this.coreBass.frequency.setTargetAtTime(26+r*12,s,.4),this.coreMid.frequency.setTargetAtTime(52+r*24,s,.4),this.coreHigh.frequency.setTargetAtTime(78+r*36,s,.4),this.corePulse?.frequency.setTargetAtTime(.4+r*.35,s,.35),this.coreFilter&&this.coreFilter.frequency.setTargetAtTime(150+r*120,s,.4)}playWarpWhoosh(){if(!this.enabled)return;const e=this.ensureContext(),t=e.currentTime;this.chirp(t,180,240,.18,.055),this.chirp(t+.2,240,160,.22,.045);const n=e.createOscillator(),r=e.createGain();n.type="sine",n.frequency.setValueAtTime(42,t),n.frequency.exponentialRampToValueAtTime(95,t+1.4),n.frequency.exponentialRampToValueAtTime(55,t+2.6),r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.12,t+.25),r.gain.exponentialRampToValueAtTime(.07,t+1.5),r.gain.exponentialRampToValueAtTime(1e-4,t+2.7),n.connect(r),r.connect(this.destination()),n.start(t),n.stop(t+2.8);const s=e.createOscillator(),a=e.createGain();s.type="triangle",s.frequency.setValueAtTime(28,t+.1),s.frequency.exponentialRampToValueAtTime(48,t+1.6),a.gain.setValueAtTime(1e-4,t+.1),a.gain.exponentialRampToValueAtTime(.06,t+.4),a.gain.exponentialRampToValueAtTime(1e-4,t+2.4),s.connect(a),a.connect(this.destination()),s.start(t+.1),s.stop(t+2.5);const o=Math.floor(e.sampleRate*2.6),l=e.createBuffer(1,o,e.sampleRate),c=l.getChannelData(0);for(let m=0;m<o;m++)c[m]=(Math.random()*2-1)*Math.pow(1-m/o,.45);const d=e.createBufferSource();d.buffer=l;const u=e.createBiquadFilter();u.type="lowpass",u.Q.value=.8,u.frequency.setValueAtTime(90,t),u.frequency.exponentialRampToValueAtTime(220,t+1),u.frequency.exponentialRampToValueAtTime(80,t+2.4);const f=e.createGain();f.gain.setValueAtTime(1e-4,t),f.gain.exponentialRampToValueAtTime(.16,t+.2),f.gain.exponentialRampToValueAtTime(.07,t+1.3),f.gain.exponentialRampToValueAtTime(1e-4,t+2.5),d.connect(u),u.connect(f),f.connect(this.destination()),d.start(t),d.stop(t+2.6)}chirp(e,t,n,r,s){const a=this.ctx,o=a.createOscillator(),l=a.createGain();o.type="sine",o.frequency.setValueAtTime(t,e),o.frequency.exponentialRampToValueAtTime(Math.max(40,n),e+r),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(s,e+.008),l.gain.exponentialRampToValueAtTime(1e-4,e+r),o.connect(l),l.connect(this.destination()),o.start(e),o.stop(e+r+.02)}playComputerChirp(e,t=!1){if(!this.enabled||!this.ctx)return;const n=this.ctx.currentTime,r=t?140+Math.random()*80:220,s=t?r*.85:160;this.chirp(n,r,s,t?.12:.1,e)}playBeep(e="ui"){if(!this.enabled)return;const n=this.ensureContext().currentTime;switch(e){case"ui":this.chirp(n,1040,880,.055,.09);break;case"select":this.chirp(n,880,1180,.05,.095),this.chirp(n+.06,1180,1480,.06,.085);break;case"confirm":this.chirp(n,740,990,.07,.1),this.chirp(n+.09,990,1320,.08,.09);break;case"land":this.chirp(n,660,420,.14,.11),this.chirp(n+.12,420,280,.16,.09),this.chirp(n+.08,1320,700,.2,.045);break;case"takeoff":this.chirp(n,480,720,.1,.1),this.chirp(n+.1,720,1100,.14,.09),this.chirp(n+.2,1100,1560,.12,.06);break}}}const D_=65,ul=[{bodyId:"sun",duration:7,from:{r:6.5,theta:-.4,phi:1.15},to:{r:11,theta:.9,phi:.95},fovFrom:70,fovTo:78,title:"Sol",subtitle:"The heart of the system"},{bodyId:"earth",duration:8,from:{r:14,theta:.2,phi:1.25},to:{r:4.2,theta:1.4,phi:1.05},fovFrom:72,fovTo:52,title:"Earth",subtitle:"Blue marble"},{bodyId:"mars",duration:6.5,from:{r:10,theta:-.8,phi:1.1},to:{r:3.8,theta:.6,phi:.9},fovFrom:68,fovTo:55,title:"Mars",subtitle:"The red planet"},{bodyId:"jupiter",duration:7.5,from:{r:9,theta:.3,phi:1.2},to:{r:3.5,theta:1.6,phi:1.05},fovFrom:74,fovTo:58,title:"Jupiter",subtitle:"King of giants"},{bodyId:"saturn",duration:8.5,from:{r:11,theta:-1,phi:1.35},to:{r:4.5,theta:.4,phi:1.15},fovFrom:70,fovTo:54,title:"Saturn",subtitle:"Ringed world"},{bodyId:"earth",duration:6,from:{r:8,theta:2,phi:1},to:{r:3.6,theta:2.8,phi:1.05},fovFrom:62,fovTo:50,title:"Home",subtitle:"Returning to Earth orbit"}],U_=[{bodyId:"sun",duration:7,from:{r:7,theta:-.5,phi:1.1},to:{r:12,theta:.8,phi:.95},fovFrom:68,fovTo:76,title:"Sol",subtitle:"Our home star · 0 ly"},{bodyId:"acen-a",duration:7.5,from:{r:8,theta:.3,phi:1.2},to:{r:4.5,theta:1.5,phi:1},fovFrom:72,fovTo:56,title:"α Centauri",subtitle:"Nearest sun-like neighbor · ~4.3 ly"},{bodyId:"sirius-a",duration:7.5,from:{r:9,theta:-.9,phi:1.15},to:{r:5,theta:.4,phi:.95},fovFrom:74,fovTo:58,title:"Sirius",subtitle:"The blazing Dog Star · ~8.6 ly"},{bodyId:"vega",duration:7.5,from:{r:8.5,theta:1.2,phi:1.25},to:{r:4.8,theta:2.1,phi:1.05},fovFrom:70,fovTo:54,title:"Vega",subtitle:"Brilliant A-type of Lyra · ~25 ly"},{bodyId:"trappist-1",duration:8,from:{r:10,theta:-.2,phi:1.3},to:{r:5.5,theta:1.1,phi:1.1},fovFrom:68,fovTo:52,title:"TRAPPIST-1",subtitle:"Seven ultracool worlds · ~39.5 ly"}];class F_{camera;universe;offset=new A;look=new A;beats=[];index=0;t=0;active=!1;awaitingWarp=!1;lastSystemId="";callbacks={};baseFov=D_;constructor(e,t){this.camera=e,this.universe=t}get isActive(){return this.active}get isAwaitingWarp(){return this.awaitingWarp}get currentTitle(){return this.beats[this.index]?.title??""}start(e=ul,t={}){return e.length===0||!this.universe.findById(e[0].bodyId)?!1:(this.beats=e,this.callbacks=t,this.index=0,this.t=0,this.active=!0,this.awaitingWarp=!1,this.lastSystemId="",this.baseFov=this.camera.fov,this.beginBeat(0),!0)}cancel(){this.active&&(this.active=!1,this.awaitingWarp=!1,this.restoreFov(),this.callbacks.onCancel?.(),this.callbacks={})}update(e){if(!this.active||this.awaitingWarp)return;const t=this.beats[this.index];if(!t){this.finish();return}this.t+=e;const n=Math.min(1,this.t/t.duration);this.applyBeat(n),n>=1&&(this.index+=1,this.t=0,this.index>=this.beats.length?this.finish():this.beginBeat(this.index))}beginBeat(e){const t=this.beats[e];if(!t){this.finish();return}const n=this.universe.findById(t.bodyId);if(!n){this.finish();return}const r=!!this.callbacks.warpToBody&&(this.lastSystemId===""||n.systemId!==this.lastSystemId);if(this.callbacks.onBeat?.(t,e,this.beats.length),r&&this.callbacks.warpToBody){this.awaitingWarp=!0,this.callbacks.warpToBody(n,()=>{this.active&&(this.awaitingWarp=!1,this.lastSystemId=n.systemId,this.t=0,this.applyBeat(0))});return}this.lastSystemId=n.systemId,this.t=0,this.applyBeat(0)}finish(){const e=this.beats[this.beats.length-1]?.bodyId,t=e?this.universe.findById(e)??null:null;this.active=!1,this.awaitingWarp=!1,this.restoreFov();const n=this.callbacks.onComplete;this.callbacks={},n?.(t)}restoreFov(){this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix()}applyBeat(e){const t=this.beats[this.index];if(!t)return;const n=this.universe.findById(t.bodyId);if(!n)return;const r=e*e*(3-2*e),s=N_(t.from,t.to,r),a=n.worldPosition;k_(this.offset,s,n.def.radius),this.camera.position.copy(a).add(this.offset),this.look.copy(a),this.camera.lookAt(this.look);const o=t.fovFrom??this.baseFov,l=t.fovTo??this.baseFov;this.camera.fov=st.lerp(o,l,r),this.camera.updateProjectionMatrix()}}function N_(i,e,t){return{r:st.lerp(i.r,e.r,t),theta:st.lerp(i.theta,e.theta,t),phi:st.lerp(i.phi,e.phi,t)}}function k_(i,e,t){const n=Math.max(t*e.r,t*1.8);i.setFromSphericalCoords(n,e.phi,e.theta)}const O_=14,B_=.05,z_=80,gs=1.6,_s=40,G_=1.05,V_=.4,H_=140;class W_{camera;velocity=new A;throttle=1;locked=!1;warping=!1;orbiting=!1;lookEnabled=!0;orbitTarget=null;scaleMul=8;keys=new Set;euler=new tn(0,0,0,"YXZ");direction=new A;canvas;spherical=new kf;offset=new A;lookTarget=new A;warpFrom=new A;warpTo=new A;warpLook=new A;warpT=0;warpDuration=1.8;pendingOrbit=null;orbitAutoSpin=.22;onLockChange;looking=!1;lookDragged=!1;constructor(e,t){this.camera=e,this.canvas=t,this.euler.setFromQuaternion(e.quaternion),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),document.addEventListener("pointerlockchange",this.onPointerLock),t.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerUp),t.addEventListener("mousemove",this.onMouseMove),t.addEventListener("wheel",this.onWheel,{passive:!1})}setLockHandler(e){this.onLockChange=e}get isLooking(){return this.looking}setLocalScale(e,t=1){const n=Math.max(e,t*.35,.25),r=st.clamp(n*G_,V_,H_);this.scaleMul+=(r-this.scaleMul)*.12}requestLock=()=>{};unlock(){this.looking=!1,document.pointerLockElement===this.canvas&&document.exitPointerLock()}consumeLookDrag(){const e=this.lookDragged;return this.lookDragged=!1,e}onPointerLock=()=>{this.locked=document.pointerLockElement===this.canvas,this.canvas.classList.toggle("locked",this.locked),this.locked||(this.looking=!1),this.onLockChange?.(this.locked)};onPointerDown=e=>{e.button===0&&(this.warping||(this.looking=!0,this.lookDragged=!1,this.canvas.requestPointerLock()))};onPointerUp=e=>{e.type!=="pointercancel"&&e.button!==0||this.looking&&(this.looking=!1,document.pointerLockElement===this.canvas&&document.exitPointerLock())};onKeyDown=e=>{this.keys.add(e.code),e.code==="Escape"&&this.unlock()};onKeyUp=e=>{this.keys.delete(e.code)};onMouseMove=e=>{if(!this.looking||this.warping||((Math.abs(e.movementX)>.5||Math.abs(e.movementY)>.5)&&(this.lookDragged=!0),!this.lookEnabled))return;if(this.orbiting){this.spherical.theta-=e.movementX*.003,this.spherical.phi-=e.movementY*.003,this.spherical.phi=st.clamp(this.spherical.phi,.12,Math.PI-.12);return}const t=.0022;this.euler.y-=e.movementX*t,this.euler.x-=e.movementY*t,this.euler.x=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,this.euler.x)),this.camera.quaternion.setFromEuler(this.euler)};onWheel=e=>{e.preventDefault();const t=e.deltaY>0?.85:1.18;if(this.orbiting&&this.orbitTarget){const n=this.orbitTarget.def.radius*gs,r=this.orbitTarget.def.radius*_s;this.spherical.radius=st.clamp(this.spherical.radius*(e.deltaY>0?1.12:.9),n,r);return}this.throttle=st.clamp(this.throttle*t,B_,z_)};enterOrbit(e){this.exitOrbit(),this.orbitTarget=e,this.orbiting=!0,this.velocity.set(0,0,0);const t=e.worldPosition;this.offset.copy(this.camera.position).sub(t),this.offset.lengthSq()<1e-4&&this.offset.set(0,e.def.radius*1.2,e.def.radius*4),this.spherical.setFromVector3(this.offset),this.spherical.phi=st.clamp(this.spherical.phi,.12,Math.PI-.12),this.spherical.radius=st.clamp(this.spherical.radius,e.def.radius*gs,e.def.radius*_s)}enterOrbitAt(e,t){this.exitOrbit(),this.orbitTarget=e,this.orbiting=!0,this.velocity.set(0,0,0),this.spherical.radius=st.clamp(t.radius,e.def.radius*gs,e.def.radius*_s),this.spherical.phi=st.clamp(t.phi,.12,Math.PI-.12),this.spherical.theta=t.theta,this.updateOrbit(0)}setPose(e,t){this.exitOrbit(),this.warping=!1,this.pendingOrbit=null,this.velocity.set(0,0,0),this.camera.position.copy(e),this.camera.quaternion.copy(t),this.euler.setFromQuaternion(t)}getOrbitState(){return this.orbiting?{radius:this.spherical.radius,phi:this.spherical.phi,theta:this.spherical.theta}:null}exitOrbit(){this.orbiting&&(this.orbiting=!1,this.orbitTarget=null,this.pendingOrbit=null,this.camera.getWorldDirection(this.direction),this.euler.setFromQuaternion(this.camera.quaternion))}toggleOrbit(e){return e?this.orbiting&&this.orbitTarget?.def.id===e.def.id?(this.exitOrbit(),!1):(this.enterOrbit(e),!0):!1}beginWarp(e,t,n){this.exitOrbit();const r=this.camera.position.clone().sub(e).normalize();r.lengthSq()<1e-6&&r.set(.4,.25,1).normalize(),this.warpFrom.copy(this.camera.position),this.warpTo.copy(e).addScaledVector(r,t),this.warpLook.copy(e),this.warpT=0,this.warpDuration=st.clamp(this.warpFrom.distanceTo(this.warpTo)/Math.max(40,this.scaleMul*2.5),1,4),this.warping=!0,this.pendingOrbit=n??null,this.velocity.set(0,0,0)}get orbitRadius(){return this.spherical.radius}get speed(){if(this.orbiting&&this.orbitTarget){const e=this.spherical.radius,t=this.orbitAngularSpeed();return e*Math.abs(t)}return this.velocity.length()}get scaleLabel(){return this.scaleMul<1?`${this.scaleMul.toFixed(2)}×`:this.scaleMul<10?`${this.scaleMul.toFixed(1)}×`:`${Math.round(this.scaleMul)}×`}update(e){if(this.warping){this.warpT+=e/this.warpDuration;const r=Math.min(1,this.warpT),s=r*r*(3-2*r);if(this.camera.position.lerpVectors(this.warpFrom,this.warpTo,s),this.camera.lookAt(this.warpLook),this.euler.setFromQuaternion(this.camera.quaternion),r>=1&&(this.warping=!1,this.pendingOrbit)){const a=this.pendingOrbit;this.pendingOrbit=null,this.enterOrbit(a)}return}if(this.orbiting&&this.orbitTarget){this.updateOrbit(e);return}const t=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?4:1,n=O_*this.throttle*t*this.scaleMul*.12;this.direction.set(0,0,0),this.keys.has("KeyW")&&(this.direction.z-=1),this.keys.has("KeyS")&&(this.direction.z+=1),this.keys.has("KeyA")&&(this.direction.x-=1),this.keys.has("KeyD")&&(this.direction.x+=1),(this.keys.has("KeyE")||this.keys.has("Space"))&&(this.direction.y+=1),(this.keys.has("KeyQ")||this.keys.has("ControlLeft"))&&(this.direction.y-=1),this.direction.lengthSq()>0?(this.direction.normalize(),this.direction.applyQuaternion(this.camera.quaternion),this.velocity.lerp(this.direction.multiplyScalar(n),1-Math.exp(-6*e))):this.velocity.multiplyScalar(Math.exp(-3*e)),this.camera.position.addScaledVector(this.velocity,e)}orbitAngularSpeed(){if(!this.orbitTarget)return this.orbitAutoSpin;const e=this.spherical.radius,t=this.orbitTarget.def.radius;return this.orbitAutoSpin*st.clamp(t*3.2/e,.35,2.2)}updateOrbit(e){const t=this.orbitTarget,n=t.worldPosition;if(this.keys.has("KeyA")&&(this.spherical.theta+=e*.9),this.keys.has("KeyD")&&(this.spherical.theta-=e*.9),this.keys.has("KeyW")||this.keys.has("KeyS")){const s=t.def.radius*gs,a=t.def.radius*_s,o=(this.keys.has("KeyW")?-1:1)*this.spherical.radius*.7*e;this.spherical.radius=st.clamp(this.spherical.radius+o,s,a)}const r=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?2.5:1;this.spherical.theta-=this.orbitAngularSpeed()*r*e,this.offset.setFromSpherical(this.spherical),this.camera.position.copy(n).add(this.offset),this.lookTarget.copy(n),this.camera.lookAt(this.lookTarget),this.euler.setFromQuaternion(this.camera.quaternion),this.setLocalScale(this.spherical.radius-t.def.radius,t.def.radius)}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("pointerlockchange",this.onPointerLock),this.canvas.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerUp),this.canvas.removeEventListener("mousemove",this.onMouseMove),this.canvas.removeEventListener("wheel",this.onWheel)}}const X_=new Set(["mercury","venus","earth","luna","mars","phobos","pluto","io","europa","titan","triton","acen-i","acen-ii","acen-i-moon","proxima-b","proxima-c","proxima-d","trap-b","trap-c","trap-d","trap-e","trap-f","trap-g","trap-h","eps-eri-ii","eps-eri-iii","eps-eri-i-moon","altair-i","altair-ii","altair-iii-moon","barnard-b","barnard-c","barnard-d","tau-ceti-e","tau-ceti-f","tau-ceti-g-moon","vega-i","vega-ii","vega-iii-moon","fomalhaut-i","fomalhaut-b","fomalhaut-iii-moon","gliese-581-e","gliese-581-b","gliese-581-c","gliese-581-d","wolf-359-b","wolf-359-c","wolf-359-d","ross-128-b","ross-128-c","ross-128-d","cygni-61-i","cygni-61-ii","cygni-61-iii-moon","kapteyn-b","kapteyn-c","kapteyn-d","pollux-b-moon","pollux-ii","pollux-iii","polaris-i","betelgeuse-i","betelgeuse-ii","kepler-186-b","kepler-186-c","kepler-186-d","kepler-186-e","kepler-186-f","rigel-i","rigel-ii-moon","deneb-i","deneb-ii"]);function id(i){return i.def.kind==="star"||i.def.kind==="gas-giant"?!1:X_.has(i.def.id)||i.def.kind==="planet"||i.def.kind==="moon"||i.def.kind==="dwarf"}function q_(i){switch(i.def.id){case"earth":case"acen-i":case"proxima-b":case"trap-e":case"trap-f":case"eps-eri-ii":case"altair-ii":case"tau-ceti-e":case"tau-ceti-f":case"vega-ii":case"gliese-581-d":case"ross-128-b":case"kapteyn-b":case"cygni-61-ii":case"kepler-186-f":case"polaris-i":case"deneb-i":return"earth";case"mars":case"acen-ii":case"trap-d":case"barnard-c":case"wolf-359-c":case"cygni-61-i":case"kepler-186-d":case"kepler-186-e":case"betelgeuse-i":return"mars";case"luna":case"mercury":case"phobos":case"acen-i-moon":case"proxima-d":case"trap-h":case"eps-eri-i-moon":case"altair-iii-moon":case"tau-ceti-g-moon":case"vega-iii-moon":case"fomalhaut-iii-moon":case"barnard-b":case"gliese-581-e":case"wolf-359-b":case"kapteyn-d":case"cygni-61-iii-moon":case"pollux-b-moon":case"kepler-186-b":case"rigel-i":case"rigel-ii-moon":return"lunar";case"europa":case"pluto":case"triton":case"proxima-c":case"trap-g":case"eps-eri-iii":case"barnard-d":case"fomalhaut-b":case"wolf-359-d":case"ross-128-d":case"kapteyn-c":case"pollux-iii":case"betelgeuse-ii":case"deneb-ii":return"ice";case"titan":case"venus":case"trap-b":case"trap-c":case"kepler-186-c":case"altair-i":case"vega-i":case"fomalhaut-i":case"gliese-581-b":case"gliese-581-c":case"ross-128-c":case"pollux-ii":return"desert";default:return"rocky"}}function rd(i){switch(i){case"earth":return{ground:4021304,fog:8888504,accent:7049054};case"mars":return{ground:9060400,fog:12611664,accent:12081208};case"lunar":return{ground:8026224,fog:1711138,accent:5920848};case"ice":return{ground:13160664,fog:9480384,accent:15266040};case"desert":return{ground:12886112,fog:14203e3,accent:11042880};default:return{ground:6972760,fog:2764856,accent:4868160}}}function Ln(i,e){const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function K_(i,e){const t=Math.floor(i),n=Math.floor(e),r=i-t,s=e-n,a=r*r*(3-2*r),o=s*s*(3-2*s),l=Ln(t,n),c=Ln(t+1,n),d=Ln(t,n+1),u=Ln(t+1,n+1);return l+(c-l)*a+(d-l)*o+(l-c-d+u)*a*o}function mn(i,e){let t=0,n=.5,r=1;for(let s=0;s<5;s++)t+=n*K_(i*r,e*r),n*=.5,r*=2;return t}function sd(i,e,t){let n=0;for(let r=0;r<t;r++){const s=(Ln(r*13.1,r*7.7)-.5)*90,a=(Ln(r*3.3,r*19.9)-.5)*90,o=1.5+Ln(r,r+40)*6,l=Math.hypot(i-s,e-a);if(l<o){const c=l/o;n+=(c*c-1)*(.4+Ln(r,9)*.8),c>.75&&(n+=(1-c)*1.2)}}return n}class Y_{group=new en;active=!1;body=null;terrain;sun=new iu(16770752,1.4);hemi=new cl(11584728,3813416,.45);ambient=new ru(4214880,.25);keys=new Set;velocity=new A;euler=new tn(0,0,0,"YXZ");direction=new A;camera;eyeHeight=1.7;flying=!1;biome="rocky";onKeyDownBound;onKeyUpBound;savedFog=null;scene;constructor(e,t){this.scene=e,this.camera=t,this.group.visible=!1,this.group.add(this.sun,this.hemi,this.ambient),this.sun.position.set(40,60,20),e.add(this.group),this.onKeyDownBound=n=>this.keys.add(n.code),this.onKeyUpBound=n=>this.keys.delete(n.code)}enter(e){this.active&&this.exit(),this.body=e,this.biome=q_(e),this.active=!0,this.flying=!1,this.velocity.set(0,0,0),this.keys.clear(),this.buildTerrain(),this.group.visible=!0;const t=rd(this.biome);this.scene.fog instanceof er&&(this.savedFog=this.scene.fog,this.scene.fog=new er(t.fog,this.biome==="lunar"?.012:.018)),this.camera.position.set(0,this.sampleHeight(0,8)+this.eyeHeight+2,8),this.euler.set(-.15,0,0),this.camera.quaternion.setFromEuler(this.euler),this.camera.near=.1,this.camera.far=400,this.camera.updateProjectionMatrix(),window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound)}exit(){if(!this.active)return null;const e=this.body;return this.active=!1,this.body=null,this.group.visible=!1,this.clearTerrain(),this.keys.clear(),this.savedFog&&(this.scene.fog=this.savedFog,this.savedFog=null),this.camera.near=.05,this.camera.far=5e3,this.camera.updateProjectionMatrix(),window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),e}clearTerrain(){this.terrain&&(this.group.remove(this.terrain),this.terrain.geometry.dispose(),this.terrain.material.dispose(),this.terrain=void 0)}buildTerrain(){this.clearTerrain();const e=rd(this.biome),t=120,n=128,r=new vi(t,t,n,n);r.rotateX(-Math.PI/2);const s=r.attributes.position,a=new Float32Array(s.count*3),o=new ye(e.ground),l=new ye(e.accent);for(let u=0;u<s.count;u++){const f=s.getX(u),m=s.getZ(u);let g=mn(f*.045,m*.045)*3.2;(this.biome==="lunar"||this.biome==="rocky"||this.biome==="mars")&&(g+=sd(f,m,this.biome==="lunar"?28:16)),this.biome==="desert"&&(g+=Math.sin(f*.35+mn(f*.1,m*.1)*2)*1.4,g+=mn(f*.08,m*.08)*2),this.biome==="ice"&&(g=mn(f*.03,m*.03)*1.6+Math.abs(Math.sin(f*.2)*Math.cos(m*.2))*.4),this.biome==="earth"&&(g=mn(f*.04,m*.04)*4.5,g<.35&&(g=.12)),s.setY(u,g);const _=st.clamp(.35+g*.08+Ln(f,m)*.2,0,1),p=o.clone().lerp(l,_*.45);this.biome==="earth"&&g<=.15&&p.set(2773120),a[u*3]=p.r,a[u*3+1]=p.g,a[u*3+2]=p.b}r.setAttribute("color",new pt(a,3)),r.computeVertexNormals();const c=new Ir({vertexColors:!0,roughness:this.biome==="ice"?.35:.92,metalness:this.biome==="ice"?.15:.02,flatShading:this.biome==="lunar"||this.biome==="rocky"});this.terrain=new Qe(r,c),this.terrain.receiveShadow=!0,this.group.add(this.terrain);const d=new Qe(new Pr(t*.85,64),new Ir({color:e.ground,roughness:1,metalness:0}));d.rotation.x=-Math.PI/2,d.position.y=-.5,this.terrain.add(d)}sampleHeight(e,t){let n=mn(e*.045,t*.045)*3.2;return(this.biome==="lunar"||this.biome==="rocky"||this.biome==="mars")&&(n+=sd(e,t,this.biome==="lunar"?28:16)),this.biome==="desert"&&(n+=Math.sin(e*.35+mn(e*.1,t*.1)*2)*1.4,n+=mn(e*.08,t*.08)*2),this.biome==="ice"&&(n=mn(e*.03,t*.03)*1.6+Math.abs(Math.sin(e*.2)*Math.cos(t*.2))*.4),this.biome==="earth"&&(n=mn(e*.04,t*.04)*4.5,n<.35&&(n=.12)),n}onMouseMove(e){if(!this.active)return;const t=.0022;this.euler.y-=e.movementX*t,this.euler.x-=e.movementY*t,this.euler.x=Math.max(-Math.PI/2+.05,Math.min(Math.PI/2-.05,this.euler.x)),this.camera.quaternion.setFromEuler(this.euler)}update(e){if(!this.active)return 0;this.keys.has("KeyF")&&(this.flying=!0),this.keys.has("KeyC")&&(this.flying=!1);const t=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?2.2:1,n=(this.flying?22:7)*t;if(this.direction.set(0,0,0),this.keys.has("KeyW")&&(this.direction.z-=1),this.keys.has("KeyS")&&(this.direction.z+=1),this.keys.has("KeyA")&&(this.direction.x-=1),this.keys.has("KeyD")&&(this.direction.x+=1),this.flying&&((this.keys.has("KeyE")||this.keys.has("Space"))&&(this.direction.y+=1),(this.keys.has("KeyQ")||this.keys.has("ControlLeft"))&&(this.direction.y-=1)),this.direction.lengthSq()>0){this.direction.normalize();const s=this.euler.y,a=new A(-Math.sin(s),0,-Math.cos(s)),o=new A(Math.cos(s),0,-Math.sin(s)),l=new A;l.addScaledVector(a,-this.direction.z),l.addScaledVector(o,this.direction.x),this.flying&&(l.y+=this.direction.y),l.lengthSq()>0&&l.normalize().multiplyScalar(n),this.velocity.lerp(l,1-Math.exp(-8*e))}else this.velocity.multiplyScalar(Math.exp(-6*e));this.camera.position.addScaledVector(this.velocity,e),this.camera.position.x=st.clamp(this.camera.position.x,-55,55),this.camera.position.z=st.clamp(this.camera.position.z,-55,55);const r=this.sampleHeight(this.camera.position.x,this.camera.position.z);if(!this.flying)this.camera.position.y=r+this.eyeHeight;else{const s=r+1.2;this.camera.position.y<s&&(this.camera.position.y=s,this.velocity.y=Math.max(0,this.velocity.y)),this.camera.position.y=Math.min(this.camera.position.y,80)}return this.velocity.length()}}const j_={id:"altair",name:"Altair",kind:"star",radius:13,orbitRadius:0,orbitSpeed:0,spinSpeed:.12,color:15791359,emissive:13688063,description:"Alpha Aquilae — a rapidly spinning A7V star that flattens itself into an oblate spheroid.",facts:{type:"A7V star",diameterKm:"2.5M (eq.)",distanceAu:"0",dayLength:"9 h",gravity:"—"},moons:[{id:"altair-i",name:"Aquila",kind:"planet",radius:.88,orbitRadius:42,orbitSpeed:.2,spinSpeed:.3,color:9074792,atmosphere:11575440,description:"Scorched inner rock under Altair’s fierce white glare.",facts:{type:"Terrestrial",diameterKm:"11,200",distanceAu:"1.4",dayLength:"18 h",gravity:"0.75 g"}},{id:"altair-ii",name:"Tarazed",kind:"planet",radius:1.05,orbitRadius:68,orbitSpeed:.12,spinSpeed:.26,color:3829896,atmosphere:7385296,description:"Cooler ocean world named for γ Aquilae — possible temperate belts under a bright sky.",facts:{type:"Ocean world",diameterKm:"13,400",distanceAu:"2.8",dayLength:"27 h",gravity:"1.05 g"}},{id:"altair-iii",name:"Alshain",kind:"gas-giant",radius:4,orbitRadius:108,orbitSpeed:.055,spinSpeed:.52,color:6324400,atmosphere:8429776,rings:{inner:4.8,outer:7.6,color:11585760},description:"Blue-white ice giant with pale rings — named for β Aquilae.",facts:{type:"Ice giant",diameterKm:"115,000",distanceAu:"6.5",dayLength:"12 h",gravity:"1.3 g"},moons:[{id:"altair-iii-moon",name:"Vega’s Shadow",kind:"moon",radius:.3,orbitRadius:8.8,orbitSpeed:.6,spinSpeed:.09,color:13682904,description:"Icy shepherd moon of Alshain.",facts:{type:"Moon",diameterKm:"3,800",distanceAu:"—",dayLength:"5 d",gravity:"0.12 g"}}]}]},$_=[1500,80,-3100],Z_={id:"acen-a",name:"Rigil Kentaurus",kind:"star",radius:11,orbitRadius:0,orbitSpeed:0,spinSpeed:.04,color:16765056,emissive:16756800,description:"Alpha Centauri A — a G-type star slightly larger than Sol.",facts:{type:"G2V star",diameterKm:"1.5M",distanceAu:"0",dayLength:"22 d",gravity:"1.5× Sol"},moons:[{id:"acen-b",name:"Toliman",kind:"star",radius:8.5,orbitRadius:42,orbitSpeed:.08,spinSpeed:.05,color:16756832,emissive:16748576,description:"Alpha Centauri B — K-type companion in a close binary dance.",facts:{type:"K1V star",diameterKm:"1.2M",distanceAu:"—",dayLength:"41 d",gravity:"1.1× Sol"}},{id:"acen-i",name:"Chiron",kind:"planet",radius:.95,orbitRadius:28,orbitSpeed:.22,spinSpeed:.3,color:4880976,atmosphere:8308991,description:"Temperate rocky world with patchy seas under twin suns.",facts:{type:"Terrestrial",diameterKm:"12,100",distanceAu:"0.9",dayLength:"26 h",gravity:"0.95 g"},moons:[{id:"acen-i-moon",name:"Nessus",kind:"moon",radius:.22,orbitRadius:2.4,orbitSpeed:1,spinSpeed:.1,color:13156528,description:"Small airless moon of Chiron.",facts:{type:"Moon",diameterKm:"2,800",distanceAu:"—",dayLength:"12 d",gravity:"0.12 g"}}]},{id:"acen-ii",name:"Pholus",kind:"planet",radius:.7,orbitRadius:48,orbitSpeed:.14,spinSpeed:.28,color:11558976,atmosphere:13664336,description:"Arid rust world with thin CO₂ haze.",facts:{type:"Terrestrial",diameterKm:"8,400",distanceAu:"1.6",dayLength:"28 h",gravity:"0.55 g"}},{id:"acen-iii",name:"Hera",kind:"gas-giant",radius:3.8,orbitRadius:78,orbitSpeed:.06,spinSpeed:.5,color:12619872,atmosphere:13936760,rings:{inner:4.6,outer:7.2,color:13152400},description:"Warm gas giant with faint dusty rings.",facts:{type:"Gas giant",diameterKm:"110,000",distanceAu:"3.1",dayLength:"11 h",gravity:"2.1 g"}}]},J_=[180,70,880],Q_={id:"barnard",name:"Barnard's Star",kind:"star",radius:3.4,orbitRadius:0,orbitSpeed:0,spinSpeed:.04,color:16733488,emissive:16728096,description:"An ancient M4V red dwarf ~6 ly away — tiny, dim, and one of the nearest stars to Sol.",facts:{type:"M4V star",diameterKm:"280,000",distanceAu:"0",dayLength:"130 d",gravity:"—"},moons:[{id:"barnard-b",name:"Barnard b",kind:"planet",radius:.72,orbitRadius:18,orbitSpeed:.42,spinSpeed:.35,color:10510408,atmosphere:12615776,description:"A hot super-Earth candidate hugging the red dwarf — baked rock under crimson twilight.",facts:{type:"Super-Earth",diameterKm:"9,200",distanceAu:"0.04",dayLength:"tidally locked",gravity:"1.1 g"}},{id:"barnard-c",name:"Ophiuchus",kind:"planet",radius:.95,orbitRadius:36,orbitSpeed:.22,spinSpeed:.28,color:6969416,atmosphere:9470064,description:"Speculative temperate rock in the faint habitable fringe — dusty plains and thin air.",facts:{type:"Terrestrial",diameterKm:"12,100",distanceAu:"0.12",dayLength:"18 h",gravity:"0.9 g"}},{id:"barnard-d",name:"Iceward",kind:"planet",radius:1.15,orbitRadius:62,orbitSpeed:.1,spinSpeed:.18,color:11583696,atmosphere:13689072,description:"Cold outer world — nitrogen frost and long red-star nights.",facts:{type:"Ice world",diameterKm:"14,600",distanceAu:"0.35",dayLength:"40 h",gravity:"0.75 g"}}]},ev=[974,130,-757],tv={id:"betelgeuse",name:"Betelgeuse",kind:"star",radius:22,orbitRadius:0,orbitSpeed:0,spinSpeed:.02,color:16756832,emissive:16744480,description:"Alpha Orionis — a vast M1–M2 red supergiant ~548 ly away, nearing the end of its life.",facts:{type:"M1–2 Ia red supergiant",diameterKm:"~1B",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"betelgeuse-i",name:"Shoulder",kind:"planet",radius:.95,orbitRadius:95,orbitSpeed:.07,spinSpeed:.22,color:10510400,atmosphere:12615760,description:"Scorched rock far outside the swollen star’s photosphere.",facts:{type:"Terrestrial",diameterKm:"12,100",distanceAu:"40",dayLength:"40 h",gravity:"0.9 g"}},{id:"betelgeuse-ii",name:"Orion Outer",kind:"planet",radius:1.3,orbitRadius:130,orbitSpeed:.04,spinSpeed:.16,color:11583696,atmosphere:13689072,description:"Frozen outer world — red twilight from a dying giant.",facts:{type:"Ice world",diameterKm:"16,500",distanceAu:"80",dayLength:"48 h",gravity:"0.75 g"}},{id:"betelgeuse-iii",name:"Antares’ Kin",kind:"gas-giant",radius:4.5,orbitRadius:165,orbitSpeed:.028,spinSpeed:.48,color:12611648,atmosphere:14717016,rings:{inner:5.4,outer:8.8,color:14725248},description:"Warm-toned giant in the outer debris of Betelgeuse’s wind.",facts:{type:"Gas giant",diameterKm:"~140,000",distanceAu:"140",dayLength:"11 h",gravity:"1.5 g"}}]},nv=[94600,-23650,59125],iv={id:"cygni-61-a",name:"61 Cygni A",kind:"star",radius:8.5,orbitRadius:0,orbitSpeed:0,spinSpeed:.05,color:16756848,emissive:16748608,description:"The primary of a binary K-dwarf pair ~11.4 ly away — historically the first star with measured distance.",facts:{type:"K5V star",diameterKm:"920,000",distanceAu:"0",dayLength:"35 d",gravity:"—"},moons:[{id:"cygni-61-b",name:"61 Cygni B",kind:"star",radius:7.2,orbitRadius:55,orbitSpeed:.035,spinSpeed:.045,color:16750688,emissive:16742448,description:"Cooler K7V companion — orange twin circling the primary.",facts:{type:"K7V star",diameterKm:"780,000",distanceAu:"~84",dayLength:"38 d",gravity:"—"}},{id:"cygni-61-i",name:"Bessel",kind:"planet",radius:.95,orbitRadius:28,orbitSpeed:.2,spinSpeed:.28,color:6969408,atmosphere:9470048,description:"Warm rock under twin orange suns — long double shadows.",facts:{type:"Terrestrial",diameterKm:"12,100",distanceAu:"0.8",dayLength:"26 h",gravity:"0.9 g"}},{id:"cygni-61-ii",name:"Swan",kind:"planet",radius:1.08,orbitRadius:78,orbitSpeed:.09,spinSpeed:.24,color:3827832,atmosphere:7381176,description:"Cool ocean world beyond the binary — misty coasts in amber light.",facts:{type:"Ocean world",diameterKm:"13,700",distanceAu:"2.8",dayLength:"30 h",gravity:"1.05 g"}},{id:"cygni-61-iii",name:"Piazzi",kind:"gas-giant",radius:3.7,orbitRadius:112,orbitSpeed:.048,spinSpeed:.5,color:8941664,atmosphere:11044968,rings:{inner:4.5,outer:7,color:13678744},description:"Warm-toned gas giant on the binary’s outer fringe.",facts:{type:"Gas giant",diameterKm:"~105,000",distanceAu:"6.5",dayLength:"12 h",gravity:"1.3 g"},moons:[{id:"cygni-61-iii-moon",name:"Cygnus",kind:"moon",radius:.33,orbitRadius:8,orbitSpeed:.64,spinSpeed:.1,color:13682872,description:"Icy moon of Piazzi — pale under twin K suns.",facts:{type:"Moon",diameterKm:"4,200",distanceAu:"—",dayLength:"4 d",gravity:"0.13 g"}}]}]},rv=[-812,914,-2030],sv={id:"deneb",name:"Deneb",kind:"star",radius:20,orbitRadius:0,orbitSpeed:0,spinSpeed:.06,color:15266047,emissive:13163775,description:"Alpha Cygni — an A2 Ia white supergiant ~2,600 ly away, anchoring the Northern Cross.",facts:{type:"A2 Ia supergiant",diameterKm:"~200M",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"deneb-i",name:"Tail of the Swan",kind:"planet",radius:1,orbitRadius:100,orbitSpeed:.065,spinSpeed:.26,color:5795976,atmosphere:8956104,description:"Speculative temperate world under a distant, brilliant sun.",facts:{type:"Ocean world",diameterKm:"12,700",distanceAu:"50",dayLength:"28 h",gravity:"1.0 g"}},{id:"deneb-ii",name:"Northern Cross",kind:"planet",radius:1.2,orbitRadius:135,orbitSpeed:.038,spinSpeed:.2,color:11059416,atmosphere:13163760,description:"Cold outer rock — Deneb is a fierce point of light in a black sky.",facts:{type:"Ice world",diameterKm:"15,200",distanceAu:"90",dayLength:"36 h",gravity:"0.8 g"}},{id:"deneb-iii",name:"Cygnus Deep",kind:"gas-giant",radius:4.4,orbitRadius:170,orbitSpeed:.025,spinSpeed:.52,color:6324400,atmosphere:8954064,rings:{inner:5.2,outer:8.4,color:13689080},description:"Far ice giant — rings catching the light of a star thousands of years away.",facts:{type:"Ice giant",diameterKm:"~130,000",distanceAu:"160",dayLength:"12 h",gravity:"1.35 g"}}]},av=[54e3,38e4,-38e4],ov={id:"eps-eri",name:"Epsilon Eridani",kind:"star",radius:9.2,orbitRadius:0,orbitSpeed:0,spinSpeed:.055,color:16760944,emissive:16752704,description:"A young K2V star ~10.5 ly away — close, sun-like, and wrapped in dusty debris belts.",facts:{type:"K2V star",diameterKm:"1.0M",distanceAu:"0",dayLength:"11 d",gravity:"—"},moons:[{id:"eps-eri-i",name:"Aegir",kind:"gas-giant",radius:3.6,orbitRadius:48,orbitSpeed:.09,spinSpeed:.5,color:12615760,atmosphere:13932648,rings:{inner:4.4,outer:6.8,color:13676688},description:"Epsilon Eridani b — a warm Jupiter-mass giant in a slightly eccentric orbit.",facts:{type:"Gas giant",diameterKm:"~120,000",distanceAu:"3.4",dayLength:"~10 h",gravity:"~2 g"},moons:[{id:"eps-eri-i-moon",name:"Ran",kind:"moon",radius:.38,orbitRadius:7.8,orbitSpeed:.65,spinSpeed:.1,color:13154464,description:"Icy moon skirting Aegir’s faint rings.",facts:{type:"Moon",diameterKm:"4,800",distanceAu:"—",dayLength:"3 d",gravity:"0.16 g"}}]},{id:"eps-eri-ii",name:"Idunn",kind:"planet",radius:.9,orbitRadius:72,orbitSpeed:.12,spinSpeed:.28,color:4880480,atmosphere:7385232,description:"Speculative temperate world in a quieter gap of the debris disk — green-tinged under orange light.",facts:{type:"Terrestrial",diameterKm:"11,500",distanceAu:"5.5",dayLength:"22 h",gravity:"0.85 g"}},{id:"eps-eri-iii",name:"Frostheim",kind:"planet",radius:1.3,orbitRadius:105,orbitSpeed:.055,spinSpeed:.2,color:11059416,atmosphere:12638448,description:"Cold outer rock among the distant debris — thin frost and long shadows.",facts:{type:"Ice world",diameterKm:"16,500",distanceAu:"10",dayLength:"36 h",gravity:"0.7 g"}}]},lv=[1800,-60,-1200],cv={id:"fomalhaut",name:"Fomalhaut",kind:"star",radius:13.5,orbitRadius:0,orbitSpeed:0,spinSpeed:.1,color:16052456,emissive:15261904,description:"Alpha Piscis Austrini — an A3V star ~25 ly away, famous for its sharp debris ring.",facts:{type:"A3V star",diameterKm:"2.5M",distanceAu:"0",dayLength:"~1 d",gravity:"—"},moons:[{id:"fomalhaut-i",name:"Piscis",kind:"planet",radius:.9,orbitRadius:44,orbitSpeed:.17,spinSpeed:.3,color:8941664,atmosphere:11573376,description:"Warm inner rock inside the debris cavity — dunes and thin haze.",facts:{type:"Terrestrial",diameterKm:"11,400",distanceAu:"2.0",dayLength:"22 h",gravity:"0.85 g"}},{id:"fomalhaut-b",name:"Dagon",kind:"planet",radius:1.4,orbitRadius:88,orbitSpeed:.07,spinSpeed:.22,color:13160664,atmosphere:14739696,description:"Named for the controversial Fomalhaut b candidate — icy, bright, and lonely near the dust ring.",facts:{type:"Ice world",diameterKm:"~18,000",distanceAu:"~115",dayLength:"48 h",gravity:"0.6 g"}},{id:"fomalhaut-iii",name:"Austrinus",kind:"gas-giant",radius:3.9,orbitRadius:120,orbitSpeed:.042,spinSpeed:.5,color:6322312,atmosphere:8954032,rings:{inner:4.7,outer:7.8,color:14213352},description:"Outer ice giant shepherding disk debris — ghostly rings.",facts:{type:"Ice giant",diameterKm:"~110,000",distanceAu:"15",dayLength:"13 h",gravity:"1.25 g"},moons:[{id:"fomalhaut-iii-moon",name:"Diadem",kind:"moon",radius:.3,orbitRadius:8.5,orbitSpeed:.6,spinSpeed:.08,color:15261912,description:"Icy ring shepherd — pale against the debris glow.",facts:{type:"Moon",diameterKm:"3,800",distanceAu:"—",dayLength:"5 d",gravity:"0.12 g"}}]}]},dv=[-4800,-400,-2e3],uv={id:"gliese-581",name:"Gliese 581",kind:"star",radius:4.2,orbitRadius:0,orbitSpeed:0,spinSpeed:.045,color:16738368,emissive:16730152,description:"An M3V red dwarf ~20.5 ly away — home to one of the best-known exoplanet systems.",facts:{type:"M3V star",diameterKm:"400,000",distanceAu:"0",dayLength:"94 d",gravity:"—"},moons:[{id:"gliese-581-e",name:"Gliese 581 e",kind:"planet",radius:.68,orbitRadius:14,orbitSpeed:.55,spinSpeed:.4,color:11563088,atmosphere:13668464,description:"Innermost known world — a scorched low-mass rock.",facts:{type:"Terrestrial",diameterKm:"8,600",distanceAu:"0.03",dayLength:"tidally locked",gravity:"0.9 g"}},{id:"gliese-581-b",name:"Gliese 581 b",kind:"planet",radius:1.2,orbitRadius:28,orbitSpeed:.28,spinSpeed:.25,color:13146208,atmosphere:14725248,description:"Hot Neptune-mass world — dense atmosphere under red glare.",facts:{type:"Hot Neptune",diameterKm:"~15,000",distanceAu:"0.04",dayLength:"5.4 d",gravity:"~1.8 g"}},{id:"gliese-581-c",name:"Gliese 581 c",kind:"planet",radius:1,orbitRadius:42,orbitSpeed:.16,spinSpeed:.3,color:9068616,atmosphere:11567200,description:"Early habitable-zone candidate — likely a Venus-like oven, still dramatic to visit.",facts:{type:"Super-Earth",diameterKm:"12,700",distanceAu:"0.07",dayLength:"13 d",gravity:"1.6 g"}},{id:"gliese-581-d",name:"Gliese 581 d",kind:"planet",radius:1.15,orbitRadius:58,orbitSpeed:.1,spinSpeed:.22,color:3827824,atmosphere:6856880,description:"Cooler outer candidate — thick air, possible oceans under a dim red sun.",facts:{type:"Super-Earth",diameterKm:"14,600",distanceAu:"0.22",dayLength:"67 d",gravity:"1.7 g"}}]},hv=[2904,-207,3111],fv={id:"kapteyn",name:"Kapteyn's Star",kind:"star",radius:4,orbitRadius:0,orbitSpeed:0,spinSpeed:.038,color:16740424,emissive:16732200,description:"An ancient sdM1 halo red dwarf ~12.8 ly away — high proper motion and a pair of candidate planets.",facts:{type:"sdM1 star",diameterKm:"400,000",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"kapteyn-b",name:"Kapteyn b",kind:"planet",radius:1.05,orbitRadius:30,orbitSpeed:.22,spinSpeed:.26,color:4745320,atmosphere:7381152,description:"Candidate super-Earth in the habitable zone — old, dense air under a halo-star sky.",facts:{type:"Super-Earth",diameterKm:"~14,000",distanceAu:"0.17",dayLength:"48 d",gravity:"~1.5 g"}},{id:"kapteyn-c",name:"Kapteyn c",kind:"planet",radius:1.15,orbitRadius:52,orbitSpeed:.12,spinSpeed:.2,color:7375e3,atmosphere:10006720,description:"Colder outer candidate — ice and thin haze.",facts:{type:"Super-Earth",diameterKm:"~15,000",distanceAu:"0.3",dayLength:"120 d",gravity:"~1.6 g"}},{id:"kapteyn-d",name:"Pictor",kind:"planet",radius:.75,orbitRadius:16,orbitSpeed:.45,spinSpeed:.36,color:9465952,atmosphere:11569264,description:"Speculative hot inner rock — ancient crust scarred by age.",facts:{type:"Terrestrial",diameterKm:"9,500",distanceAu:"0.08",dayLength:"tidally locked",gravity:"0.85 g"}}]},pv=[611,-1832,-1832],mv={id:"kepler-186",name:"Kepler-186",kind:"star",radius:4,orbitRadius:0,orbitSpeed:0,spinSpeed:.04,color:16738368,emissive:16730152,description:"An M1V red dwarf ~582 ly away — home to Kepler-186f, the first Earth-sized HZ world found by Kepler.",facts:{type:"M1V star",diameterKm:"520,000",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"kepler-186-b",name:"Kepler-186 b",kind:"planet",radius:.72,orbitRadius:16,orbitSpeed:.5,spinSpeed:.38,color:10508352,atmosphere:12611664,description:"Innermost known world — hot rock under a dim red sun.",facts:{type:"Terrestrial",diameterKm:"~9,200",distanceAu:"0.04",dayLength:"tidally locked",gravity:"~0.9 g"}},{id:"kepler-186-c",name:"Kepler-186 c",kind:"planet",radius:.78,orbitRadius:26,orbitSpeed:.32,spinSpeed:.32,color:8937544,atmosphere:11040856,description:"Warm inner terrestrial in the compact Kepler-186 chain.",facts:{type:"Terrestrial",diameterKm:"~10,000",distanceAu:"0.06",dayLength:"tidally locked",gravity:"~1.0 g"}},{id:"kepler-186-d",name:"Kepler-186 d",kind:"planet",radius:.85,orbitRadius:38,orbitSpeed:.22,spinSpeed:.28,color:6969416,atmosphere:8943720,description:"Mid-chain rocky world — cooler than b and c.",facts:{type:"Terrestrial",diameterKm:"~10,800",distanceAu:"0.09",dayLength:"tidally locked",gravity:"~1.0 g"}},{id:"kepler-186-e",name:"Kepler-186 e",kind:"planet",radius:.88,orbitRadius:50,orbitSpeed:.15,spinSpeed:.26,color:5271648,atmosphere:7903368,description:"Near the inner edge of the habitable zone.",facts:{type:"Terrestrial",diameterKm:"~11,200",distanceAu:"0.12",dayLength:"tidally locked",gravity:"~1.05 g"}},{id:"kepler-186-f",name:"Kepler-186 f",kind:"planet",radius:.98,orbitRadius:64,orbitSpeed:.1,spinSpeed:.24,color:3827824,atmosphere:7383216,description:"Earth-sized world in the habitable zone — the landmark discovery of the system.",facts:{type:"Terrestrial",diameterKm:"~12,400",distanceAu:"0.43",dayLength:"~130 d",gravity:"~1.1 g"}}]},gv=[-36e3,6e4,-96e3],_v={id:"polaris",name:"Polaris",kind:"star",radius:16,orbitRadius:0,orbitSpeed:0,spinSpeed:.04,color:16773328,emissive:16771248,description:"Alpha Ursae Minoris — the North Star, an F7Ib supergiant / Cepheid ~433 ly from Sol.",facts:{type:"F7Ib supergiant",diameterKm:"~50M",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"polaris-b",name:"Polaris Ab",kind:"star",radius:5.5,orbitRadius:48,orbitSpeed:.04,spinSpeed:.06,color:16771272,emissive:16767136,description:"Close F-dwarf companion in the Polaris multiple system.",facts:{type:"F3V star",diameterKm:"~1.4M",distanceAu:"~19",dayLength:"~",gravity:"—"}},{id:"polaris-i",name:"Cynosure",kind:"planet",radius:1.05,orbitRadius:85,orbitSpeed:.08,spinSpeed:.24,color:4745336,atmosphere:8433864,description:"Speculative cool world under the North Star’s glare.",facts:{type:"Ocean world",diameterKm:"13,400",distanceAu:"12",dayLength:"32 h",gravity:"1.05 g"}},{id:"polaris-ii",name:"Lodestar",kind:"gas-giant",radius:4,orbitRadius:120,orbitSpeed:.045,spinSpeed:.5,color:7375016,atmosphere:10006728,rings:{inner:4.8,outer:7.6,color:13688040},description:"Outer ice giant — pale rings catching polar light.",facts:{type:"Ice giant",diameterKm:"~115,000",distanceAu:"28",dayLength:"13 h",gravity:"1.3 g"}}]},vv=[17600,88e3,8800],yv={id:"pollux",name:"Pollux",kind:"star",radius:16,orbitRadius:0,orbitSpeed:0,spinSpeed:.03,color:16752720,emissive:16744488,description:"Beta Geminorum — an orange K0III giant ~34 ly away, with a confirmed exoplanet.",facts:{type:"K0III giant",diameterKm:"12.5M",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"pollux-b",name:"Thestias",kind:"gas-giant",radius:4,orbitRadius:52,orbitSpeed:.085,spinSpeed:.52,color:13142096,atmosphere:14721128,rings:{inner:4.8,outer:7.4,color:14729360},description:"Pollux b / Thestias — a warm Jupiter-mass giant in a close orbit around the giant star.",facts:{type:"Gas giant",diameterKm:"~140,000",distanceAu:"1.6",dayLength:"~10 h",gravity:"~2 g"},moons:[{id:"pollux-b-moon",name:"Castor’s Echo",kind:"moon",radius:.36,orbitRadius:8.4,orbitSpeed:.6,spinSpeed:.1,color:13678744,description:"Warm-toned moon of Thestias — dusty ice under orange light.",facts:{type:"Moon",diameterKm:"4,500",distanceAu:"—",dayLength:"4 d",gravity:"0.15 g"}}]},{id:"pollux-ii",name:"Leda",kind:"planet",radius:.88,orbitRadius:85,orbitSpeed:.08,spinSpeed:.26,color:9072728,atmosphere:11571312,description:"Speculative outer rock beyond Thestias — amber deserts.",facts:{type:"Terrestrial",diameterKm:"11,200",distanceAu:"4.5",dayLength:"28 h",gravity:"0.8 g"}},{id:"pollux-iii",name:"Gemini Outer",kind:"planet",radius:1.3,orbitRadius:118,orbitSpeed:.045,spinSpeed:.18,color:11059408,atmosphere:13163752,description:"Cold outer ice world — long winters under a swollen orange sun.",facts:{type:"Ice world",diameterKm:"16,500",distanceAu:"9",dayLength:"40 h",gravity:"0.75 g"}}]},xv=[-3546,1520,5876],Mv={id:"proxima",name:"Proxima Centauri",kind:"star",radius:3.6,orbitRadius:0,orbitSpeed:0,spinSpeed:.07,color:16736320,emissive:16728096,description:"An M-dwarf flare star — the nearest known stellar neighbor to Sol, and host of Proxima b.",facts:{type:"M5.5Ve star",diameterKm:"200,000",distanceAu:"0",dayLength:"83 d",gravity:"—"},moons:[{id:"proxima-d",name:"Proxima d",kind:"planet",radius:.55,orbitRadius:14,orbitSpeed:.38,spinSpeed:.2,color:9074792,description:"A small rocky world skimming the inner edge of the system.",facts:{type:"Terrestrial",diameterKm:"7,000",distanceAu:"0.03",dayLength:"—",gravity:"0.3 g"}},{id:"proxima-b",name:"Proxima b",kind:"planet",radius:1.02,orbitRadius:26,orbitSpeed:.24,spinSpeed:.12,color:3829413,atmosphere:7255807,description:"Earth-mass world in the habitable zone — the closest known Earth-type exoplanet to Sol.",facts:{type:"Earth-type (terrestrial)",diameterKm:"~13,000",distanceAu:"0.05",dayLength:"Tidally locked?",gravity:"~1.1 g"}},{id:"proxima-c",name:"Proxima c",kind:"planet",radius:1.6,orbitRadius:52,orbitSpeed:.08,spinSpeed:.22,color:6977680,atmosphere:9480384,description:"A cold super-Earth candidate in a wide, icy orbit.",facts:{type:"Super-Earth",diameterKm:"~20,000",distanceAu:"1.5",dayLength:"—",gravity:"~1.5 g"}}]},Sv=[210,45,855],bv={id:"rigel",name:"Rigel",kind:"star",radius:18,orbitRadius:0,orbitSpeed:0,spinSpeed:.08,color:13163775,emissive:10535167,description:"Beta Orionis — a B8 Ia blue-white supergiant ~860 ly away, one of the brightest stars in Earth’s sky.",facts:{type:"B8 Ia supergiant",diameterKm:"~100M",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"rigel-b",name:"Rigel B",kind:"star",radius:6.5,orbitRadius:52,orbitSpeed:.035,spinSpeed:.07,color:13689087,emissive:11587839,description:"Hot companion in the Rigel multiple system.",facts:{type:"B-type star",diameterKm:"~2M",distanceAu:"~20",dayLength:"~",gravity:"—"}},{id:"rigel-i",name:"Foot of Orion",kind:"planet",radius:.9,orbitRadius:90,orbitSpeed:.075,spinSpeed:.28,color:6846600,atmosphere:9480384,description:"Speculative world bathed in fierce blue-white light.",facts:{type:"Terrestrial",diameterKm:"11,400",distanceAu:"35",dayLength:"22 h",gravity:"0.85 g"}},{id:"rigel-ii",name:"Eridanus Gate",kind:"gas-giant",radius:4.2,orbitRadius:125,orbitSpeed:.04,spinSpeed:.55,color:5271720,atmosphere:7903432,rings:{inner:5,outer:8,color:12636400},description:"Ice giant with bright rings under Rigel’s blaze.",facts:{type:"Ice giant",diameterKm:"~125,000",distanceAu:"70",dayLength:"12 h",gravity:"1.4 g"},moons:[{id:"rigel-ii-moon",name:"Saiph’s Echo",kind:"moon",radius:.32,orbitRadius:8.8,orbitSpeed:.58,spinSpeed:.09,color:14739704,description:"Icy moon glittering in blue-white light.",facts:{type:"Moon",diameterKm:"4,000",distanceAu:"—",dayLength:"5 d",gravity:"0.13 g"}}]}]},Ev=[121900,-101900,82e3],Tv={id:"ross-128",name:"Ross 128",kind:"star",radius:3.6,orbitRadius:0,orbitSpeed:0,spinSpeed:.04,color:16736320,emissive:16728104,description:"A quiet M4V red dwarf ~11 ly away — home to Ross 128 b, a temperate Earth-mass world.",facts:{type:"M4V star",diameterKm:"270,000",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"ross-128-b",name:"Ross 128 b",kind:"planet",radius:.92,orbitRadius:32,orbitSpeed:.24,spinSpeed:.3,color:3829848,atmosphere:6858888,description:"Temperate Earth-mass exoplanet — likely tidally locked, with a dayside that may hold liquid water.",facts:{type:"Terrestrial",diameterKm:"~12,000",distanceAu:"0.05",dayLength:"9.9 d",gravity:"~1.1 g"}},{id:"ross-128-c",name:"Viridis",kind:"planet",radius:.78,orbitRadius:18,orbitSpeed:.4,spinSpeed:.35,color:8937544,atmosphere:11040856,description:"Hot inner rock inside the orbit of Ross 128 b.",facts:{type:"Terrestrial",diameterKm:"9,900",distanceAu:"0.025",dayLength:"tidally locked",gravity:"0.9 g"}},{id:"ross-128-d",name:"FI Virginis",kind:"planet",radius:1.25,orbitRadius:70,orbitSpeed:.08,spinSpeed:.18,color:9480376,atmosphere:11585752,description:"Cold outer world — thin frost under a quiet red sun.",facts:{type:"Ice world",diameterKm:"15,800",distanceAu:"0.4",dayLength:"36 h",gravity:"0.8 g"}}]},Av=[500,-400,2200],wv={id:"sirius-a",name:"Sirius A",kind:"star",radius:14,orbitRadius:0,orbitSpeed:0,spinSpeed:.06,color:15266047,emissive:13163775,description:"The Dog Star — an A-type main-sequence star, brightest in Earth’s night sky.",facts:{type:"A1V star",diameterKm:"2.4M",distanceAu:"0",dayLength:"5.5 d",gravity:"—"},moons:[{id:"sirius-b",name:"Sirius B",kind:"star",radius:2.2,orbitRadius:36,orbitSpeed:.11,spinSpeed:.08,color:16120063,emissive:14543103,description:"A white dwarf — Earth-sized mass of a star, fiercely hot and dense.",facts:{type:"White dwarf",diameterKm:"12,000",distanceAu:"—",dayLength:"—",gravity:"350,000 g"}},{id:"sirius-i",name:"Anubis",kind:"planet",radius:.85,orbitRadius:55,orbitSpeed:.18,spinSpeed:.32,color:6975624,atmosphere:11056336,description:"Tide-locked ash world scorched on the day face, frozen on the night.",facts:{type:"Terrestrial",diameterKm:"10,800",distanceAu:"1.8",dayLength:"Tidally locked",gravity:"0.82 g"},moons:[{id:"sirius-i-moon",name:"Wepwawet",kind:"moon",radius:.18,orbitRadius:2.1,orbitSpeed:1.15,spinSpeed:.12,color:11577496,description:"Cratered grey moon of Anubis.",facts:{type:"Moon",diameterKm:"2,200",distanceAu:"—",dayLength:"9 d",gravity:"0.08 g"}}]},{id:"sirius-ii",name:"Sothis",kind:"planet",radius:1.15,orbitRadius:78,orbitSpeed:.11,spinSpeed:.28,color:3828344,atmosphere:8308952,description:"Cool ocean world with thick ice caps under the white glare of Sirius.",facts:{type:"Ocean world",diameterKm:"14,600",distanceAu:"3.2",dayLength:"31 h",gravity:"1.1 g"}},{id:"sirius-iii",name:"Orionis",kind:"gas-giant",radius:4.4,orbitRadius:118,orbitSpeed:.05,spinSpeed:.55,color:5275840,atmosphere:7381216,rings:{inner:5.2,outer:8.5,color:11059424},description:"Blue ice giant with broad, pale rings.",facts:{type:"Ice giant",diameterKm:"128,000",distanceAu:"6.4",dayLength:"14 h",gravity:"1.4 g"},moons:[{id:"sirius-iii-moon",name:"Canicula",kind:"moon",radius:.35,orbitRadius:9.5,orbitSpeed:.55,spinSpeed:.08,color:13682880,description:"Icy shepherd moon skimming the outer rings.",facts:{type:"Moon",diameterKm:"4,400",distanceAu:"—",dayLength:"4.5 d",gravity:"0.15 g"}}]}]},Rv=[-900,40,1550],Cv={id:"sun",name:"Sol",kind:"star",radius:12,orbitRadius:0,orbitSpeed:0,spinSpeed:.05,color:16761446,emissive:16755251,description:"G-type main-sequence star at the heart of the system.",facts:{type:"G2V star",diameterKm:"1.39M",distanceAu:"0",dayLength:"25 d (eq.)",gravity:"28 g"},moons:[{id:"mercury",name:"Mercury",kind:"planet",radius:.55,orbitRadius:22,orbitSpeed:.42,spinSpeed:.12,color:10129540,description:"A scorched, airless world closest to the star.",facts:{type:"Terrestrial",diameterKm:"4,880",distanceAu:"0.39",dayLength:"59 d",gravity:"0.38 g"}},{id:"venus",name:"Venus",kind:"planet",radius:.95,orbitRadius:30,orbitSpeed:.32,spinSpeed:.04,color:14203002,atmosphere:15782032,description:"Opaque sulfuric clouds over a runaway greenhouse.",facts:{type:"Terrestrial",diameterKm:"12,104",distanceAu:"0.72",dayLength:"243 d",gravity:"0.90 g"}},{id:"earth",name:"Earth",kind:"planet",radius:1,orbitRadius:40,orbitSpeed:.26,spinSpeed:.35,color:3829413,atmosphere:7255807,description:"Blue marble — oceans, continents, and a thin biosphere.",facts:{type:"Terrestrial",diameterKm:"12,742",distanceAu:"1.00",dayLength:"24 h",gravity:"1.00 g"},moons:[{id:"luna",name:"Luna",kind:"moon",radius:.27,orbitRadius:2.8,orbitSpeed:1.1,spinSpeed:.08,color:13157560,description:"Earth’s only natural satellite.",facts:{type:"Moon",diameterKm:"3,475",distanceAu:"0.0026",dayLength:"27 d",gravity:"0.17 g"}}]},{id:"mars",name:"Mars",kind:"planet",radius:.7,orbitRadius:52,orbitSpeed:.2,spinSpeed:.32,color:12868146,atmosphere:14712912,description:"Rust deserts, polar caps, and towering volcanoes.",facts:{type:"Terrestrial",diameterKm:"6,779",distanceAu:"1.52",dayLength:"24.6 h",gravity:"0.38 g"},moons:[{id:"phobos",name:"Phobos",kind:"moon",radius:.12,orbitRadius:1.6,orbitSpeed:2.4,spinSpeed:.5,color:9075306,description:"Irregular inner moon of Mars.",facts:{type:"Moon",diameterKm:"22",distanceAu:"—",dayLength:"7.7 h",gravity:"~0"}}]},{id:"jupiter",name:"Jupiter",kind:"gas-giant",radius:4.2,orbitRadius:78,orbitSpeed:.1,spinSpeed:.55,color:12886136,atmosphere:13938832,description:"A swirling gas giant — the system’s gravitational giant.",facts:{type:"Gas giant",diameterKm:"139,820",distanceAu:"5.20",dayLength:"10 h",gravity:"2.53 g"},moons:[{id:"io",name:"Io",kind:"moon",radius:.35,orbitRadius:6.2,orbitSpeed:.9,spinSpeed:.2,color:15257696,description:"Volcanic moon painted in sulfur.",facts:{type:"Moon",diameterKm:"3,643",distanceAu:"—",dayLength:"1.8 d",gravity:"0.18 g"}},{id:"europa",name:"Europa",kind:"moon",radius:.32,orbitRadius:7.8,orbitSpeed:.7,spinSpeed:.18,color:14209216,description:"Icy crust over a suspected subsurface ocean.",facts:{type:"Moon",diameterKm:"3,122",distanceAu:"—",dayLength:"3.6 d",gravity:"0.13 g"}}]},{id:"saturn",name:"Saturn",kind:"gas-giant",radius:3.5,orbitRadius:108,orbitSpeed:.07,spinSpeed:.48,color:14205578,atmosphere:15258784,rings:{inner:4.2,outer:8.6,color:13943968},description:"Pale giant wrapped in iconic ice-and-dust rings.",facts:{type:"Gas giant",diameterKm:"116,460",distanceAu:"9.58",dayLength:"10.7 h",gravity:"1.07 g"},moons:[{id:"titan",name:"Titan",kind:"moon",radius:.45,orbitRadius:9.5,orbitSpeed:.45,spinSpeed:.12,color:12886112,atmosphere:14727280,description:"Thick-atmosphere moon with hydrocarbon lakes.",facts:{type:"Moon",diameterKm:"5,150",distanceAu:"—",dayLength:"16 d",gravity:"0.14 g"}}]},{id:"uranus",name:"Uranus",kind:"gas-giant",radius:2.2,orbitRadius:138,orbitSpeed:.045,spinSpeed:.3,color:9357520,atmosphere:11066596,rings:{inner:2.8,outer:3.8,color:11585744},description:"Ice giant tipped on its side.",facts:{type:"Ice giant",diameterKm:"50,724",distanceAu:"19.2",dayLength:"17 h",gravity:"0.89 g"}},{id:"neptune",name:"Neptune",kind:"gas-giant",radius:2.1,orbitRadius:165,orbitSpeed:.035,spinSpeed:.28,color:3828432,atmosphere:5933800,description:"Deep-blue ice giant with supersonic winds.",facts:{type:"Ice giant",diameterKm:"49,244",distanceAu:"30.1",dayLength:"16 h",gravity:"1.14 g"},moons:[{id:"triton",name:"Triton",kind:"moon",radius:.28,orbitRadius:4.2,orbitSpeed:-.55,spinSpeed:.15,color:12630216,description:"Retrograde captured moon of Neptune.",facts:{type:"Moon",diameterKm:"2,707",distanceAu:"—",dayLength:"5.9 d",gravity:"0.08 g"}}]},{id:"pluto",name:"Pluto",kind:"dwarf",radius:.35,orbitRadius:195,orbitSpeed:.02,spinSpeed:.1,color:13152416,description:"Distant dwarf world of ice plains and haze.",facts:{type:"Dwarf planet",diameterKm:"2,377",distanceAu:"39.5",dayLength:"6.4 d",gravity:"0.06 g"}}]},Lv={id:"tau-ceti",name:"Tau Ceti",kind:"star",radius:10.5,orbitRadius:0,orbitSpeed:0,spinSpeed:.05,color:16771264,emissive:16765072,description:"A quiet G8V sun ~11.9 ly away — older than Sol, metal-poor, and wrapped in dusty belts.",facts:{type:"G8V star",diameterKm:"1.1M",distanceAu:"0",dayLength:"34 d",gravity:"—"},moons:[{id:"tau-ceti-e",name:"Tau Ceti e",kind:"planet",radius:1.05,orbitRadius:38,orbitSpeed:.18,spinSpeed:.3,color:3827840,atmosphere:7383240,description:"A candidate super-Earth in the warm habitable zone — thick air and stormy oceans.",facts:{type:"Super-Earth",diameterKm:"13,800",distanceAu:"0.55",dayLength:"20 h",gravity:"1.4 g"}},{id:"tau-ceti-f",name:"Tau Ceti f",kind:"planet",radius:1.12,orbitRadius:58,orbitSpeed:.11,spinSpeed:.26,color:2775112,atmosphere:6858888,description:"Cooler habitable-zone candidate — misty continents under a pale yellow sun.",facts:{type:"Super-Earth",diameterKm:"14,600",distanceAu:"1.35",dayLength:"28 h",gravity:"1.5 g"}},{id:"tau-ceti-g",name:"Cetus Outer",kind:"gas-giant",radius:3.8,orbitRadius:95,orbitSpeed:.05,spinSpeed:.48,color:7375016,atmosphere:9480384,rings:{inner:4.6,outer:7.2,color:12636384},description:"Ice giant beyond the debris disk — pale bands and thin rings.",facts:{type:"Ice giant",diameterKm:"~100,000",distanceAu:"5.2",dayLength:"14 h",gravity:"1.2 g"},moons:[{id:"tau-ceti-g-moon",name:"Menkar",kind:"moon",radius:.34,orbitRadius:8.2,orbitSpeed:.62,spinSpeed:.1,color:14209224,description:"Shepherd moon of Cetus Outer — cratered ice and dust.",facts:{type:"Moon",diameterKm:"4,300",distanceAu:"—",dayLength:"4 d",gravity:"0.14 g"}}]}]},Pv=[-2200,-100,1100],Iv={id:"trappist-1",name:"TRAPPIST-1",kind:"star",radius:2.4,orbitRadius:0,orbitSpeed:0,spinSpeed:.09,color:16732208,emissive:16723984,description:"An ultra-cool red dwarf — seven rocky worlds orbit closer than Mercury to Sol.",facts:{type:"M8V star",diameterKm:"160,000",distanceAu:"0",dayLength:"3.3 d",gravity:"—"},moons:[{id:"trap-b",name:"TRAPPIST-1b",kind:"planet",radius:.86,orbitRadius:10,orbitSpeed:.55,spinSpeed:.15,color:10510400,atmosphere:12615760,description:"Innermost world — likely a searing, airless or thick-atmosphere rock.",facts:{type:"Terrestrial",diameterKm:"~11,000",distanceAu:"0.011",dayLength:"1.5 d",gravity:"~0.8 g"}},{id:"trap-c",name:"TRAPPIST-1c",kind:"planet",radius:.92,orbitRadius:13.5,orbitSpeed:.42,spinSpeed:.14,color:11563088,atmosphere:13668448,description:"Venus-like heat under a dim crimson sun.",facts:{type:"Terrestrial",diameterKm:"~11,700",distanceAu:"0.015",dayLength:"2.4 d",gravity:"~0.9 g"}},{id:"trap-d",name:"TRAPPIST-1d",kind:"planet",radius:.78,orbitRadius:18,orbitSpeed:.32,spinSpeed:.16,color:7372912,atmosphere:9480336,description:"Borderline temperate — may retain a thin atmosphere.",facts:{type:"Terrestrial",diameterKm:"~9,900",distanceAu:"0.022",dayLength:"4.0 d",gravity:"~0.4 g"}},{id:"trap-e",name:"TRAPPIST-1e",kind:"planet",radius:.95,orbitRadius:23,orbitSpeed:.24,spinSpeed:.12,color:3829413,atmosphere:7255807,description:"Prime habitable-zone candidate — Earth-sized with possible oceans under red twilight.",facts:{type:"Earth-type (terrestrial)",diameterKm:"~12,000",distanceAu:"0.029",dayLength:"6.1 d",gravity:"~0.8 g"}},{id:"trap-f",name:"TRAPPIST-1f",kind:"planet",radius:1,orbitRadius:29,orbitSpeed:.18,spinSpeed:.11,color:4878480,atmosphere:8433872,description:"Cooler Earth-sized world — ice and liquid water may coexist.",facts:{type:"Earth-type (terrestrial)",diameterKm:"~12,700",distanceAu:"0.038",dayLength:"9.2 d",gravity:"~0.9 g"}},{id:"trap-g",name:"TRAPPIST-1g",kind:"planet",radius:1.05,orbitRadius:36,orbitSpeed:.14,spinSpeed:.1,color:3825800,atmosphere:7379136,description:"Outer habitable-zone rock — thick ice or a deep ocean under clouds.",facts:{type:"Earth-type (terrestrial)",diameterKm:"~13,300",distanceAu:"0.047",dayLength:"12.4 d",gravity:"~1.0 g"}},{id:"trap-h",name:"TRAPPIST-1h",kind:"planet",radius:.72,orbitRadius:44,orbitSpeed:.1,spinSpeed:.13,color:7372952,description:"Farthest known planet — a cold, dimly lit ice world.",facts:{type:"Terrestrial",diameterKm:"~9,200",distanceAu:"0.062",dayLength:"18.8 d",gravity:"~0.3 g"}}]},Dv=[4200,200,-7e3],Uv={id:"vega",name:"Vega",kind:"star",radius:14,orbitRadius:0,orbitSpeed:0,spinSpeed:.14,color:15266047,emissive:13162751,description:"Alpha Lyrae — a blazing A0V star ~25 ly away, spinning fast with a dusty protoplanetary disk.",facts:{type:"A0V star",diameterKm:"3.3M (eq.)",distanceAu:"0",dayLength:"12.5 h",gravity:"—"},moons:[{id:"vega-i",name:"Lyra",kind:"planet",radius:.85,orbitRadius:48,orbitSpeed:.19,spinSpeed:.32,color:10125416,atmosphere:12626056,description:"Scorched inner world — metal-rich crust under Vega’s fierce light.",facts:{type:"Terrestrial",diameterKm:"10,800",distanceAu:"1.8",dayLength:"16 h",gravity:"0.8 g"}},{id:"vega-ii",name:"Harp",kind:"planet",radius:1.08,orbitRadius:78,orbitSpeed:.1,spinSpeed:.24,color:4745336,atmosphere:8433864,description:"Speculative cool ocean world beyond the bright inner disk — deep blues and high winds.",facts:{type:"Ocean world",diameterKm:"13,700",distanceAu:"4.2",dayLength:"30 h",gravity:"1.1 g"}},{id:"vega-iii",name:"Sheliak",kind:"gas-giant",radius:4.2,orbitRadius:118,orbitSpeed:.045,spinSpeed:.55,color:8952e3,atmosphere:11057376,rings:{inner:5,outer:8.2,color:13687024},description:"Cold giant among Vega’s outer debris — icy rings catching blue-white light.",facts:{type:"Ice giant",diameterKm:"~125,000",distanceAu:"9",dayLength:"11 h",gravity:"1.4 g"},moons:[{id:"vega-iii-moon",name:"Sulafat",kind:"moon",radius:.32,orbitRadius:9,orbitSpeed:.58,spinSpeed:.09,color:14738672,description:"Bright icy moon — glittering under Vega’s glare.",facts:{type:"Moon",diameterKm:"4,000",distanceAu:"—",dayLength:"5 d",gravity:"0.13 g"}}]}]},Fv=[800,2800,-4200],Nv={id:"wolf-359",name:"Wolf 359",kind:"star",radius:2.8,orbitRadius:0,orbitSpeed:0,spinSpeed:.035,color:16730152,emissive:16723992,description:"A flare-active M6V red dwarf ~7.9 ly away — among the faintest neighbors of Sol.",facts:{type:"M6V star",diameterKm:"200,000",distanceAu:"0",dayLength:"~",gravity:"—"},moons:[{id:"wolf-359-b",name:"Wolf b",kind:"planet",radius:.7,orbitRadius:16,orbitSpeed:.48,spinSpeed:.38,color:10506296,atmosphere:12609608,description:"Inner scorched rock — baked by flares and crimson light.",facts:{type:"Terrestrial",diameterKm:"8,900",distanceAu:"0.02",dayLength:"tidally locked",gravity:"0.85 g"}},{id:"wolf-359-c",name:"CN Leonis",kind:"planet",radius:.98,orbitRadius:34,orbitSpeed:.2,spinSpeed:.28,color:6838344,atmosphere:8943720,description:"Dusty temperate candidate — thin air under a dim red sun.",facts:{type:"Terrestrial",diameterKm:"12,400",distanceAu:"0.09",dayLength:"24 h",gravity:"0.95 g"}},{id:"wolf-359-d",name:"Leo Ice",kind:"planet",radius:1.2,orbitRadius:58,orbitSpeed:.09,spinSpeed:.16,color:11057352,atmosphere:13162728,description:"Frozen outer world — methane haze and long nights.",facts:{type:"Ice world",diameterKm:"15,200",distanceAu:"0.28",dayLength:"42 h",gravity:"0.7 g"}}]},kv=[-1200,200,1100];function Mr(i){const e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function Ov(i){const e=i%3===0?1:0,t=new sl(1,e),n=t.attributes.position,r=.65+Mr(i*1.1)*.7,s=.55+Mr(i*2.3)*.85,a=.6+Mr(i*3.7)*.75;for(let o=0;o<n.count;o++){const l=n.getX(o),c=n.getY(o),d=n.getZ(o),u=Math.hypot(l,c,d)||1,f=l/u,m=c/u,g=d/u,_=.72+Mr(i*17+o*3.1)*.45+Math.sin(f*6.2+i)*.08+Math.cos(m*5.1-i*2)*.07;n.setXYZ(o,f*_*r,m*_*s,g*_*a)}return t.computeVertexNormals(),t}function Bv(i){return new Ir({color:i,roughness:.72,metalness:.08,flatShading:!0,emissive:new ye(i).multiplyScalar(.22),emissiveIntensity:.35})}class zv{group=new en;tumblers=[];dummy=new mt;color=new ye;constructor(e=62,t=72,n=720){const r=[12892324,11049088,13681840,10129020,12101776,9340020],s=4,a=Math.ceil(n/s),o=new cl(16773336,2760752,.85);this.group.add(o);const l=new iu(16770752,1.35);l.position.set(0,25,0),this.group.add(l);for(let c=0;c<s;c++){const d=Ov(c*97+11),u=Bv(r[c%r.length]),f=new bf(d,u,a);f.instanceMatrix.setUsage(Ch),f.castShadow=!1,f.receiveShadow=!1,f.frustumCulled=!1;const m=new Float32Array(a),g=new Float32Array(a*3);let _=0;for(let p=0;p<a;p++){const h=c*a+p,b=Math.pow(Math.random(),.75),E=e+b*(t-e),M=Math.random()*Math.PI*2,P=(Math.random()-.5)*(.6+Math.random()*1.8),R=Math.random(),w=R>.97?.35+Math.random()*.45:R>.85?.14+Math.random()*.18:.04+Math.random()*.1;this.dummy.position.set(Math.cos(M)*E,P,Math.sin(M)*E),this.dummy.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2),this.dummy.scale.setScalar(w),this.dummy.updateMatrix(),f.setMatrixAt(p,this.dummy.matrix);const I=.9+Mr(h*4.2)*.35;this.color.set(r[(c+h%3)%r.length]),this.color.multiplyScalar(I),f.setColorAt(p,this.color),m[p]=(.05+Math.random()*.25)*(Math.random()>.5?1:-1);const S=Math.random()-.5,x=Math.random()-.5,L=Math.random()-.5,V=Math.hypot(S,x,L)||1;g[p*3]=S/V,g[p*3+1]=x/V,g[p*3+2]=L/V,_++}f.count=_,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),this.group.add(f),this.tumblers.push({mesh:f,spins:m,axes:g})}this.group.add(this.createDust(e-1,t+1,1400))}createDust(e,t,n){const r=new Float32Array(n*3),s=new Float32Array(n*3),a=new ye;for(let l=0;l<n;l++){const c=Math.random()*Math.PI*2,d=e+Math.random()*(t-e);r[l*3]=Math.cos(c)*d,r[l*3+1]=(Math.random()-.5)*1.4,r[l*3+2]=Math.sin(c)*d,a.setHSL(.08,.12,.35+Math.random()*.25),s[l*3]=a.r,s[l*3+1]=a.g,s[l*3+2]=a.b}const o=new gt;return o.setAttribute("position",new pt(r,3)),o.setAttribute("color",new pt(s,3)),new Xi(o,new hi({size:.1,vertexColors:!0,transparent:!0,opacity:.65,sizeAttenuation:!0,depthWrite:!1}))}update(e){const t=new Yn,n=new A,r=new Ye,s=new A,a=new Yn,o=new A;for(const{mesh:l,spins:c,axes:d}of this.tumblers){for(let u=0;u<l.count;u++)l.getMatrixAt(u,r),r.decompose(s,a,o),n.set(d[u*3],d[u*3+1],d[u*3+2]),t.setFromAxisAngle(n,c[u]*e),a.premultiply(t),this.dummy.position.copy(s),this.dummy.quaternion.copy(a),this.dummy.scale.copy(o),this.dummy.updateMatrix(),l.setMatrixAt(u,this.dummy.matrix);l.instanceMatrix.needsUpdate=!0}}}const Gv=new ll,ad={sun:{map:"/textures/2k_sun.jpg"},mercury:{map:"/textures/2k_mercury.jpg"},venus:{map:"/textures/2k_venus_surface.jpg"},earth:{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},luna:{map:"/textures/2k_moon.jpg"},mars:{map:"/textures/2k_mars.jpg"},jupiter:{map:"/textures/2k_jupiter.jpg"},saturn:{map:"/textures/2k_saturn.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},uranus:{map:"/textures/2k_uranus.jpg"},neptune:{map:"/textures/2k_neptune.jpg"},io:{map:"/textures/2k_mars.jpg"},europa:{map:"/textures/2k_moon.jpg"},titan:{map:"/textures/2k_venus_surface.jpg"},triton:{map:"/textures/2k_moon.jpg"},phobos:{map:"/textures/2k_mercury.jpg"},pluto:{map:"/textures/2k_moon.jpg"},"acen-a":{map:"/textures/2k_sun.jpg"},"acen-b":{map:"/textures/2k_sun.jpg"},"acen-i":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"acen-ii":{map:"/textures/2k_mars.jpg"},"acen-iii":{map:"/textures/2k_saturn.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"acen-i-moon":{map:"/textures/2k_moon.jpg"},proxima:{map:"/textures/2k_sun.jpg"},"proxima-b":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"proxima-d":{map:"/textures/2k_mercury.jpg"},"proxima-c":{map:"/textures/2k_neptune.jpg"},"trappist-1":{map:"/textures/2k_sun.jpg"},"trap-b":{map:"/textures/2k_venus_surface.jpg"},"trap-c":{map:"/textures/2k_venus_surface.jpg"},"trap-d":{map:"/textures/2k_mars.jpg"},"trap-e":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"trap-f":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"trap-g":{map:"/textures/2k_neptune.jpg"},"trap-h":{map:"/textures/2k_moon.jpg"},"eps-eri":{map:"/textures/2k_sun.jpg"},"eps-eri-i":{map:"/textures/2k_saturn.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"eps-eri-i-moon":{map:"/textures/2k_moon.jpg"},"eps-eri-ii":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"eps-eri-iii":{map:"/textures/2k_uranus.jpg"},altair:{map:"/textures/2k_sun.jpg"},"altair-i":{map:"/textures/2k_mercury.jpg"},"altair-ii":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"altair-iii":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"altair-iii-moon":{map:"/textures/2k_moon.jpg"},barnard:{map:"/textures/2k_sun.jpg"},"barnard-b":{map:"/textures/2k_mercury.jpg"},"barnard-c":{map:"/textures/2k_mars.jpg"},"barnard-d":{map:"/textures/2k_uranus.jpg"},"tau-ceti":{map:"/textures/2k_sun.jpg"},"tau-ceti-e":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"tau-ceti-f":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"tau-ceti-g":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"tau-ceti-g-moon":{map:"/textures/2k_moon.jpg"},vega:{map:"/textures/2k_sun.jpg"},"vega-i":{map:"/textures/2k_mercury.jpg"},"vega-ii":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"vega-iii":{map:"/textures/2k_uranus.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"vega-iii-moon":{map:"/textures/2k_moon.jpg"},fomalhaut:{map:"/textures/2k_sun.jpg"},"fomalhaut-i":{map:"/textures/2k_venus_surface.jpg"},"fomalhaut-b":{map:"/textures/2k_uranus.jpg"},"fomalhaut-iii":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"fomalhaut-iii-moon":{map:"/textures/2k_moon.jpg"},"gliese-581":{map:"/textures/2k_sun.jpg"},"gliese-581-e":{map:"/textures/2k_mercury.jpg"},"gliese-581-b":{map:"/textures/2k_venus_surface.jpg"},"gliese-581-c":{map:"/textures/2k_venus_surface.jpg"},"gliese-581-d":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"wolf-359":{map:"/textures/2k_sun.jpg"},"wolf-359-b":{map:"/textures/2k_mercury.jpg"},"wolf-359-c":{map:"/textures/2k_mars.jpg"},"wolf-359-d":{map:"/textures/2k_uranus.jpg"},"ross-128":{map:"/textures/2k_sun.jpg"},"ross-128-b":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"ross-128-c":{map:"/textures/2k_venus_surface.jpg"},"ross-128-d":{map:"/textures/2k_neptune.jpg"},"cygni-61-a":{map:"/textures/2k_sun.jpg"},"cygni-61-b":{map:"/textures/2k_sun.jpg"},"cygni-61-i":{map:"/textures/2k_mars.jpg"},"cygni-61-ii":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"cygni-61-iii":{map:"/textures/2k_saturn.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"cygni-61-iii-moon":{map:"/textures/2k_moon.jpg"},kapteyn:{map:"/textures/2k_sun.jpg"},"kapteyn-b":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},"kapteyn-c":{map:"/textures/2k_neptune.jpg"},"kapteyn-d":{map:"/textures/2k_mercury.jpg"},pollux:{map:"/textures/2k_sun.jpg"},"pollux-b":{map:"/textures/2k_jupiter.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"pollux-b-moon":{map:"/textures/2k_moon.jpg"},"pollux-ii":{map:"/textures/2k_venus_surface.jpg"},"pollux-iii":{map:"/textures/2k_uranus.jpg"},polaris:{map:"/textures/2k_sun.jpg"},"polaris-b":{map:"/textures/2k_sun.jpg"},"polaris-i":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"polaris-ii":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},betelgeuse:{map:"/textures/2k_sun.jpg"},"betelgeuse-i":{map:"/textures/2k_mars.jpg"},"betelgeuse-ii":{map:"/textures/2k_uranus.jpg"},"betelgeuse-iii":{map:"/textures/2k_jupiter.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"kepler-186":{map:"/textures/2k_sun.jpg"},"kepler-186-b":{map:"/textures/2k_mercury.jpg"},"kepler-186-c":{map:"/textures/2k_venus_surface.jpg"},"kepler-186-d":{map:"/textures/2k_mars.jpg"},"kepler-186-e":{map:"/textures/2k_mars.jpg"},"kepler-186-f":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg",emissiveMap:"/textures/2k_earth_nightmap.jpg"},rigel:{map:"/textures/2k_sun.jpg"},"rigel-b":{map:"/textures/2k_sun.jpg"},"rigel-i":{map:"/textures/2k_mercury.jpg"},"rigel-ii":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"},"rigel-ii-moon":{map:"/textures/2k_moon.jpg"},deneb:{map:"/textures/2k_sun.jpg"},"deneb-i":{map:"/textures/2k_earth_daymap.jpg",clouds:"/textures/2k_earth_clouds.jpg"},"deneb-ii":{map:"/textures/2k_uranus.jpg"},"deneb-iii":{map:"/textures/2k_neptune.jpg",ringMap:"/textures/2k_saturn_ring_alpha.png"}},od=new Map;function Vv(i,e=!0){return i.colorSpace=e?nt:cn,i.anisotropy=8,i.wrapS=wr,i.wrapT=Ot,i.needsUpdate=!0,i}function vs(i,e=!0){const t=yi(i.replace(/^\//,"")),n=`${t}|${e?"srgb":"linear"}`,r=od.get(n);return r?Promise.resolve(r):new Promise((s,a)=>{Gv.load(t,o=>{Vv(o,e),od.set(n,o),s(o)},void 0,a)})}function Hv(i,e=1){const t=new ye(i);return new pn({uniforms:{glowColor:{value:t},coef:{value:.55},power:{value:4.5/Math.max(e,.35)},strength:{value:1.1*e}},vertexShader:`
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform float coef;
      uniform float power;
      uniform float strength;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(coef - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
        intensity = clamp(intensity * strength, 0.0, 1.0);
        gl_FragColor = vec4(glowColor, intensity);
      }
    `,side:It,blending:ln,transparent:!0,depthWrite:!1})}function Uo(i,e){const n=document.createElement("canvas");n.width=512,n.height=512;const r=n.getContext("2d"),s=new ye(i);r.fillStyle=`#${s.getHexString()}`,r.fillRect(0,0,512,512);for(let o=0;o<400;o++){const l=.65+Math.random()*.45,c=s.clone().multiplyScalar(l);r.fillStyle=`#${c.getHexString()}`,r.beginPath(),r.arc(Math.random()*512,Math.random()*512,1+Math.random()*8,0,Math.PI*2),r.fill()}if(e==="gas-giant")for(let o=0;o<512;o++){const l=Math.sin(o*.12+Math.sin(o*.04)*2)*.5+.5,c=s.clone().multiplyScalar(.7+l*.45);r.fillStyle=`rgba(${Math.floor(c.r*255)},${Math.floor(c.g*255)},${Math.floor(c.b*255)},0.55)`,r.fillRect(0,o,512,1)}const a=new Vt(n);return a.colorSpace=nt,a.anisotropy=8,a}function Wv(i){const n=document.createElement("canvas");n.width=1024,n.height=64;const r=n.getContext("2d"),s=new ye(i);for(let o=0;o<1024;o++){const l=o/1024,d=Math.abs(l-.62)<.025||Math.abs(l-.38)<.012?0:.2+Math.sin(l*90)*.1+Math.random()*.4;r.fillStyle=`rgba(${Math.floor(s.r*255)},${Math.floor(s.g*255)},${Math.floor(s.b*255)},${d})`,r.fillRect(o,0,1,64)}const a=new Vt(n);return a.colorSpace=nt,a.wrapS=Ot,a.wrapT=Ot,a.generateMipmaps=!1,a.minFilter=Et,a.magFilter=Et,a}function Xv(i,e=15260864){return new Promise((t,n)=>{const r=new Image;r.decoding="async",r.onload=()=>{const s=r.width,a=Math.max(64,r.height),o=document.createElement("canvas");o.width=s,o.height=a;const l=document.createElement("canvas");l.width=s,l.height=a;const c=o.getContext("2d"),d=l.getContext("2d");c.imageSmoothingEnabled=!1,d.imageSmoothingEnabled=!1,c.drawImage(r,0,0,s,a);const u=c.getImageData(0,0,s,a),f=u.data,m=d.createImageData(s,a),g=m.data,_=new ye(e);for(let b=0;b<f.length;b+=4){const E=f[b],M=f[b+1],P=f[b+2],R=f[b+3]/255,w=(.2126*E+.7152*M+.0722*P)/255,I=Math.pow(Math.min(1,Math.max(w,R)*1.35),.85),S=Math.round(I*255);f[b]=Math.min(255,Math.round(E*.55+_.r*255*.45)),f[b+1]=Math.min(255,Math.round(M*.55+_.g*255*.45)),f[b+2]=Math.min(255,Math.round(P*.55+_.b*255*.45)),f[b+3]=255,g[b]=S,g[b+1]=S,g[b+2]=S,g[b+3]=255}c.putImageData(u,0,0),d.putImageData(m,0,0);const p=new Vt(o);p.colorSpace=nt,p.wrapS=Ot,p.wrapT=Ot,p.generateMipmaps=!1,p.minFilter=Et,p.magFilter=Et,p.needsUpdate=!0;const h=new Vt(l);h.colorSpace=cn,h.wrapS=Ot,h.wrapT=Ot,h.generateMipmaps=!1,h.minFilter=Et,h.magFilter=Et,h.needsUpdate=!0,t({map:p,alphaMap:h})},r.onerror=()=>n(new Error(`Failed to load ring texture: ${i}`)),r.src=yi(i.replace(/^\//,""))})}const qv=`
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,Kv=`
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D specularMap;
  uniform bool hasSpecularMap;
  uniform vec3 sunPosition;
  uniform vec3 sunColor;
  uniform float nightGlow;
  uniform float specularStrength;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(sunPosition - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);

    float ndotl = dot(N, L);
    // Soft terminator — a little atmosphere scatter into the night side
    float day = smoothstep(-0.08, 0.22, ndotl);
    float twilight = smoothstep(-0.18, 0.05, ndotl) * (1.0 - smoothstep(0.05, 0.35, ndotl));

    vec3 dayColor = texture2D(dayMap, vUv).rgb;
    vec3 nightColor = texture2D(nightMap, vUv).rgb;

    // Approximate ocean mask from day blues when no specular map is present
    float ocean = hasSpecularMap
      ? texture2D(specularMap, vUv).r
      : smoothstep(0.05, 0.42, dayColor.b - max(dayColor.r, dayColor.g) * 0.55);

    float diffuse = max(ndotl, 0.0);
    vec3 litDay = dayColor * (0.12 + sunColor * diffuse * 1.15);
    // City lights only on the night hemisphere
    vec3 litNight = nightColor * nightGlow * (1.0 - day);

    vec3 color = mix(litNight, litDay, day);
    // Thin orange terminator rim
    color += vec3(1.0, 0.55, 0.25) * twilight * 0.12 * dayColor;

    // Specular glint on oceans (day side only)
    vec3 R = reflect(-L, N);
    float spec = pow(max(dot(R, V), 0.0), 48.0) * ocean * day * specularStrength;
    color += sunColor * spec;

    gl_FragColor = vec4(color, 1.0);
  }
`,Yv=`
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,jv=`
  uniform sampler2D cloudMap;
  uniform vec3 sunPosition;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec4 cloud = texture2D(cloudMap, vUv);
    float alpha = max(cloud.r, max(cloud.g, cloud.b)) * 0.55;
    float day = smoothstep(-0.05, 0.25, dot(normalize(vWorldNormal), normalize(sunPosition - vWorldPos)));
    // Clouds nearly vanish on the night side
    alpha *= mix(0.08, 1.0, day);
    vec3 color = cloud.rgb * mix(0.15, 1.05, day);
    gl_FragColor = vec4(color, alpha);
  }
`;function $v(i){return new pn({uniforms:{dayMap:{value:i},nightMap:{value:i},specularMap:{value:i},hasSpecularMap:{value:!1},sunPosition:{value:new A(0,0,0)},sunColor:{value:new ye(16769712)},nightGlow:{value:1.35},specularStrength:{value:.85}},vertexShader:qv,fragmentShader:Kv})}function Zv(i){return new pn({uniforms:{cloudMap:{value:i},sunPosition:{value:new A(0,0,0)}},vertexShader:Yv,fragmentShader:jv,transparent:!0,depthWrite:!1})}function ld(i,e){i.uniforms.sunPosition.value.copy(e)}function Jv(i){const e=i.image;if(!e||!("width"in e))return null;const t=Math.min(1024,e.width),n=Math.min(512,e.height),r=document.createElement("canvas");r.width=t,r.height=n;const s=r.getContext("2d");s.drawImage(e,0,0,t,n);const a=s.getImageData(0,0,t,n),o=a.data;for(let c=0;c<o.length;c+=4){const d=o[c],u=o[c+1],f=o[c+2],m=st.clamp((f-Math.max(d,u)*.55)/80,0,1),g=Math.round(Math.pow(m,.85)*255);o[c]=g,o[c+1]=g,o[c+2]=g,o[c+3]=255}s.putImageData(a,0,0);const l=new Vt(r);return l.colorSpace=cn,l.wrapS=wr,l.wrapT=Ot,l.needsUpdate=!0,l}function Qv(){return Uo(3829413,"earth")}function ey(i){switch(i){case"io":return 16769152;case"europa":return 15788248;case"titan":return 14721104;case"triton":return 13682912;case"phobos":return 11575440;case"pluto":return 14205104;case"acen-i":return 13164752;case"acen-ii":return 14712912;case"acen-i-moon":return 13682872;case"proxima-d":return 12626064;case"proxima-c":return 11583704;default:return 16777215}}const ty=new Set(["proxima","trappist-1","barnard","gliese-581","wolf-359","ross-128","kapteyn","kepler-186"]);function Oa(i){return i==="earth"||i==="proxima-b"||i==="trap-e"||i==="trap-f"||i==="tau-ceti-e"||i==="tau-ceti-f"||i==="gliese-581-d"||i==="vega-ii"||i==="ross-128-b"||i==="kapteyn-b"||i==="cygni-61-ii"||i==="kepler-186-f"||i==="polaris-i"||i==="deneb-i"}class hl{def;systemId="";systemName="";pivot=new mt;mesh;pickMesh;children=[];orbitAngle;spin=Math.random()*Math.PI*2;cloudSpin=0;clouds;stdMaterial;basicMaterial;earthMaterial;cloudMaterial;sunPos=new A;constructor(e){this.def=e,this.orbitAngle=Math.random()*Math.PI*2;const t=e.kind==="star"||e.kind==="gas-giant"?96:80,n=new un(e.radius,t,Math.floor(t*.75)),r=Oa(e.id)?"earth":e.kind==="star"?"star":e.kind==="gas-giant"?"gas-giant":"rocky";if(Oa(e.id))this.earthMaterial=$v(Qv()),this.mesh=new Qe(n,this.earthMaterial);else if(e.kind==="star"){const s=Uo(e.color,"star");this.basicMaterial=new qt({map:s,color:ty.has(e.id)?16744544:e.color===16756832?16760976:16773840}),this.mesh=new Qe(n,this.basicMaterial)}else{const s=Uo(e.color,r);this.stdMaterial=new Ir({map:s,color:ey(e.id),roughness:e.kind==="gas-giant"?.92:.78,metalness:e.kind==="gas-giant"?.02:.08,bumpScale:e.radius*.04}),this.mesh=new Qe(n,this.stdMaterial)}if(this.mesh.name=e.id,this.mesh.userData.body=this,this.pivot.add(this.mesh),this.pickMesh=new Qe(new un(Math.max(e.radius*1.35,.55),16,12),new qt({visible:!1})),this.pickMesh.userData.body=this,this.mesh.add(this.pickMesh),e.atmosphere){const s=new Qe(new un(e.radius*1.045,64,48),Hv(e.atmosphere,Oa(e.id)||e.id==="acen-i"?1.15:.9));this.mesh.add(s)}if(e.rings&&this.addRings(e),e.kind==="star"&&this.addStarEffects(e),e.orbitRadius>0){const s=new Qd(new gt().setFromPoints(Array.from({length:128},(a,o)=>{const l=o/127*Math.PI*2;return new A(Math.cos(l)*e.orbitRadius,0,Math.sin(l)*e.orbitRadius)})),new il({color:6982314,transparent:!0,opacity:.18}));this.pivot.userData.orbitLine=s}for(const s of e.moons??[]){const a=new hl(s);this.children.push(a),this.pivot.add(a.pivot);const o=a.pivot.userData.orbitLine;o&&this.pivot.add(o)}this.loadPhotorealMaps(),this.update(0)}addStarEffects(e){const t=e.radius>10?5.2:2.8,n=Math.max(900,e.radius*85),r=new Df(16769712,t,n,.35);this.mesh.add(r)}addRings(e){const t=e.rings,n=new al(t.inner,t.outer,192,8),r=n.attributes.position,s=n.attributes.uv;for(let d=0;d<r.count;d++){const u=r.getX(d),f=r.getY(d),m=Math.hypot(u,f);s.setXY(d,(m-t.inner)/(t.outer-t.inner),.5)}s.needsUpdate=!0;const a=Wv(t.color),o=new qt({map:a,alphaMap:a,color:16777215,side:kt,transparent:!0,depthWrite:!1,opacity:1,alphaTest:.04}),l=new Qe(n,o);l.rotation.x=Math.PI/2,l.rotation.z=st.degToRad(e.id==="saturn"?-26.7:-12),l.name=`${e.id}-rings`,l.renderOrder=2,this.mesh.add(l);const c=ad[e.id];c?.ringMap&&Xv(c.ringMap,t.color).then(({map:d,alphaMap:u})=>{o.map=d,o.alphaMap=u,o.needsUpdate=!0,a.dispose()})}async loadPhotorealMaps(){const e=ad[this.def.id];if(e?.map){try{const t=await vs(e.map);if(this.basicMaterial&&(this.basicMaterial.map=t,this.basicMaterial.needsUpdate=!0),this.stdMaterial&&(this.stdMaterial.map=t,this.stdMaterial.needsUpdate=!0),this.earthMaterial){this.earthMaterial.uniforms.dayMap.value=t;const n=Jv(t);n&&(this.earthMaterial.uniforms.specularMap.value=n,this.earthMaterial.uniforms.hasSpecularMap.value=!0)}}catch{}if(this.earthMaterial&&e.emissiveMap)try{const t=await vs(e.emissiveMap);this.earthMaterial.uniforms.nightMap.value=t}catch{}else if(this.stdMaterial&&e.emissiveMap)try{const t=await vs(e.emissiveMap);this.stdMaterial.emissiveMap=t,this.stdMaterial.emissive=new ye(16755302),this.stdMaterial.emissiveIntensity=.55,this.stdMaterial.needsUpdate=!0}catch{}if(e.clouds)try{const t=await vs(e.clouds);if(this.earthMaterial)this.cloudMaterial=Zv(t),this.clouds=new Qe(new un(this.def.radius*1.015,80,60),this.cloudMaterial);else{const n=new Ir({map:t,transparent:!0,opacity:.42,depthWrite:!1,roughness:1,metalness:0});this.clouds=new Qe(new un(this.def.radius*1.015,80,60),n)}this.mesh.add(this.clouds)}catch{}}}updateLighting(e){this.sunPos.copy(e),this.earthMaterial&&ld(this.earthMaterial,this.sunPos),this.cloudMaterial&&ld(this.cloudMaterial,this.sunPos)}get worldPosition(){const e=new A;return this.mesh.getWorldPosition(e),e}setOrbitAngle(e){this.orbitAngle=e,this.def.orbitRadius>0&&this.pivot.position.set(Math.cos(this.orbitAngle)*this.def.orbitRadius,0,Math.sin(this.orbitAngle)*this.def.orbitRadius)}findChildById(e){if(this.def.id===e)return this;for(const t of this.children){const n=t.findChildById(e);if(n)return n}}update(e){this.def.orbitRadius>0&&(this.orbitAngle+=this.def.orbitSpeed*e,this.pivot.position.set(Math.cos(this.orbitAngle)*this.def.orbitRadius,0,Math.sin(this.orbitAngle)*this.def.orbitRadius)),this.spin+=this.def.spinSpeed*e,this.mesh.rotation.y=this.spin,this.clouds&&(this.cloudSpin+=this.def.spinSpeed*1.15*e,this.clouds.rotation.y=this.cloudSpin);for(const t of this.children)t.update(e)}collect(e){e.push(this);for(const t of this.children)t.collect(e)}}class ft{id;name;root;group=new en;bodies=[];origin;asteroidBelt=null;constructor(e,t,n,r=[0,0,0],s){this.id=e,this.name=t,this.origin=new A(...r),this.group.position.copy(this.origin),this.root=new hl(n),this.group.add(this.root.pivot),s?.asteroidBelt&&(this.asteroidBelt=new zv(62,72,760),this.asteroidBelt.group.visible=!1,this.group.add(this.asteroidBelt.group)),this.root.collect(this.bodies);for(const a of this.bodies)a.systemId=e,a.systemName=t}findById(e){return this.bodies.find(t=>t.def.id===e)}setAsteroidBeltVisible(e){this.asteroidBelt&&(this.asteroidBelt.group.visible=e)}get asteroidBeltVisible(){return this.asteroidBelt?.group.visible??!1}toggleAsteroidBelt(){return this.asteroidBelt?(this.asteroidBelt.group.visible=!this.asteroidBelt.group.visible,this.asteroidBelt.group.visible):!1}update(e){this.root.update(e),this.asteroidBelt?.group.visible&&this.asteroidBelt.update(e)}}const ny=[{starId:"acen-a",planetIds:["acen-i","acen-ii","acen-iii"]},{starId:"sirius-a",planetIds:["sirius-i","sirius-ii","sirius-iii"]},{starId:"proxima",planetIds:["proxima-b","proxima-c","proxima-d"]},{starId:"trappist-1",planetIds:["trap-b","trap-c","trap-d","trap-e","trap-f","trap-g","trap-h"]},{starId:"eps-eri",planetIds:["eps-eri-i","eps-eri-ii","eps-eri-iii"]},{starId:"altair",planetIds:["altair-i","altair-ii","altair-iii"]},{starId:"barnard",planetIds:["barnard-b","barnard-c","barnard-d"]},{starId:"tau-ceti",planetIds:["tau-ceti-e","tau-ceti-f","tau-ceti-g"]},{starId:"vega",planetIds:["vega-i","vega-ii","vega-iii"]},{starId:"fomalhaut",planetIds:["fomalhaut-i","fomalhaut-b","fomalhaut-iii"]},{starId:"gliese-581",planetIds:["gliese-581-e","gliese-581-b","gliese-581-c","gliese-581-d"]},{starId:"wolf-359",planetIds:["wolf-359-b","wolf-359-c","wolf-359-d"]},{starId:"ross-128",planetIds:["ross-128-b","ross-128-c","ross-128-d"]},{starId:"cygni-61-a",planetIds:["cygni-61-i","cygni-61-ii","cygni-61-iii"]},{starId:"kapteyn",planetIds:["kapteyn-b","kapteyn-c","kapteyn-d"]},{starId:"pollux",planetIds:["pollux-b","pollux-ii","pollux-iii"]},{starId:"polaris",planetIds:["polaris-i","polaris-ii"]},{starId:"betelgeuse",planetIds:["betelgeuse-i","betelgeuse-ii","betelgeuse-iii"]},{starId:"kepler-186",planetIds:["kepler-186-b","kepler-186-c","kepler-186-d","kepler-186-e","kepler-186-f"]},{starId:"rigel",planetIds:["rigel-i","rigel-ii"]},{starId:"deneb",planetIds:["deneb-i","deneb-ii","deneb-iii"]}];class iy{group=new en;systems=[];bodies=[];timeScale=1;constructor(){const e=new ft("sol","Sol System",Cv,[0,0,0],{asteroidBelt:!0}),t=new ft("alpha-centauri","α Centauri",Z_,J_),n=new ft("proxima-centauri","Proxima Centauri",Mv,Sv),r=new ft("sirius","Sirius",wv,Rv),s=new ft("epsilon-eridani","ε Eridani",ov,lv),a=new ft("trappist-1","TRAPPIST-1",Iv,Dv),o=new ft("altair","Altair",j_,$_),l=new ft("barnards-star","Barnard's Star",Q_,ev),c=new ft("tau-ceti","Tau Ceti",Lv,Pv),d=new ft("vega","Vega",Uv,Fv),u=new ft("fomalhaut","Fomalhaut",cv,dv),f=new ft("gliese-581","Gliese 581",uv,hv),m=new ft("wolf-359","Wolf 359",Nv,kv),g=new ft("ross-128","Ross 128",Tv,Av),_=new ft("61-cygni","61 Cygni",iv,rv),p=new ft("kapteyns-star","Kapteyn's Star",fv,pv),h=new ft("pollux","Pollux",yv,xv),b=new ft("polaris","Polaris",_v,vv),E=new ft("betelgeuse","Betelgeuse",tv,nv),M=new ft("kepler-186","Kepler-186",mv,gv),P=new ft("rigel","Rigel",bv,Ev),R=new ft("deneb","Deneb",sv,av);this.systems.push(e,t,n,l,m,r,s,g,_,c,p,o,f,d,u,h,a,b,E,M,P,R);for(const w of this.systems)this.group.add(w.group),this.bodies.push(...w.bodies)}get sol(){return this.systems[0]}findById(e){return this.bodies.find(t=>t.def.id===e)}findSystem(e){return this.systems.find(t=>t.id===e)}systemContaining(e){if(e)return this.findSystem(e.systemId)}nearestSystem(e){let t=this.systems[0],n=1/0;for(const r of this.systems){const s=e.distanceTo(r.origin);s<n&&(n=s,t=r)}return t}systemStar(e){return this.findSystem(e)?.root}setAsteroidBeltsVisible(e){for(const t of this.systems)t.setAsteroidBeltVisible(e)}toggleAsteroidBelts(){const t=!this.sol.asteroidBeltVisible;return this.setAsteroidBeltsVisible(t),t}get asteroidBeltsVisible(){return this.sol.asteroidBeltVisible}applySolEphemeris(e){const t=A_(e);let n=0;for(const[r,s]of Object.entries(t)){const a=this.sol.findById(r);a&&(a.setOrbitAngle(s),n++)}return n}update(e){const t=e*this.timeScale;for(const s of this.systems)s.update(t);const n=this.findById("sun"),r=this.findById("earth");n&&r&&r.updateLighting(n.worldPosition);for(const{starId:s,planetIds:a}of ny){const o=this.findById(s);if(o)for(const l of a){const c=this.findById(l);c&&c.updateLighting(o.worldPosition)}}}}const ry=65,cd=62,sy=yi("textures/bridge_interior.png");class ay{group=new en;enabled=!1;camera;plate=null;constructor(e){this.camera=e,this.group.name="bridge-cockpit",this.group.visible=!1,e.add(this.group),this.loadPlate()}get isEnabled(){return this.enabled}setEnabled(e){this.enabled=e,this.syncVisible(!1),this.camera.fov=e?cd:ry,this.camera.updateProjectionMatrix()}setSurfaceActive(e){this.syncVisible(e)}syncVisible(e){this.group.visible=this.enabled&&!e}toggle(){return this.setEnabled(!this.enabled),this.enabled}update(e){}async loadPlate(){const e=new ll;try{const t=await e.loadAsync(sy);t.colorSpace=nt,t.anisotropy=8,t.minFilter=Rn,t.magFilter=Et,t.generateMipmaps=!0,t.premultiplyAlpha=!1,t.needsUpdate=!0,this.buildPlate(t)}catch(t){console.warn("Bridge interior texture failed to load",t)}}buildPlate(e){for(;this.group.children.length;)this.group.remove(this.group.children[0]);const t=new qt({map:e,transparent:!0,alphaTest:.05,depthTest:!0,depthWrite:!1,toneMapped:!0,side:kt}),n=1.02,r=e.image,s=r.width&&r.height?r.width/r.height:16/9,a=st.degToRad(cd),o=2*Math.tan(a/2)*n*1.04,l=o*this.camera.aspect*1.04,c=Math.max(l,o*s),d=c/s;this.plate=new Qe(new vi(c,d),t),this.plate.position.set(0,0,-n),this.plate.renderOrder=10,this.plate.frustumCulled=!1,this.group.add(this.plate),this.syncVisible(!1)}}const Ft=5.2,oy={type:"Barred spiral (SBbc)",diameter:"~105,000 ly",stars:"100–400 billion",age:"~13.6 billion years",mass:"~1.5 trillion M☉",solFromCenter:"~26,700 ly",thickness:"~1,000 ly (thin disc)",description:"Home galaxy — Sol sits in the Orion Arm. From here the whole disc is a small object among Local Group neighbors."},ly={age:"~13.8 billion years",diameter:"~93 billion ly",galaxies:"~2 trillion (est.)",ordinaryMatter:"~5%",darkMatter:"~27%",darkEnergy:"~68%",geometry:"Spatially flat (within error)",cmb:"2.725 K afterglow",expansion:"Accelerating",description:"What we can see is limited by the age of light. Beyond the cosmic horizon the universe may continue — we only map the patch whose light has had time to reach us."},cy={title:"Hubble eXtreme Deep Field",shortName:"XDF",released:"September 2012",telescope:"Hubble Space Telescope",exposure:"~23 days (10 years combined)",location:"Constellation Fornax",galaxies:"~5,500 in this tiny patch",lookback:"~13.2 billion years",credit:"NASA / ESA / Hubble",description:"Almost every point of light is a galaxy. The smallest reddest dots are among the most distant objects ever seen — galaxies as they were only a few hundred million years after the Big Bang."},dy=[{id:"milky-way",name:"Milky Way",position:[0,0,0],radius:Ft,color:16771272,note:"Home galaxy — Sol is a speck inside this disc",isMilkyWay:!0},{id:"lmc",name:"Large Magellanic Cloud",position:[12,-8,-14],radius:1.4,color:16765088,note:"Satellite of the Milky Way · ~160 kly"},{id:"smc",name:"Small Magellanic Cloud",position:[16,-10,-18],radius:.85,color:15255712,note:"Satellite of the Milky Way · ~200 kly"},{id:"andromeda",name:"Andromeda (M31)",position:[180,40,-90],radius:6.5,color:16773344,note:"Nearest major spiral · ~2.5 million ly"},{id:"m33",name:"Triangulum (M33)",position:[200,-20,-70],radius:2.8,color:14741759,note:"Local Group spiral · ~2.7 million ly"},{id:"ngc-6822",name:"Barnard's Galaxy",position:[-55,30,40],radius:.9,color:14213360,note:"Local Group dwarf · ~1.6 million ly"},{id:"centaurus-a",name:"Centaurus A",position:[-320,-180,260],radius:3.2,color:16760976,note:"Active elliptical · ~12 million ly"},{id:"bode",name:"Bode's Galaxy (M81)",position:[280,220,310],radius:3,color:16771280,note:"Grand-design spiral · ~12 million ly"},{id:"m82",name:"Cigar Galaxy (M82)",position:[290,210,300],radius:1.6,color:16756848,note:"Starburst companion to M81"},{id:"sombrero",name:"Sombrero (M104)",position:[-450,-80,380],radius:2.4,color:15786184,note:"Edge-on spiral · ~29 million ly"},{id:"whirlpool",name:"Whirlpool (M51)",position:[120,380,-420],radius:2.6,color:13691135,note:"Interacting spiral · ~23 million ly"},{id:"virgo-m87",name:"M87 (Virgo)",position:[620,100,-480],radius:4.5,color:15261951,note:"Virgo Cluster giant elliptical · ~53 million ly"},{id:"virgo-m49",name:"M49 (Virgo)",position:[580,40,-520],radius:3.2,color:14735600,note:"Bright Virgo elliptical"},{id:"virgo-m100",name:"M100 (Virgo)",position:[640,160,-440],radius:2.8,color:14215423,note:"Virgo Cluster spiral"},{id:"fornax-a",name:"Fornax A",position:[-200,-520,180],radius:3,color:16769216,note:"Fornax Cluster · ~62 million ly"},{id:"sculptor",name:"Sculptor Galaxy (NGC 253)",position:[90,-380,220],radius:2.5,color:16767152,note:"Starburst spiral · ~11 million ly"}];class uy{group=new en;milkyWayTarget={def:{id:"milky-way",name:"Milky Way",radius:Ft},worldPosition:new A(0,0,0)};milkyWayPickMesh;labelSprites=[];mwSpin=new en;constructor(){this.group.name="extragalactic-field",this.group.visible=!1,this.milkyWayPickMesh=new Qe(new un(Ft*1.05,24,16),new qt({transparent:!0,opacity:0,depthWrite:!1,side:kt})),this.milkyWayPickMesh.name="milky-way-pick",this.milkyWayPickMesh.userData.milkyWay=!0,this.buildDeepField(),this.buildMilkyWay();for(const e of dy)e.isMilkyWay||this.addGalaxyBillboard(e)}setVisible(e){this.group.visible=e}get visible(){return this.group.visible}update(e){this.group.visible&&(this.mwSpin.rotation.z+=e*.008)}buildMilkyWay(){const e=-Math.PI/2.28,t=new Qe(new Pr(Ft*1.7,80),new qt({map:hy(16769208,.28),transparent:!0,depthWrite:!1,side:kt,fog:!1,blending:ln}));t.rotation.x=e,t.position.y=-.04,this.mwSpin.add(t);const n=new Qe(new Pr(Ft,128),new qt({map:my(),transparent:!0,depthWrite:!1,side:kt,fog:!1}));n.rotation.x=e,this.mwSpin.add(n);const r=new Qe(new vi(Ft*1.95,Ft*.14),new qt({map:py(),transparent:!0,depthWrite:!1,side:kt,fog:!1}));r.rotation.x=e,r.position.y=.03,this.mwSpin.add(r);const s=new Qe(new un(Ft*.28,32,24),new qt({map:fy(),transparent:!0,opacity:.92,depthWrite:!1,fog:!1}));s.scale.set(1,.55,1),this.mwSpin.add(s);const a=new Qe(new un(Ft*.07,16,12),new qt({color:16773840,transparent:!0,opacity:.75,depthWrite:!1,fog:!1,blending:ln}));this.mwSpin.add(a),this.mwSpin.add(this.createDiscStars(5200)),this.mwSpin.add(this.milkyWayPickMesh),this.group.add(this.mwSpin),this.addLabel("Milky Way",new A(0,Ft*1.05,0),3.2,16771272);const o=Ft*.51;this.addLabel("Sol · you are here",new A(o*.85,-Ft*.35,o*.35),1.85,9357536)}createDiscStars(e){const t=new Float32Array(e*3),n=new Float32Array(e*3),r=new ye;for(let a=0;a<e;a++){const o=Math.random(),l=Math.random()*Math.PI*2+o*.35,c=Math.sqrt(Math.random())*Ft*.96,d=(Math.random()+Math.random()+Math.random()-1.5)*Ft*.045;t[a*3]=Math.cos(l)*c,t[a*3+1]=d,t[a*3+2]=Math.sin(l)*c;const u=Math.random();c<Ft*.22?r.setRGB(1,.9,.7):u>.82?r.setRGB(.55,.72,1):u>.55?r.setRGB(1,.95,.85):r.setRGB(.85,.88,1),r.multiplyScalar(.35+Math.random()*.65),n[a*3]=r.r,n[a*3+1]=r.g,n[a*3+2]=r.b}const s=new gt;return s.setAttribute("position",new pt(t,3)),s.setAttribute("color",new pt(n,3)),new Xi(s,new hi({size:.055,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,fog:!1,blending:ln,map:Ba()}))}addGalaxyBillboard(e){const t=gy(e),n=new Lo({map:t,transparent:!0,depthWrite:!1,fog:!1,blending:ln}),r=new dc(n);r.position.set(...e.position);const s=e.radius*2.4;r.scale.set(s,s*.62,1),r.userData.galaxyId=e.id,this.group.add(r),this.addLabel(e.name,new A(e.position[0],e.position[1]+e.radius*1.1,e.position[2]),Math.max(1.6,e.radius*.85),e.color)}addLabel(e,t,n,r){const s=_y(e,r),a=new Lo({map:s,transparent:!0,depthWrite:!1,fog:!1}),o=new dc(a);o.position.copy(t),o.scale.set(n*2.8,n*.85,1),this.labelSprites.push(o),this.group.add(o)}buildDeepField(){const t=new Float32Array(12600),n=new Float32Array(4200*3),r=new ye;for(let m=0;m<4200;m++){const g=200+Math.random()**.65*2200,_=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);t[m*3]=g*Math.sin(p)*Math.cos(_),t[m*3+1]=g*Math.sin(p)*Math.sin(_)*.55,t[m*3+2]=g*Math.cos(p),Math.random()>.7?r.setHSL(.08+Math.random()*.06,.35,.55+Math.random()*.25):r.setHSL(.58+Math.random()*.1,.25,.45+Math.random()*.35),n[m*3]=r.r,n[m*3+1]=r.g,n[m*3+2]=r.b}const s=new gt;s.setAttribute("position",new pt(t,3)),s.setAttribute("color",new pt(n,3));const a=new hi({size:2.2,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,fog:!1,blending:ln,map:Ba()}),o=new Xi(s,a);o.frustumCulled=!1,this.group.add(o);const l=8e3,c=new Float32Array(l*3);for(let m=0;m<l;m++){const g=800+Math.random()**.5*5e3,_=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);c[m*3]=g*Math.sin(p)*Math.cos(_),c[m*3+1]=g*Math.sin(p)*Math.sin(_)*.5,c[m*3+2]=g*Math.cos(p)}const d=new gt;d.setAttribute("position",new pt(c,3));const u=new hi({size:1.1,sizeAttenuation:!0,color:11057360,transparent:!0,opacity:.4,depthWrite:!1,fog:!1,blending:ln,map:Ba()}),f=new Xi(d,u);f.frustumCulled=!1,this.group.add(f)}}function Ba(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(220,230,255,0.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Vt(i);return n.colorSpace=nt,n}function hy(i,e){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),r=new ye(i),s=`${r.r*255|0},${r.g*255|0},${r.b*255|0}`,a=n.createRadialGradient(128,128,10,128,128,128);a.addColorStop(0,`rgba(${s},${e})`),a.addColorStop(.45,`rgba(${s},${e*.35})`),a.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=a,n.fillRect(0,0,256,256);const o=new Vt(t);return o.colorSpace=nt,o}function fy(){const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);n.addColorStop(0,"rgba(255, 244, 210, 1)"),n.addColorStop(.35,"rgba(255, 210, 150, 0.85)"),n.addColorStop(.7,"rgba(200, 150, 100, 0.35)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);const r=new Vt(e);return r.colorSpace=nt,r}function py(){const t=document.createElement("canvas");t.width=512,t.height=64;const n=t.getContext("2d");n.clearRect(0,0,512,64);for(let s=0;s<40;s++){const a=Math.random()*512,o=64*.5+(Math.random()-.5)*64*.35,l=20+Math.random()*80,c=4+Math.random()*10,d=n.createRadialGradient(a,o,0,a,o,l);d.addColorStop(0,`rgba(6, 8, 14, ${.35+Math.random()*.4})`),d.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=d,n.beginPath(),n.ellipse(a,o,l,c,0,0,Math.PI*2),n.fill()}const r=new Vt(t);return r.colorSpace=nt,r}function my(){const e=document.createElement("canvas");e.width=e.height=2048;const t=e.getContext("2d"),n=2048/2,r=2048/2,s=2048*.5;t.clearRect(0,0,2048,2048);const a=t.createRadialGradient(n,r,s*.02,n,r,s);a.addColorStop(0,"rgba(255, 236, 200, 0.98)"),a.addColorStop(.12,"rgba(255, 214, 160, 0.72)"),a.addColorStop(.32,"rgba(190, 200, 230, 0.38)"),a.addColorStop(.62,"rgba(130, 160, 220, 0.16)"),a.addColorStop(.85,"rgba(90, 120, 190, 0.06)"),a.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=a,t.fillRect(0,0,2048,2048),t.save(),t.translate(n,r),t.rotate(-.42);const o=t.createLinearGradient(-s*.38,0,s*.38,0);o.addColorStop(0,"rgba(255, 220, 170, 0)"),o.addColorStop(.25,"rgba(255, 220, 170, 0.45)"),o.addColorStop(.5,"rgba(255, 236, 200, 0.7)"),o.addColorStop(.75,"rgba(255, 220, 170, 0.45)"),o.addColorStop(1,"rgba(255, 220, 170, 0)"),t.fillStyle=o,t.beginPath(),t.ellipse(0,0,s*.38,s*.09,0,0,Math.PI*2),t.fill(),t.restore();const l=4;for(let u=0;u<l;u++){const f=u*Math.PI*2/l-.42;t.save(),t.translate(n,r),t.beginPath();let m=!0;for(let g=0;g<=360;g++){const _=g/360,p=f+_*Math.PI*2.65,h=s*(.1+_*.86),b=1+Math.sin(_*18+u)*.03,E=Math.cos(p)*h*b,M=Math.sin(p)*h*b*.94;m?(t.moveTo(E,M),m=!1):t.lineTo(E,M)}t.strokeStyle="rgba(150, 185, 255, 0.28)",t.lineWidth=s*.085,t.lineCap="round",t.stroke(),t.strokeStyle="rgba(255, 245, 220, 0.16)",t.lineWidth=s*.035,t.stroke(),t.restore();for(let g=0;g<55;g++){const _=.15+Math.random()*.8,p=f+_*Math.PI*2.65+(Math.random()-.5)*.12,h=s*(.1+_*.86),b=n+Math.cos(p)*h,E=r+Math.sin(p)*h*.94,M=t.createRadialGradient(b,E,0,b,E,6+Math.random()*14);M.addColorStop(0,`rgba(160, 200, 255, ${.25+Math.random()*.35})`),M.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=M,t.beginPath(),t.arc(b,E,16,0,Math.PI*2),t.fill()}}t.save(),t.translate(n,r),t.rotate(-.42),t.globalCompositeOperation="destination-out";for(let u=0;u<8;u++){const f=(u-3.5)*s*.018;t.fillStyle=`rgba(0,0,0,${.12+u%2*.08})`,t.beginPath(),t.ellipse(0,f,s*(.55+Math.random()*.15),s*.012,0,0,Math.PI*2),t.fill()}t.restore(),t.globalCompositeOperation="source-over",t.save(),t.translate(n,r);for(let u=0;u<l;u++){const f=u*Math.PI*2/l-.35;t.strokeStyle="rgba(10, 12, 20, 0.22)",t.lineWidth=s*.02,t.beginPath();for(let m=0;m<=200;m++){const g=m/200,_=f+g*Math.PI*2.5,p=s*(.18+g*.75),h=Math.cos(_)*p,b=Math.sin(_)*p*.94;m===0?t.moveTo(h,b):t.lineTo(h,b)}t.stroke()}t.restore();for(let u=0;u<14e3;u++){const f=Math.random()*Math.PI*2,m=Math.sqrt(Math.random())*s*.97,g=n+Math.cos(f)*m,_=r+Math.sin(f)*m*.94,h=(m<s*.2?.35:.12)+Math.random()*.55,b=Math.random()>.7;t.fillStyle=b?`rgba(180,210,255,${h})`:`rgba(255,245,220,${h})`;const E=Math.random()<.04?1.8:.7+Math.random();t.fillRect(g,_,E,E)}const c=t.createRadialGradient(n,r,s*.78,n,r,s);c.addColorStop(0,"rgba(0,0,0,0)"),c.addColorStop(1,"rgba(0,0,0,1)"),t.globalCompositeOperation="destination-out",t.fillStyle=c,t.fillRect(0,0,2048,2048),t.globalCompositeOperation="source-over";const d=new Vt(e);return d.colorSpace=nt,d.anisotropy=8,d.generateMipmaps=!0,d}function gy(i){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),r=new ye(i.color),s=`${r.r*255|0},${r.g*255|0},${r.b*255|0}`;n.clearRect(0,0,256,256);const a=n.createRadialGradient(256*.5,256*.5,4,256*.5,256*.5,256*.48);a.addColorStop(0,`rgba(${s},0.95)`),a.addColorStop(.35,`rgba(${s},0.45)`),a.addColorStop(.7,`rgba(${s},0.12)`),a.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=a,n.beginPath(),n.ellipse(256*.5,256*.5,256*.46,256*.28,-.4,0,Math.PI*2),n.fill();const o=n.createRadialGradient(256*.5,256*.5,0,256*.5,256*.5,256*.12);o.addColorStop(0,"rgba(255,255,255,0.9)"),o.addColorStop(1,`rgba(${s},0)`),n.fillStyle=o,n.beginPath(),n.arc(256*.5,256*.5,256*.12,0,Math.PI*2),n.fill();const l=new Vt(t);return l.colorSpace=nt,l}function _y(i,e){const t=document.createElement("canvas");t.width=512,t.height=128;const n=t.getContext("2d");n.clearRect(0,0,t.width,t.height);const r=new ye(e);n.font='600 42px "Segoe UI", system-ui, sans-serif',n.textAlign="center",n.textBaseline="middle",n.shadowColor="rgba(0,0,0,0.85)",n.shadowBlur=8,n.fillStyle=`rgb(${r.r*255|0},${r.g*255|0},${r.b*255|0})`,n.fillText(i,t.width/2,t.height/2);const s=new Vt(t);return s.colorSpace=nt,s}const dd=[{name:"Sirius",ra:101.29,dec:-16.72,mag:1,color:11061503},{name:"Canopus",ra:95.99,dec:-52.7,mag:.92,color:16773328},{name:"Arcturus",ra:213.92,dec:19.18,mag:.9,color:16756832},{name:"Vega",ra:279.23,dec:38.78,mag:.88,color:12638463},{name:"Capella",ra:79.17,dec:45.99,mag:.86,color:16765072},{name:"Rigel",ra:78.63,dec:-8.2,mag:.85,color:9482495},{name:"Procyon",ra:114.83,dec:5.22,mag:.84,color:16771264},{name:"Betelgeuse",ra:88.79,dec:7.41,mag:.9,color:16736304},{name:"Altair",ra:297.7,dec:8.87,mag:.82,color:16774624},{name:"Aldebaran",ra:68.98,dec:16.51,mag:.83,color:16744512},{name:"Antares",ra:247.35,dec:-26.43,mag:.84,color:16728096},{name:"Spica",ra:201.3,dec:-11.16,mag:.8,color:11585791},{name:"Pollux",ra:116.33,dec:28.03,mag:.78,color:16760944},{name:"Fomalhaut",ra:344.41,dec:-29.62,mag:.8,color:16773344},{name:"Deneb",ra:310.36,dec:45.28,mag:.82,color:13162751},{name:"Regulus",ra:152.09,dec:11.97,mag:.78,color:12110079},{name:"Dubhe",ra:165.46,dec:61.75,mag:.72,color:16765056},{name:"Merak",ra:165.93,dec:56.38,mag:.7,color:16769184},{name:"Phecda",ra:178.46,dec:53.69,mag:.68,color:16771264},{name:"Megrez",ra:183.95,dec:54.93,mag:.62,color:16773328},{name:"Alioth",ra:193.51,dec:55.96,mag:.74,color:16771264},{name:"Mizar",ra:200.98,dec:54.93,mag:.72,color:16769200},{name:"Alkaid",ra:206.89,dec:49.31,mag:.7,color:11583743},{name:"Mintaka",ra:83,dec:-.3,mag:.7,color:10533119},{name:"Alnilam",ra:84.05,dec:-1.2,mag:.72,color:11059455},{name:"Alnitak",ra:85.19,dec:-1.94,mag:.7,color:9480447},{name:"Schedar",ra:10.13,dec:56.54,mag:.68,color:16756848},{name:"Caph",ra:2.29,dec:59.15,mag:.66,color:16773344},{name:"Gamma Cas",ra:14.18,dec:60.72,mag:.64,color:16769264},{name:"Ruchbah",ra:21.45,dec:60.24,mag:.62,color:16771280},{name:"Segin",ra:28.6,dec:63.67,mag:.6,color:11585791},{name:"Acrux",ra:186.65,dec:-63.1,mag:.8,color:9480447},{name:"Mimosa",ra:191.93,dec:-59.69,mag:.76,color:10533119},{name:"Gacrux",ra:187.79,dec:-57.11,mag:.72,color:16744544},{name:"Delta Cru",ra:183.79,dec:-58.75,mag:.65,color:11583743}],vy=[{name:"Orion",stars:[["Betelgeuse","Mintaka"],["Betelgeuse","Alnitak"],["Rigel","Mintaka"],["Rigel","Alnitak"],["Mintaka","Alnilam"],["Alnilam","Alnitak"]]},{name:"Ursa Major",stars:[["Dubhe","Merak"],["Merak","Phecda"],["Phecda","Megrez"],["Megrez","Dubhe"],["Megrez","Alioth"],["Alioth","Mizar"],["Mizar","Alkaid"]]},{name:"Cassiopeia",stars:[["Caph","Schedar"],["Schedar","Gamma Cas"],["Gamma Cas","Ruchbah"],["Ruchbah","Segin"]]},{name:"Crux",stars:[["Acrux","Gacrux"],["Mimosa","Delta Cru"]]},{name:"Summer Triangle",stars:[["Vega","Deneb"],["Deneb","Altair"],["Altair","Vega"]]}],yy=yi("textures/4k_stars_milky_way.jpg"),xy=yi("textures/4k_deep_field.jpg"),za=1200;function ud(){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,255,255,0.85)"),n.addColorStop(.45,"rgba(210,220,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);const r=new Vt(e);return r.colorSpace=nt,r}function My(){const t=document.createElement("canvas");t.width=2048,t.height=1024;const n=t.getContext("2d");n.fillStyle="#03050c",n.fillRect(0,0,2048,1024);const r=n.createLinearGradient(0,1024*.38,0,1024*.62);r.addColorStop(0,"rgba(50, 60, 90, 0)"),r.addColorStop(.5,"rgba(120, 130, 160, 0.35)"),r.addColorStop(1,"rgba(50, 60, 90, 0)"),n.fillStyle=r,n.fillRect(0,0,2048,1024);for(let a=0;a<8e3;a++){const o=Math.random()*2048,l=Math.random()*1024,d=(Math.abs(l/1024-.5)<.12?.35:.08)+Math.random()*.5;n.fillStyle=`rgba(230,235,250,${d})`,n.fillRect(o,l,Math.random()*1.5,Math.random()*1.5)}const s=new Vt(t);return s.colorSpace=nt,s}function hd(i,e,t){const n=st.degToRad(i),r=st.degToRad(e),s=Math.cos(r);return new A(s*Math.cos(n),Math.sin(r),s*Math.sin(n)).multiplyScalar(t)}function fd(i){const e=new ll;return new Promise((t,n)=>{e.load(i,r=>{r.colorSpace=nt,r.anisotropy=8,r.minFilter=Rn,r.magFilter=Et,r.needsUpdate=!0,t(r)},void 0,n)})}class Sy{group=new en;skyMesh;skyMaterial;labelRoot;starLabels=[];world=new A;ndc=new A;showConstellations=!1;showStarNames=!1;constellationLines;milkyWayMap=null;deepFieldMap=null;deepFieldSky=!1;deepFieldLoad=null;constructor(e){this.labelRoot=document.createElement("div"),this.labelRoot.className="star-labels hidden",this.labelRoot.setAttribute("aria-hidden","true"),e.appendChild(this.labelRoot),this.skyMaterial=new qt({map:My(),side:It,depthWrite:!1,fog:!1,color:new ye(14214399)}),this.skyMesh=new Qe(new un(za,96,64),this.skyMaterial),this.skyMesh.rotation.z=st.degToRad(58),this.skyMesh.rotation.y=st.degToRad(-25),this.group.add(this.skyMesh),this.group.add(this.createPoints(2200,400,1100,.85,.5)),this.group.add(this.createPoints(500,150,600,2.2,1)),this.constellationLines=this.buildConstellations(),this.constellationLines.visible=!1,this.skyMesh.add(this.constellationLines),this.buildNamedStars(),this.loadMilkyWay()}applySkyMap(e){const t=this.skyMaterial.map;this.skyMaterial.map=e,this.skyMaterial.color.set(16777215),this.skyMaterial.needsUpdate=!0,t&&t!==this.milkyWayMap&&t!==this.deepFieldMap&&t.dispose()}async loadMilkyWay(){try{const e=await fd(yy);this.milkyWayMap=e,this.deepFieldSky||this.applySkyMap(e)}catch{}}ensureDeepFieldMap(){return this.deepFieldMap?Promise.resolve(this.deepFieldMap):(this.deepFieldLoad||(this.deepFieldLoad=fd(xy).then(e=>(this.deepFieldMap=e,e)).catch(()=>(this.deepFieldLoad=null,null))),this.deepFieldLoad)}setDeepFieldSky(e){if(this.deepFieldSky=e,e){this.ensureDeepFieldMap().then(t=>{t&&this.deepFieldSky&&this.applySkyMap(t)});return}this.milkyWayMap&&this.applySkyMap(this.milkyWayMap)}createPoints(e,t,n,r,s){const a=new Float32Array(e*3),o=new Float32Array(e*3),l=new ye;for(let d=0;d<e;d++){const u=t+Math.random()*(n-t),f=Math.random()*Math.PI*2,m=Math.pow(Math.random(),.65),g=Math.PI/2+(Math.random()-.5)*Math.PI*(.35+m*.9);a[d*3]=u*Math.sin(g)*Math.cos(f),a[d*3+1]=u*Math.cos(g),a[d*3+2]=u*Math.sin(g)*Math.sin(f);const _=Math.random();_<.12?l.setRGB(.65,.78,1):_<.22?l.setRGB(1,.78,.55):_<.3?l.setRGB(1,.92,.75):l.setRGB(.92,.94,1),l.multiplyScalar(s*(.55+Math.random()*.45)),o[d*3]=l.r,o[d*3+1]=l.g,o[d*3+2]=l.b}const c=new gt;return c.setAttribute("position",new pt(a,3)),c.setAttribute("color",new pt(o,3)),new Xi(c,new hi({size:r,map:ud(),transparent:!0,depthWrite:!1,blending:ln,vertexColors:!0,sizeAttenuation:!0,fog:!1,opacity:.9}))}buildNamedStars(){const e=[],t=[];for(const s of dd){const a=hd(s.ra,s.dec,za*.92);e.push(a.x,a.y,a.z);const o=new ye(s.color??16777215);o.multiplyScalar(.7+s.mag*.5),t.push(o.r,o.g,o.b);const l=document.createElement("span");l.className="star-label",l.textContent=s.name,this.labelRoot.appendChild(l),this.starLabels.push({name:s.name,el:l,dir:a})}const n=new gt;n.setAttribute("position",new ct(e,3)),n.setAttribute("color",new ct(t,3));const r=new Xi(n,new hi({size:4.5,map:ud(),transparent:!0,depthWrite:!1,blending:ln,vertexColors:!0,sizeAttenuation:!0,fog:!1}));this.skyMesh.add(r)}buildConstellations(){const e=new Map;for(const r of dd)e.set(r.name,hd(r.ra,r.dec,za*.9));const t=[];for(const r of vy)for(const[s,a]of r.stars){const o=e.get(s),l=e.get(a);!o||!l||t.push(o.x,o.y,o.z,l.x,l.y,l.z)}const n=new gt;return n.setAttribute("position",new ct(t,3)),new Af(n,new il({color:8308968,transparent:!0,opacity:.28,depthWrite:!1,fog:!1}))}setConstellationsVisible(e){this.showConstellations=e,this.constellationLines.visible=e&&this.group.visible}setStarNamesVisible(e){this.showStarNames=e,this.labelRoot.classList.toggle("hidden",!e||!this.group.visible)}setVisible(e){if(this.group.visible=e,this.labelRoot.classList.toggle("hidden",!e||!this.showStarNames),this.constellationLines.visible=e&&this.showConstellations,!e)for(const t of this.starLabels)t.el.style.opacity="0"}get visible(){return this.group.visible}toggleVisible(){return this.setVisible(!this.group.visible),this.group.visible}toggleConstellations(){return this.setConstellationsVisible(!this.showConstellations),this.showConstellations}toggleStarNames(){return this.setStarNamesVisible(!this.showStarNames),this.showStarNames}update(e){if(!this.group.visible||(this.group.position.copy(e.position),!this.showStarNames))return;const t=window.innerWidth,n=window.innerHeight;this.skyMesh.updateMatrixWorld(!0);for(const r of this.starLabels){if(this.world.copy(r.dir).applyMatrix4(this.skyMesh.matrixWorld),this.ndc.copy(this.world).project(e),this.ndc.z>1||this.ndc.z<-1||this.ndc.x<-1.05||this.ndc.x>1.05||this.ndc.y<-1.05||this.ndc.y>1.05){r.el.style.opacity="0";continue}const o=(this.ndc.x*.5+.5)*t,l=(-this.ndc.y*.5+.5)*n;r.el.style.transform=`translate(-50%, -120%) translate(${o}px, ${l}px)`,r.el.style.opacity="0.75"}}}const pd=5e3,by=12e3,md=12e-5,Ey=15e-6;class Ty{scene=new yf;camera;renderer;starfield;universe;surface;bridge;extragalactic;deepSpace=!1;get solarSystem(){return this.universe}get isExtragalactic(){return this.deepSpace}constructor(e){this.camera=new Kt(65,1,.05,pd),this.camera.position.set(0,18,55),this.renderer=new x_({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=nt,this.renderer.toneMapping=Ld,this.renderer.toneMappingExposure=1.15,this.scene.background=new ye(66056),this.scene.fog=new er(66056,md);const t=document.getElementById("hud")??document.getElementById("app");this.starfield=new Sy(t),this.scene.add(this.starfield.group),this.universe=new iy,this.scene.add(this.universe.group),this.extragalactic=new uy,this.scene.add(this.extragalactic.group),this.surface=new Y_(this.scene,this.camera),this.bridge=new ay(this.camera),this.scene.add(this.camera);const n=new ru(1713203,.16);this.scene.add(n);const r=new cl(6983864,526864,.12);this.scene.add(r),this.resize(),window.addEventListener("resize",this.resize)}setUniverseVisible(e){this.universe.group.visible=e}setExtragalacticMode(e){this.deepSpace=e,this.extragalactic.setVisible(e),this.universe.group.visible=!e,this.starfield.setDeepFieldSky(e),this.camera.near=e?.5:.05,this.camera.far=e?by:pd,this.camera.updateProjectionMatrix(),this.scene.fog=new er(66056,e?Ey:md),this.renderer.toneMappingExposure=e?1.05:1.15}resize=()=>{const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)};update(e){!this.surface.active&&!this.deepSpace&&this.universe.update(e),this.deepSpace&&this.extragalactic.update(e),this.starfield.update(this.camera),this.bridge.update(e)}render(){this.renderer.render(this.scene,this.camera)}}const uu="cosmos-bookmarks",Ay=24;function wy(){try{const i=localStorage.getItem(uu);if(!i)return[];const e=JSON.parse(i);return Array.isArray(e)?e.filter(t=>t&&typeof t.id=="string"&&Array.isArray(t.position)):[]}catch{return[]}}function hu(i){localStorage.setItem(uu,JSON.stringify(i.slice(0,Ay)))}function Ry(i){const e=i.camera.quaternion,t=i.camera.position;return{id:`bm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,name:i.name.trim()||"Untitled",createdAt:Date.now(),systemId:i.systemId,bodyId:i.bodyId,position:[t.x,t.y,t.z],quaternion:[e.x,e.y,e.z,e.w],fov:i.camera.fov,orbiting:i.orbiting,orbitBodyId:i.orbitBodyId,orbit:i.orbit}}function Cy(i,e){return i.filter(t=>t.id!==e)}function Ly(i,e){return e?`${e} · ${i}`:i}const Py=16,Iy=55,Dy=220,Uy=200,Fy=1400,gd=4,Ny=280;function ky(i){return i<2?`${Math.max(0,i*1e3).toFixed(0)} km`:i<40?`${(i*.05).toFixed(3)} AU`:`${(i*.05).toFixed(2)} AU`}class Oy{root;entries=[];world=new A;ndc=new A;camForward=new A;toBody=new A;enabled=!0;selectedId=null;onSelect;constructor(e,t){this.root=document.createElement("div"),this.root.id="sky-labels",this.root.className="sky-labels",this.root.setAttribute("aria-hidden","true"),e.appendChild(this.root);for(const n of t){const r=document.createElement("button");r.type="button",r.className="sky-label",r.dataset.id=n.def.id;const s=document.createElement("span");s.className="sky-label-name",s.textContent=n.def.name;const a=document.createElement("span");a.className="sky-label-dist",r.append(s,a),r.addEventListener("click",o=>{o.stopPropagation(),this.onSelect?.(n)}),this.root.appendChild(r),this.entries.push({body:n,el:r,nameEl:s,distEl:a})}}setSelectHandler(e){this.onSelect=e}setSelected(e){this.selectedId=e}setEnabled(e){this.enabled=e,this.root.classList.toggle("hidden",!e)}toggle(){return this.setEnabled(!this.enabled),this.enabled}update(e,t=ky){if(!this.enabled)return;const n=window.innerWidth,r=window.innerHeight;e.getWorldDirection(this.camForward);const s=[];for(const o of this.entries){const{body:l,el:c}=o;l.mesh.getWorldPosition(this.world),this.world.y+=l.def.radius*1.15,this.toBody.copy(this.world).sub(e.position);const d=this.toBody.length();if(d<.01){c.style.opacity="0",c.style.pointerEvents="none";continue}if(this.toBody.dot(this.camForward)<=0){c.style.opacity="0",c.style.pointerEvents="none";continue}if(this.ndc.copy(this.world).project(e),this.ndc.z<-1||this.ndc.z>1||this.ndc.x<-1.15||this.ndc.x>1.15||this.ndc.y<-1.15||this.ndc.y>1.15){c.style.opacity="0",c.style.pointerEvents="none";continue}const u=Math.max(0,d-l.def.radius),f=(this.ndc.x*.5+.5)*n,m=(-this.ndc.y*.5+.5)*r,_=Math.atan(l.def.radius/d)/(e.fov*(Math.PI/180))*r;if(_>Ny){c.style.opacity="0",c.style.pointerEvents="none";continue}let p=1;const h=l.def.kind==="star",b=h?Uy:Iy,E=h?Fy:Dy;u>b&&(p=1-(u-b)/(E-b)),_<gd&&(p*=_/gd),p=st.clamp(p,0,1);const M=l.def.id===this.selectedId;if(M&&(p=Math.max(p,.85)),p<.04&&!M){c.style.opacity="0",c.style.pointerEvents="none";continue}const P=p*2+(M?10:0)+Math.min(4,l.def.radius)*.35-u*.008+Math.min(2,_*.02);s.push({entry:o,x:f,y:m,opacity:p,dist:u,score:P,selected:M})}s.sort((o,l)=>l.score-o.score);const a=new Set(s.slice(0,Py).map(o=>o.entry.body.def.id));for(const o of this.entries)o.el.classList.remove("is-selected","is-near");for(const o of s){const{entry:l,x:c,y:d,opacity:u,dist:f,selected:m}=o;if(!a.has(l.body.def.id)){l.el.style.opacity="0",l.el.style.pointerEvents="none";continue}l.distEl.textContent=t(f),l.el.style.transform=`translate(-50%, -100%) translate(${c}px, ${d}px)`,l.el.style.opacity=String(u),l.el.style.pointerEvents=u>.25?"auto":"none",l.el.classList.toggle("is-selected",m),l.el.classList.toggle("is-near",f<12),l.el.style.zIndex=String(1e3+Math.round(1e3-f))}}}const rr=document.getElementById("canvas"),By=document.getElementById("title-overlay"),zy=document.getElementById("btn-enter"),fl=document.getElementById("hud"),tr=document.getElementById("body-panel"),fu=document.getElementById("body-name"),pu=document.getElementById("body-stats"),mu=tr.querySelector(".body-actions"),gu=document.getElementById("universe-panel"),Gy=document.getElementById("universe-stats"),Fo=document.getElementById("deep-field-panel"),Vy=document.getElementById("deep-field-image"),Hy=document.getElementById("deep-field-title"),Wy=document.getElementById("deep-field-stats"),Xy=document.getElementById("deep-field-credit"),Os=document.getElementById("btn-deep-field"),qy=document.getElementById("btn-deep-field-close"),pl=document.getElementById("btn-warp"),No=document.getElementById("btn-orbit"),di=document.getElementById("btn-land"),Rs=document.getElementById("btn-audio"),Cs=document.getElementById("btn-music"),ml=document.getElementById("btn-sound-panel"),Ky=document.getElementById("btn-audio-close"),$s=document.getElementById("audio-panel"),gl=document.getElementById("btn-explore-panel"),Yy=document.getElementById("btn-explore-close"),Zs=document.getElementById("explore-panel"),_l=document.getElementById("btn-speed-panel"),jy=document.getElementById("btn-speed-close"),Js=document.getElementById("time-panel"),vl=document.getElementById("btn-ephemeris-panel"),$y=document.getElementById("btn-ephemeris-close"),Qs=document.getElementById("ephemeris-panel"),yl=document.getElementById("btn-controls-panel"),Zy=document.getElementById("btn-controls-close"),ea=document.getElementById("controls-panel"),Bs=document.getElementById("sfx-volume"),zs=document.getElementById("music-volume"),ko=document.getElementById("btn-starfield"),Oo=document.getElementById("btn-asteroids"),Bo=document.getElementById("btn-bridge"),Jy=document.getElementById("bridge-overlay"),Gs=document.getElementById("catalog-list"),zo=document.getElementById("system-list"),Qy=document.getElementById("system-name"),ys=document.getElementById("tele-speed"),yr=document.getElementById("tele-alt"),xs=document.getElementById("tele-throttle"),Ga=document.getElementById("tele-scale"),An=document.getElementById("tele-mode"),ex=document.getElementById("tele-system"),Bt=document.getElementById("warp-banner"),Ls=document.getElementById("land-hint"),Go=document.getElementById("surface-banner"),Vo=document.getElementById("time-scale"),tx=document.getElementById("time-scale-label"),_u=document.querySelectorAll(".time-presets button"),qi=document.getElementById("ephemeris-date"),nx=document.getElementById("btn-ephemeris"),_d=document.getElementById("ephemeris-status"),Ho=document.getElementById("btn-tour"),Wo=document.getElementById("btn-star-tour"),Sr=document.getElementById("btn-galaxy"),ix=document.getElementById("btn-bookmark-save"),vd=document.querySelector(".tour-kicker"),yd=document.getElementById("bookmark-list"),rx=document.getElementById("bookmark-empty"),sx=document.getElementById("tour-banner"),ax=document.getElementById("tour-title"),ox=document.getElementById("tour-subtitle"),Q=new Ty(rr),et=Q.universe,Tt=Q.surface,te=new W_(Q.camera,rr),wt=new F_(Q.camera,et),yn=new Oy(fl,et.bodies),we=new I_,Dn=new P_,Vs=new Nf,Hs=new Ie(0,0);let Hn=wy();const Dr=208,xl=10;let xt=null,vn=!1,Fn=!1,Ps=1,mi="sol";function lx(i){if(i<=0)return 0;const e=i/4;return Math.pow(e,2)*xl}function cx(i){return i<=0?0:Math.sqrt(i/xl)*4}function xd(i){return i===0?"Paused":i<.1?`${i.toFixed(2)}×`:i<10?`${i.toFixed(1)}×`:`${Math.round(i)}×`}function Nn(i,e=!0){const t=st.clamp(i,0,xl);et.timeScale=t,tx.textContent=xd(t),ex.textContent=xd(t),e&&(Vo.value=String(cx(t))),_u.forEach(n=>{const r=Number(n.dataset.scale);n.classList.toggle("active",Math.abs(r-t)<.001)})}function Md(i){const e=i*12.5;return e<1?`${(e*1e3).toFixed(0)} m/s`:e<1e3?`${e.toFixed(1)} km/s`:`${(e/1e3).toFixed(2)} ×10³ km/s`}function Va(i){return i>=Dr*.35?`${(i/Dr).toFixed(2)} ly`:i<2?`${(i*1e3).toFixed(0)} km`:i<40?`${(i*.05).toFixed(3)} AU`:`${(i*.05).toFixed(2)} AU`}function dx(i){const e=i*10;return e<1e3?`${e.toFixed(0)} kly out`:`${(e/1e3).toFixed(1)} Mly out`}const ux={luna:.00257,sun:1,mercury:.92,venus:.72,mars:1.52,phobos:1.52,jupiter:4.2,io:4.2,europa:4.2,saturn:8.5,titan:8.5,uranus:18.2,neptune:29,triton:29,pluto:38.5},Ws=63241.1,vu=1495978707e-1,hx=17,fx=365.25*24*3600;function Xs(i){return Q.camera.position.distanceTo(i.worldPosition)-i.def.radius}function px(i){if(i.def.id==="earth")return 0;if(i.systemId==="sol"){const t=ux[i.def.id];if(t!==void 0)return t/Ws;const n=Number.parseFloat(i.def.facts.distanceAu);return Number.isFinite(n)&&n>0?Math.abs(n-1)/Ws:0}const e=et.findSystem(i.systemId);return e?e.origin.length()/Dr:0}function Sd(i){if(i<=0)return"—";const e=i*Ws;if(e<.01){const t=e*vu;return t<1e6?`${t.toFixed(0)} km`:`${(t/1e6).toFixed(2)} M km`}return e<100?`${e.toFixed(e<10?2:1)} AU`:`${i.toFixed(i<10?2:1)} ly`}function bd(i){if(i<=0)return"—";const t=i*Ws*vu/hx,n=t/fx;if(n<1/365.25){const r=t/3600;return r<1?`${(t/60).toFixed(0)} min @ 17 km/s`:`${r.toFixed(r<10?1:0)} h @ 17 km/s`}if(n<1){const r=n*365.25;return`${r.toFixed(r<10?1:0)} days @ 17 km/s`}return n<1e3?`${n.toFixed(n<10?1:0)} yr @ 17 km/s`:n<1e6?`${(n/1e3).toFixed(n<1e4?1:0)}k yr @ 17 km/s`:`${(n/1e6).toFixed(1)}M yr @ 17 km/s`}function Ar(){const i=document.getElementById("stat-earth-dist"),e=document.getElementById("stat-travel-time");if(!i||!e)return;if(vn){const n=Q.camera.position.length()*1e4;i.textContent=Sd(n),e.textContent=bd(n),e.title="Estimated one-way time from here back to the disc at ~17 km/s (Voyager 1 heliocentric speed).";return}if(!xt)return;const t=px(xt);i.textContent=Sd(t),e.textContent=bd(t),e.title="Estimated one-way time at ~17 km/s (Voyager 1 heliocentric speed) — among the fastest speeds craft have left the Solar System."}function sr(){const i=vn?"milky-way":xt?.def.id,e=te.orbiting&&i!=null&&te.orbitTarget?.def.id===i;No.textContent=e?"Exit orbit":"Lock orbit",No.classList.toggle("active",e)}function jn(i){const e=mi!==i;mi=i;const t=et.findSystem(i);t&&(Qy.textContent=t.name),zo.querySelectorAll("button").forEach(n=>{n.classList.toggle("active",n.dataset.system===i)}),e&&Rl()}function Ml(){const i=we.isEnabled;Rs.setAttribute("aria-pressed",i?"true":"false"),Rs.textContent=i?"Sound FX on":"Sound FX off",Rs.title=i?"Mute sound effects (M)":"Unmute sound effects (M)",Bs.value=String(we.getVolume()),Bs.disabled=!i}function yu(){const i=Dn.isEnabled;Cs.setAttribute("aria-pressed",i?"true":"false"),Cs.textContent=i?"Music on":"Music off",Cs.title=i?"Mute music":"Play music",zs.value=String(Dn.getVolume()),zs.disabled=!i}function hn(i){return!i.classList.contains("hidden")}function kr(i,e){i.setAttribute("aria-expanded",e?"true":"false"),i.classList.toggle("active",e),i.setAttribute("aria-pressed",e?"true":"false")}function Sl(i){i&&ar("audio"),$s.classList.toggle("hidden",!i),kr(ml,i)}function bl(i){i&&ar("explore"),Zs.classList.toggle("hidden",!i),kr(gl,i)}function El(i){i&&ar("speed"),Js.classList.toggle("hidden",!i),kr(_l,i)}function Tl(i){i&&ar("ephemeris"),Qs.classList.toggle("hidden",!i),kr(vl,i)}function Al(i){i&&ar("controls"),ea.classList.toggle("hidden",!i),kr(yl,i)}function ar(i){i!=="audio"&&Sl(!1),i!=="explore"&&bl(!1),i!=="speed"&&El(!1),i!=="ephemeris"&&Tl(!1),i!=="controls"&&Al(!1)}function xu(){ar(),ta(!1)}function Mu(){return hn($s)||hn(Zs)||hn(Js)||hn(Qs)||hn(ea)||Au()}function mx(){Sl(!hn($s))}function gx(){bl(!hn(Zs))}function _x(){El(!hn(Js))}function vx(){Tl(!hn(Qs))}function yx(){Al(!hn(ea))}function Zn(){const i=Q.starfield.visible;ko.setAttribute("aria-pressed",i?"true":"false"),ko.title=i?"Hide starfield (I)":"Show starfield (I)";const e=et.asteroidBeltsVisible;Oo.setAttribute("aria-pressed",e?"true":"false"),Oo.title=e?"Hide asteroid belt (B)":"Show asteroid belt (B)";const t=Q.bridge.isEnabled;Bo.setAttribute("aria-pressed",t?"true":"false"),Bo.title=t?"Exit spaceship view (J)":"Enter spaceship view (J)",Jy.classList.toggle("hidden",!t||Tt.active),fl.classList.toggle("bridge-mode",t&&!Tt.active)}function Su(){we.toggle(),Ml(),we.isEnabled&&we.playBeep("ui")}function xx(){Dn.toggle(),yu(),Dn.isEnabled&&Dn.play()}function bu(){const i=Q.starfield.toggleVisible();localStorage.setItem("cosmos-starfield",i?"on":"off"),Zn(),we.playBeep("ui")}function Eu(){const i=et.toggleAsteroidBelts();localStorage.setItem("cosmos-asteroids",i?"on":"off"),Zn(),we.playBeep("ui")}function Tu(){const i=Q.bridge.toggle();localStorage.setItem("cosmos-bridge",i?"on":"off"),Q.bridge.setSurfaceActive(Tt.active),we.setEnabled(i),Ml(),Zn(),i&&we.playBeep("ui")}function Mx(){const i=ly;Gy.innerHTML=`
    <div><dt>Age</dt><dd>${i.age}</dd></div>
    <div><dt>Observable diameter</dt><dd>${i.diameter}</dd></div>
    <div><dt>Galaxies</dt><dd>${i.galaxies}</dd></div>
    <div><dt>Ordinary matter</dt><dd>${i.ordinaryMatter}</dd></div>
    <div><dt>Dark matter</dt><dd>${i.darkMatter}</dd></div>
    <div><dt>Dark energy</dt><dd>${i.darkEnergy}</dd></div>
    <div><dt>Geometry</dt><dd>${i.geometry}</dd></div>
    <div><dt>CMB</dt><dd>${i.cmb}</dd></div>
    <div><dt>Expansion</dt><dd>${i.expansion}</dd></div>
    <div><dt>Notes</dt><dd style="max-width:9rem">${i.description}</dd></div>
  `,gu.classList.remove("hidden")}function Sx(){gu.classList.add("hidden")}let Ed=!1;function bx(){if(Ed)return;const i=cy;Vy.src=yi("textures/hubble_xdf.png"),Hy.textContent=i.title,Xy.textContent=`${i.credit} · ${i.shortName}`,Wy.innerHTML=`
    <div><dt>Image</dt><dd>${i.shortName}</dd></div>
    <div><dt>Released</dt><dd>${i.released}</dd></div>
    <div><dt>Telescope</dt><dd>${i.telescope}</dd></div>
    <div><dt>Exposure</dt><dd>${i.exposure}</dd></div>
    <div><dt>Sky patch</dt><dd>${i.location}</dd></div>
    <div><dt>Galaxies</dt><dd>${i.galaxies}</dd></div>
    <div><dt>Lookback</dt><dd>${i.lookback}</dd></div>
    <div><dt>Notes</dt><dd style="max-width:11rem">${i.description}</dd></div>
  `,Ed=!0}function ta(i){if(i){if(!Q.isExtragalactic)return;bx(),Fo.classList.remove("hidden")}else Fo.classList.add("hidden");Os.setAttribute("aria-pressed",i?"true":"false"),Os.classList.toggle("active",i)}function Au(){return hn(Fo)}function Ex(){Q.isExtragalactic&&(ta(!Au()),we.playBeep("ui"))}function Tx(){const i=Q.isExtragalactic;Os.classList.toggle("hidden",!i),i||ta(!1)}function Or(){vn=!0,xt=null,yn.setSelected(null),Gs.querySelectorAll("button").forEach(e=>e.classList.remove("active")),tr.classList.remove("hidden"),mu.classList.remove("hidden"),pl.textContent="Warp to Milky Way",di.disabled=!0,di.textContent="Land (H)",fu.textContent="Milky Way";const i=oy;pu.innerHTML=`
    <div><dt>Class</dt><dd>${i.type}</dd></div>
    <div><dt>Diameter</dt><dd>${i.diameter}</dd></div>
    <div><dt>Stars</dt><dd>${i.stars}</dd></div>
    <div><dt>Age</dt><dd>${i.age}</dd></div>
    <div><dt>Mass</dt><dd>${i.mass}</dd></div>
    <div><dt>Sol from center</dt><dd>${i.solFromCenter}</dd></div>
    <div><dt>Disc thickness</dt><dd>${i.thickness}</dd></div>
    <div><dt>Your distance</dt><dd id="stat-earth-dist">—</dd></div>
    <div><dt>Current Travel Time</dt><dd id="stat-travel-time">—</dd></div>
    <div><dt>Notes</dt><dd style="max-width:9rem">${i.description}</dd></div>
  `,Mx(),Ar(),sr()}function wl(i=!1){if(!Q.isExtragalactic||te.warping)return;const e=Q.extragalactic.milkyWayTarget,t=Math.max(e.def.radius*3.2,14);te.beginWarp(e.worldPosition.clone(),t,i?e:void 0),Bt.textContent=i?"Entering Milky Way orbit…":"Approaching Milky Way…",Bt.classList.remove("hidden"),Or(),sr()}function wu(){if(!Q.isExtragalactic||te.warping)return;const i=Q.extragalactic.milkyWayTarget;te.orbiting&&te.orbitTarget?.def.id==="milky-way"?te.exitOrbit():Q.camera.position.distanceTo(i.worldPosition)<i.def.radius*12?te.enterOrbit(i):wl(!0),Or(),sr()}function Ax(i,e){if(!Q.isExtragalactic)return!1;const t=rr.getBoundingClientRect();return t.width<=0||t.height<=0?!1:(Hs.set((i-t.left)/t.width*2-1,-((e-t.top)/t.height)*2+1),Vs.setFromCamera(Hs,Q.camera),Vs.intersectObject(Q.extragalactic.milkyWayPickMesh,!1).length>0)}function zt(i){if(Q.isExtragalactic){vn||Or();return}const e=i?.def.id!==xt?.def.id||vn;if(vn=!1,xt=i,yn.setSelected(i?.def.id??null),mu.classList.remove("hidden"),Sx(),i?jn(i.systemId):Rl(),Gs.querySelectorAll("button").forEach(n=>{n.classList.toggle("active",n.dataset.id===i?.def.id)}),!i){tr.classList.add("hidden");return}e&&Fn&&we.playBeep("select"),tr.classList.remove("hidden"),pl.textContent="Warp to body",fu.textContent=i.def.name;const t=i.def.facts;pu.innerHTML=`
    <div><dt>Class</dt><dd>${t.type}</dd></div>
    <div><dt>Diameter</dt><dd>${t.diameterKm} km</dd></div>
    <div><dt>Orbit</dt><dd>${t.distanceAu} AU</dd></div>
    <div><dt>Day</dt><dd>${t.dayLength}</dd></div>
    <div><dt>Gravity</dt><dd>${t.gravity}</dd></div>
    <div><dt>System</dt><dd>${i.systemName}</dd></div>
    <div><dt>Distance from Earth</dt><dd id="stat-earth-dist">—</dd></div>
    <div><dt>Current Travel Time</dt><dd id="stat-travel-time">—</dd></div>
    <div><dt>Notes</dt><dd style="max-width:9rem">${i.def.description}</dd></div>
  `,Ar(),sr()}function Rl(){Gs.innerHTML="";const i=new Set(["luna","titan","europa","io","triton","phobos","acen-i-moon"]),e=et.bodies.filter(t=>t.systemId!==mi?!1:t.def.kind!=="moon"||i.has(t.def.id));for(const t of e){const n=document.createElement("li"),r=document.createElement("button");r.type="button",r.dataset.id=t.def.id,r.innerHTML=`${t.def.name}<span class="kind">${t.def.facts.type}</span>`,r.addEventListener("click",()=>{zt(t),te.requestLock()}),n.appendChild(r),Gs.appendChild(n)}}function wx(){zo.innerHTML="";for(const i of et.systems){const e=document.createElement("li"),t=document.createElement("button");t.type="button",t.dataset.system=i.id;const n=i.origin.length(),r=n<1?"Home system":`${(n/Dr).toFixed(1)} ly from Sol`;t.innerHTML=`${i.name}<span class="sys-meta">${r}</span>`,t.addEventListener("click",()=>{Ru(i.id)}),e.appendChild(t),zo.appendChild(e)}}function Ur(i,e=!1){if(wt.isActive)return;const t=Math.max(i.def.radius*4.5,3.5);te.beginWarp(i.worldPosition,t,e?i:void 0),zt(i),Q.camera.position.distanceTo(i.worldPosition)>Dr*.5?Bt.textContent=`Warping to ${i.systemName}…`:Bt.textContent="Warping…"}function Ru(i){const e=et.systemStar(i);e&&(jn(i),Ur(e),te.requestLock())}function Rx(){const i=et.systems.map(n=>n.id),e=i.indexOf(mi),t=i[(e+1)%i.length];Ru(t)}function Cu(i){te.orbiting&&te.orbitTarget?.def.id===i.def.id?te.exitOrbit():Q.camera.position.distanceTo(i.worldPosition)<i.def.radius*12?te.enterOrbit(i):Ur(i,!0),zt(i),sr()}function Cx(i){Vs.setFromCamera(i,Q.camera);const e=et.bodies.map(n=>n.pickMesh),t=Vs.intersectObjects(e,!1);return t.length===0?null:t[0].object.userData.body??null}function Lx(i,e){const t=rr.getBoundingClientRect();return t.width<=0||t.height<=0?null:(Hs.set((i-t.left)/t.width*2-1,-((e-t.top)/t.height)*2+1),Cx(Hs))}function Xo(){let i=null,e=1/0;for(const t of et.bodies){const n=Xs(t);n<e&&(e=n,i=t)}return i}function Px(){if(!te.orbiting||!te.orbitTarget)return null;const i=te.orbitTarget;return"systemId"in i?i:null}function Cl(){if(Tt.active||te.warping||wt.isActive||Q.isExtragalactic)return null;const i=Px()||(xt&&id(xt)?xt:null)||Xo();if(!i||!id(i))return null;const t=Xs(i)<Math.max(2.5,i.def.radius*.85),n=te.orbiting&&te.orbitTarget?.def.id===i.def.id&&te.orbitRadius<i.def.radius*6;return t||n?i:null}function Lu(i){te.exitOrbit(),te.velocity.set(0,0,0),te.lookEnabled=!1,Q.setUniverseVisible(!1),yn.setEnabled(!1),Q.bridge.setSurfaceActive(!0),Zn(),Tt.enter(i),zt(i),Go.textContent=`Surface · ${i.def.name}`,Go.classList.remove("hidden"),Ls.classList.add("hidden"),tr.classList.add("hidden"),we.playBeep("land")}function Td(){if(!Tt.active)return;const i=Tt.exit();if(te.lookEnabled=!0,Q.setUniverseVisible(!0),yn.setEnabled(!0),Q.bridge.setSurfaceActive(!1),Q.bridge.isEnabled&&Q.bridge.setEnabled(!0),Zn(),Go.classList.add("hidden"),tr.classList.remove("hidden"),we.playBeep("takeoff"),i){const e=i.worldPosition,t=new A(.35,.2,1).normalize().multiplyScalar(i.def.radius*4.5);Q.camera.position.copy(e).add(t),te.enterOrbit(i),zt(i)}}function Ad(i){const e=et.timeScale;if(e<=0&&i>1){Nn(1);return}Nn(e*i)}function Ix(){et.timeScale===0?Nn(Ps>0?Ps:1):(Ps=et.timeScale,Nn(0))}function Dx(){const i=R_(5);qi.min=i.min,qi.max=i.max,qi.value=i.today}function Pu(){const i=qi.value;if(!i){_d.textContent="Pick a date first.";return}const e=i.split("-").map(Number),t=new Date(Date.UTC(e[0],e[1]-1,e[2])),n=w_(t,5);qi.value=ws(n);const r=et.applySolEphemeris(n);et.timeScale!==0&&(Ps=et.timeScale,Nn(0));const s=Tr(n).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"});_d.textContent=r>0?`${r} planets set for ${s} UTC (orbits paused)`:"No Sol planets updated.",we.playBeep("confirm")}let ui=null,Wn=null;function Ha(i){const e=i&&ui==="sol",t=i&&ui==="stars";Ho.classList.toggle("active",e),Wo.classList.toggle("active",t),Ho.textContent=e?"End tour":"Sol tour",Wo.textContent=t?"End tour":"Star systems tour",vd&&(vd.textContent=ui==="stars"?"Star systems tour":"Cinematic tour"),sx.classList.toggle("hidden",!i),document.getElementById("crosshair")?.classList.toggle("hidden",i)}function Iu(i=ul,e="sol"){if(Tt.active||wt.isActive||Q.isExtragalactic||te.warping)return;te.exitOrbit(),te.velocity.set(0,0,0),te.unlock(),te.lookEnabled=!1,Wn=null,ui=e;const t=et.findById(i[0]?.bodyId??"");t&&jn(t.systemId),wt.start(i,{onBeat:r=>{ax.textContent=r.title,ox.textContent=r.subtitle??"";const s=et.findById(r.bodyId);s&&zt(s),we.playBeep("ui")},onComplete:r=>{te.lookEnabled=!0,Wn=null,ui=null,Ha(!1),Bt.classList.add("hidden"),r&&(zt(r),te.enterOrbit(r)),we.playBeep("confirm")},onCancel:()=>{te.lookEnabled=!0,Wn=null,ui=null,Ha(!1),Bt.classList.add("hidden"),we.playBeep("ui")},warpToBody:e==="stars"?(r,s)=>{jn(r.systemId),zt(r);const a=Math.max(r.def.radius*7,10);te.beginWarp(r.worldPosition,a),Bt.textContent=`Warping to ${r.systemName}…`,Bt.classList.remove("hidden"),Wn=s}:void 0})?(Ha(!0),we.playBeep("confirm")):(ui=null,te.lookEnabled=!0)}function na(){wt.isActive&&(Wn=null,te.warping&&(te.warping=!1),wt.cancel())}function Du(){wt.isActive?na():Iu(ul,"sol")}function Ux(){wt.isActive?na():Iu(U_,"stars")}function Ll(){const i=Q.isExtragalactic;Sr.setAttribute("aria-pressed",i?"true":"false"),Sr.classList.toggle("active",i),Sr.textContent=i?"Return to Milky Way":"Leave Milky Way",Sr.title=i?"Warp back to Sol inside the Milky Way":"Leave the Milky Way to see it among other galaxies",Tx()}function Fx(){if(!Fn||Tt.active||wt.isActive||Q.isExtragalactic||te.warping)return;te.exitOrbit(),te.velocity.set(0,0,0),te.unlock(),yn.setEnabled(!1),Q.setExtragalacticMode(!0),Q.starfield.setVisible(!0),Or(),Ll(),Zn();const i=new A(35,95,320);Q.camera.position.copy(i),Q.camera.lookAt(0,0,0),te.setPose(i,Q.camera.quaternion.clone()),te.scaleMul=140,Bt.textContent="Leaving the Milky Way…",Bt.classList.remove("hidden"),te.beginWarp(new A(0,0,0),130),we.playBeep("confirm")}function Nx(){if(!Q.isExtragalactic||te.warping)return;te.exitOrbit(),te.velocity.set(0,0,0),te.unlock(),Q.setExtragalacticMode(!1),localStorage.getItem("cosmos-starfield")==="off"&&Q.starfield.setVisible(!1),yn.setEnabled(!0),Ll(),Zn();const i=et.findById("sun");if(i){jn("sol"),zt(i);const e=Math.max(i.def.radius*8,40),t=new A(0,i.def.radius*3,i.def.radius*14);Q.camera.position.copy(i.worldPosition).add(t),Q.camera.lookAt(i.worldPosition),te.setPose(Q.camera.position.clone(),Q.camera.quaternion.clone()),te.beginWarp(i.worldPosition,e),Bt.textContent="Returning to Sol…",Bt.classList.remove("hidden")}we.playBeep("confirm")}function kx(){Q.isExtragalactic?Nx():Fx()}function Pl(){yd.innerHTML="",rx.classList.toggle("hidden",Hn.length>0);for(const i of Hn){const e=document.createElement("li"),t=document.createElement("button");t.type="button",t.className="bookmark-go",t.textContent=i.name,t.title="Go to saved view",t.addEventListener("click",()=>{Ox(i)});const n=document.createElement("button");n.type="button",n.className="bookmark-del",n.setAttribute("aria-label",`Delete ${i.name}`),n.textContent="×",n.addEventListener("click",()=>{Hn=Cy(Hn,i.id),hu(Hn),Pl(),we.playBeep("ui")}),e.appendChild(t),e.appendChild(n),yd.appendChild(e)}}function Uu(){if(!Fn||Tt.active||wt.isActive)return;const i=et.findSystem(mi),e=Ly(i?.name??"Space",xt?.def.name??null),t=te.getOrbitState(),n=Ry({name:e,systemId:mi,bodyId:xt?.def.id??null,camera:Q.camera,orbiting:te.orbiting,orbitBodyId:te.orbitTarget?.def.id??null,orbit:t??void 0});Hn=[n,...Hn.filter(r=>r.name!==n.name)].slice(0,24),hu(Hn),Pl(),we.playBeep("confirm")}function Ox(i){if(!Fn||Tt.active||(wt.isActive&&na(),te.warping))return;jn(i.systemId),Q.camera.fov=i.fov,Q.camera.updateProjectionMatrix();const e=i.orbitBodyId&&et.findById(i.orbitBodyId)||i.bodyId&&et.findById(i.bodyId)||null;if(i.orbiting&&e&&i.orbit)zt(e),te.enterOrbitAt(e,i.orbit);else{const t=new A(...i.position),n=new Yn(...i.quaternion);te.setPose(t,n),zt(e||null)}te.requestLock(),we.playBeep("confirm"),Q.bridge.isEnabled&&Q.bridge.setEnabled(!0)}function Fu(){Fn||(Fn=!0,By.classList.add("hidden"),fl.classList.remove("hidden"),we.unlock(),Dn.play(),we.playBeep("confirm"),te.requestLock(),zt(et.findById("earth")??null))}yn.setSelectHandler(i=>{zt(i),te.unlock()});zy.addEventListener("click",Fu);Rs.addEventListener("click",()=>{Su()});Cs.addEventListener("click",()=>{xx()});ml.addEventListener("click",()=>{mx()});Ky.addEventListener("click",()=>{Sl(!1)});gl.addEventListener("click",()=>{gx()});Yy.addEventListener("click",()=>{bl(!1)});_l.addEventListener("click",()=>{_x()});jy.addEventListener("click",()=>{El(!1)});vl.addEventListener("click",()=>{vx()});$y.addEventListener("click",()=>{Tl(!1)});yl.addEventListener("click",()=>{yx()});Zy.addEventListener("click",()=>{Al(!1)});document.addEventListener("pointerdown",i=>{if(!Mu())return;const e=i.target;$s.contains(e)||ml.contains(e)||Zs.contains(e)||gl.contains(e)||Js.contains(e)||_l.contains(e)||Qs.contains(e)||vl.contains(e)||ea.contains(e)||yl.contains(e)||xu()});Bs.addEventListener("input",()=>{we.setVolume(Number(Bs.value))});zs.addEventListener("input",()=>{Dn.setVolume(Number(zs.value)),Dn.isEnabled&&Dn.ensurePlaying()});ko.addEventListener("click",()=>{bu()});Oo.addEventListener("click",()=>{Eu()});Bo.addEventListener("click",()=>{Tu()});pl.addEventListener("click",()=>{if(vn&&Q.isExtragalactic){wl(),we.playBeep("confirm");return}xt&&Ur(xt)});No.addEventListener("click",()=>{if(vn&&Q.isExtragalactic){wu(),we.playBeep("confirm");return}xt&&(Cu(xt),we.playBeep("confirm"))});di.addEventListener("click",()=>{const i=Cl();i&&Lu(i)});Vo.addEventListener("input",()=>{Nn(lx(Number(Vo.value)),!1)});_u.forEach(i=>{i.addEventListener("click",()=>{Nn(Number(i.dataset.scale)),we.playBeep("ui")})});nx.addEventListener("click",()=>{Pu()});qi.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),Pu())});Ho.addEventListener("click",()=>{Du()});Wo.addEventListener("click",()=>{Ux()});Sr.addEventListener("click",()=>{kx()});Os.addEventListener("click",()=>{Ex()});qy.addEventListener("click",()=>{ta(!1),we.playBeep("ui")});ix.addEventListener("click",()=>{Uu()});rr.addEventListener("mousemove",i=>{Tt.active&&te.isLooking&&Tt.onMouseMove(i)});window.addEventListener("keydown",i=>{if(!Fn){(i.code==="Enter"||i.code==="Space")&&(i.preventDefault(),Fu());return}if(wt.isActive){(i.code==="Escape"||i.code==="KeyC")&&(i.preventDefault(),na());return}if(i.code==="Escape"&&Mu()){i.preventDefault(),xu();return}if(i.code==="KeyM"){i.preventDefault(),Su();return}if(i.code==="KeyI"){i.preventDefault(),bu();return}if(i.code==="KeyB"){i.preventDefault(),Eu();return}if(i.code==="KeyJ"){i.preventDefault(),Tu();return}if(i.code==="KeyC"){i.preventDefault(),Du();return}if(i.code==="KeyV"){i.preventDefault(),Uu();return}if(Tt.active){if(i.code==="KeyT"&&(i.preventDefault(),Td()),i.code==="KeyK"){i.preventDefault();const e=Q.starfield.toggleConstellations();localStorage.setItem("cosmos-constellations",e?"on":"off"),we.playBeep("ui")}if(i.code==="KeyN"){i.preventDefault();const e=Q.starfield.toggleStarNames();localStorage.setItem("cosmos-starnames",e?"on":"off"),we.playBeep("ui")}return}if(i.code==="KeyF"&&(vn&&Q.isExtragalactic?(wl(),we.playBeep("confirm")):xt&&Ur(xt)),i.code==="KeyO"&&(vn&&Q.isExtragalactic?(i.preventDefault(),wu(),we.playBeep("confirm")):xt&&(i.preventDefault(),Cu(xt),we.playBeep("confirm"))),i.code==="KeyH"){i.preventDefault();const e=Cl();e&&Lu(e)}if(i.code==="KeyT"&&(i.preventDefault(),Td()),i.code==="KeyL"&&(i.preventDefault(),yn.toggle(),we.playBeep("ui")),i.code==="KeyK"){i.preventDefault();const e=Q.starfield.toggleConstellations();localStorage.setItem("cosmos-constellations",e?"on":"off"),we.playBeep("ui")}if(i.code==="KeyN"){i.preventDefault();const e=Q.starfield.toggleStarNames();localStorage.setItem("cosmos-starnames",e?"on":"off"),we.playBeep("ui")}if(i.code==="KeyG"&&(i.preventDefault(),Rx()),i.code==="KeyR"){const e=et.findById("sun");e&&Ur(e)}i.code==="KeyP"&&(i.preventDefault(),Ix(),we.playBeep("ui")),i.code==="BracketLeft"&&(i.preventDefault(),Ad(1/1.5),we.playBeep("ui")),i.code==="BracketRight"&&(i.preventDefault(),Ad(1.5),we.playBeep("ui")),i.code==="Digit0"&&i.shiftKey&&Nn(0)});rr.addEventListener("click",i=>{if(!Fn||Tt.active||te.consumeLookDrag())return;if(Q.isExtragalactic){Ax(i.clientX,i.clientY)&&(Or(),Fn&&we.playBeep("select"));return}const e=Lx(i.clientX,i.clientY);e&&zt(e)});wx();Rl();jn("sol");Nn(1);Dx();Pl();et.setAsteroidBeltsVisible(localStorage.getItem("cosmos-asteroids")==="on");localStorage.getItem("cosmos-starfield")==="off"&&Q.starfield.setVisible(!1);Q.starfield.setConstellationsVisible(localStorage.getItem("cosmos-constellations")==="on");Q.starfield.setStarNamesVisible(localStorage.getItem("cosmos-starnames")==="on");const Nu=localStorage.getItem("cosmos-bridge")==="on";Nu&&Q.bridge.setEnabled(!0);we.setEnabled(Nu);Ml();yu();Zn();Ll();let wd=performance.now();function Is(i){const e=Math.min(.05,(i-wd)/1e3);if(wd=i,Tt.active){const r=Tt.update(e);Q.update(e);const s=Math.min(1,r/18);we.setEngine(s,!1),ys.textContent=Md(r),Ga.textContent="Surface",xs.textContent="Walk",An.textContent="Surface",yr.textContent=Tt.body?.def.name??"—",Ls.classList.add("hidden"),di.disabled=!0,Ar(),Q.render(),requestAnimationFrame(Is);return}if(wt.isActive){if(wt.isAwaitingWarp){if(te.update(e),!te.warping&&Wn){const r=Wn;Wn=null,Bt.classList.add("hidden"),r()}we.setEngine(.35,te.warping),An.textContent="Tour warp",ys.textContent="—",xs.textContent="Warp"}else wt.update(e),we.setEngine(.2,!1),An.textContent="Tour",ys.textContent="—",xs.textContent="Cinema",wt.isAwaitingWarp||Bt.classList.add("hidden");Q.update(e),yn.update(Q.camera,Va),Ga.textContent="—",yr.textContent=wt.currentTitle||"—",Ls.classList.add("hidden"),di.disabled=!0,Ar(),Q.render(),requestAnimationFrame(Is);return}if(Q.isExtragalactic){const r=Q.camera.position.length();te.setLocalScale(Math.max(r*.55,90),5)}else{const r=Xo();if(r){te.setLocalScale(Math.max(0,Xs(r)),r.def.radius);const s=et.nearestSystem(Q.camera.position);s.id!==mi&&!te.warping&&jn(s.id)}}te.update(e),Q.update(e),sr(),Q.isExtragalactic||yn.update(Q.camera,Va);const t=te.orbiting?.12:Math.min(1,te.speed/Math.max(8,te.scaleMul*1.8));we.setEngine(t,te.warping);const n=Q.isExtragalactic?null:Cl();if(di.disabled=!n,di.textContent=n?`Land on ${n.def.name}`:"Land (H)",Ls.classList.toggle("hidden",!n),ys.textContent=Md(te.speed),Ga.textContent=Q.isExtragalactic?"Deep space":te.scaleLabel,xs.textContent=te.orbiting?"Orbit":`${te.throttle.toFixed(te.throttle<1?2:1)}×`,te.warping?An.textContent=Q.isExtragalactic?"Galaxy warp":"Warp":Q.isExtragalactic?An.textContent="Extragalactic":te.orbiting?An.textContent=`Orbit · ${te.orbitTarget?.def.name??""}`:te.speed>te.scaleMul*2?An.textContent="Boost":Q.bridge.isEnabled?An.textContent="Spaceship":An.textContent="Cruise",Bt.classList.toggle("hidden",!te.warping),Q.isExtragalactic)yr.textContent=`MW disc · ${dx(Q.camera.position.length())}`;else{const r=Xo();r?yr.textContent=`${r.def.name} · ${Va(Math.max(0,Xs(r)))}`:yr.textContent="—"}Ar(),Q.render(),requestAnimationFrame(Is)}requestAnimationFrame(Is);
