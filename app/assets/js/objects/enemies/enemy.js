const SMMObject = require('../object');

class Enemy extends SMMObject {
	constructor(data) {
		super(data);

		this.drawPriority = 0;
	}
}

module.exports = Enemy;