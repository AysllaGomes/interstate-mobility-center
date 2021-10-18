import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../login/Login";
import HomeScreen from "../home";
import {RegisterScreen} from "../register/register.screen";
import ResetPassword from "../login/reset-password/ResetPassword";
import Package from "../travelPackage/package";
import TermoUso from "../termo-uso/TermoUso";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        {/*Mudar no futuro, se usuario logado mostrar Home*/}
        <Stack.Navigator initialRouteName="Login"   screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="TermoUso" component={TermoUso}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Package" component={Package}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default  AppNavigator;