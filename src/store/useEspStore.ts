import { responseDataSensor } from '@/types';
import { create } from 'zustand';

type EspState = {
  isLoadingEsp: boolean;
  setLoadingEsp: (value: boolean) => void;

  rainData: responseDataSensor | null;
  predictionData: string;
  setRainData: (val: responseDataSensor) => void;
  setPredictionData: (val: string) => void;
};

export const useEspStore = create<EspState>((set) => ({
  isLoadingEsp: false,
  setLoadingEsp: (value) => set({ isLoadingEsp: value }),

  rainData: null,
  predictionData: '',
  setRainData: (val) => set({ rainData: val }),
  setPredictionData: (val) => set({ predictionData: val }),
}));
