/* eslint-env browser */

/*
const dropzone = document.getElementById('dropzone');

document.body.addEventListener('dragover', () => {
	console.log('d');
	dropzone.classList.remove('hide');
});

document.body.addEventListener('dragleave', () => {
	dropzone.classList.add('hide');
});

document.body.addEventListener('drop', () => {
	console.log('DROP')
}, false);
*/

const dropzone = document.getElementById('dropzone');

window.addEventListener('dragenter', event => {
	if (isFile(event)) {
		dropzone.classList.remove('hidden');
	}
});

window.addEventListener('dragover', event => {
	event.preventDefault();
});

window.addEventListener('dragleave', event => {
	event.preventDefault();

	if (event.target === dropzone) {
		dropzone.classList.add('hidden');
	}
});

window.addEventListener('drop', event => {
	event.preventDefault();

	dropzone.classList.add('hidden');

	console.log(event.dataTransfer.files[0])

	if (isSMM2Course(event)) {
		uploadCourse(event.dataTransfer.files[0].path);
	} else {
		alert('File does not seem to be encrypted SMM2 course. Please upload an encrypted SMM2');
	}
});

function isFile(event) {
	const {dataTransfer} = event;
	const {types} = dataTransfer;

	if (types.length === 1 || types[0] === 'Files') {
		return true;
	}
}

function isSMM2Course(event) {
	const {dataTransfer} = event;
	const {files} = dataTransfer;

	const file = files[0];

	if (file.size === 0x5C000 && file.name.endsWith('.bcd')) {
		return true;
	}

}