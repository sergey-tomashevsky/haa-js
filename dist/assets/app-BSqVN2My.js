var e=Object.defineProperty,t=(t,n,o)=>((t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o)(t,"symbol"!=typeof n?n+"":n,o);class n{constructor(){t(this,"_observers",[])}run(){throw new Error("Page not implemented")}disconnect(){console.log("Page: disconnect()",this._observers),this._observers.forEach((e=>e.disconnect()))}}class o extends n{run(){const e=new MutationObserver((()=>{const e=document.getElementById("libraryCards");if(!e)return;if(e.querySelector(".customElement"))return;const t=document.createElement("div");t.classList.add("button"),t.classList.add("customElement"),t.innerText="New custom button",e.querySelector("header .filters").prepend(t)})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}class r extends n{run(){const e=new MutationObserver((e=>{console.log("MarketPage: mutation observed",e);const t=document.getElementById("marketContainer");if(!t)return;if(console.log("MarketPage: marketContainer detected"),t.querySelector(".customElement"))return;const n=document.createElement("a"),o=window.ty.subdomain;n.href=`/${o}/sets`,n.classList.add("customElement"),n.innerHTML="Sets",t.querySelector("header.page menu.secondaryMenu").append(n),console.log("MarketPage: button added")})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),this._observers.push(e)}}let s;function c(){window.location.href.includes("/decks")&&(s=new o),window.location.href.includes("/market")&&(s=new r),console.log("executeCurrentRoute",s),s&&s.run()}window.navigation.addEventListener("navigate",(e=>{console.log("Location changed",window.location.href),s&&s.disconnect(),s=null,c()})),c();
