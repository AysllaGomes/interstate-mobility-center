import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/Header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';

import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
}

const PurchaseDetails = (props: ScreenProps) => {

    const goHome = () => {
        props.navigation.navigate("Home")
    }

    return (
        <SafeAreaView>
            <HeaderComponent title="Resumo compra" navigation={props.navigation}/>
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 38}}>Parabéns !</Text>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 18}}>Compra realizada com sucesso :)</Text>


            <Button onPress={goHome} mode="contained" >Home</Button>
            </View>
        </SafeAreaView>
    )
}

export default PurchaseDetails;