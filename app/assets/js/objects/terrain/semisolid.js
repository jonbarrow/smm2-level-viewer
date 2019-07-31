/* eslint-env browser */

const Terrain = require('./terrain');

class SemisolidPlatform extends Terrain {
	constructor(data) {
		super(data);

		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffsets = this.scene.spriteSheetData.terrain.semi_solid;

		// I actually have no idea how the draw priority for semisolids works
		// This is just a guess, and it sometimes works fine
		if (this.data.flags & 0x40000) {
			this.spriteOffsets = this.spriteOffsets.version_2;
			//this.drawPriority = 3;
		} else if(this.data.flags & 0x80000) {
			this.spriteOffsets = this.spriteOffsets.version_3;
			//this.drawPriority = 2;
		} else {
			this.spriteOffsets =  this.spriteOffsets.default;
			//this.drawPriority = 1;
		}
	}

	draw() {
		for (let x = 0; x < this.data.dimensions.width; x++) {
			for (let y = 0; y < this.data.dimensions.height; y++) {
				let offset;

				// The "top" and "bottom" positions are "reversed" because HTML5 vanvas grid origin is opposite of SMM2 origin
				if (x === 0) {
					if (y === 0) {
						offset =  this.spriteOffsets.bottom_left;
					} else if (y === this.data.dimensions.height-1) {
						offset =  this.spriteOffsets.top_left;
					} else {
						if (y % 2) {
							offset =  this.spriteOffsets.left;
						} else {
							offset =  this.spriteOffsets.left_2;
						}
					}
				} else if (x === this.data.dimensions.width-1) {
					if (y === 0) {
						offset =  this.spriteOffsets.bottom_right;
					} else if (y === this.data.dimensions.height-1) {
						offset =  this.spriteOffsets.top_right;
					} else {
						if (y % 2) {
							offset =  this.spriteOffsets.right;
						} else {
							offset =  this.spriteOffsets.right_2;
						}
					}
				} else {
					if (y === 0) {
						offset =  this.spriteOffsets.bottom_middle;
					} else if (y === this.data.dimensions.height-1) {
						offset =  this.spriteOffsets.top_middle;
					} else {
						if (y % 2) {
							offset =  this.spriteOffsets.center;
						} else {
							offset =  this.spriteOffsets.center_2;
						}
					}
				}
				
				this.canvasContext.drawImage(
					this.scene.spriteSheet,
					this.spriteSheetThemeOffset.x + offset.x,
					this.spriteSheetThemeOffset.y + offset.y,
					offset.width,
					offset.height,
					this.data.position.x + x,
					(this.scene.canvas.height - this.data.position.y) - y,
					1, 1
				);
			}
		}
	}
}

module.exports = SemisolidPlatform;