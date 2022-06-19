import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import LoginScreen from "../screens/login/Login.screen";
import HomeScreen from "../screens/home/Index.screen";
import {RegisterScreen} from "../screens/register/Register.screen";
import ResetPasswordScreen from "../screens/login/reset-password/ResetPassword.screen";
import TravelPackageScreen from "../screens/travelPackage/TravelPackage.screen";
import UseTermScreen from "../screens/use-term-screen/UseTerm.screen";
import TravelPackageInfoScreen from '../screens/travel-package-travelers-info/TravelPackageInfo.screen';
import PaymentScreen from '../screens/payment/Payment.screen';
import PurchaseDetailsScreen from '../screens/resume-purchase/PurchaseDetails.screen';
import UserTravelsScreen from '../screens/user-travels/UserTravels.screen';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../drawer/DrowerContent"
import TravelDetailsScreen from "../screens/user-travels/travel-details/TravelDetails.screen";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrowerRoutes() {
    return(
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="VoeJá" component={HomeScreen}/>
        </Drawer.Navigator>
    );
}

const AppNavigator = () => (
    <NavigationContainer>

        {/*Mudar no futuro, se usuario logado mostrar Home*/}
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="TermoUso" component={UseTermScreen}/>
            <Stack.Screen name="Home" component={DrowerRoutes} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Package" component={TravelPackageScreen}  />
            <Stack.Screen name="TravelDetails" component={TravelDetailsScreen}  />
            <Stack.Screen name="TravelInfo" component={TravelPackageInfoScreen}/>
            <Stack.Screen name="Payment" component={PaymentScreen}/>
            <Stack.Screen name="PurchaseDetailsScreen" component={PurchaseDetailsScreen}/>
            <Stack.Screen name="UserTravels" component={UserTravelsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default  AppNavigator;