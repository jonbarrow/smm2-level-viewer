const {BrowserWindow, app, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const smm2 = require('./smm2');

let LOCAL_RESOURCES_ROOT;
if (isDev()) {
	LOCAL_RESOURCES_ROOT = __dirname;
} else {
	LOCAL_RESOURCES_ROOT = `${__dirname}/../`;
}

let ApplicationWindow;

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit(); // OSX
	}
});

app.on('ready', () => {
	ApplicationWindow = new BrowserWindow({
		icon: `${LOCAL_RESOURCES_ROOT}/icon.ico`,
		minHeight: '300px',
		minWidth: '500px',
		webPreferences: {
			nodeIntegration: true
		}
	});

	if (!isDev()) {
		//ApplicationWindow.setMenu(null);
	}

	ApplicationWindow.maximize();

	ApplicationWindow.webContents.on('did-finish-load', () => {
		ApplicationWindow.show();
		ApplicationWindow.focus();
	});

	ApplicationWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/app/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	ApplicationWindow.on('closed', () => {
		ApplicationWindow = null;
	});
});

ipcMain.on('initialize', async event => {
	await initialize();
	event.sender.send('initialized');
});

ipcMain.on('upload-course', (event, coursePath) => {
	const decryptedCourse = smm2.decryptCourse(coursePath);
	const decodedCourse = smm2.decodeCourse(decryptedCourse);

	event.sender.send('decoded-course', decodedCourse);
});


function initialize() {
	ApplicationWindow.webContents.send('initializing');
	// Do stuff
}

// https://github.com/electron/electron/issues/7714#issuecomment-255835799
function isDev() {
	return process.mainModule.filename.indexOf('app.asar') === -1;
}
