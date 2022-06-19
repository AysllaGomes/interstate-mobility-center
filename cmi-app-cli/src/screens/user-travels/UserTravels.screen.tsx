import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../../components/header/Header.component';
import {Text} from "react-native-paper";
import {ScrollView} from "react-native-virtualized-view";
import BuscarDetalhesViagem from "./travel-details/travelDetails.service";
import {userTravelsStyle} from "./userTravels.style";
import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import UserTravelsService from "./userTravels.service";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: any
}

const TravelList = ({data, navigation}) => {

    const toTravelPackage = async () => {
        try {
            const dadosViagemDoUsuario = await BuscarDetalhesViagem(data.idPassageiro)

            navigation.navigate("TravelDetails", {"dadosDaViagem": dadosViagemDoUsuario.data, "idViagemParaCancelamento": data.idPassageiro, "listaDasViagens": data})

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
                            <Text style={userTravelsStyle.packagesText}>Data de Compra: {data.dataReferencia}</Text>

                        </View>
                        <View style={userTravelsStyle.packagesContentInfo}>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const UserTravelsScreen = (props: ScreenProps) => {
    // const [isLoaded, setIsLoaded] = useState(true);
    // const  [listaViagensUsuario, setListaViagensUsuario] = useState([])

    const listaViagensUsuario = props.route.params.listaViagensDoUsuario


        // async function buscarViagens() {
    //     const values = await GetUsuarioLogadoData()
    //     let viagensUsuario = await UserTravelsService(values)
    //
    //     viagensUsuario = viagensUsuario.data.filter((r) => {
    //         if(!r.viagemCancelada) {
    //             return r
    //         }
    //     })
    //     setListaViagensUsuario(viagensUsuario)
    //     console.log('listaViagensUsuario', listaViagensUsuario);
    // }
    //
    // useEffect(() => {
    //     buscarViagens().then(r => r);
    // }, [])

    return (
        <ScrollView>
            <HeaderComponent title="Minhas viagens" navigation={props.navigation}/>
            <View>
                <View style={{marginBottom: 10}}/>
                <View style={userTravelsStyle.flatlist}>
                    {listaViagensUsuario.length == 0 ? <Text style={userTravelsStyle.textSemviagens}>Você não possui viagens!</Text>: <></>}
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