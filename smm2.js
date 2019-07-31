const fs = require('fs');
const crypto = require('crypto');
const async = require('async');
const keyTable = require('./keys');

function decryptFile(input, keyTable, offset=0) {
	let buffer = input;
	if (typeof input === 'string') {
		buffer = fs.readFileSync(input);
	}

	const end = buffer.slice(-0x30);

	const randState = randInt(end.readUInt32LE(0x10), end.readUInt32LE(0x14), end.readUInt32LE(0x18), end.readUInt32LE(0x1C));
	const keyState = genKey(keyTable, randState);

	const key = Buffer.from(UInt32ArrayToUInt8Array(keyState));
	const iv = end.slice(0, 16);

	const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
	return decipher.update(buffer.slice(offset)).slice(0, -0x20);
}

function decryptCourse(input, out) {
	const decrypted = decryptFile(input, keyTable.course, 0x10);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptSave(input, out) {
	const decrypted = decryptFile(input, keyTable.save);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptInfo(input, out) {
	const decrypted = decryptFile(input, keyTable.info);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptQuest(input, out) {
	const decrypted = decryptFile(input, keyTable.quest);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptReplay(input, out) {
	const decrypted = decryptFile(input, keyTable.replay);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptLater(input, out) {
	const decrypted = decryptFile(input, keyTable.later);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptNetwork(input, out) {
	const decrypted = decryptFile(input, keyTable.network);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decryptThumb(input, out) {
	const decrypted = decryptFile(input, keyTable.thumb);

	if (out) {
		fs.writeFileSync(out, decrypted);
	}

	return decrypted;
}

function decodeCourse(courseBuffer) {
	const headerBuffer = courseBuffer.subarray(0, 0x200);
	const dataBuffer = courseBuffer.subarray(0x200, 0x248);

	const decoded = {
		// header data
		start_y: headerBuffer.readUInt8(),
		goal_y: headerBuffer.readUInt8(0x1),
		goal_x: headerBuffer.readUInt16LE(0x2),
		time_limit: headerBuffer.readUInt16LE(0x4),
		clear_condition: {
			type: headerBuffer.readUInt8(0xF),
			amount: headerBuffer.readUInt16LE(0x6),
			crc32: headerBuffer.readUInt32LE(0x10)
		},
		creation_time: {
			year: headerBuffer.readUInt16LE(0x8),
			month: headerBuffer.readUInt8(0xA),
			day: headerBuffer.readUInt8(0xB),
			hour: headerBuffer.readUInt8(0xC),
			minute: headerBuffer.readUInt8(0xD)
		},
		scroll_speed: headerBuffer.readUInt8(0xE),
		build_game_version: headerBuffer.readUInt32LE(0x14),
		management_flags: headerBuffer.readUInt32LE(0x18),
		clear_check: {
			tries: headerBuffer.readUInt32LE(0x1C),
			time: headerBuffer.readUInt32LE(0x20)
		},
		creation_id: headerBuffer.readUInt32LE(0x24),
		upload_id: (headerBuffer.readUInt32LE(0x28) << 8) + headerBuffer.readUInt32LE(0x28 + 4),
		style: headerBuffer.subarray(0xF1, 0xF1 + 2).toString(),
		title: headerBuffer.subarray(0xF4, 0xF4 + 64).toString('utf16le').split('\0').shift(),
		description: headerBuffer.subarray(0x136, 0x136 + 150).toString('utf16le').split('\0').shift(),

		// course data
		theme: dataBuffer.readUInt8(),
		scroll_type: dataBuffer.readUInt8(0x1),
		orientation: dataBuffer.readUInt8(0x3),
		liquid: {
			start_height: dataBuffer.readUInt8(0x7),
			end_height: dataBuffer.readUInt8(0x4),
			mode: dataBuffer.readUInt8(0x5),
			speed: dataBuffer.readUInt8(0x6),
		},
		boundary: {
			right: dataBuffer.readUInt32LE(0x8),
			top: dataBuffer.readUInt32LE(0xC),
			left: dataBuffer.readUInt32LE(0x10),
			bottom: dataBuffer.readUInt32LE(0x14),
		},
		time_of_day: dataBuffer.readUInt32LE(0x18),
		object_count: dataBuffer.readUInt32LE(0x1C),
		sound_effect_count: dataBuffer.readUInt32LE(0x20),
		snake_block_count: dataBuffer.readUInt32LE(0x24),
		clear_pipe_count: dataBuffer.readUInt32LE(0x28),
		piranha_creeper_count: dataBuffer.readUInt32LE(0x2C),
		expanding_block_count: dataBuffer.readUInt32LE(0x30),
		track_count: dataBuffer.readUInt32LE(0x34),
		tile_count: dataBuffer.readUInt32LE(0x3C),
		rail_count: dataBuffer.readUInt32LE(0x40),
		icicle_count: dataBuffer.readUInt32LE(0x44),

		// Object data
		objects: [],

		// Sound Effect data
		sound_effects: [],

		// Snake Block data
		snake_blocks: [],

		// Clear Pipe data
		clear_pipes: [],

		// Piranha Creeper data
		piranha_creepers: [],

		// Expanding Block data
		expanding_blocks: [],

		// Track data
		tracks: [],

		// Tile data
		tiles: [],

		// Rail data
		rails: [],

		// Icicle data
		icicles: [],
	};

	const objectsBuffer = courseBuffer.subarray(0x248, 0x248 + (decoded.object_count * 0x20));
	const soundEffectsBuffer = courseBuffer.subarray(0x14548, 0x14548 + (decoded.sound_effect_count * 0x4));
	const snakeBlocksBuffer = courseBuffer.subarray(0x149F8, 0x149F8 + (decoded.snake_block_count * 0x3C4));
	const clearPipesBuffer = courseBuffer.subarray(0x15CCC, 0x15CCC + (decoded.clear_pipe_count * 0x124));
	const piranhaCreepersBuffer = courseBuffer.subarray(0x240EC, 0x240EC + (decoded.piranha_creeper_count * 0x54));
	const expandingBlocksBuffer = courseBuffer.subarray(0x24434, 0x24434 + (decoded.expanding_block_count * 0x2C));
	const tracksBuffer = courseBuffer.subarray(0x245EC, 0x245EC + (decoded.track_count * 0x2C));
	const tilesBuffer = courseBuffer.subarray(0x247A4, 0x247A4 + (decoded.tile_count * 0x4));
	const railsBuffer = courseBuffer.subarray(0x28624, 0x28624 + (decoded.rail_count * 0xC));
	const iciclesBuffer = courseBuffer.subarray(0x2CC74, 0x2CC74 + (decoded.icicle_count * 0x4));

	// Decode objects
	for (let i = 0; i < decoded.object_count; i++) {
		const objectData = objectsBuffer.subarray(i * 0x20, (i * 0x20) + 0x20);

		decoded.objects.push({
			style: decoded.style,
			theme: decoded.theme,
			position: {
				// Positions are from the block center, in a 160x160 grid
				x: (objectData.readUInt32LE() - 80) / 160,
				y: (objectData.readUInt32LE(0x4) - 80) / 160
			},
			dimensions: {
				width: objectData.readUInt8(0xA),
				height: objectData.readUInt8(0xB)
			},
			flags: objectData.readUInt32LE(0xC),
			child_flags: objectData.readUInt32LE(0x10),
			extended_data: objectData.readUInt32LE(0x14),
			type:  objectData.readUInt16LE(0x18),
			child_type: objectData.readUInt16LE(0x1A),
			link_id: objectData.readUInt16LE(0x1C),
			sound_effect_id: objectData.readUInt16LE(0x1E),
		});
	}

	// Decode sound effects
	for (let i = 0; i < decoded.sound_effect_count; i++) {
		const soundEffectData = soundEffectsBuffer.subarray((i * 0x4), (i * 0x4) + 0x4);

		decoded.sound_effects.push({
			id: soundEffectData.readUInt8(),
			position: {
				x: soundEffectData.readUInt8(0x1),
				y: soundEffectData.readUInt8(0x2)
			},
		});
	}

	// Decode snake blocks
	for (let i = 0; i < decoded.snake_block_count; i++) {
		const snakeBlocksData = snakeBlocksBuffer.subarray((i * 0x3C4), (i * 0x3C4) + 0x3C4);
	}
	
	// Decode clear pipes
	for (let i = 0; i < decoded.clear_pipe_count; i++) {}

	// Decode piranha creepers
	for (let i = 0; i < decoded.piranha_creeper_count; i++) {}

	// Decode expanding blocks
	for (let i = 0; i < decoded.expanding_block_count; i++) {}

	// Decode tracks
	for (let i = 0; i < decoded.track_count; i++) {}

	// Decode tiles
	for (let i = 0; i < decoded.tile_count; i++) {
		const tileData = tilesBuffer.subarray((i * 0x4), (i * 0x4) + 0x4);

		decoded.tiles.push({
			x: tileData.readUInt8(),
			y: tileData.readUInt8(0x1),
			//id: tileData.readUInt16LE(0x2),
			id: tileData.readUInt8(0x2),
			background_object_id: tileData.readUInt8(0x3),
		});
	}

	// Decode rails
	for (let i = 0; i < decoded.rail_count; i++) {}

	// Decode icicles
	for (let i = 0; i < decoded.icicle_count; i++) {}
	
	return decoded;
}

module.exports = {
	decryptFile,

	decryptCourse,
	decryptSave,
	decryptInfo,
	decryptQuest,
	decryptReplay,
	decryptLater,
	decryptNetwork,
	decryptThumb,

	decodeCourse,
};

function randInt(in1, in2, in3, in4) {
	return (in1|in2|in3|in4) ? [in1, in2, in3, in4] : [1, 0x6C078967, 0x714ACB41, 0x48077044];
}

function genKey(keyTable, randState) {
	const out = [];

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			out[i] <<= 8;
			out[i] |= (keyTable[randGen(randState) >>> 26] >> ((randGen(randState) >>> 27) & 24)) & 0xFF;
		}
	}

	return out;
}

function randGen(randState) {	
	let n = randState[0] ^ randState[0] << 11;
	n ^= (n >>> 8) ^ randState[3] ^ (randState[3] >>> 19);

	randState[0] = randState[1];
	randState[1] = randState[2];
	randState[2] = randState[3];
	randState[3] = n;

	return n;
}

function UInt32ArrayToUInt8Array(uint32Array) {
	const uint8Array = [];

	for (const uint32 of uint32Array) {
		uint8Array.push(uint32 & 0x000000ff);
		uint8Array.push((uint32 & 0x0000ff00) >> 8);
		uint8Array.push((uint32 & 0x00ff0000) >> 16);
		uint8Array.push((uint32 & 0xff000000) >> 24);
	}

	return uint8Array;
}