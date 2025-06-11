
import {
	 // WiDaySunny,              // Cuaca cerah penuh saat siang (Sunny)
	 // WiDaySunnyOvercast,       // Matahari sedikit tertutup awan (Mostly Sunny)
	 WiDayCloudy, // Berawan sebagian saat siang (Partly Sunny)
	 // WiDayCloudyHigh,          // Awan tinggi saat siang (Intermittent Clouds)
	 // WiDayHaze,                // Kabut/bercahaya samar (Hazy Sunshine)
	 WiCloudy, // Awan tebal/mendung (Cloudy)
	 WiCloud, // Umum untuk berawan (Cloud umum)
	 // WiFog,                    // Kabut tebal (Fog)
	 // WiShowers,                // Hujan ringan terus-menerus (Showers)
	 // WiDayShowers,             // Hujan ringan saat siang (Partly Sunny w/ Showers)
	 WiThunderstorm, // Badai petir (T-Storms)
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
	 WiNightFog, // Kabut di malam hari (Foggy Night)
	 // WiNightAltShowers,        // Hujan ringan di malam hari (Partly Cloudy w/ Showers Night)
	 // WiNightAltStormShowers,   // Badai hujan malam (Mostly Cloudy w/ T-Storms Night)
	 // WiNightAltThunderstorm,   // Badai petir malam hari (Thunderstorms Night)
	 // WiNightAltSnowWind,       // Salju + angin di malam hari
	 // WiNightAltSnow            // Salju di malam hari
} from "react-icons/wi";


const Predict = () => {
	return (
		<div>
			<div className="header">
				<small>Karawang Timur, Warungbambu</small>
				<h1 className="inform-title">
					Wilayah anda saat ini , Hujan deras
					<WiDayCloudy />
				</h1>
			</div>

			<div className="predict">
				{[
					<WiNightFog />,
					<WiCloudy />,
					<WiCloud />,
					<WiThunderstorm />,
				].map((Icon, index) => (
					<div className="weather" key={index}>
						<div className="icon">{Icon}</div>
						<div className="weather-text">
							<p>20°</p>
							<small>19.00</small>
						</div>
					</div>
				))}
			</div>

			<div className="info">
				<div className="humidity">
					<p className="title-info">Kelembapan</p>
					<p className="data-info">78%</p>
				</div>
				<div className="temperature">
					<p className="title-info">Temperature</p>
					<p className="data-info">18°c</p>
				</div>
			</div>
		</div>
	)
}

export default Predict
