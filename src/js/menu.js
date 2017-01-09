const navLink = document.querySelector('#navlink');
const menuLinks = Array.prototype.slice.call(document.querySelectorAll('#menu a'));
let menuOpen = false;

const openMenu = () => {
	document.body.classList.remove('menu-closed');
	document.body.classList.add('menu-open', 'disabled-onepage-scroll');
};

const closeMenu = () => {
	document.body.classList.remove('menu-open', 'disabled-onepage-scroll');
	document.body.classList.add('menu-closed', 'menu-closing');
	setTimeout(() => {
		document.body.classList.remove('menu-closing');
	}, 300);
};

const toggleMenu = e => {
	e.preventDefault();
	if (document.body.classList.contains('menu-open')) {
		closeMenu();
	}
	else {
		openMenu();
	}
};

navLink.addEventListener('click', toggleMenu);
menuLinks.forEach(link => {
	link.addEventListener('click', closeMenu);
});