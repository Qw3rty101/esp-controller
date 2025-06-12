
import { useDataStore } from "@/store/useDataStore";
import { useEspStore } from "@/store/useEspStore";
import { DataItemForeCast } from "@/types";
import { extractHour } from "@/utils/format";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import {
	WiDaySunny,              // Cuaca cerah penuh saat siang (Sunny)
	WiDayCloudy, // Berawan sebagian saat siang (Partly Sunny)
	WiCloudy, // Awan tebal/mendung (Cloudy)
	WiCloud, // Umum untuk berawan (Cloud umum)
	WiNightFog, // Kabut di malam hari (Foggy Night)
	WiThunderstorm, // Badai petir (T-Storms)
	// WiDaySunnyOvercast,       // Matahari sedikit tertutup awan (Mostly Sunny)
	// WiDayHaze,                // Kabut/bercahaya samar (Hazy Sunshine)
	// WiFog,                    // Kabut tebal (Fog)
	// WiDayCloudyHigh,          // Awan tinggi saat siang (Intermittent Clouds)
	// WiShowers,                // Hujan ringan terus-menerus (Showers)
	// WiDayShowers,             // Hujan ringan saat siang (Partly Sunny w/ Showers)
	// WiStormShowers,           // Hujan badai (Storm dengan hujan)
	// WiDayStormShowers,        // Hujan badai siang hari (Mostly Cloudy w/ T-Storms)
	// WiRain,                   // Hujan deras (Rain)
	// WiSnowWind,               // Salju + angin kencang (Blizzard atau Snowstorm)
	// WiDaySnowWind,            // Salju + angin saat siang hari
	// WiSnow,                   // Salju umum (Snow)
	// WiSnowflakeCold,          // Kondisi sangat dingin / suhu beku (Cold)
	// WiSleet,                  // Hujan es (Sleet)
	// WiRainMix,                // Campuran hujan dan salju (Rain and Snow)
	// WiHot,                    // Cuaca panas ekstrem (Hot)
	// WiStrongWind,             // Angin kencang (Windy)
	// WiNightClear,             // Langit cerah di malam hari (Clear Night)
	// WiNightAltCloudy,         // Malam berawan penuh (Mostly Cloudy Night)
	// WiNightAltPartlyCloudy,   // Malam sebagian berawan (Partly Cloudy Night)
	// WiNightAltCloudyHigh,     // Awan tinggi di malam hari (Intermittent Clouds Night)
	// WiNightAltShowers,        // Hujan ringan di malam hari (Partly Cloudy w/ Showers Night)
	// WiNightAltStormShowers,   // Badai hujan malam (Mostly Cloudy w/ T-Storms Night)
	// WiNightAltThunderstorm,   // Badai petir malam hari (Thunderstorms Night)
	// WiNightAltSnowWind,       // Salju + angin di malam hari
	// WiNightAltSnow            // Salju di malam hari
} from "react-icons/wi";
// import "@/css/home.css"

import { IconType } from "react-icons";

function getWeatherIcon(weatherText: string): IconType {
	const text = weatherText.toLowerCase();

	if (text.includes("sunny")) return WiDaySunny;
	if (text.includes("partly")) return WiDayCloudy;
	if (text.includes("cloudy")) return WiCloudy;
	if (text.includes("cloud")) return WiCloud;
	if (text.includes("thunderstorm") || text.includes("storm")) return WiThunderstorm;
	if (text.includes("fog")) return WiNightFog;

	return WiDayCloudy; // fallback default
}

const SkeletonPredict = () => (
	<div className="header">
		<div className="predict-skeleton">
			<div className="header-skeleton">
				<div className="location-skeleton">
					<div className="pin-icon-skeleton" />
					<div className="text-skeleton short" />
				</div>
				<div className="title-skeleton">
					<div className="text-skeleton long" />
				</div>
				<div className="subtitle-skeleton">
					<div className="text-skeleton medium" />
				</div>
			</div>

			<div className="weather-list-skeleton">
				{[...Array(4)].map((_, index) => (
					<div className="weather-item-skeleton" key={index}>
						<div className="weather-icon-skeleton" />
						<div className="weather-text-skeleton">
							<div className="text-skeleton short" />
							<div className="text-skeleton very-short" />
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

const Predict = () => {
	const { dataUser } = useDataStore();
	const { predictionData, isLoadingEsp } = useEspStore();

	const [forecast, setForecast] = useState<DataItemForeCast[]>([]);

	useEffect(() => {
		if (predictionData && typeof predictionData.forecast === 'string') {
			try {
				const jsonString = (predictionData.forecast as string).replace(/'/g, '"');
				const dataArray: DataItemForeCast[] = JSON.parse(jsonString);
				setForecast(dataArray);
			} catch (error) {
				console.error('Parsing error:', error);
			}
		}
	}, [predictionData]);

	if (isLoadingEsp || !predictionData) {
		return <SkeletonPredict />;
	}

	return (
		<div>
			<div className="header">
				<small className="location">
					<FiMapPin size={14} />
					{dataUser?.data.location_name}
				</small>
				<h1 className="inform-title">
					{predictionData && predictionData.prediksi.prediksi}
				</h1>
				<div style={{ fontSize: "12px" }}>
					Kondisi saat ini : {predictionData && predictionData.prediksi.kondisi}
				</div>
			</div>

			<div className="predict">
				{predictionData &&
					forecast.map((item, index) => {
						const Icon = getWeatherIcon(item.weather_text);
						return (
							<div className="weather" key={index}>
								<div className="icon"><Icon /></div>
								<div className="weather-text">
									<p>{item.temp}</p>
									<small>{extractHour(item.datetime)}</small>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Predict
