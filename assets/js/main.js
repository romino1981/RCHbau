const menu = document.getElementById('menu');
const navToggle = document.querySelector('.hamb');
if (navToggle && menu) {
  navToggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}
