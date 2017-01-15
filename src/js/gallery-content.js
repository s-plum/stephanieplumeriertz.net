require('es6-promise').polyfill();
import 'fetch-ie8';
import getParentSection from './get-parent-section';
import supportsTransitions from './supports-transitions';
const slideSpeed = 500;
const fadeSpeed = 300;

/* =================================================
Dynamic slide of gallery content if transitions are supported
================================================= */
if (supportsTransitions) {
	/* =================================================
	Move gallery content into parent container
	================================================= */
	const contentPages = Array.prototype.slice.call(document.querySelectorAll('.gallery-section'));

	contentPages.forEach(p => {
		let parentId = p.id.replace('-gallery', '');
		let galleryContent = p.querySelector('.section-inner');
		galleryContent.setAttribute('tabindex', '-1');
		document.getElementById(parentId).appendChild(galleryContent);
		p.parentNode.removeChild(p);
		galleryContent.id = p.id;
	});

	/* =================================================
	Display gallery content on CTA click
	================================================= */
	const galleryCta = Array.prototype.slice.call(document.querySelectorAll('.gallery-cta'));

	const showGallery = elem => {
		document.body.classList.add('gallery-open', 'disabled-onepage-scroll', 'gallery-open--' + elem.galleryData.parentSection.id);
		elem.galleryData.parentSection.classList.add('gallery-open');
		elem.galleryData.focusables.forEach(f => {
			f.setAttribute('tabindex', '0');
		});
		setTimeout(() => {
			elem.galleryData.targetGallery.setAttribute('tabindex', '0');
			elem.galleryData.targetGallery.focus();
		}, slideSpeed);
	};

	const hideGallery = elem => {
		document.body.classList.remove('gallery-open', 'disabled-onepage-scroll', 'gallery-open--code', 'gallery-open--confections');
		elem.galleryData.parentSection.classList.remove('gallery-open');
		elem.galleryData.targetGallery.setAttribute('tabindex', '-1');
		elem.galleryData.focusables.forEach(f => {
			f.setAttribute('tabindex', -1);
		});
	};

	const hideAllGalleries = () => {
		galleryCta.forEach(g => {
			hideGallery(g);
		});
	};

	const getBackButton = (elem, isBottom) => {
		let backButton = document.createElement('button');
		backButton.className = 'gallery-back';
		backButton.innerHTML = '<b>Back</b><span> to main page</span>';
		backButton.type = 'button';
		backButton.addEventListener('click', () => {
			hideGallery(elem);
		});

		if (isBottom) {
			backButton.classList.add('gallery-back-bottom');
			backButton.addEventListener('blur', () => {
				if (document.body.classList.contains('gallery-open')) {
					elem.galleryData.targetGallery.focus();
				}
			});
		}

		return backButton;
	};

	galleryCta.forEach(g => {
		//set properties to use for showing/hiding gallery
		g.galleryData = {
			targetGallery: document.getElementById(g.href.split('#')[1]),
			parentSection: getParentSection(g)
		};

		//append back buttons to the gallery section
		g.galleryData.targetGallery.insertBefore(getBackButton(g), g.galleryData.targetGallery.firstChild);
		g.galleryData.targetGallery.appendChild(getBackButton(g, true));

		//set click trigger on CTA to open gallery
		g.addEventListener('click', (e) => {
			e.preventDefault();
			showGallery(g);
		});

		g.galleryData.focusables = Array.prototype.slice.call(g.galleryData.targetGallery.querySelectorAll('a, button'));
	});

	hideAllGalleries();

	/* =================================================
	Close gallery on menu click
	================================================= */
	const menuLinks = Array.prototype.slice.call(document.querySelectorAll('#menu a'));

	menuLinks.forEach(link => {
		link.addEventListener('click', hideAllGalleries);
	});

	/* =================================================
	Dynamic content fetch + modal display
	================================================= */
	let contentHeaders = new Headers({
		"Content-Type": "text/html"
	});

	const contentLinks = Array.prototype.slice.call(document.querySelectorAll('.gallery-content a'));

	const getContent = href => {
		fetch(href, {
			headers: contentHeaders
		}).then(response => {
			//TODO - error handling
			return response.text().then(showContent);
		});
	};

	const closeContent = () => {
		//add class to fade out content, then remove DOM element
		var content = Array.prototype.slice.call(document.querySelectorAll('.overlay'));
		content.forEach(overlay => {
			if (overlay) {
				overlay.classList.remove('fade-in');
				overlay.classList.add('fade-out');
				setTimeout(() => {
					document.body.removeChild(overlay);
				}, fadeSpeed);
			}
		});
	};

	const showContent = text => {
		var parser = new DOMParser();
		var doc = parser.parseFromString(text, 'text/html');

		//remove any existing overlays
		if (document.querySelectorAll('.overlay').length > 0) {
			closeContent();
		}

		//add DOM element with close button, then add class to fade in content
		var content = doc.querySelector('#content');
		if (content) {
			var overlay = document.createElement('div');
			overlay.className = 'overlay';
			overlay.setAttribute('tabindex','0');
			overlay.innerHTML = content.innerHTML;
			document.body.appendChild(overlay);

			var closeButton = document.createElement('button');
			closeButton.setAttribute('type','button');
			closeButton.innerHTML = 'Close';
			closeButton.className = 'gallery-close gallery-back';
			closeButton.addEventListener('click', closeContent);

			overlay.appendChild(closeButton);
			overlay.classList.add('fade-in');
			overlay.focus();
		}
	};

	contentLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			getContent(link.href);
		});
	});
}