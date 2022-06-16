import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/Header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';

import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';
import {packageStyle} from "../travelPackage/package.style";
import {GetUsuarioLogadoData} from "../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {StackNavigationOptions} from "@react-navigation/stack";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
    header: null,
    headerShown: false
}

const PurchaseDetails = (props: ScreenProps) => {
    const [dadosUsuario, setDadosUsuario] = useState({})

    const displayData = async ()=>{
        try{
            const dados = await GetUsuarioLogadoData()
            return dados
        }
        catch(error){
            console.error("Erro async, detalhe do pacote")
        }
    }
    useEffect(() => {
        displayData().then(r => setDadosUsuario(r))
    })

    const goHome = () => {
        props.navigation.navigate("Home")
            }

    return (
        <SafeAreaView>
            <HeaderComponent title="Resumo compra" navigation={props.navigation}/>
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 38}}>Parabéns !</Text>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 18}}>Compra realizada com sucesso :)</Text>
            </View>
            <Image style={packageStyle.images} source={{uri: dadosUsuario["ImagemPacoteViagemEscolhido"]}}/>
            <Button onPress={goHome} mode="contained" >Home</Button>


        </SafeAreaView>
    )
}

export default PurchaseDetails;