var e,t,n,s=Object.defineProperty,r=e=>{throw TypeError(e)},o=(e,t,n)=>((e,t,n)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),a=(e,t,n)=>(((e,t,n)=>{t.has(e)||r("Cannot "+n)})(e,t,"access private method"),n);class c{constructor(){o(this,"_observers",[])}run(){throw new Error("Page not implemented")}disconnect(){this._observers.forEach((e=>e.disconnect()))}}class d extends c{run(){const e=new MutationObserver((()=>{const e=document.getElementById("libraryCards");if(!e)return;if(e.querySelector(".customElement"))return;const t=document.createElement("div");t.classList.add("button"),t.classList.add("customElement"),t.innerText="New custom button",e.querySelector("header .filters").prepend(t)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class i extends c{run(){const e=new MutationObserver((e=>{console.log("MarketPage: mutation observed",e);const t=document.getElementById("marketContainer");if(!t)return;if(console.log("MarketPage: marketContainer detected"),t.querySelector(".customElement"))return;const n=document.createElement("a"),s=window.ty.dulst.subdomain;n.href=`/${s}/sets`,n.classList.add("customElement"),n.innerHTML="Sets",t.querySelector("header.page menu.secondaryMenu").append(n),console.log("MarketPage: button added")})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class u extends c{constructor(){var t,n,s;super(...arguments),t=this,(n=e).has(t)?r("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,s)}run(){const s=document.getElementById("wrapper"),r=new MutationObserver((()=>{const s=document.getElementById("setsContainer");s&&(s.querySelector(".customElement")||(a(this,e,t).call(this,s),a(this,e,n).call(this)))}));r.observe(s,{childList:!0,subtree:!0}),this._observers.push(r);new MutationObserver((()=>{const t=document.getElementById("dulstMenu");t&&(t.querySelector(".customElement")||a(this,e,n).call(this))})).observe(s,{childList:!0,subtree:!0})}}let l;function m(e){e.includes("/decks")&&(l=new d),e.includes("/market")&&(l=new i),e.includes("/sets")&&(l=new u),l&&l.run()}e=new WeakSet,t=function(e){const t=e.querySelector("header.page menu.secondaryMenu a:first-child"),n=window.ty.dulst.subdomain;t.href=`/${n}/market`,t.classList.add("customElement"),t.innerHTML="Market"},n=function(){document.querySelector("#wrapper header.header li.market").classList.add("active")},window.navigation.addEventListener("navigate",(e=>{l&&l.disconnect(),l=null,m(e.destination.url)})),m(window.location.href);
