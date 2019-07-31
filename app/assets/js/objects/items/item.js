const SMMObject = require('../object');

class Item extends SMMObject {
	constructor(data) {
		super(data);

		this.drawPriority = 999;
	}
}

module.exports = Item;