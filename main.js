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

// contact form -> WhatsApp
var cf=document.getElementById("cf");
if(cf)cf.addEventListener("submit",function(e){
  e.preventDefault();
  var n=document.getElementById("fn").value.trim(),sv=document.getElementById("fs").value,m=document.getElementById("fm").value.trim();
  var ar=L==="ar";
  var msg=(ar?"مرحباً ميراج، أنا ":"Hello Mirage, I'm ")+(n||"-")+(ar?"\nالخدمة: ":"\nService: ")+sv+(m?(ar?"\nالتفاصيل: ":"\nDetails: ")+m:"");
  window.open("https://wa.me/201095453622?text="+encodeURIComponent(msg),"_blank","noopener");
});
})();
