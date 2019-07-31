/* eslint-env browser */

const Coin = require('./coin');

class PinkCoin extends Coin {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffset = this.scene.spriteSheetData.items.pink_coin;
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

module.exports = PinkCoin;