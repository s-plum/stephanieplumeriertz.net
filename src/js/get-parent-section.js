module.exports = elem => {
	if (elem.nodeName.toLowerCase() === 'section') {
		return elem;
	}

	let parentElement = elem.parentElement;

	do {
		parentElement = parentElement.parentElement;
	} while (parentElement.nodeName.toLowerCase() !== 'section');

	return parentElement;
};