export interface responseDataSensor {
	altitude: float;
	humidity: float;
	local_conditions: localConditions;
	pressure: float;
	rain_detected: boolean;
	rain_level: number;
	temperature: float;
}

export interface localConditions {
		conditions: string;
		sudden_pressure_drop: boolean;
}