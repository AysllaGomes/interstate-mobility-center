import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../login/Login";
import HomeScreen from "../home";
import {RegisterScreen} from "../register/register.screen";
import ResetPassword from "../login/reset-password/ResetPassword";
import Package from "../travelPackage/package";
import TermoUso from "../termo-uso/TermoUso";
import TravelInfo from '../travel-info/TravelInfo';
import Payment from '../payment/Payment';
import ResumoCompra from '../resumo-compra/resumoCompra';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../drawer/DrowerContent"

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrowerRoutes() {
    return(
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="Pacotes de Viagem" component={HomeScreen}></Drawer.Screen>

          </Drawer.Navigator>
    );
}

const AppNavigator = () => (
    <NavigationContainer>

        {/*Mudar no futuro, se usuario logado mostrar Home*/}
        <Stack.Navigator initialRouteName="Login"   screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="TermoUso" component={TermoUso}/>
            <Stack.Screen name="Home" component={DrowerRoutes} />
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Package" component={Package}/>
            <Stack.Screen name="TravelInfo" component={TravelInfo}/>
            <Stack.Screen name="Payment" component={Payment}/>
            <Stack.Screen name="ResumoCompra" component={ResumoCompra}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default  AppNavigator;