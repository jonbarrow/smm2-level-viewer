/* eslint-env browser */

const Terrain = require('./terrain');

class GentleSlope extends Terrain {
	constructor(data) {
		super(data);

		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffsets = this.scene.spriteSheetData.terrain.slope.gentle;

		// Slopes do several checks to see the objects around each section, and change the texture accordingly
		// I am not doing that right now
		// Because of this, some slope parts _might_ look weird
		if ((this.data.flags >> 20) & 1) {
			this.spriteOffsets = this.spriteOffsets.right.variation_1;
		} else {
			this.spriteOffsets = this.spriteOffsets.right.variation_1;
		}

		this.drawPriority = 9999999;
	}

	draw() {

		let yLevel =  this.data.dimensions.height;
		for (let w = 0; w < this.data.dimensions.width; w++) {
			let offset;
			let offset2;

			if (w === 0) {
				yLevel--;
				offset = this.spriteOffsets.start;
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
				
				offset = this.spriteOffsets.bottom;
				offset2 = this.spriteOffsets.bottom_2;

				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					(this.data.position.x + w) - 1,
					((this.scene.canvas.height - this.data.position.y) - yLevel) + 1,
					1, 1
				);

				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset2.x,
					this.spriteSheetThemeOffset.y + offset2.y,
					offset2.width,
					offset2.height,
					this.data.position.x + w,
					((this.scene.canvas.height - this.data.position.y) - yLevel) + 1,
					1, 1
				);

				if (!(w % 2)) {
					offset = this.spriteOffsets.top;
					offset2 = this.spriteOffsets.top_2;
					
					this.canvasContext.drawImage(
						this.scene.spriteSheet,
						this.spriteSheetThemeOffset.x + offset.x,
						this.spriteSheetThemeOffset.y + offset.y,
						offset.width,
						offset.height,
						(this.data.position.x + w) - 1,
						((this.scene.canvas.height - this.data.position.y) - yLevel),
						1, 1
					);

					this.canvasContext.drawImage(
						this.scene.spriteSheet,
						this.spriteSheetThemeOffset.x + offset2.x,
						this.spriteSheetThemeOffset.y + offset2.y,
						offset2.width,
						offset2.height,
						this.data.position.x + w,
						((this.scene.canvas.height - this.data.position.y) - yLevel),
						1, 1
					);

					yLevel--;
				}
			}
		}
	}
}

module.exports = GentleSlope;