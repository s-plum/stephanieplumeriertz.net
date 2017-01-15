const toggleDino = (e) => {
	var code = (e.keyCode ? e.keyCode : e.which);
	let dinobox = new Image();
	dinobox.src = '/img/dino.png';
	dinobox.id = 'dinobox';
	dinobox.alt = "Happy now, Sam?"

	if(code == 68 && !document.body.querySelector('#dinobox')) {
		document.body.appendChild(dinobox);
	}
	else if (document.body.querySelector('#dinobox')) {
		document.body.removeChild(document.body.querySelector('#dinobox'));
	}
};

window.addEventListener('keydown', toggleDino);