const osmLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
});

const map = new ol.Map({
	layers: [osmLayer],
	target: "mapWrapper",
	view: new ol.View({
		center: ol.proj.transform([ 23.69318, 37.94187 ], 'EPSG:4326', 'EPSG:3857'),
		zoom: 16
	})
});
