const async = require('async');

const Block = require('./objects/terrain/block');
const HardBlock = require('./objects/terrain/hardblock');
const Coin = require('./objects/items/coin');
const SemisolidPlatform = require('./objects/terrain/semisolid');
const Bridge = require('./objects/terrain/bridge');
const Donut = require('./objects/terrain/donut');
const Cloud = require('./objects/terrain/cloud');
const HiddenBlock = require('./objects/terrain/hiddenblock');
const LifeUpShroom = require('./objects/items/lifeupshroom');
const LavaLift = require('./objects/gizmos/lavalift');
const WarpDoor = require('./objects/gizmos/warpdoor');
const TenCoin = require('./objects/items/tencoin');
const GentleSlope = require('./objects/terrain/gentleslope');
const SteepSlope = require('./objects/terrain/steepslope');
const PinkCoin = require('./objects/items/pinkcoin');
const AngrySun = require('./objects/enemies/angrysun');

class CourseViewer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	
		this._reset();
	}

	_reset() {
		this.courseData = null;

		this.objects = [];
		this.tiles = [];
	}

	_loadObjects(callback) {
		for (const object of this.courseData.objects) {
			object.scene = this;

			switch (object.type) {
				case 4:
					this.objects.push(new Block(object));
					break;
				case 6:
					this.objects.push(new HardBlock(object));
					break;
				case 8:
					this.objects.push(new Coin(object));
					break;
				case 16:
					this.objects.push(new SemisolidPlatform(object));
					break;
				case 17:
					this.objects.push(new Bridge(object));
					break;
				case 21:
					this.objects.push(new Donut(object));
					break;
				case 22:
					this.objects.push(new Cloud(object));
					break;
				case 29:
					this.objects.push(new HiddenBlock(object));
					break;
				case 33:
					this.objects.push(new LifeUpShroom(object));
					break;
				case 36:
					this.objects.push(new LavaLift(object));
					break;
				case 55:
					this.objects.push(new WarpDoor(object));
					break;
				case 70:
					this.objects.push(new TenCoin(object));
					break;
				case 87:
					this.objects.push(new GentleSlope(object));
					break;
				case 88:
					this.objects.push(new SteepSlope(object));
					break;
				case 92:
					this.objects.push(new PinkCoin(object));
					break;
				case 104:
					this.objects.push(new AngrySun(object));
					break;
				
			
				default:
					console.log(`Unhandled object ID: ${object.type}`);
					break;
			}
		}

		callback();
	}

	_loadSoundEffects(callback) { callback(); }
	_loadSnakeBlocks(callback) { callback(); }
	_loadClearPipes(callback) { callback(); }
	_loadPiranhaCreepers(callback) { callback(); }
	_loadExpandingBlocks(callback) { callback(); }
	_loadTracks(callback) { callback(); }

	_loadTiles(callback) {
		callback();
	}

	_loadRails(callback) { callback(); }
	_loadIcicles(callback) { callback(); }

	loadCourse(data) {
		this._reset();

		this.courseData = data;

		// allows us to keep `this` reference
		async.parallel([
			callback => this._loadObjects(callback),
			callback => this._loadSoundEffects(callback),
			callback => this._loadSnakeBlocks(callback),
			callback => this._loadClearPipes(callback),
			callback => this._loadPiranhaCreepers(callback),
			callback => this._loadExpandingBlocks(callback),
			callback => this._loadTracks(callback),
			callback => this._loadTiles(callback),
			callback => this._loadRails(callback),
			callback => this._loadIcicles(callback)
		], () => {
			console.log('Loaded all course parts');
		});
	}

	render() {
		for (const object of this.objects) {
			object.draw();
		}

		// Add rest of render parts


		// Needs to be changed
		this.ctx.fillStyle = 'cyan';
		this.ctx.fillRect(
			5,
			this.courseData.start_y,
			1, 1
		);

		this.ctx.fillStyle = 'blue';
		this.ctx.fillRect(
			this.courseData.goal_x / 10,
			this.courseData.goal_y,
			1, 1
		);
	}
}

module.exports = CourseViewer;