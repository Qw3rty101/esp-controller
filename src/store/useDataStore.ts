import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { DataItemResponse, ResponseData } from "@/types";
import { Preferences } from '@capacitor/preferences';

const LOCAL_STORAGE_KEY = "userData";

const saveToStorage = async (data: ResponseData) => {
	await Preferences.set({ key: LOCAL_STORAGE_KEY, value: JSON.stringify(data) });
};

const loadFromStorage = async (): Promise<ResponseData | null> => {
	const { value } = await Preferences.get({ key: LOCAL_STORAGE_KEY });
	return value ? JSON.parse(value) : null;
};

const clearStorage = async () => {
	await Preferences.remove({ key: LOCAL_STORAGE_KEY });
};

type UserState = {
	isLoadingData: boolean;
	dataUser: ResponseData | null;
	initUserData: () => Promise<void>;
	setUserData: (val: DataItemResponse) => Promise<void>;
	checkUserData: () => Promise<boolean>;
	resetUserData: () => Promise<void>;
};

export const useDataStore = create<UserState>((set, get) => ({
	isLoadingData: false,
	dataUser: null,

	initUserData: async () => {
		const local = await loadFromStorage();
		if (local) {
			set({ dataUser: local });
			const isValid = await get().checkUserData();
			if (!isValid) await get().resetUserData();
		}
	},

	setUserData: async (val) => {
		set({ isLoadingData: true });
		try {
			const res = await axiosInstance.post("/set-location-utility", val);
			const data: ResponseData = {
				message: res.data.message,
				data: res.data.data
			};
			set({ dataUser: data });
			await saveToStorage(data);
		} catch (err) {
			console.error("❌ Gagal set user data:", err);
		} finally {
			set({ isLoadingData: false });
		}
	},

	checkUserData: async () => {
		const val = get().dataUser?.data;
		if (!val) return false;

		set({ isLoadingData: true });

		try {
			const res = await axiosInstance.post("/check-location-utility", {
				lat: val.lat,
				lon: val.lon,
				utility: val.utility,
				name: val.name
			});

			if (res.data.data === null) {
				console.warn("⚠️ Data user tidak valid.");
				return false;
			}

			const result: ResponseData = {
				message: res.data.message,
				data: res.data.data
			};

			set({ dataUser: result });
			await saveToStorage(result);
			return true;

		} catch (err) {
			console.error("❌ Gagal cek user data:", err);
			return false;
		} finally {
			set({ isLoadingData: false });
		}
	},

	resetUserData: async () => {
		await clearStorage();
		set({ dataUser: null });
	}
}));
