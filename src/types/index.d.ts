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