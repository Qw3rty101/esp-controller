import mqtt, { MqttClient } from "mqtt";
import { useEspStore } from "@/store/useEspStore";
import { DataItemForeCast, ReposnseDataPrediction, responseDataSensor } from "@/types";
import { useEffect, useState, useRef } from "react";
type MqttStatus = "Connecting" | "Connected" | "Online" | "Offline" | "Error" | "Closed";

export const useMqtt = () => {
	const [client, setClient] = useState<MqttClient | null>(null);
	const [status, _setStatus] = useState<MqttStatus>("Connecting");
	const statusRef = useRef<MqttStatus>("Connecting");

	const setStatus = (newStatus: MqttStatus) => {
		statusRef.current = newStatus;
		_setStatus(newStatus);
	};

	// store hooks
	const setLoadingEsp = useEspStore((s) => s.setLoadingEsp);
	const setRainData = useEspStore((s) => s.setRainData);
	const setPredictionData = useEspStore((s) => s.setPredictionData);

	useEffect(() => {
		let isMounted = true;
		let offlineCheckTimer: ReturnType<typeof setInterval>;
		let lastMessageTime = Date.now();

		const mqttClient = mqtt.connect(import.meta.env.VITE_MQTT_URL, {
			username: import.meta.env.VITE_MQTT_USER,
			password: import.meta.env.VITE_MQTT_PASS,
			clientId: "mqttjs_" + Math.random().toString(16).slice(2, 8),
		});

		setClient(mqttClient);
		setLoadingEsp(true);

		mqttClient.on("connect", () => {
			if (!isMounted) return;

			console.log("✅ Connected to MQTT Broker");
			setStatus("Connected");
			setLoadingEsp(false);

			if (mqttClient.connected) {
				mqttClient.subscribe(["weather/rain", "weather/prediction"], (err) => {
					if (err) {
						console.error("❌ Subscribe error:", err);
						setStatus("Error");
					} else {
						console.log("📡 Subscribed to topics");
					}
				});
			}

			offlineCheckTimer = setInterval(() => {
				if (mqttClient.connected && (statusRef.current === "Connected" || statusRef.current === "Online")) {
					if (Date.now() - lastMessageTime > 7000) {
						setStatus("Offline");
					}
				}
			}, 3000);
		});

		mqttClient.on("message", (topic, message) => {
			if (!isMounted) return;
			lastMessageTime = Date.now();

			if (statusRef.current !== "Online") setStatus("Online");

			const msgString = message.toString();
			
			if (topic === "weather/rain") {
				try {
					const parsed: responseDataSensor = JSON.parse(msgString);
					setRainData(parsed);
				} catch (e) {
					console.error("💥 Failed to parse rain data:", e);
				}
			} else if (topic === "weather/prediction") {
				const parsedPrediction: ReposnseDataPrediction = JSON.parse(msgString);
				const parsedForecast: DataItemForeCast[] = parsedPrediction ? parsedPrediction.forecast : [];
				setPredictionData({ ...parsedPrediction, forecast: parsedForecast });
			}
		});

		mqttClient.on("error", (err) => {
			console.error("💣 MQTT Error:", err);
			setStatus("Error");
			setLoadingEsp(false);
		});

		mqttClient.on("close", () => {
			console.log("🔌 MQTT Connection closed");
			setStatus("Closed");
			setLoadingEsp(false);
			clearInterval(offlineCheckTimer);
		});

		return () => {
			isMounted = false;
			mqttClient.end(true);
			clearInterval(offlineCheckTimer);
		};
	}, [setLoadingEsp, setRainData, setPredictionData]);

	return { client, status };
};
