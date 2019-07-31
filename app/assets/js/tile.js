/* eslint-env browser */

class Tile {
	constructor(data) {
		this.data = data;
		this.canvasContext = this.data.scene.ctx;

		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffset = this.scene.spriteSheetData.ground_tiles[`ground_${data.id}`];
		
		if (this.spriteOffset) {
			this.drawTile = true;
		}
	}

	draw() {
		if (this.drawTile) {
			this.canvasContext.drawImage(
				this.scene.spriteSheet,
				this.spriteSheetThemeOffset.x + this.spriteOffset.x,
				this.spriteSheetThemeOffset.y + this.spriteOffset.y,
				this.spriteOffset.width,
				this.spriteOffset.height,
				this.data.x,
				(this.scene.canvas.height - this.data.y),
				1, 1
			);
		} else {
			this.canvasContext.fillStyle = 'pink';
			this.canvasContext.fillRect(
				this.data.x,
				(this.scene.canvas.height - this.data.y),
				1, 1
			);
	
			this.canvasContext.font = '1px serif';
			this.canvasContext.fillStyle = 'black';
			this.canvasContext.fillText(
				this.data.id,
				this.data.x,
				(this.scene.canvas.height - this.data.y) + 1,
				1
			);
		}
	}
}

module.exports = Tile;