/* eslint-env browser */

const { ipcRenderer } = require('electron');
const CourseViewer = require('./assets/js/scene');

const canvas = document.querySelector('canvas');

const Viewer = new CourseViewer(canvas);

function uploadCourse(path) {
	ipcRenderer.send('upload-course', path);
}

(() => {
	ipcRenderer.send('initialize');
})();

ipcRenderer.on('initialized', () => {
	ipcRenderer.send('ready');
});

ipcRenderer.on('decoded-course', (event, data) => {
	document.getElementById('title').innerText = data.title;

	Viewer.loadCourse(data);
	Viewer.render();
});