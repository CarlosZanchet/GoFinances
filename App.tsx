import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import themeLight from './src/global/styles/themeLight';
import themeDark from './src/global/styles/themeDark';
import { Routes } from './src/Routes';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeLightDarkProvider, useThemeLightDark } from './src/context/ThemeContext';

export default function App() {

  const { userStorageLoading } = useAuth();
  const { theme } = useThemeLightDark();

  

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return null;
  }

  return (
      <ThemeLightDarkProvider>
        <ThemeProvider theme={themeLight}>
            <StatusBar barStyle="light-content" />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
      </ThemeLightDarkProvider>
  );
}