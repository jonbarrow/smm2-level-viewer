/* eslint-env browser */

const Coin = require('./coin');

class TenCoin extends Coin {
	constructor(data) {
		super(data);

		this.spriteImage = new Image();
	}

	async draw() {
		this.spriteImage.src = `./assets/img/${this.data.style}/items/pink_coin.png`;

		this.spriteImage.onload = () => {
			this.data.scene.ctx.drawImage(
				this.spriteImage,
				this.data.position.x,
				this.data.position.y,
				this.data.dimensions.width,
				this.data.dimensions.height
			);
		};
	}
}

module.exports = TenCoin;