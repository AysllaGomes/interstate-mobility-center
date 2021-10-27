import React from 'react';
import {Provider as PaperProvider} from "react-native-paper";
import { StyleSheet } from 'react-native';
import {theme} from "./App.style";
import AppNavigator from "./src/navigation/navigator";
import { useFonts, GermaniaOne_400Regular } from '@expo-google-fonts/germania-one';

export default function App() {
    let [fontsLoaded] = useFonts({
        GermaniaOne_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }else
  return (
          <PaperProvider theme={theme}>
            <AppNavigator></AppNavigator>
          </PaperProvider>
  );
}

