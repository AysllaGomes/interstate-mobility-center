import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image} from "react-native";
import {Button} from "react-native-paper";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {HeaderComponent} from "../../../components/header/Header.component";
import {packageStyle} from "../../travelPackage/package.style";
import {theme} from "../../../../App.style";


interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelDetailsScreen = (props: ScreenProps) => {
    const listaViagensUsuario = props.route.params.dadosDaViagem

    return (
        <SafeAreaView>
            <HeaderComponent title="Detalhes Compra" navigation={props.navigation}/>
            <Image style={packageStyle.images} source={{uri: listaViagensUsuario.imagem}}/>

            <View style={packageStyle.content}>
                <View style={packageStyle.titleAnPricePackageContent}>
                    <View style={packageStyle.priceContent}>
                        <Text style={packageStyle.text}>Destino: {listaViagensUsuario.destino}</Text>
                        <Text style={packageStyle.text}>Preço final</Text>
                        <Text style={[packageStyle.text, packageStyle.textPrice]}> R$: {listaViagensUsuario.preco}</Text>
                    </View>
                    <View style={packageStyle.datesTravelContent}>
                        <Text style={packageStyle.text}>Data: {listaViagensUsuario.dataRefencia}</Text>

                    </View>
                </View>

                <Button   style={theme.buttons}><Text
                    style={[packageStyle.text, packageStyle.buttonText]}>Cancelar Viagem</Text></Button>
            </View>
        </SafeAreaView>
    );
}

export default TravelDetailsScreen;