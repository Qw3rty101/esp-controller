import { useMqtt } from "@/hooks/UseMqtt";
import { useEffect, useState } from "react";

const BarStatusFoot = () => {
	const { status } = useMqtt();
	const [showStatusBar, setShowStatusBar] = useState(false);
	const [statusText, setStatusText] = useState("");

	useEffect(() => {
		if (!status) return;

		let text = "";
		switch (status) {
			case "Connecting":
				text = "Connecting to Server...";
				break;
			case "Connected":
				text = "Connected to Server";
				break;
			case "Online":
				text = "Device Online";
				break;
			case "Offline":
				text = "Device Not Responding";
				break;
			case "Error":
				text = "Connection Error";
				break;
			case "Closed":
				text = "Connection Closed";
				break;
			default:
				text = "Unknown Status";
		}

		setStatusText(text);
		setShowStatusBar(true);

		// Handle khusus Offline
		if (status === "Offline") {
			return;
		}

		const timer = setTimeout(() => {
			setShowStatusBar(false);
			 // Online: 3s, others: 2s
		}, status === "Online" ? 3000 : 2000);

		return () => clearTimeout(timer);
	}, [status]);

	return (
		showStatusBar && (
			<div className={`mqtt-status-bar ${status.toLowerCase()}`}>
				{statusText}
			</div>
		)
	);
};

export default BarStatusFoot;
