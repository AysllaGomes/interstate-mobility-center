import React from 'react';
import {SafeAreaView, View, Text, Image} from "react-native";
import moment from 'moment';
import {Button} from "react-native-paper";
import {packageStyle} from "./package.style"
import {theme} from "../../../App.style";
import {HeaderComponent} from "../../components/header/Header.component";
import { MergeUsuarioLogadoData } from '../../../assets/DadosUsuarioLogado/DadosUsuarioLogado';
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelPackageScreen = (props: ScreenProps) => {
    const {data} = props.route.params;

    const goTravelInfo = async () => {

        await MergeUsuarioLogadoData({pacoteViagemEscolhido: data.id, ImagemPacoteViagemEscolhido: data.image})
        props.navigation.navigate("TravelInfo")

    }
    return (
        <SafeAreaView>
            <HeaderComponent title="Resumo do Pacote" navigation={props.navigation}/>
            <Image style={packageStyle.images} source={{uri: data.image}}/>
            <View style={packageStyle.content}>
                <Text style={[packageStyle.text, packageStyle.textTitle]}>{data.titulo}</Text>
                <View style={packageStyle.titleAnPricePackageContent}>
                    <View style={packageStyle.priceContent}>
                        <Text style={packageStyle.text}>Preço final</Text>
                        <Text style={[packageStyle.text, packageStyle.textPrice]}> R$: {data.preco}</Text>
                    </View>
                    <View style={packageStyle.datesTravelContent}>
                        <Text style={packageStyle.text}>Duração: {data.duracao} dias</Text>
                        <Text
                            style={packageStyle.text}> {moment(data.dataInicioVigencia).utc().format('DD/MM/YYYY -')}{moment(data.dataFimVigencia).utc().format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
                <View style={packageStyle.descriptionContent}>
                    <Text style={[packageStyle.text, {textAlign: "center"}]}> {data.descricao}</Text>
                </View>
                <Button onPress={goTravelInfo} style={theme.buttons}><Text
                    style={[packageStyle.text, packageStyle.buttonText]}>Informar Passageiros</Text></Button>
            </View>
        </SafeAreaView>
    );
}

export default TravelPackageScreen;