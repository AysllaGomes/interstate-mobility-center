import React from 'react';
import {Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import Login from "../login/Login";
import HomeScreen from "../home/Index";
import {RegisterScreen} from "../register/Register.screen";
import ResetPassword from "../login/reset-password/ResetPassword";
import Package from "../travelPackage/package";
import TermoUso from "../userTerm/TermoUso";
import TravelInfo from '../travelIinfo/TravelInfo';
import Payment from '../payment/PaymentMethods';
import ResumoCompra from '../purchaseDetails/PurchaseDetails';
import UserTravels from '../userTravels/UserTravels'; 
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../drawer/DrowerContent"

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrowerRoutes() {
    return(
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="VoeJá" component={HomeScreen}></Drawer.Screen>

          </Drawer.Navigator>
    );
}

const AppNavigator = () => (
    <NavigationContainer>

        {/*Mudar no futuro, se usuario logado mostrar Home*/}
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="TermoUso" component={TermoUso}/>
            <Stack.Screen name="Home" component={DrowerRoutes} />
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Package" component={Package}  />
            <Stack.Screen name="TravelInfo" component={TravelInfo}/>
            <Stack.Screen name="Payment" component={Payment}/>
            <Stack.Screen name="ResumoCompra" component={ResumoCompra}/>
            <Stack.Screen name="UserTravels" component={UserTravels}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default  AppNavigator;