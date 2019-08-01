/* eslint-env browser */

// There seems to be little documentation on how rails work
// So alot of this might be wrong, and will be mostly guesses and hacks

class Rail {
	constructor(data) {
		this.data = data;

		this.canvasContext = this.data.scene.ctx;
		this.scene = this.data.scene;
		this.spriteSheetThemeOffset = this.scene.spriteSheetThemeOffset;
		this.spriteOffsets = this.scene.spriteSheetData.rails;
	}

	draw() {
		let offset;
		let posOffset;

		switch (this.data.type) {
			case 0: // flat
				offset = this.spriteOffsets.flat;
				posOffset = {
					left: { x: -1, y: 0 },
					center: { x: 0, y: 0 },
					right: { x: 1, y: 0 }
				};
				break;
			case 2: // down-right
				offset = this.spriteOffsets.down_right;
				posOffset = {
					left: { x: -1, y: -1 },
					center: { x: 0, y: 0 },
					right: { x: 1, y: 1 }
				};
				break;
		
			default:
				this.canvasContext.fillStyle = 'pink';
				this.canvasContext.fillRect(
					this.data.x + 1,
					(this.scene.canvas.height - this.data.y) - 1,
					1, 1
				);

				console.log('Unhandled rail type', this.data.type);
				return;
		}

		this.canvasContext.drawImage(
			this.scene.spriteSheet,
			this.spriteSheetThemeOffset.x + offset.left.x,
			this.spriteSheetThemeOffset.y + offset.left.y,
			offset.left.width,
			offset.left.height,
			(this.data.x + 1) + posOffset.left.x,
			((this.scene.canvas.height - this.data.y) - 1) + posOffset.left.y,
			1, 1
		);

		this.canvasContext.drawImage(
			this.scene.spriteSheet,
			this.spriteSheetThemeOffset.x + offset.center.x,
			this.spriteSheetThemeOffset.y + offset.center.y,
			offset.center.width,
			offset.center.height,
			(this.data.x + 1) + posOffset.center.x,
			((this.scene.canvas.height - this.data.y) - 1) + posOffset.center.y,
			1, 1
		);

		this.canvasContext.drawImage(
			this.scene.spriteSheet,
			this.spriteSheetThemeOffset.x + offset.right.x,
			this.spriteSheetThemeOffset.y + offset.right.y,
			offset.right.width,
			offset.right.height,
			(this.data.x + 1) + posOffset.right.x,
			((this.scene.canvas.height - this.data.y) - 1) + posOffset.right.y,
			1, 1
		);
	}
}

module.exports = Rail;