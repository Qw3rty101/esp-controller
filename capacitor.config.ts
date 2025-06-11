import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.weatherapp',
  appName: 'Weather-app-predict',
  webDir: 'dist',
  server: {
    url: 'http://192.168.159.15:5173/',
    cleartext: true
  },
};

export default config;
