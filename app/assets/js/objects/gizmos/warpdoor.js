/* eslint-env browser */

const Gizmo = require('./gizmo');

class WarpDoor extends Gizmo {
	constructor(data) {
		super(data);

		this.spriteImage = new Image();
	}

	async draw() {
		this.spriteImage.src = `./assets/img/${this.data.style}/gizmos/lava_lift.png`;

		this.spriteImage.onload = () => {
			this.data.scene.ctx.drawImage(
				this.spriteImage,
				this.data.position.x,
				this.data.position.y,
				this.data.dimensions.width,
				this.data.dimensions.height
			);
		};
	}
}

module.exports = WarpDoor;