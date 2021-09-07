import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../login/Login";
import HomeScreen from "../home";
import {RegisterScreen} from "../register/register.screen";


const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        {/*Mudar no futuro, se usuario logado mostrar Home*/}
        <Navigator initialRouteName="Login"   screenOptions={{headerShown: false}}>
            <Screen name="Login" component={Login}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Home" component={HomeScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default  AppNavigator;