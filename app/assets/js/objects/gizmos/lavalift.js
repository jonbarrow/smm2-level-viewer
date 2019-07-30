/* eslint-env browser */

const Gizmo = require('./gizmo');

class LavaLift extends Gizmo {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteOffsets = this.scene.spriteSheetGizmoOffsets.lava_lift.blue; // Default to blue for now
	}

	draw() {
		this.data.scene.ctx.drawImage(
			this.scene.spriteSheet,
			this.spriteOffsets.x,
			this.spriteOffsets.y,
			this.spriteOffsets.width,
			this.spriteOffsets.height,
			this.data.position.x,
			(this.data.scene.canvas.height - this.data.position.y),
			1, 1
		);
	}
}

module.exports = LavaLift;