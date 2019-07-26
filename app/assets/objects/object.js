class SMMObject {
	constructor(canvasContext, data) {
		this.canvasContext = canvasContext;
		this.data = data;
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