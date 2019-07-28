const Coin = require('./coin');

class MultiCoin extends Coin {
	constructor(data) {
		super(data);
	}
}

module.exports = MultiCoin;