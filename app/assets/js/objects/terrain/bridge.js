/* eslint-env browser */

const Terrain = require('./terrain');

class Bridge extends Terrain {
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
			self.spriteImage.src = `./assets/img/${this.data.style}/terrain/bridge.png`;
			this.spriteImage.addEventListener('load', () => {
				this.spriteLoaded = true;
				resolve();
			});
		});
		
	}

	draw() {
		for (let i = 0; i < this.data.dimensions.width; i++) {
			this.data.scene.ctx.drawImage(
				this.spriteImage,
				this.data.position.x + i,
				(this.data.scene.canvas.height - this.data.position.y),
				1,
				this.data.dimensions.height
			);
		}
	}
}

module.exports = Bridge;