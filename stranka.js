
document.querySelectorAll('button[aria-label="Otvoriť menu"], button[aria-label="Zavrieť menu"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    var nav = document.querySelector('nav[aria-label="Mobilná navigácia"]');
    if (nav) nav.classList.toggle("hidden");
  });
});
var buttons = Array.prototype.slice.call(document.querySelectorAll('button[aria-label^="Zväčšiť"]'));
if (!buttons.length) buttons = Array.prototype.slice.call(document.querySelectorAll("button.cursor-zoom-in"));
var photos = buttons.map(function (btn) {
  var img = btn.querySelector("img");
  return img ? { src: img.getAttribute("src"), alt: img.alt || "" } : null;
}).filter(Boolean);
var state = { open: false, index: 0, scale: 1, x: 0, y: 0 };
var pointers = new Map();
var drag = null;
var pinch = null;
var box = document.createElement("div");
box.setAttribute("role", "dialog");
box.style.cssText = "position:fixed;inset:0;z-index:80;display:none;background:rgba(20,24,31,.95);color:#f3efe6";
box.innerHTML = '<div style="position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px"><p data-cap style="margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;opacity:.8"></p><button type="button" data-close aria-label="Zavrieť fotku" style="width:44px;height:44px;border:0;border-radius:999px;background:#f3efe6;color:#14181f;font-size:22px">×</button></div><div data-stage style="height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:64px 12px 96px;touch-action:none"><img data-photo alt="" draggable="false" style="max-height:78vh;max-width:100%;object-fit:contain;user-select:none"></div><div style="position:absolute;left:0;right:0;bottom:16px;display:flex;justify-content:center;gap:8px;padding:0 12px"><button type="button" data-prev style="border:0;border-radius:999px;background:rgba(243,239,230,.15);color:#f3efe6;padding:12px 16px;font-weight:700">Predošlá</button><button type="button" data-out aria-label="Oddialiť" style="width:44px;height:44px;border:0;border-radius:999px;background:#f3efe6;color:#14181f;font-size:22px">−</button><button type="button" data-reset style="border:0;border-radius:999px;background:rgba(243,239,230,.15);color:#f3efe6;padding:12px 14px;font-weight:700">100%</button><button type="button" data-in aria-label="Priblížiť" style="width:44px;height:44px;border:0;border-radius:999px;background:#b8891a;color:#14181f;font-size:22px">+</button><button type="button" data-next style="border:0;border-radius:999px;background:rgba(243,239,230,.15);color:#f3efe6;padding:12px 16px;font-weight:700">Ďalšia</button></div>';
document.body.appendChild(box);
var cap = box.querySelector("[data-cap]");
var stage = box.querySelector("[data-stage]");
var photo = box.querySelector("[data-photo]");
var resetBtn = box.querySelector("[data-reset]");
var prevBtn = box.querySelector("[data-prev]");
var nextBtn = box.querySelector("[data-next]");
function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
function render() {
  var item = photos[state.index];
  if (!item) return;
  photo.src = item.src;
  photo.alt = item.alt;
  cap.textContent = item.alt;
  photo.style.transform = "translate(" + state.x + "px," + state.y + "px) scale(" + state.scale + ")";
  resetBtn.textContent = Math.round(state.scale * 100) + "%";
  var many = photos.length > 1;
  prevBtn.style.display = many ? "" : "none";
  nextBtn.style.display = many ? "" : "none";
  box.style.display = state.open ? "block" : "none";
  document.body.style.overflow = state.open ? "hidden" : "";
}
function resetView() { state.scale = 1; state.x = 0; state.y = 0; }
function zoomBy(delta) {
  state.scale = clamp(Math.round((state.scale + delta) * 100) / 100, 1, 4);
  if (state.scale === 1) { state.x = 0; state.y = 0; }
  render();
}
function step(dir) {
  state.index = (state.index + dir + photos.length) % photos.length;
  resetView();
  render();
}
function openAt(i) { state.open = true; state.index = i; resetView(); render(); }
function closeBox() { state.open = false; render(); }
buttons.forEach(function (btn, i) {
  btn.addEventListener("click", function (event) { event.preventDefault(); openAt(i); });
});
box.querySelector("[data-close]").addEventListener("click", closeBox);
box.querySelector("[data-in]").addEventListener("click", function () { zoomBy(0.4); });
box.querySelector("[data-out]").addEventListener("click", function () { zoomBy(-0.4); });
resetBtn.addEventListener("click", function () { resetView(); render(); });
prevBtn.addEventListener("click", function () { step(-1); });
nextBtn.addEventListener("click", function () { step(1); });
stage.addEventListener("wheel", function (event) {
  if (!state.open) return;
  event.preventDefault();
  zoomBy(event.deltaY < 0 ? 0.25 : -0.25);
}, { passive: false });
stage.addEventListener("dblclick", function () {
  if (state.scale > 1) resetView(); else state.scale = 2.4;
  render();
});
stage.addEventListener("pointerdown", function (event) {
  stage.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (pointers.size === 1) drag = { x: event.clientX, y: event.clientY, px: state.x, py: state.y };
  if (pointers.size === 2) {
    var pts = Array.from(pointers.values());
    pinch = { dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), scale: state.scale };
    drag = null;
  }
});
stage.addEventListener("pointermove", function (event) {
  if (!pointers.has(event.pointerId)) return;
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (pointers.size === 2 && pinch) {
    var pts = Array.from(pointers.values());
    var dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    state.scale = clamp(pinch.scale * (dist / pinch.dist), 1, 4);
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    render();
    return;
  }
  if (drag && state.scale > 1) {
    state.x = drag.px + (event.clientX - drag.x);
    state.y = drag.py + (event.clientY - drag.y);
    render();
  }
});
function endPointer(event) { pointers.delete(event.pointerId); drag = null; pinch = null; }
stage.addEventListener("pointerup", endPointer);
stage.addEventListener("pointercancel", endPointer);
window.addEventListener("keydown", function (event) {
  if (!state.open) return;
  if (event.key === "Escape") closeBox();
  if (event.key === "ArrowRight") step(1);
  if (event.key === "ArrowLeft") step(-1);
});
