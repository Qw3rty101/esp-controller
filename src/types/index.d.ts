export interface responseDataSensor {
	altitude: float;
	humidity: float;
	pressure: float;
	rain_detected: boolean;
	rain_level: number;
	temperature: float;
	local_conditions: localConditions;
}

export interface localConditions {
	conditions: string;
	sudden_pressure_drop: boolean;
}

export interface ResponseData {
	message: string;
	data: DataItemResponse;
}

export interface DataItemResponse {
	name: string;
	lat: float | number;
	lon: float | number;
	utility: string;
	location_key?: string;
	location_name?: string;
}

export interface ReposnseDataPrediction {
	humidity: float;
	pressure: float;
	altitude: float;
	rain_detected: boolean;
	rain_level: number;
	conditions: null | string;
	sudden_drops: null | boolean;
	accu_temp: float;
	accu_humidity: float;
	accu_cond: string;
	timestamp: string;
	prediksi: {
		kondisi: string;
		prediksi: string;
	};
	location: "Bendungan Hilir, Tanah Abang, Jakarta Pusat, Indonesia";
	utility: "ai_stuff";
	forecast: DataItemForeCast[];
}

export interface DataItemForeCast {
	datetime: string;
	temp: float;
	humidity: float;
	precip_prob: number | null | string | float;
	weather_text: number | null | string | float;
}
