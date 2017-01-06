require('es6-promise').polyfill();
import 'fetch-ie8';
const animationSpeed = 400;

let contentHeaders = new Headers({
	"Content-Type": "text/html"
});

let contentLinks = Array.prototype.slice.call(document.querySelectorAll('.gallery-content a'));

let getContent = href => {
	fetch(href, {
		headers: contentHeaders
	}).then(response => {
		//TODO - error handling
		return response.text().then(showContent);
	});
};

let closeContent = () => {
	//add class to fade out content, then remove DOM element
	var content = Array.prototype.slice.call(document.querySelectorAll('.overlay'));
	content.forEach(overlay => {
		overlay.className += ' fade-out';
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, animationSpeed);
	});
};

let showContent = text => {
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
		overlay.innerHTML = content.innerHTML;
		document.body.appendChild(overlay);

		var closeButton = document.createElement('button');
		closeButton.setAttribute('type','button');
		closeButton.innerHTML = 'Close';
		closeButton.className = 'close';
		closeButton.addEventListener('click', closeContent);

		overlay.appendChild(closeButton);
		overlay.className += ' fade-in';
	}
};

contentLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		getContent(link.href);
	});
});