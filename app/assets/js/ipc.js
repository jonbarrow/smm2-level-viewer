/* eslint-env browser */

const { ipcRenderer } = require('electron');
const CourseViewer = require('./assets/js/scene');

const canvasContainer = document.querySelector('#container');

function uploadCourse(path) {
	ipcRenderer.send('upload-course', path);
}

(() => {
	ipcRenderer.send('initialize');
})();

ipcRenderer.on('initialized', () => {
	ipcRenderer.send('ready');
});

ipcRenderer.on('decoded-course', async (event, data) => {
	if(canvasContainer.firstElementChild) {
		canvasContainer.removeChild(canvasContainer.firstElementChild);
	}

	const canvas = document.createElement('canvas');
	const Viewer = new CourseViewer(canvas);

	await Viewer.loadCourse(data);
	Viewer.render();

	canvasContainer.appendChild(canvas);
});