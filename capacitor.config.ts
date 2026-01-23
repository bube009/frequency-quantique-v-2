import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alexfournier.frequencyquantique',
  appName: 'Frequency Quantique',
  webDir: 'dist',
  ios: {
  buildNumber: '4',
  infoPlist: {
    CFBundleVersion: '4'
  }
};

export default config;
