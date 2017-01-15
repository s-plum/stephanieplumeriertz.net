const detectTouch = () => {
	document.querySelector('html').classList.add('touch');
	window.removeEventListener('touchstart', detectTouch, false);
};

window.addEventListener('touchstart', detectTouch, false);