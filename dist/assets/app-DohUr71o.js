var e,t,n,s=Object.defineProperty,r=e=>{throw TypeError(e)},o=(e,t,n)=>((e,t,n)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),c=(e,t,n)=>(((e,t,n)=>{t.has(e)||r("Cannot "+n)})(e,t,"access private method"),n);class a{constructor(){o(this,"_observers",[])}run(){throw new Error("Page not implemented")}disconnect(){this._observers.forEach((e=>e.disconnect()))}}class i extends a{run(){const e=new MutationObserver((e=>{const t=document.getElementById("cardsList");if(!t)return;const n=window.ty.fullCardsListIndex.nid;t.querySelectorAll("#card-list-container .card:not(.customElement)").forEach((e=>{const t=document.createElement("div");t.classList.add("properties"),e.append(t);e.querySelector("img").setAttribute("loading","lazy"),e.classList.add("customElement");const s=n[e.getAttribute("data-cardid")];s&&(e.classList.contains("hero")||d("cost",s,t),d("atk",s,t,e.classList.contains("hero")||e.classList.contains("unit")),d("health",s,t),d("dur",s,t),d("source",s,t),d("reqSource",s,t))}))})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}function d(e,t,n,s=!1){if(void 0===t[e])return null;const r=document.createElement("div");if(!s&&null===t[e])return;const o=t[e]||0;r.setAttribute("data-name",e),r.setAttribute("data-value",o+""),r.classList.add("property"),r.classList.add("mainProperty"),r.innerText=o,n.append(r)}const u=[{text:"Type",value:""},{text:"Hero",value:"hero"},{text:"Unit",value:"unit"},{text:"Spell",value:"spell"},{text:"Companion",value:"equip"}];class l extends a{run(){const e=new MutationObserver((()=>{const e=document.getElementById("libraryCards");if(!e)return;if(e.querySelector(".customSelect"))return;const t=document.createElement("select");t.classList.add("customSelect"),u.forEach((e=>{const n=document.createElement("option");n.text=e.text,n.value=e.value,t.add(n)})),e.querySelector("header .filters").prepend(t)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class m extends a{run(){const e=new MutationObserver((e=>{const t=document.getElementById("marketContainer");if(!t)return;if(t.querySelector(".customElement"))return;const n=document.createElement("a"),s=window.ty.dulst.subdomain;n.href=`/${s}/sets`,n.classList.add("customElement"),n.innerHTML="Sets",t.querySelector("header.page menu.secondaryMenu").append(n)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class h extends a{constructor(){var t,n,s;super(...arguments),t=this,(n=e).has(t)?r("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,s)}run(){const s=document.getElementById("wrapper"),r=new MutationObserver((()=>{const s=document.getElementById("setsContainer");s&&(s.querySelector(".customElement")||(c(this,e,t).call(this,s),c(this,e,n).call(this)))}));r.observe(s,{childList:!0,subtree:!0}),this._observers.push(r);new MutationObserver((()=>{const t=document.getElementById("dulstMenu");t&&(t.querySelector(".customElement")||c(this,e,n).call(this))})).observe(s,{childList:!0,subtree:!0})}}let p;function v(e){e.includes("/cards")&&(p=new i),e.includes("/decks")&&(p=new l),e.includes("/market")&&(p=new m),e.includes("/sets")&&(p=new h),p&&p.run()}e=new WeakSet,t=function(e){const t=e.querySelector("header.page menu.secondaryMenu a:first-child"),n=window.ty.dulst.subdomain;t.href=`/${n}/market`,t.classList.add("customElement"),t.innerHTML="Card Packs"},n=function(){document.querySelector("#header li.market").classList.add("active")},window.navigation.addEventListener("navigate",(e=>{p&&p.disconnect(),p=null,v(e.destination.url)})),v(window.location.href);
