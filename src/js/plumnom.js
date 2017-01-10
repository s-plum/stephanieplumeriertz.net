// import ScrollMagic from 'scrollmagic';
import onePageScroll from './onePageScroll';

//move the icon container out of the content scroller, if it exists
const plumnom = document.querySelector('#plumnom');

if (plumnom) {
	document.body.appendChild(plumnom);
}

//change classes on scroll
onePageScroll('#content', {
	animationTime: 500,
	beforeMove: (index, nextEl, prevEl) => {
		if (nextEl) {
			plumnom.className = 'page-' + nextEl.id;
		}
		if (prevEl) {
			plumnom.className += ' from-page-' + prevEl.id;
		}
	},
	pagination: false
});

//update menu links to change pages with onePageScroll
const menuLinks = Array.prototype.slice.call(document.querySelectorAll('#menu a'));

menuLinks.forEach(m => {

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