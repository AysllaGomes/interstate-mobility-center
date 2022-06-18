import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image} from "react-native";
import {Button} from "react-native-paper";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {HeaderComponent} from "../../../components/header/Header.component";
import {theme} from "../../../../App.style";
import {travelDetailsStyle} from "./travelDetails.style";


interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelDetailsScreen = (props: ScreenProps) => {
    const listaViagensUsuario = props.route.params.dadosDaViagem

    const canclearViagem = async () => {
        // do
    }

    return (
        <SafeAreaView>
            <HeaderComponent title="Detalhes Compra" navigation={props.navigation}/>
            <Image style={travelDetailsStyle.images} source={{uri: listaViagensUsuario.imagem}}/>
            <View style={travelDetailsStyle.content}>
                <View style={travelDetailsStyle.titleAnPricePackageContent}>
                    <View>
                        <Text style={travelDetailsStyle.text}>Destino: {listaViagensUsuario.destino}</Text>
                        <Text style={travelDetailsStyle.text}>Data: {listaViagensUsuario.dataRefencia}</Text>
                    </View>
                    <View style={travelDetailsStyle.priceContent}>
                        <Text style={[travelDetailsStyle.text, travelDetailsStyle.textPrice]}> R$: {listaViagensUsuario.preco}</Text>
                        <Text style={travelDetailsStyle.text}>Preço final: </Text>
                    </View>
                 </View>
                <Button  onPress={canclearViagem} style={theme.buttons}><Text
                    style={[travelDetailsStyle.text, travelDetailsStyle.buttonText]}>Cancelar Viagem</Text></Button>
            </View>
        </SafeAreaView>
    );
}

export default TravelDetailsScreen;