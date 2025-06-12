import { useDataStore } from "./useDataStore";
import { create } from "zustand";

type StepData = {
  name?: string;
  utility?: string;
  lat?: number;
  lon?: number;
};

type OnboardingStore = {
  isLoading: boolean;
  stepData: StepData;
  currentStep: number;
  setStepData: (data: Partial<StepData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  finishOnboarding: () => Promise<void>;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  isLoading: false,
  stepData: {},
  currentStep: 0,

  setStepData: (data) =>
    set((state) => ({
      stepData: { ...state.stepData, ...data }
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1)
    })),

  finishOnboarding: async () => {
    set({ isLoading: true });
    const data = get().stepData;
    try {
      // Setelah submit ke backend, bisa simpan ke localStorage juga kalau mau
      useDataStore.getState().setDataUser({
        lat: data.lat!,
        lon: data.lon!,
        name: data.name!,
        utility: data.utility!
      });
    } catch (err) {
      console.error("Gagal kirim data onboarding", err);
    } finally {
      set({ isLoading: false });
    }
  }
}));
