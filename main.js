(function(){
var cur="ar";
try{var s=localStorage.getItem("lang");if(s==="en"||s==="ar")cur=s}catch(e){}
function apply(l){
  cur=l;
  document.documentElement.lang=l;
  document.documentElement.dir=l==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-ar]").forEach(function(el){el.innerHTML=el.getAttribute("data-"+l)});
  document.querySelectorAll("option[data-en]").forEach(function(o){o.textContent=l==="en"?o.getAttribute("data-en"):o.value});
  var b=document.getElementById("lang");if(b)b.textContent=l==="ar"?"English":"العربية";
  try{localStorage.setItem("lang",l)}catch(e){}
}
var lb=document.getElementById("lang");
if(lb)lb.addEventListener("click",function(){apply(cur==="ar"?"en":"ar")});
if(cur==="en")apply("en");

var y=document.getElementById("y");if(y)y.textContent=new Date().getFullYear();

var bg=document.getElementById("burger"),mn=document.getElementById("menu");
if(bg)bg.addEventListener("click",function(){mn.classList.toggle("open")});

// reveal
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

// contact form -> WhatsApp
var cf=document.getElementById("cf");
if(cf)cf.addEventListener("submit",function(e){
  e.preventDefault();
  var n=document.getElementById("fn").value.trim(),sv=document.getElementById("fs").value,m=document.getElementById("fm").value.trim();
  var msg=(cur==="ar"?"مرحباً ميراج، أنا ":"Hello Mirage, I'm ")+(n||"-")+(cur==="ar"?"\nالخدمة: ":"\nService: ")+sv+(m?(cur==="ar"?"\nالتفاصيل: ":"\nDetails: ")+m:"");
  window.open("https://wa.me/201095453622?text="+encodeURIComponent(msg),"_blank");
});
})();
