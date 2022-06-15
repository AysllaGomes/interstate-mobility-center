import React, {useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {useValidation} from 'react-native-form-validator';
import {HeaderComponent} from "../components/header/Header.component";
import {packageStyle} from "./package.style"
import {theme} from "../../App.style";
import moment from 'moment';
import { DadosUsuarioLogado, GetUsuarioLogadoData, MergeUsuarioLogadoData } from '../../assets/DadosUsuarioLogado/DadosUsuarioLogado';

interface ScreenProps {
    navigation: any,
    route: any
}

const Package = (props: ScreenProps) => {
    const {data} = props.route.params;

    const goTravelInfo = async () => {
       
        MergeUsuarioLogadoData({pacoteViagemEscolhido: data.id, ImagemPacoteViagemEscolhido: data.image})
        GetUsuarioLogadoData().then(
            x => console.log(x)
        )
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

export default Package;