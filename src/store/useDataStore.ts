import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { DataItemResponse, ResponseData } from "@/types";
import { Preferences } from "@capacitor/preferences";

const LOCAL_STORAGE_KEY = "userData";

const saveToStorage = async (data: ResponseData) => {
	await Preferences.set({
		key: LOCAL_STORAGE_KEY,
		value: JSON.stringify(data)
	});
};

const loadFromStorage = async (): Promise<DataItemResponse | null> => {
	const { value } = await Preferences.get({ key: LOCAL_STORAGE_KEY });
	return value ? JSON.parse(value) : null;
};

const clearStorage = async () => {
	await Preferences.remove({ key: LOCAL_STORAGE_KEY });
};

type UserState = {
	isLoadingData: boolean;
	dataUser: DataItemResponse | null;
	initUserData: () => Promise<boolean>;
	setUserData: (val: DataItemResponse) => Promise<void>;
	checkUserData: (dataUser: DataItemResponse) => Promise<{ valid: boolean }>;
	resetUserData: () => Promise<void>;
};

export const useDataStore = create<UserState>((set, get) => ({
	isLoadingData: false,
	dataUser: null,

	initUserData: async () => {
		const local = await loadFromStorage();
		if (local && typeof local === "object") {
			const isValid = await get().checkUserData(local);
			if (isValid?.valid === true) {
				set({ dataUser: local });
				return true;
			} else {
				await get().resetUserData();
			}
		}

		return false;
	},


	setUserData: async (val) => {
		set({ isLoadingData: true });
		try {
			const res = await axiosInstance.post("/set-location-utility", val);
			set({ dataUser: res.data });
			await saveToStorage(res.data);
		} catch (err) {
			console.error("❌ Gagal set user data:", err);
		} finally {
			set({ isLoadingData: false });
		}
	},

	checkUserData: async (dataUser) => {
		set({ isLoadingData: true });

		try {
			const res = await axiosInstance.post("/check-location-utility", {
				lat: dataUser.lat,
				lon: dataUser.lon,
				utility: dataUser.utility,
				name: dataUser.name
			});

			console.log(res.data);
			return res.data;
		} catch (err) {
			console.error("❌ Gagal cek user data:", err);
			return { valid: false };
		} finally {
			set({ isLoadingData: false });
		}
	},

	resetUserData: async () => {
		await clearStorage();
		set({ dataUser: null });
	}
}));
