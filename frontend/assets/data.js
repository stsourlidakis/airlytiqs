const history = [
	{
		name: 'dust',
		values: [7.3, 6.1, 5.8, 3.5, 2.0, 3.3, 3.0],
		color: '#FEC211'
	}, {
		name: 'uv',
		values: [0, 0, 9, 0, 0, 0, 0],
		color: '#666699'
	}, {
		name: 'co',
		values: [0, 0, 0, 0, 0, 10, 0],
		color: '#EF0000'
	}
];

const route = {
	dust: [
		{ lon: 37.9417307, lat: 23.6938098, w: 0},	//SNF
		{ lon: 37.9418225, lat: 23.6884054, w: 0.11},
		{ lon: 37.9441915, lat: 23.6907228, w: 0.15},
		{ lon: 37.9445300, lat: 23.6957868, w: 0.14},
		{ lon: 37.9443269, lat: 23.6994775, w: 0.12},
		{ lon: 37.9452068, lat: 23.7021383, w: 0.27},
		{ lon: 37.9478466, lat: 23.7050565, w: 0.17},
		{ lon: 37.9506892, lat: 23.7088331, w: 0.21},
		{ lon: 37.9529226, lat: 23.7115796, w: 0.01},
		{ lon: 37.9552237, lat: 23.7145837, w: 0.26},
		{ lon: 37.9570509, lat: 23.7168153, w: 0.07},
		{ lon: 37.9584044, lat: 23.7189611, w: 0.04},
		{ lon: 37.9600286, lat: 23.7205060, w: 0.12},
		{ lon: 37.9615174, lat: 23.7227376, w: 0.26},
		{ lon: 37.9625324, lat: 23.7242826, w: 0.34},
		{ lon: 37.9644948, lat: 23.7267717, w: 0.21},
		{ lon: 37.9662542, lat: 23.7288316, w: 0.26},
		{ lon: 37.9678782, lat: 23.7312349, w: 0.32},
		{ lon: 37.9701111, lat: 23.7317498, w: 0.31},
		{ lon: 37.9716673, lat: 23.7335523, w: 0.02},
		{ lon: 37.9745767, lat: 23.7338956, w: 0.17},
		{ lon: 37.9772154, lat: 23.7341531, w: 0.31},
		{ lon: 37.9786361, lat: 23.7326940, w: 0.15},
		{ lon: 37.9805981, lat: 23.7311490, w: 0.31},
		{ lon: 37.9820865, lat: 23.7296899, w: 0.36},
		{ lon: 37.9832365, lat: 23.7288316, w: 0.31}
	], 
	uv: [
		{ lon: 37.9417307, lat: 23.6938098, w: 0},	//SNF
		{ lon: 37.9418225, lat: 23.6884054, w: 0.11},
		{ lon: 37.9441915, lat: 23.6907228, w: 0.35},
		{ lon: 37.9445300, lat: 23.6957868, w: 0.24},
		{ lon: 37.9443269, lat: 23.6994775, w: 0.32},
		{ lon: 37.9452068, lat: 23.7021383, w: 0.27},
		{ lon: 37.9478466, lat: 23.7050565, w: 0.17},
		{ lon: 37.9506892, lat: 23.7088331, w: 0.21},
		{ lon: 37.9529226, lat: 23.7115796, w: 0.01},
		{ lon: 37.9552237, lat: 23.7145837, w: 0.26},
		{ lon: 37.9570509, lat: 23.7168153, w: 0.07},
		{ lon: 37.9584044, lat: 23.7189611, w: 0.04},
		{ lon: 37.9600286, lat: 23.7205060, w: 0.12},
		{ lon: 37.9615174, lat: 23.7227376, w: 0.26},
		{ lon: 37.9625324, lat: 23.7242826, w: 0.34},
		{ lon: 37.9644948, lat: 23.7267717, w: 0.21},
		{ lon: 37.9662542, lat: 23.7288316, w: 0.26},
		{ lon: 37.9678782, lat: 23.7312349, w: 0.32},
		{ lon: 37.9701111, lat: 23.7317498, w: 0.31},
		{ lon: 37.9716673, lat: 23.7335523, w: 0.02},
		{ lon: 37.9745767, lat: 23.7338956, w: 0.17},
		{ lon: 37.9772154, lat: 23.7341531, w: 0.01},
		{ lon: 37.9786361, lat: 23.7326940, w: 0.15},
		{ lon: 37.9805981, lat: 23.7311490, w: 0.11},
		{ lon: 37.9820865, lat: 23.7296899, w: 0.16},
		{ lon: 37.9832365, lat: 23.7288316, w: 0.21}
	],
	co: [
		{ lon: 37.9417307, lat: 23.6938098, w: 0},	//SNF
		{ lon: 37.9418225, lat: 23.6884054, w: 0.11},
		{ lon: 37.9441915, lat: 23.6907228, w: 0.35},
		{ lon: 37.9445300, lat: 23.6957868, w: 0.24},
		{ lon: 37.9443269, lat: 23.6994775, w: 0.32},
		{ lon: 37.9452068, lat: 23.7021383, w: 0.27},
		{ lon: 37.9478466, lat: 23.7050565, w: 0.17},
		{ lon: 37.9506892, lat: 23.7088331, w: 0.21},
		{ lon: 37.9529226, lat: 23.7115796, w: 0.01},
		{ lon: 37.9552237, lat: 23.7145837, w: 0.26},
		{ lon: 37.9570509, lat: 23.7168153, w: 0.07},
		{ lon: 37.9584044, lat: 23.7189611, w: 0.04},
		{ lon: 37.9600286, lat: 23.7205060, w: 0.12},
		{ lon: 37.9615174, lat: 23.7227376, w: 0.26},
		{ lon: 37.9625324, lat: 23.7242826, w: 0.34},
		{ lon: 37.9644948, lat: 23.7267717, w: 0.21},
		{ lon: 37.9662542, lat: 23.7288316, w: 0.26},
		{ lon: 37.9678782, lat: 23.7312349, w: 0.32},
		{ lon: 37.9701111, lat: 23.7317498, w: 0.31},
		{ lon: 37.9716673, lat: 23.7335523, w: 0.02},
		{ lon: 37.9745767, lat: 23.7338956, w: 0.17},
		{ lon: 37.9772154, lat: 23.7341531, w: 0.01},
		{ lon: 37.9786361, lat: 23.7326940, w: 0.15},
		{ lon: 37.9805981, lat: 23.7311490, w: 0.11},
		{ lon: 37.9820865, lat: 23.7296899, w: 0.16},
		{ lon: 37.9832365, lat: 23.7288316, w: 0.21}
	]
};
