/* eslint-env browser */

const Terrain = require('./terrain');

class Bridge extends Terrain {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteOffsets = this.scene.spriteSheetOffsets.terrain.bridge;
	}

	draw() {
		for (let i = 0; i < this.data.dimensions.width; i++) {
			let offset;

			if (i === 0) {
				offset = this.spriteOffsets.left;
			} else if (i === this.data.dimensions.width-1) {
				offset = this.spriteOffsets.right;
			} else {
				offset = this.spriteOffsets.middle;
			}

			// Draw the top
			this.data.scene.ctx.drawImage(
				this.scene.spriteSheet,
				offset.x,
				offset.y,
				offset.width,
				offset.height,
				this.data.position.x + i,
				(this.data.scene.canvas.height - this.data.position.y) - 1,
				1, 1
			);

			// Draw the bottom
			this.data.scene.ctx.drawImage(
				this.scene.spriteSheet,
				this.spriteOffsets.bottom.x,
				this.spriteOffsets.bottom.y,
				this.spriteOffsets.bottom.width,
				this.spriteOffsets.bottom.height,
				this.data.position.x + i,
				(this.data.scene.canvas.height - this.data.position.y),
				1, 1
			);
		}
	}
}

module.exports = Bridge;