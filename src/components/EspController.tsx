import { useEspStore } from "@/store/useEspStore";
import { createElement } from "react";
import { IconType } from "react-icons";
import { BsCpu } from "react-icons/bs";
import { FaArrowsAltV, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiDaySunny, WiHumidity, WiSprinkle, WiStormShowers } from "react-icons/wi";
import "@/css/esp-controller.css";


const SkeletonStatItem = () => (
  <div className="stat-item skeleton">
    <div className="icon-placeholder" />
    <div className="value-placeholder" />
    <div className="label-placeholder" />
  </div>
);

function getWeatherIcon(weatherText: string): IconType {
  const text = weatherText.toLowerCase();

  if (text.includes("heavy_rain")) return WiStormShowers;
  if (text.includes("no_rain")) return WiDaySunny;
  if (text.includes("drizzle")) return WiSprinkle;
  return WiDaySunny;
}



const EspController = () => {
  const { rainData, isLoadingEsp, predictionData } = useEspStore();

  if (isLoadingEsp || !rainData) {
    return (
      <div>
        <div className="esp">
          <div className="pin-icon-skeleton" />
          <div className="text-skeleton long" />
        </div>
        <div className="esp-condition">
          <div className="esp-condition-item">
            <div className="text-skeleton long" /> <div className="pin-icon-skeleton" />
            <div className="text-skeleton long" /> <div className="pin-icon-skeleton" />
          </div>
        </div>
        <div className="stat-esp">
          <div className="stat-column">
            <SkeletonStatItem />
            <SkeletonStatItem />
          </div>
          <div className="stat-column">
            <SkeletonStatItem />
            <SkeletonStatItem />
          </div>
        </div>
      </div>
    );
  }
  const conditionItems = [
    {
      label: "Condition Device",
      value: rainData.local_conditions?.conditions.split("_").join(" ") ?? "-",
    },
    {
      label: "Predicted Weather",
      value: predictionData?.prediksi.kondisi.split("_").join(" ") ?? "-",
    },
  ];

  return (
    <div>
      <div className="esp">
        <BsCpu className="cpu-icon" />
        Esp Weather Controller
      </div>
      <div className="esp-condition">
        {conditionItems.map((item, index) => {
          const Icon = getWeatherIcon(item.value);
          return (
            <div className="esp-condition-item" key={index}>
              <div className="label">{item.label}:</div>
              <div className="value">
                {item.value}
              </div>
              {Icon && createElement(Icon, { className: "esp-condition-icon" })}
            </div>
          );
        })}

      </div>
      <div className="stat-esp">
        <div className="stat-column">
          <div className="stat-item">
            <WiHumidity className="icon" />
            <div className="value">{rainData?.humidity ?? "-"}</div>
            <b className="label">Humidity</b>
          </div>
          <div className="stat-item">
            <FaTemperatureHigh className="icon" />
            <div className="value">{rainData.temperature ?? "-"}</div>
            <b className="label">Temperature</b>
          </div>
        </div>
        <div className="stat-column">
          <div className="stat-item">
            <FaWind className="icon" />
            <div className="value">{rainData.pressure ?? "-"}</div>
            <b className="label">Pressure</b>
          </div>
          <div className="stat-item">
            <FaArrowsAltV className="icon" />
            <div className="value">{rainData.altitude?.toFixed(2) ?? "-"} m</div>
            <b className="label">Altitude</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspController;
