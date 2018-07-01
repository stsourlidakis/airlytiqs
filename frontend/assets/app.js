const socket = io('http://airlytiqs.cloudapp.net');
let heatmapLayers = [];
const initialHeatmapLayer = 'co';
let activeHeatmapLayer, activeStamenLayer;
let stamenLayersForTimeOfTheDay = {
	'default': 'toner-lite',
	'Morning': 'toner-lite',
	'Noon': 'toner-lite',
	'Evening': 'toner',
	'Night': 'toner'
};
let colors = {
	'dust': ['Black', 'DarkRed', 'Yellow', 'White'],
	'uv': ['Black', 'Purple', 'Red', 'Yellow', 'White'],
	'co': ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
	'co2': ['blue', 'red']
};
const defaultMapCenter = { lon: 37.9553645, lat: 23.7401097};

const osmLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
});

const raster = new ol.layer.Tile({
	source: new ol.source.Stamen ({
		layer: stamenLayersForTimeOfTheDay.default
	}),
	name: 'base layer'
});

const map = new ol.Map({
	layers: [raster],
	target: "mapWrapper",
	view: new ol.View({
		center: ol.proj.transform([ defaultMapCenter.lat, defaultMapCenter.lon ], 'EPSG:4326', 'EPSG:3857'),
		zoom: 13
	})
});

function renderHeatmapLayer(layerName){
	createLayerIfNeeded(layerName);
	removeActiveHeatmapLayer();
	map.addLayer(heatmapLayers[layerName]);
	activeHeatmapLayer = layerName;
}

function createLayerIfNeeded(layerName){
	heatmapLayers[layerName] = createLayer(layerName);
}

function getData(layerName){
	let data = new ol.source.Vector();
	let temp;
	for(point of route[layerName]){
		temp = featureFromLonLat(point.lat, point.lon, point.w);
		data.addFeature(temp);
	}

	return data;
}

function createLayer(layerName){
	return new ol.layer.Heatmap({
		name: layerName,
		source: getData(layerName),
		radius: 30,
		blur: 10,
		opacity: 1,
		maxResolution: 50,
		gradient: colors[layerName]
	});
}

function featureFromLonLat(lon, lat, weight) {
	const proj = ol.proj.fromLonLat([lon, lat]);
	const point = new ol.geom.Point(proj);
	return pointFeature = new ol.Feature({
		geometry: point,
		weight: weight
	});
}

function removeActiveHeatmapLayer(){
	map.removeLayer(map.getLayers().array_[1]);
}

function updateStamenLayer(stamenLayer){
	if(stamenLayer!==activeStamenLayer){
		map.getLayers().array_[0].setSource(new ol.source.Stamen ({
			layer: stamenLayer
		}));
		activeStamenLayer = stamenLayer;
	}
}

function updateData(values){
	const availableLayers = Object.keys(values);
	for(layerName of availableLayers){
		route[layerName][0].w = values[layerName];
		let series = getSeriesByName(layerName);
		const val = Number(values[layerName]);
		series.points[series.points.length-1].update(layerName!=='dust' ? val : val*10);
	}
}

function initDatepicker(){
	flatpickr("#datepicker", {
		defaultDate: 'today',
		maxDate: 'today',
		inline: 'true',
		locale:{
			"firstDayOfWeek": 1
		},
		onChange: function(selectedDates, dateStr, instance){
			// update heatmap
		}
	});
}

function addEventListeners(){
	socket.on('telemetry', function (data) {
		console.log(data.values);
		updateData(data.values);
		renderHeatmapLayer(activeHeatmapLayer);
	});

	document.querySelector('#layer').addEventListener('change', function(e){
		const layerName = e.target.options[e.target.selectedIndex].value;
		if( layerName!==activeHeatmapLayer ){
			renderHeatmapLayer(layerName);
		}
	});

	document.querySelector('#timeRange').addEventListener('change', function(e){
		const timeOfTheDay = e.target.options[e.target.selectedIndex].value;
		const newStamenLayer = stamenLayersForTimeOfTheDay[timeOfTheDay] || stamenLayersForTimeOfTheDay.default;
		updateStamenLayer(newStamenLayer);
	});
}

let chartSeries = createSeries();
let chartInstance;
function initChart(){
	chartInstance = Highcharts.chart('chart', {
		chart: {
			type: 'line'
		},
		title: {
			text: 'Hourly Metrics: Faliro 1'
		},
		xAxis: {
			categories: createHourLabels()
		},
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
					return '';
				}
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: true
			}
		},
		series: chartSeries
	});
}

function createSeries(){
	let series = [];
	for(item of history){
		series.push({
			name: item.name,
			data: item.values,
			color: item.color
		});
	}

	return series;
}

function createHourLabels(){
	const currentHour = (new Date()).getHours();
	let arr = [];
	arr.push((currentHour-6)+':00');
	arr.push((currentHour-5)+':00');
	arr.push((currentHour-4)+':00');
	arr.push((currentHour-3)+':00');
	arr.push((currentHour-2)+':00');
	arr.push((currentHour-1)+':00');
	arr.push((currentHour)+':00');

	return arr;
}

function getSeriesByName(name){
	for(series of chartInstance.series){
		if(series.name === name){
			return series;
		}
	}
}
