/* eslint-env browser */

const Terrain = require('./terrain');

class SemisolidPlatform extends Terrain {
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
			self.spriteImage.src = `./assets/img/${this.data.style}/terrain/semisolid_platform.png`;
			this.spriteImage.addEventListener('load', () => {
				this.spriteLoaded = true;
				resolve();
			});
		});
		
	}

	draw() {
		for (let x = 0; x < this.data.dimensions.width; x++) {
			for (let y = 0; y < this.data.dimensions.height; y++) {
				this.data.scene.ctx.drawImage(
					this.spriteImage,
					this.data.position.x + x,
					(this.data.scene.canvas.height - this.data.position.y) + y,
					1, 1
				);
			}
		}
	}
}

module.exports = SemisolidPlatform;