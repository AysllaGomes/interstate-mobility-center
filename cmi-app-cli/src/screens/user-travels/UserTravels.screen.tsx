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

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelList = ({data, navigation}) => {

    const toTravelPackage = () => MergeUsuarioLogadoData({idViagem: data._id}).then(
        navigation.navigate("TravelDetails", {data: data})
    )
    return (
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <View style={indexStyle.packagesContent}>
                <Image style={indexStyle.images} source={{uri: data.image}}/>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Origem: {data.estadoOrigem}</Text>
                    <Text style={indexStyle.packagesText}>Destino: {data.estadoDestino}</Text>
                </View>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Período: {data.duracao} dias</Text>
                    <Text style={indexStyle.packagesText}>R$ {data.preco},00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const UserTravelsScreen = (props: ScreenProps) => {
    const [minhaLista, setMinhaLista] = useState();
    const [isLoaded, setIsLoaded] = useState(true);

    const listaPacotes = async () => {

        try {
            let res = await UserTravels()
            setMinhaLista(res.data)
            setIsLoaded(false)
        } catch (error) {
            return console.error('Erro carregar viagens!')
        }
    }
    useEffect(() => {
        listaPacotes().then(r => r);
    }, [])

    return (
        <><HeaderComponent title="Minhas viagens" navigation={props.navigation}/><ScrollView>


            <View>
                <Text>My travels</Text>
                <View style={indexStyle.flatlist}>
                    <FlatList
                        listKey="key1"
                        data={minhaLista}
                        renderItem={({item}) => (
                            <TravelList navigation={props.navigation} data={item}/>

                        )}
                        keyExtractor={(item, index) => `_key${index.toString()}`}/>
                </View>
            </View>

        </ScrollView></>
    )
}
export default UserTravelsScreen;