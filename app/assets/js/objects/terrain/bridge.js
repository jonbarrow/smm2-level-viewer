/* eslint-env browser */

const Terrain = require('./terrain');

class Bridge extends Terrain {
	constructor(data) {
		super(data);

		this.spriteImage = new Image();
	}

	async draw() {
		this.spriteImage.src = `./assets/img/${this.data.style}/terrain/bridge.png`;

		this.spriteImage.onload = () => {
			this.data.scene.ctx.drawImage(
				this.spriteImage,
				this.data.position.x,
				(this.data.scene.canvas.height - this.data.position.y),
				this.data.dimensions.width,
				this.data.dimensions.height
			);
		};
	}
}

module.exports = Bridge;