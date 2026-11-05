// Google Analytics 4 — site-wide measurement
if (!window.__mirageGa4Loaded) {
  window.__mirageGa4Loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-EHEL0THV3R');
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-EHEL0THV3R';
  document.head.appendChild(gaScript);
}

(function(){
var y=document.getElementById("y");if(y)y.textContent=new Date().getFullYear();
var L=document.documentElement.lang;

// mobile menu
var bg=document.getElementById("burger"),mn=document.getElementById("menu");
if(bg&&mn){
  bg.addEventListener("click",function(){var o=mn.classList.toggle("open");bg.setAttribute("aria-expanded",o?"true":"false")});
  mn.addEventListener("click",function(e){if(e.target.tagName==="A"){mn.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
}

// reveal on scroll
var els=document.querySelectorAll(".rv");
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(el){io.observe(el)});
}else{els.forEach(function(el){el.classList.add("in")})}

// portfolio filter
var chips=document.querySelectorAll(".chipb");
chips.forEach(function(c){c.addEventListener("click",function(){
  chips.forEach(function(x){x.classList.remove("on")});c.classList.add("on");
  var f=c.getAttribute("data-f");
  document.querySelectorAll("#pgrid .proj").forEach(function(p){
    p.classList.toggle("hide",f!=="all"&&p.getAttribute("data-k")!==f);
    p.classList.add("in");
  });
})});

// lightbox
var lb=document.getElementById("lb");
if(lb){var li=lb.querySelector("img");
  document.querySelectorAll(".shot").forEach(function(f){f.addEventListener("click",function(){li.src=f.querySelector("img").src;lb.classList.add("on")})});
  lb.addEventListener("click",function(){lb.classList.remove("on")});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});}

// progress bars in table
var bars=document.querySelectorAll(".pbar");
function setBar(b){b.style.width=(b.getAttribute("data-w")*0.9)+"px"}
if(bars.length&&"IntersectionObserver" in window){
  var bo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setBar(e.target);bo.unobserve(e.target)}})},{threshold:.3});
  bars.forEach(function(b){bo.observe(b)});
}else{bars.forEach(setBar)}

// GA4 lead interaction tracking (site-wide)
document.addEventListener("click",function(e){
  var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;
  if(!a||!window.gtag)return;
  var href=(a.getAttribute("href")||"").trim();
  var text=(a.innerText||a.getAttribute("aria-label")||"").trim().slice(0,80);
  if(/wa\.me\//i.test(href)||/api\.whatsapp\.com/i.test(href)||/whatsapp\.com\//i.test(href)){
    window.gtag("event","whatsapp_click",{link_url:href,link_text:text,page_location:window.location.href});
  }else if(/^tel:/i.test(href)){
    window.gtag("event","phone_click",{link_url:href,link_text:text,page_location:window.location.href});
  }
});

// contact form -> WhatsApp
var cf=document.getElementById("cf");
if(cf)cf.addEventListener("submit",function(e){
  e.preventDefault();
  var n=document.getElementById("fn").value.trim(),sv=document.getElementById("fs").value,m=document.getElementById("fm").value.trim();
  var ar=L==="ar";
  var msg=(ar?"مرحباً ميراج، أنا ":"Hello Mirage, I'm ")+(n||"-")+(ar?"\nالخدمة: ":"\nService: ")+sv+(m?(ar?"\nالتفاصيل: ":"\nDetails: ")+m:"");
  if(window.gtag){
    window.gtag("event","contact_form_submit",{method:"whatsapp_handoff",service:sv,page_location:window.location.href});
    window.gtag("event","whatsapp_click",{link_url:"https://wa.me/201095453622",link_text:"contact_form_submit",page_location:window.location.href});
  }
  window.open("https://wa.me/201095453622?text="+encodeURIComponent(msg),"_blank","noopener");
});
})();
