/* eslint-env browser */

const Gizmo = require('./gizmo');

class WarpDoor extends Gizmo {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteOffsets = this.scene.spriteSheetGizmoOffsets.warp_door;
	}

	draw() {
		let offset = this.spriteOffsets.default;

		if (this.data.flags & 0x40000) {
			offset = this.spriteOffsets.p_switch;
		} else if (this.data.flags & 0x80000) {
			offset = this.spriteOffsets.key;
		}

		this.data.scene.ctx.drawImage(
			this.scene.spriteSheet,
			offset.x,
			offset.y,
			offset.width,
			offset.height,
			this.data.position.x,
			(this.data.scene.canvas.height - this.data.position.y) - 1, // set origin to bottom and not top
			1, 2
		);
	}
}

module.exports = WarpDoor;