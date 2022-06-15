import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-paper";
import {Root} from 'popup-ui'
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import CheckBox from 'expo-checkbox';
import {useFonts, GermaniaOne_400Regular} from '@expo-google-fonts/germania-one';
import AppLoading from "expo-app-loading"
import {theme} from '../../App.style';
import * as Device from 'expo-device';
import {HeaderComponent} from '../components/header/Header.component';

interface LoginScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TermoUso = (props: LoginScreenProps, route) => {
    const {emailUsuario} = props.route.params;

    const goHome = () => props.navigation.navigate("Home") && assinarTermoDeUso()
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [termoUso, setTermoUso] = useState("")

    //Change Button Opacity hehe
    const [buttonOpacity, setButtonOpacity] = useState(1)
    useEffect(() => {
        const changeButton = () => {
            if (toggleCheckBox == false) {
                setButtonOpacity(.8)
            } else
                setButtonOpacity(1)
        }
        changeButton()
    })
    // - end

    useEffect(() => {
        const exibirTermoDeUso = async () => {
            const urlBase = "http://192.168.0.107:3008"
            try {
                let res = await axios.post(urlBase + "/termoDeUso/verificaSituacaoVigencia")
                setTermoUso(res.data.conteudo)
            } catch (error) {
                return error.response
            }
        }
        exibirTermoDeUso().then(res => res)
    }, []);

    const buscarIDUsuarioPorEmail = async () => {
        const urlBase = "http://192.168.0.107:3001"
        try {
            let res = await axios.post(urlBase + "/usuario/detalhar", {"email": emailUsuario})
            return res.data._id
        } catch (error) {
            return error.response
        }
    }
    const deviceInfo = {
        versaoDoApp: require("../../package.json"),
        os: Device.osName,
        "os-version": Device.osVersion,
        model: Device.modelName,
        brand: Device.brand
    }

    const assinarTermoDeUso = async () => {
        let idUsuario = await buscarIDUsuarioPorEmail();
        const urlBase = "http://192.168.0.107:3001"
        try {
            await axios.post(urlBase + "/usuario/assinaturaTermoDeUso", {"idUsuario": idUsuario}, {headers: deviceInfo})
        } catch (error) {
            return error.response
        }
    }
    return (
        <Root>
            <SafeAreaView>
                <HeaderComponent title="Termo de Uso" navigation={props.navigation}/>
                <ScrollView>
                    <View style={styles.container}>

                        <Text style={styles.title}>Termos e condições gerais de uso do APP</Text>
                        <View><Text style={styles.termo}>{termoUso}</Text></View>

                        <View style={styles.checkbox}>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                            <Text style={styles.text} onPress={() => setToggleCheckBox(!toggleCheckBox)}>Concorda com o termo?</Text>
                        </View>
                        <Button disabled={!toggleCheckBox} style={{...styles.button, ...{opacity: buttonOpacity}}}
                                onPress={() => assinarTermoDeUso() && goHome()}><Text
                            style={styles.buttonText}>Concordar</Text></Button>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Root>
    );
}
export default TermoUso;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 10
    },
    title: {
        fontFamily: theme.fontFamily.fontFamily,
        color: theme.colors.primary,
        textAlign: "center",
        fontSize: 18,
        marginBottom: 10
    },
    button: {
        backgroundColor: theme.colors.primary,
        margin: 10,
        marginBottom: 50,
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonText: {
        fontFamily: theme.fontFamily.fontFamily,
        color: "white"
    },
    termo: {
        padding: 10,
        color: '#060A15',
        fontFamily: theme.fontFamily.fontFamily,

    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontFamily: theme.fontFamily.fontFamily,
    },
    text: {
        fontFamily: theme.fontFamily.fontFamily,

    }
});
