
document.querySelectorAll("[data-menu]").forEach(function(btn){
  btn.addEventListener("click", function(){
    document.querySelector("nav").classList.toggle("open");
  });
});
var box = document.getElementById("lightbox");
var big = document.getElementById("lightbox-img");
document.querySelectorAll("[data-zoom]").forEach(function(img){
  img.addEventListener("click", function(){
    big.src = img.src;
    big.alt = img.alt;
    box.classList.add("open");
  });
});
if(box) box.addEventListener("click", function(){ box.classList.remove("open"); });
