import { useEspStore } from "@/store/useEspStore";
import { BsCpu } from "react-icons/bs";
import { FaArrowsAltV, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const SkeletonStatItem = () => (
  <div className="stat-item skeleton">
    <div className="icon-placeholder" />
    <div className="value-placeholder" />
    <div className="label-placeholder" />
  </div>
);

const EspController = () => {
  const { rainData, isLoadingEsp } = useEspStore();

  if (isLoadingEsp || !rainData) {
    return (
      <div>
        <div className="esp">
          <BsCpu className="cpu-icon" />
          Esp Weather Controller
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

  return (
    <div>
      <div className="esp">
        <BsCpu className="cpu-icon" />
        Esp Weather Controller
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
