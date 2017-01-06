let navLink = document.querySelector('#navlink');
let menuLinks = Array.prototype.slice.call(document.querySelectorAll('#menu a'));
let menuOpen = false;

let openMenu = () => {
	document.body.classList.remove('menu-closed');
	document.body.classList.add('menu-open');
};

let closeMenu = () => {
	document.body.classList.remove('menu-open');
	document.body.classList.add('menu-closed');
	document.body.classList.add('menu-closing');
	setTimeout(() => {
		document.body.classList.remove('menu-closing');
	}, 300);
};

let toggleMenu = e => {
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