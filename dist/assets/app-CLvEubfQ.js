var e,t,s,n=Object.defineProperty,r=e=>{throw TypeError(e)},o=(e,t,s)=>((e,t,s)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),c=(e,t,s)=>(((e,t,s)=>{t.has(e)||r("Cannot "+s)})(e,t,"access private method"),s);class i extends Page{run(){const e=new MutationObserver(((e,t)=>{const s=document.getElementById("cardFullInfo");if(!s)return;t.disconnect();new MutationObserver((()=>{const e=s.querySelector(".name"),t=e.cloneNode(!0);t.style.opacity=0,t.style.whiteSpace="nowrap",t.style.width="fit-content",t.style.minWidth="90%",e.parentElement.append(t);let n=parseFloat(window.getComputedStyle(e).getPropertyValue("font-size"));for(;e.clientWidth<t.clientWidth;)n-=1,t.style.fontSize=n+"px";e.style.fontSize=n+"px",t.remove()})).observe(s,{childList:!0,subtree:!0}),this._observers.push(t)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0})}}let a,d=class{constructor(){o(this,"_observers",[])}run(){throw new Error("Page not implemented")}disconnect(){this._observers.forEach((e=>e.disconnect()))}};class l extends d{run(){const e=new MutationObserver((e=>{const t=document.getElementById("cardsList");if(!t)return;const s=window.ty.fullCardsListIndex.nid;t.querySelectorAll("#card-list-container .card:not(.customElement)").forEach((e=>{const t=document.createElement("div");t.classList.add("properties"),e.append(t),e.classList.add("customElement"),e.classList.add("visible");const n=s[e.getAttribute("data-cardid")];n&&(e.classList.contains("hero")||u("cost",n,t),(e.classList.contains("hero")||e.classList.contains("unit")||e.classList.contains("equip"))&&u("atk",n,t,!0),(e.classList.contains("hero")||e.classList.contains("unit"))&&u("health",n,t),e.classList.contains("equip")&&u("dur",n,t),u("source",n,t),u("reqSource",n,t))}))})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}function u(e,t,s,n=!1){if(void 0===t[e])return null;const r=document.createElement("div");if(!n&&null===t[e])return;const o=t[e]||0;r.setAttribute("data-name",e),r.setAttribute("data-value",o+""),r.classList.add("property"),r.classList.add("mainProperty"),r.innerText=o,s.append(r)}class m extends d{run(){const e=new MutationObserver((()=>{const e=document.getElementById("libraryCards");e&&(e.querySelector(".customSelect")||document.querySelectorAll("#libraryCards .card").forEach((e=>{e.classList.add("visible")})))})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class h extends d{run(){const e=new MutationObserver((e=>{const t=document.getElementById("marketContainer");if(!t)return;if(t.querySelector(".customElement"))return;const s=document.createElement("a"),n=window.ty.dulst.subdomain;s.href=`/${n}/sets`,s.classList.add("customElement"),s.innerHTML="Sets",t.querySelector("header.page menu.secondaryMenu").append(s)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class p extends d{constructor(){var t,s,n;super(...arguments),t=this,(s=e).has(t)?r("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(t):s.set(t,n)}run(){const n=document.getElementById("wrapper"),r=new MutationObserver((()=>{const n=document.getElementById("setsContainer");n&&(n.querySelector(".customElement")||(c(this,e,t).call(this,n),c(this,e,s).call(this)))}));r.observe(n,{childList:!0,subtree:!0}),this._observers.push(r);new MutationObserver((()=>{const t=document.getElementById("dulstMenu");t&&(t.querySelector(".customElement")||c(this,e,s).call(this))})).observe(n,{childList:!0,subtree:!0})}}e=new WeakSet,t=function(e){const t=e.querySelector("header.page menu.secondaryMenu a:first-child"),s=window.ty.dulst.subdomain;t.href=`/${s}/market`,t.classList.add("customElement"),t.innerHTML="Card Packs"},s=function(){document.querySelector("#header li.market").classList.add("active")};const b=new i;function y(e){e.includes("/cards")&&(a=new l),e.includes("/decks")&&(a=new m),e.includes("/market")&&(a=new h),e.includes("/sets")&&(a=new p),a&&a.run()}window.navigation.addEventListener("navigate",(e=>{a&&a.disconnect(),b.disconnect(),a=null,y(e.destination.url),b.run()})),y(window.location.href);
