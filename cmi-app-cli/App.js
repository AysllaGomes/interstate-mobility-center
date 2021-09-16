import React from 'react';
import {Provider as PaperProvider} from "react-native-paper";
import { StyleSheet } from 'react-native';
import {theme} from "./App.style";
import AppNavigator from "./src/navigation/navigator";



export default function App() {
  return (
          <PaperProvider theme={theme}>
            <AppNavigator></AppNavigator>
          </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
