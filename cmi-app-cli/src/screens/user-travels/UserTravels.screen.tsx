import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../../components/header/Header.component';
import {Text} from "react-native-paper";
import {ScrollView} from "react-native-virtualized-view";

import BuscarDetalhesViagem from "./travel-details/travelDetails.service";
import {userTravelsStyle} from "./userTravels.style";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: any
}

const TravelList = ({data, navigation}) => {

    const toTravelPackage = async () => {
        try {
            const dadosViagemDoUsuario = await BuscarDetalhesViagem(data.idPassageiro)
            navigation.navigate("TravelDetails", {"dadosDaViagem": dadosViagemDoUsuario.data})

        }catch (error){
            console.error("Erro busca detalhes viagem do usuario", error)
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity onPress={() => toTravelPackage()}>
                    <View style={userTravelsStyle.packagesContent}>
                        <Image style={userTravelsStyle.images} source={{uri: data.imagem}}/>
                        <View style={userTravelsStyle.packagesContentInfo}>
                            <Text style={userTravelsStyle.packagesText}>Destino: {data.destino}</Text>
                            <Text style={userTravelsStyle.packagesText}>Período: {data.dataReferencia}</Text>

                        </View>
                        <View style={userTravelsStyle.packagesContentInfo}>
                            <Text style={userTravelsStyle.packagesText}>Preço: R$ {data.preco},00</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const UserTravelsScreen = (props: ScreenProps) => {
    // const [isLoaded, setIsLoaded] = useState(true);

    const listaViagensUsuario = props.route.params.listaViagensUsuario

    return (
        <ScrollView>
            <HeaderComponent title="Minhas viagens" navigation={props.navigation}/>
            <View>
                <View style={{marginBottom: 10}}/>
                <View style={userTravelsStyle.flatlist}>
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