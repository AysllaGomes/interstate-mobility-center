import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, FlatList, TouchableOpacity} from "react-native";
import {Button} from "react-native-paper";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import {HeaderComponent} from "../../../components/header/Header.component";
import {theme} from "../../../../App.style";
import {travelDetailsStyle} from "./travelDetails.style";
import TravelListComponent from "../../../components/travel-list/TravelListComponent";
import {MergeUsuarioLogadoData} from "../../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {indexStyle} from "../../home/index.style";


interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}

const TravelDetailsScreen = (props: ScreenProps) => {
    const listaViagensUsuario = props.route.params.dadosDaViagem

    const canclearViagem = async () => {
        // do
    }


    const PassageirosDaViavem = ({data}) => {

        return (
            <TouchableOpacity>


                    <View>
                        <Text style={travelDetailsStyle.text}>{data}</Text>
                    </View>


            </TouchableOpacity>
        );
    }


    return (
        <SafeAreaView>
            <HeaderComponent title="Detalhes Compra" navigation={props.navigation}/>
            <Image style={travelDetailsStyle.images} source={{uri: listaViagensUsuario.imagem}}/>
            <View style={travelDetailsStyle.content}>
                <View style={travelDetailsStyle.titleAnPricePackageContent}>
                    <View>
                        <Text style={travelDetailsStyle.text}>Destino: {listaViagensUsuario.destino}</Text>
                        <Text style={travelDetailsStyle.text}>Data de Compra: {listaViagensUsuario.dataRefenciaSolicitacao}</Text>

                    </View>
                    <View style={{marginTop: 10, marginBottom: 10}}>
                        <Text style={travelDetailsStyle.text}>Período de vigência: </Text>
                        <Text style={travelDetailsStyle.text}>Data inicio: {listaViagensUsuario.dataInicio}</Text>
                        <Text style={travelDetailsStyle.text}>Data encerramento: {listaViagensUsuario.dataFim}</Text>
                    </View>
                    <View style={travelDetailsStyle.priceContent}>
                        <Text style={[travelDetailsStyle.text, travelDetailsStyle.textPrice]}> R$: {listaViagensUsuario.preco}</Text>
                        <Text style={travelDetailsStyle.text}>Preço final: </Text>
                    </View>

                 </View>
                <View>
                    <Text style={travelDetailsStyle.text}>Você é passageiro? {listaViagensUsuario.usuarioLogado}</Text>
                </View>
                {listaViagensUsuario.quantidadePassageiro != 0 ?

                    <View>
                        <Text style={travelDetailsStyle.text}>Outros passageiros: </Text>
                        <View style={{marginLeft: 20}}>
                            <FlatList
                                listKey="key3"
                                data={listaViagensUsuario.listarPassageiros}
                                renderItem={({item}) => (
                                    <PassageirosDaViavem data={item}/>
                                )}
                                keyExtractor={(item, index) => `_key${index.toString()}`}

                            />
                        </View>

                    </View>
                    :
                    <></>
                }
                <View>
                    <Button onPress={canclearViagem} style={theme.deleteButton}><Text
                        style={[travelDetailsStyle.text, travelDetailsStyle.buttonText]}>Cancelar Viagem</Text></Button>
                </View>

            </View>
        </SafeAreaView>
    );
}
export default TravelDetailsScreen;