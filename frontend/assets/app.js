const osmLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
});

const heatMapLayer = new ol.layer.Heatmap({
	source: createDummyData(),
	radius: 50,
	blur: 10,
	opacity: 0.5
});

const map = new ol.Map({
	layers: [osmLayer, heatMapLayer],
	target: "mapWrapper",
	view: new ol.View({
		center: ol.proj.transform([ 23.69318, 37.94187 ], 'EPSG:4326', 'EPSG:3857'),
		zoom: 16
	})
});

function simulate(){
	setInterval(function(){
		heatMapLayer.setSource(createDummyData())
	}, 700);
}

function createDummyData(){
	var data = new ol.source.Vector();
	let temp;

	for(point of route){
		temp = featureFromLonLat(point.lat, point.lon, getRandomFloat());
		data.addFeature(temp);
	}

	return data;
}

function featureFromLonLat(lon, lat, weight) {
	const proj = ol.proj.fromLonLat([lon, lat]);
	const point = new ol.geom.Point(proj);
	return pointFeature = new ol.Feature({
		geometry: point,
		weight: weight
	});
}

function getRandomFloat() {
	const min = 0;
	const max = 0.45;
	return Math.random() * (max - min) + min;
}
