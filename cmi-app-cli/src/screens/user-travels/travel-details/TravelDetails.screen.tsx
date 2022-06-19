import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, FlatList, TouchableOpacity} from "react-native";
import {Button} from "react-native-paper";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {HeaderComponent} from "../../../components/header/Header.component";
import {theme} from "../../../../App.style";
import {travelDetailsStyle} from "./travelDetails.style";
import {RootSiblingParent} from 'react-native-root-siblings';
import ToastMessage from "../../../components/Toast/ToastMessage";
import axios from "axios";
import {GetUsuarioLogadoData} from "../../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import UserTravelsService from "../userTravels.service";
import {HOST_API_PASSAGEIRO} from "@env";


interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelDetailsScreen = (props: ScreenProps) => {
    const detalhesDaViagem = props.route.params.dadosDaViagem
    const idViagemCancelamento = props.route.params.idViagemParaCancelamento
    const listaDasViagens = props.route.params.listaDasViagens

    const cancelarViagem = async () => {


        try {
            await axios.put(HOST_API_PASSAGEIRO + '/passageiro/desativar', {idPassageiro: idViagemCancelamento})
            const values = await GetUsuarioLogadoData()
            const viagensUsuario = await UserTravelsService(values)
            let viagens = viagensUsuario.data.filter((r) => {
                if(!r.viagemCancelada) {
                    return r
                }
            })
            ToastMessage("Viagem Cancelada!")
            setTimeout(function () {
                props.navigation.navigate("UserTravels", {"listaViagensDoUsuario": viagens})
            }, 2000);

        }catch (e) {
            console.error('Erro ao cancelar viagem', e);
            props.navigation.navigate("Home")

        }
    }

    const PassageirosDaViagem = ({data}) => {

        return (
            <TouchableOpacity>
                <View>
                    <Text style={travelDetailsStyle.text}>{data}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <RootSiblingParent>

            <SafeAreaView>
                <HeaderComponent title="Detalhes Compra" navigation={props.navigation}/>
                <Image style={travelDetailsStyle.images} source={{uri: detalhesDaViagem.imagem}}/>
                <View style={travelDetailsStyle.content}>
                    <View style={travelDetailsStyle.titleAnPricePackageContent}>
                        <View>
                            <Text style={travelDetailsStyle.text}>Destino: {detalhesDaViagem.destino}</Text>
                            <Text style={travelDetailsStyle.text}>Data de Compra: {detalhesDaViagem.dataRefenciaSolicitacao}</Text>

                        </View>
                        <View style={{marginTop: 10, marginBottom: 10}}>
                            <Text style={travelDetailsStyle.text}>Período de vigência: </Text>
                            <Text style={travelDetailsStyle.text}>Data inicio: {detalhesDaViagem.dataInicio}</Text>
                            <Text style={travelDetailsStyle.text}>Data encerramento: {detalhesDaViagem.dataFim}</Text>
                        </View>
                        <View style={travelDetailsStyle.priceContent}>
                            <Text style={[travelDetailsStyle.text, travelDetailsStyle.textPrice]}> R$: {detalhesDaViagem.preco}</Text>
                            <Text style={travelDetailsStyle.text}>Preço final: </Text>
                        </View>

                    </View>
                    <View>
                        <Text style={travelDetailsStyle.text}>Você é passageiro? {detalhesDaViagem.usuarioLogado}</Text>
                    </View>
                    {detalhesDaViagem.quantidadePassageiro != 0 ?

                        <View>
                            <Text style={travelDetailsStyle.text}>Outros passageiros: </Text>
                            <View style={{marginLeft: 20}}>
                                <FlatList
                                    listKey="key3"
                                    data={detalhesDaViagem.listarPassageiros}
                                    renderItem={({item}) => (
                                        <PassageirosDaViagem data={item}/>
                                    )}
                                    keyExtractor={(item, index) => `_key${index.toString()}`}

                                />
                            </View>

                        </View>
                        :
                        <></>
                    }
                    <View>
                        <Button onPress={cancelarViagem} style={theme.deleteButton}><Text
                            style={[travelDetailsStyle.text, travelDetailsStyle.buttonText]}>Cancelar Viagem</Text></Button>
                    </View>
                </View>
            </SafeAreaView>
        </RootSiblingParent>

    );
}
export default TravelDetailsScreen;