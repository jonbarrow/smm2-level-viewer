const {ipcRenderer} = require('electron');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ctxScale = 5;
//const ctxScale = 10;
//canvas.height = 27 * ctxScale; // courses are always 27 tiles high

const OBJECT_BLOCK_IDS = [4,5,6,7];


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
	
	ctx.fillStyle = 'red';
	for (const objectData of data.objects) {
		let object;
		if (OBJECT_BLOCK_IDS.includes(objectData.type)) {
			object = new Block(ctx, objectData);

			console.log(object);

			object.draw();
		} else {
			ctx.fillRect(
				objectData.position.x,
				objectData.position.y,
				objectData.dimensions.width,
				objectData.dimensions.height
			);
		}

		/*
		if ((objectData.flags>>1) & 1) {
			ctx.fillStyle = 'yellow';
		}

		if (objectData.type === 104) {
			ctx.fillStyle = 'pink';
		}
		if (objectData.type === 8) {
			ctx.fillStyle = 'gold';
		}
		*/

		/*
		ctx.fillRect(
			objectData.position.x,
			objectData.position.y,
			objectData.dimensions.width,
			objectData.dimensions.height
		);
		//ctx.fillStyle = 'red';
		*/
	}

	ctx.fillStyle = 'green';
	for (const tile of data.tiles) {
		ctx.fillRect(
			tile.x,
			tile.y,
			1, 1
		);
	}

	ctx.fillStyle = 'cyan';
	ctx.fillRect(
		5,
		data.start_y,
		1, 1
	);

	ctx.fillStyle = 'blue';
	ctx.fillRect(
		data.goal_x / 10,
		data.goal_y,
		1, 1
	);

});