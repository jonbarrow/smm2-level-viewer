/* eslint-env browser */

const Terrain = require('./terrain');

class SteepSlope extends Terrain {
	constructor(data) {
		super(data);

		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffsets = this.scene.spriteSheetData.terrain.slope.steep;

		// Slopes do several checks to see the objects around each section, and change the texture accordingly
		// I am not doing that right now
		// Because of this, some slope parts _might_ look weird
		if ((this.data.flags >> 20) & 1) {
			this.spriteOffsets = this.spriteOffsets.right.variation_1;
		} else {
			this.spriteOffsets = this.spriteOffsets.left.variation_1;
		}
	}

	draw() {
		let yLevel =  this.data.dimensions.height;
		for (let w = 0; w < this.data.dimensions.width; w++) {
			let offset;

			if (w === 0) {
				offset = this.spriteOffsets.start;
				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					this.data.position.x + w,
					((this.scene.canvas.height - this.data.position.y) - yLevel) + 1,
					1, 1
				);
			} else if (w === this.data.dimensions.width-1) {
				offset = this.spriteOffsets.end;
				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					this.data.position.x + w,
					((this.scene.canvas.height - this.data.position.y) - yLevel),
					1, 1
				);
			} else {
				offset = this.spriteOffsets.top;
				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					this.data.position.x + w,
					((this.scene.canvas.height - this.data.position.y) - yLevel),
					1, 1
				);
	
				offset = this.spriteOffsets.bottom;
				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					this.data.position.x + w,
					((this.scene.canvas.height - this.data.position.y) - yLevel) + 1,
					1, 1
				);
			}

			yLevel--;
		}
	}
}

module.exports = SteepSlope;