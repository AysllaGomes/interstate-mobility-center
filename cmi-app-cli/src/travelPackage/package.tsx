import React, {useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import { useValidation } from 'react-native-form-validator';
import {HeaderComponent} from "../components/header/header.component";

interface LoginScreenProps {
    navigation: any,
    route: any
}

const Package = (props: LoginScreenProps) => {
const {data} = props.route.params;

    return(

    <SafeAreaView>
            <View>
            <HeaderComponent title="Register" navigation={props.navigation} page="Home"/>
                <Text>DADOS do PACKAGE</Text>
                <Text> {data.id}</Text>
                <Text> {data.title}</Text>
            </View>
        </SafeAreaView>
    );
}

export default Package;