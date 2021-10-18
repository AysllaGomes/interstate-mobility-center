import React, {} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-paper";
import {Root} from 'popup-ui'
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";

interface LoginScreenProps {
    navigation: NativeStackNavigatorProps;
}

const TermoUso = (props: LoginScreenProps) => {
    const goHome = () => props.navigation.navigate("Home")
    const exibirTermoDeUso = async () => {
        const urlBase = "http://192.168.0.107:3008"
        try {
            let res = await axios.post(urlBase + "/termoDeUso/verificaSituacaoVigencia")
            return res.data.conteudo;
        } catch (error) {
            return error.response
        }
    }

    return (
        <Root>
            <SafeAreaView>
                <View>
                    <Text>TERMO DE USO !</Text>
                    <Button onPress={goHome}>HOME</Button>



                </View>
            </SafeAreaView>
        </Root>
    );
}
export default TermoUso;
