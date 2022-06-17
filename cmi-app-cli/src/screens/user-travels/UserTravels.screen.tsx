import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../../components/header/Header.component';
import {Text} from "react-native-paper";
import {MergeUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {indexStyle} from "../home/index.style";
import {ScrollView} from "react-native-virtualized-view";
import moment from "moment";
import axios from "axios";
import UserTravels from "./userTravels.service";
import BuscarDetalhesViagem from "./travel-details/travelDetails.service";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: any
}


const TravelList = ({data, navigation}) => {

    const toTravelPackage = async () => {
        try {
            const dadosViagemDoUsuario = await BuscarDetalhesViagem(data.idPassageiro)

            console.log('dadosViagemDoUsuario', dadosViagemDoUsuario.data);

            navigation.navigate("TravelDetails", {"dadosDaViagem": dadosViagemDoUsuario.data})

        }catch (error){
            console.error("Erro busca detalhes viagem do usuario", error)
    }
}
    return (
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <View style={indexStyle.packagesContent}>
                <Image style={indexStyle.images} source={{uri: data.imagem}}/>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Destino: {data.destino}</Text>
                </View>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Período: {data.dataReferencia}</Text>
                    <Text style={indexStyle.packagesText}>R$ {data.preco},00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const UserTravelsScreen = (props: ScreenProps) => {
    const [minhaLista, setMinhaLista] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const listaViagensUsuario = props.route.params.listaViagensUsuario

    return (
            <ScrollView>
                <HeaderComponent title="Minhas viagens" navigation={props.navigation}/>
                <View>
                <Text>My travels</Text>
                <View style={indexStyle.flatlist}>
                    <FlatList
                        listKey="key1"
                        data={listaViagensUsuario}
                        renderItem={({item}) => (
                            <TravelList navigation={props.navigation} data={item}/>

                        )}
                        keyExtractor={(item, index) => `_key${index.toString()}`}/>
                </View>
            </View>

        </ScrollView>
    )
}
export default UserTravelsScreen;