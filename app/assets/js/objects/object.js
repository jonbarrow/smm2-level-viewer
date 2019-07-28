class SMMObject {
	constructor(data) {
		this.data = data;
		this.canvasContext = this.data.scene.ctx;
	}

	draw() {
		this.canvasContext.fillRect(
			this.data.position.x,
			this.data.position.y,
			this.data.dimensions.width,
			this.data.dimensions.height
		);
	}
}

module.exports = SMMObject;