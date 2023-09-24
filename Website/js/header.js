const menuButton = document.querySelector('button.menu_button');
const closeMenu = document.querySelector('button.close_menu');
const navbar = document.querySelector('.box_nav_head');
menuButton.addEventListener('click', () => {
  navbar.classList.toggle('open');
});


closeMenu.addEventListener('click', () => {
  navbar.classList.remove('open');
});
