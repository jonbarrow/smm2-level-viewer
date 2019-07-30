/* eslint-env browser */

const Terrain = require('./terrain');

class SemisolidPlatform extends Terrain {
	constructor(data) {
		super(data);

		this.scene = this.data.scene;
		this.spriteOffsets = this.scene.spriteSheetOffsets.terrain.semi_solid;
	}

	draw() {
		for (let x = 0; x < this.data.dimensions.width; x++) {
			for (let y = 0; y < this.data.dimensions.height; y++) {
				let type = this.spriteOffsets.default;
				let offset;

				if (this.data.flags & 0x40000) {
					type = this.spriteOffsets.version_2;
				} else if(this.data.flags & 0x80000) {
					type = this.spriteOffsets.version_3;
				}

				// The "top" and "bottom" positions are "reversed" because HTML5 vanvas grid origin is opposite of SMM2 origin
				if (x === 0) {
					if (y === 0) {
						offset = type.bottom_left;
					} else if (y === this.data.dimensions.height-1) {
						offset = type.top_left;
					} else {
						offset = type.left;
					}
				} else if (x === this.data.dimensions.width-1) {
					if (y === 0) {
						offset = type.bottom_right;
					} else if (y === this.data.dimensions.height-1) {
						offset = type.top_right;
					} else {
						offset = type.right;
					}
				} else {
					if (y === 0) {
						offset = type.bottom_middle;
					} else if (y === this.data.dimensions.height-1) {
						offset = type.top_middle;
					} else {
						offset = type.center;
					}
				}
				
				this.data.scene.ctx.drawImage(
					this.scene.spriteSheet,
					offset.x,
					offset.y,
					offset.width,
					offset.height,
					this.data.position.x + x,
					(this.data.scene.canvas.height - this.data.position.y) - y,
					1, 1
				);
			}
		}
	}
}

module.exports = SemisolidPlatform;