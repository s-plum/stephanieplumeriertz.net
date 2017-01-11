// import ScrollMagic from 'scrollmagic';
import onePageScroll from './onePageScroll';

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

// //triggers for animation - top and bottom of each section
// let sectionHeight = 0;

// let getSectionHeight = () => {
// 	return sectionHeight;
// };

// let setSectionHeight = () => {
// 	sectionHeight = window.innerHeight;
// };

// setSectionHeight();
// document.querySelector('#content').addEventListener('scroll', setSectionHeight);

// document.querySelector('#code').getBoundingClientRect();

// let controller = new ScrollMagic.Controller();

// let containerTween = TweenMax.to('#plumnom', 200, {
// 	css: {
// 		yPercent: -200
// 	},
// 	force3D: true
// })

// let containerScene = new ScrollMagic.Scene({triggerElement: '#code'})
// 							.setClassToggle('#plumnom', "plum-front")
// 							.addTo(controller);