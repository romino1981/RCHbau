
document.querySelectorAll('button[aria-label="Otvoriť menu"], button[aria-label="Zavrieť menu"]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = document.querySelector('nav[aria-label="Mobilná navigácia"]');
    if (nav) nav.classList.toggle('hidden');
  });
});
var box = document.createElement('div');
box.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;z-index:80;padding:16px';
var big = document.createElement('img');
big.style.cssText = 'max-width:96vw;max-height:92vh;object-fit:contain';
box.appendChild(big);
box.addEventListener('click', function () { box.style.display = 'none'; });
document.body.appendChild(box);
document.querySelectorAll('button[aria-label^="Zväčšiť"]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var img = btn.querySelector('img');
    if (!img) return;
    big.src = img.src;
    big.alt = img.alt;
    box.style.display = 'flex';
  });
});
