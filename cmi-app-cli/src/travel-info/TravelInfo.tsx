import React, {useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView} from "react-native";
import {HeaderComponent} from "../components/header/header.component";
import {theme} from "../../App.style";

interface LoginScreenProps {
    navigation: any,
    route: any
}

const TravelInfo = (props: LoginScreenProps) => {
    // const goTravelInfo = () => {
    //     props.navigation.navigate("Home")
    // }

    return (
        <SafeAreaView>
            <HeaderComponent title="Informações da Viagem" navigation={props.navigation} page="Home"/>
            <Text>Digite as informações do usuário que irá realizar a viagem</Text>
        </SafeAreaView>
    )
}

export default TravelInfo;