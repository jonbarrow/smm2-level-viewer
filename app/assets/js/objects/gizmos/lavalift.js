/* eslint-env browser */

const Gizmo = require('./gizmo');

class LavaLift extends Gizmo {
	constructor(data) {
		super(data);
		
		this.scene = this.data.scene;
		this.spriteOffsets = this.scene.spriteSheetData.gizmos.lava_lift;
		this.spriteOffset = this.spriteOffsets.blue; // Default to blue for now
	}

	draw() {
		this.data.scene.ctx.drawImage(
			this.scene.spriteSheet,
			this.spriteOffset.x,
			this.spriteOffset.y,
			this.spriteOffset.width,
			this.spriteOffset.height,
			this.data.position.x,
			(this.data.scene.canvas.height - this.data.position.y),
			1, 1
		);
	}
}

module.exports = LavaLift;