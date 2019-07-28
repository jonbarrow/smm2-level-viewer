/* eslint-env browser */

const { ipcRenderer } = require('electron');
const CourseViewer = require('./assets/js/scene');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const Viewer = new CourseViewer(ctx);
const ctxScale = 5;
//const ctxScale = 10;
//canvas.height = 27 * ctxScale; // courses are always 27 tiles high


(() => {
	ipcRenderer.send('initialize');
})();

ipcRenderer.on('initialized', () => {
	ipcRenderer.send('ready');
});

ipcRenderer.on('decoded-course', (event, data) => {
	document.getElementById('title').innerText = data.title;

	ctx.transform(1, 0, 0, -1, 0, canvas.height);
	ctx.scale(ctxScale, ctxScale);

	Viewer.loadCourse(data);
	Viewer.render();
});