import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image} from "react-native";
import moment from 'moment';
import {Button} from "react-native-paper";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {MergeUsuarioLogadoData} from "../../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {HeaderComponent} from "../../../components/header/Header.component";
import {packageStyle} from "../../travelPackage/package.style";
import {theme} from "../../../../App.style";
import BuscarDetalhesViagem from "./travelDetails.service";


interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelDetailsScreen = (props: ScreenProps) => {
    const {data} = props.route.params;
    const [dadosViagem, setDadosViagem] = useState();

    const BuscaViagem = async () => {

        const dadosViagem = await BuscarDetalhesViagem(data.id, data.idViagem)
        setDadosViagem(dadosViagem)

    }
    useEffect(() => {
        BuscaViagem().then(r => r);
    }, [])
    return (
        <SafeAreaView>
            <HeaderComponent title="Detalhes Compra" navigation={props.navigation}/>
            <Image style={packageStyle.images} source={{uri: dadosViagem.image}}/>
            <View style={packageStyle.content}>
                <Text style={[packageStyle.text, packageStyle.textTitle]}>{dadosViagem.estadoDestino}</Text>
                <View style={packageStyle.titleAnPricePackageContent}>
                    <View style={packageStyle.priceContent}>
                        <Text style={packageStyle.text}>Preço final</Text>
                        <Text style={[packageStyle.text, packageStyle.textPrice]}> R$: {dadosViagem.preco}</Text>
                    </View>
                    <View style={packageStyle.datesTravelContent}>
                        <Text style={packageStyle.text}>Duração: {dadosViagem.duracao} dias</Text>
                        <Text
                            style={packageStyle.text}> {moment(dadosViagem.dataInicioVigencia).utc().format('DD/MM/YYYY -')}{moment(data.dataFimVigencia).utc().format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>

                <Button   style={theme.buttons}><Text
                    style={[packageStyle.text, packageStyle.buttonText]}>Cancelar Viagem</Text></Button>
            </View>
        </SafeAreaView>
    );
}

export default TravelDetailsScreen;