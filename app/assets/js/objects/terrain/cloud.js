/* eslint-env browser */

const Terrain = require('./terrain');

class Cloud extends Terrain {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffset = this.scene.spriteSheetData.terrain.cloud_block;
		this.drawPriority = 888;
	}

	draw() {
		this.canvasContext.drawImage(
			this.scene.spriteSheet,
			this.spriteSheetThemeOffset.x + this.spriteOffset.x,
			this.spriteSheetThemeOffset.y + this.spriteOffset.y,
			this.spriteOffset.width,
			this.spriteOffset.height,
			this.data.position.x,
			(this.scene.canvas.height - this.data.position.y),
			this.data.dimensions.width,
			this.data.dimensions.height
		);
	}
}

module.exports = Cloud;