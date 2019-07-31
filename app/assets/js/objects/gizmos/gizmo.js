const SMMObject = require('../object');

class Gizmo extends SMMObject {
	constructor(data) {
		super(data);

		this.drawPriority = 0;
	}
}

module.exports = Gizmo;