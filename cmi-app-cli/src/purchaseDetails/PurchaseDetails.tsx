import React, {useEffect, useState} from 'react';
import {BackHandler, Image, SafeAreaView, ScrollView, View} from 'react-native';
import {Appbar, Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
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
const ResumoHeaderComponent = (props) => {
    const signUp = () => props.navigation.navigate("Home")
    return (
        <Appbar>
            <Appbar.BackAction onPress={() => {
                signUp()
            }}/>
            <Appbar.Content title={props.title}/>
        </Appbar>
    )
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
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        displayData().then(r => setDadosUsuario(r))
    })

    const goHome = () => {
        props.navigation.navigate("Home")
            }

    return (
        <SafeAreaView>
            <ResumoHeaderComponent title="Resumo Compra" navigation={props.navigation}/>
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