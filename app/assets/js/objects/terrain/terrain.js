const SMMObject = require('../object');

class Terrain extends SMMObject {
	constructor(data) {
		super(data);

		this.drawPriority = 0;
	}
}

module.exports = Terrain;