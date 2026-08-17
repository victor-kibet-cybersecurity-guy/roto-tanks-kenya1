
const PHONE = "254755032745";
const PHONE_DISPLAY = "0755 032 745";
const waUrl = msg => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if(menuBtn && nav){
    const closeMenu=()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");document.body.style.overflow="";};
    menuBtn.addEventListener("click",()=>{
      const open=!nav.classList.contains("open");nav.classList.toggle("open",open);menuBtn.setAttribute("aria-expanded",String(open));document.body.style.overflow=open?"hidden":"";
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
    document.addEventListener("click",e=>{if(nav.classList.contains("open")&&!nav.contains(e.target)&&!menuBtn.contains(e.target))closeMenu();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
  }

  document.querySelectorAll("[data-wa]").forEach(el=>{
    el.addEventListener("click", e => {
      const msg=el.dataset.wa || "Hello, I would like information about Roto Tanks in Kenya.";
      el.href=waUrl(msg);
    });
  });

  document.querySelectorAll(".faq-q").forEach(btn=>btn.addEventListener("click",()=>{
    const item=btn.closest(".faq-item"); const open=item.classList.toggle("open"); btn.setAttribute("aria-expanded",String(open));
  }));

  const contactForm=document.querySelector("#contactForm");
  if(contactForm) contactForm.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(contactForm);
    const msg=`Hello, my name is ${f.get("name")}. Phone: ${f.get("phone")}. Product: ${f.get("product")||"Not specified"}. Capacity: ${f.get("capacity")||"Not specified"}. County: ${f.get("county")}. Town: ${f.get("town")}. Message: ${f.get("message")}`;
    window.open(waUrl(msg),"_blank","noopener");
  });

  const deliveryForm=document.querySelector("#deliveryForm");
  if(deliveryForm) deliveryForm.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(deliveryForm);
    const msg=`Hello, I need delivery information for a ${f.get("capacity")||"Roto Tank"} to ${f.get("town")}, ${f.get("county")}.`;
    window.open(waUrl(msg),"_blank","noopener");
  });

  const calc=document.querySelector("#tankCalculator");
  if(calc) calc.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(calc), use=f.get("use"), people=Number(f.get("people")||0), days=Number(f.get("days")||3), daily=Number(f.get("daily")||100);
    let estimate = people ? people*daily*days : 3000;
    if(use==="Apartment") estimate=Math.max(estimate,10000);
    if(use==="Farm"||use==="School"||use==="Business") estimate=Math.max(estimate,8000);
    if(use==="Construction") estimate=Math.max(estimate,5000);
    if(use==="Rainwater harvesting"||use==="Borehole storage") estimate=Math.max(estimate,5000);
    const sizes=[1000,2000,3000,4000,5000,6000,8000,10000,16000,20000,24000];
    const size=sizes.find(s=>s>=estimate)||24000;
    const out=document.querySelector("#calcResult");
    out.innerHTML=`Estimated storage need: <strong>${estimate.toLocaleString()}L</strong>. Suggested tank size: <strong>${size.toLocaleString()}L</strong>. This is an estimate. <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waUrl(`Hello, I need help choosing a water tank. My use is ${use} and the calculator suggested about ${size} litres. Please advise.`)}">Request Quote on WhatsApp</a>`;
  });

  if("serviceWorker" in navigator){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
  }
});
