const e=new MutationObserver(((e,t)=>{console.log("mutation observed");const o=document.getElementById("libraryCards");if(!o)return;t.disconnect();const n=document.createElement("div");n.classList.add("button"),n.innerText="New custom button",o.querySelector("header .filters").prepend(n),console.log("button added")})),t=document.getElementById("wrapper");e.observe(t,{childList:!0,subtree:!0}),console.log("observer started");
