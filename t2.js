const data = [
	{ offset: 0x48, count: 2600 }, // objects
	{ offset: 0x14548, count: 300 },
	{ offset: 0x149F8, count: 5 },
	{ offset: 0x15CCC, count: 200 },
	{ offset: 0x240EC, count: 10 },
	{ offset: 0x24434, count: 10 },
	{ offset: 0x245EC, count: 10 },
	{ offset: 0x247A4, count: 4000 },
	{ offset: 0x28624, count: 1500 },
	{ offset: 0x2CC74, count: 300 },
	{ offset: 0x2D124, count: 0 } // padding
];

for (let i = 0; i < data.length; i++) {
	const item = data[i];
	const next = data[i+1];

	const itemChunkSize = (next.offset - item.offset) / item.count;
	
	console.log(`0x${itemChunkSize.toString(16).toUpperCase()}`);
}