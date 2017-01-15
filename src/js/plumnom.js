import onePageScroll from './onepagescroll';
import supportsTransitions from './supports-transitions';

//only use this if transitions are supported
if (supportsTransitions) {
	//move the icon container out of the content scroller, if it exists
	const plumnom = document.querySelector('#plumnom');

	if (plumnom) {
		document.body.appendChild(plumnom);
	}

	const setAnimationClass = (index, nextEl, prevEl) => {
		if (prevEl && nextEl.id == prevEl.id) {
			return false;
		}

		if (nextEl && !plumnom.classList.contains('page-' + nextEl.id)) {
			plumnom.className = 'page-' + nextEl.id;
		}

		plumnom.classList.add('animating');

		if (prevEl && !plumnom.classList.contains('from-page-' + prevEl.id)) {
			plumnom.className += ' from-page-' + prevEl.id;
		}

		setTimeout(() => {
			plumnom.classList.add('animation-progress');
		}, 50);

		setTimeout(() => {
			plumnom.classList.remove('animation-progress','animating');
		}, 501);
	};

	//change classes on scroll
	if (document.body.classList.contains('page-index')) {
		onePageScroll('#content', {
			animationTime: 500,
			beforeMove: setAnimationClass,
			pagination: false
		});

		//update menu links to change pages with onePageScroll
		const menuLinks = Array.prototype.slice.call(document.querySelectorAll('#menu a'));

		menuLinks.forEach((m, i) => {
			m.setAttribute('data-onepagescroll-index', i+1);
		});
	}
}
else {
	document.getElementsByTagName('html')[0].className = '';
}