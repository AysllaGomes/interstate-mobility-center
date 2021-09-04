import React from 'react';
import {Provider as PaperProvider} from "react-native-paper";
import { StyleSheet } from 'react-native';
import Login from "./src/login/Login";
import {RegisterScreen} from "./src/register/register.screen";
import {theme} from "./App.style";



export default function App() {
  return (
       // <RegisterScreen></RegisterScreen>

  <PaperProvider theme={theme}>
  <Login></Login>
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
