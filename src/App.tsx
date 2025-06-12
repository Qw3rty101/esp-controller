import {
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Reason from "@/pages/Reason";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import { useDataStore } from "@/store/useDataStore";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const App = () => {
	const { dataUser, initUserData, isLoadingData } = useDataStore();
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		const verify = async () => {
			await initUserData();
			setTimeout(() => {
				setChecking(false);
			}, 1500);
		};
		verify();
	}, []);

	if (isLoadingData || checking) return <Loading />;

	return (
		<Routes>
			<Route path="/" element={!dataUser ? <Reason /> : <Navigate to="/home" replace />} />
			<Route
				path="/home"
				element={dataUser ? <Home /> : <Navigate to="/" replace />}
			/>
			<Route
				path="/settings"
				element={dataUser ? <Settings /> : <Navigate to="/" replace />}
			/>
		</Routes>
	);
};

export default App;
