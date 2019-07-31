/* eslint-env browser */

const Terrain = require('./terrain');

class SteepSlope extends Terrain {
	constructor(data) {
		super(data);

		this.spriteLoaded = false;
		this.spriteImage = new Image();
		this.spriteImage.addEventListener('load', () => {
			this.spriteLoaded = true;
		});
	}

	loadSprite() {
		const self = this;

		return new Promise(resolve => {
			self.spriteImage.src = `./assets/img/${this.data.style}/terrain/steep_slope.png`;
			this.spriteImage.addEventListener('load', () => {
				this.spriteLoaded = true;
				resolve();
			});
		});
		
	}

	draw() {
		this.canvasContext.drawImage(
			this.spriteImage,
			this.data.position.x,
			(this.scene.canvas.height - this.data.position.y),
			this.data.dimensions.width,
			this.data.dimensions.height
		);
	}
}

module.exports = SteepSlope;