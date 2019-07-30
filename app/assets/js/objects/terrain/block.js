/* eslint-env browser */

const Terrain = require('./terrain');

class Block extends Terrain {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteOffset = this.scene.spriteSheetOffsets.terrain.block;
	}

	draw() {
		this.data.scene.ctx.drawImage(
			this.scene.spriteSheet,
			this.spriteOffset.x,
			this.spriteOffset.y,
			this.spriteOffset.width,
			this.spriteOffset.height,
			this.data.position.x,
			(this.data.scene.canvas.height - this.data.position.y),
			this.data.dimensions.width,
			this.data.dimensions.height
		);
	}
}

module.exports = Block;