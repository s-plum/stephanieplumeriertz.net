import fs from 'fs';
import Promise from 'promise';

let getFolderData = (folderName) => {
	let files = fs.readdirSync('./data/' + folderName);
	let fileData = {};
	files.forEach(file => {
		fileData[file.split('.')[0].split('_')[1]] = JSON.parse(fs.readFileSync('./data/' + folderName + '/' + file, 'utf8'));
	});
	return fileData;
};

module.exports = new Promise((resolve, reject) => {
	resolve({
		portfolio: getFolderData('portfolio'),
		noms: getFolderData('noms')
	});
});