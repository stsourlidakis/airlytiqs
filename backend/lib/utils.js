function normalizeDustIndex(val){
	return val/5;
}

function getDataForClient(values){
	return {
		timestamp: values.timestamp,
		values: {
			dust: normalizeDustIndex(values.dustIndex),
			uv: values.uvIndex,
			co: values.coIndex
		}
	}
}

module.exports = {
	normalizeDustIndex: normalizeDustIndex,
	getDataForClient: getDataForClient
}
