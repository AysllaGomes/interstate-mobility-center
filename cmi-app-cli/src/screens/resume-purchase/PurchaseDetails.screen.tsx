import React, {useEffect, useState} from 'react';
import {BackHandler, Image, SafeAreaView, View} from 'react-native';
import {Appbar, Button} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {Text} from "react-native-paper";
import {theme} from '../../../App.style';
import {packageStyle} from "../travelPackage/package.style";
import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {registerStyle} from "../register/register.style";
import {travelDetailsStyle} from "../user-travels/travel-details/travelDetails.style";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
    header: null,
    headerShown: false
}
const ResumoHeaderComponent = (props) => {
    const signUp = () => props.navigation.navigate("Home")
    return (
        <Appbar>
            <Appbar.BackAction onPress={() => {
                signUp()
            }}/>
            <Appbar.Content title={props.title}/>
        </Appbar>
    )
}

const PurchaseDetailsScreen = (props: ScreenProps) => {
    const [dadosUsuario, setDadosUsuario] = useState({})
    const dadosDaCompra = props.route.params.dadosDaCompra

    console.log('dadosDaCompra', dadosDaCompra);

    // const displayData = async ()=>{
    //     try{
    //         const dados = await GetUsuarioLogadoData()
    //         return dados
    //     }
    //     catch(error){
    //         console.error("Erro async, detalhe do pacote")
    //     }
    // }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    // useEffect(() => {
    //     displayData().then(r => setDadosUsuario(r))
    // })


    const goHome = () => {
        props.navigation.navigate("Home")
    }

    return (
        <SafeAreaView>
            <ResumoHeaderComponent title="Resumo Compra" navigation={props.navigation}/>
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 38}}>Parabéns !</Text>
                <Text style={{fontFamily: theme.fontFamily.fontFamily, textAlign: "center", marginTop: 20, fontSize: 18}}>Compra realizada com sucesso :)</Text>
            </View>
            {/*<Image style={packageStyle.images} source={{uri: dadosDaCompra.ImagemPacoteViagemEscolhido}}/>*/}

            {/*<View style={travelDetailsStyle.titleAnPricePackageContent}>*/}
            {/*    <View>*/}
            {/*        <Text style={travelDetailsStyle.text}>Destino: {listaViagensUsuario.destino}</Text>*/}
            {/*        <Text style={travelDetailsStyle.text}>Data de Compra: {listaViagensUsuario.dataRefenciaSolicitacao}</Text>*/}

            {/*    </View>*/}
            {/*    <View style={{marginTop: 10, marginBottom: 10}}>*/}
            {/*        <Text style={travelDetailsStyle.text}>Período de vigência: </Text>*/}
            {/*        <Text style={travelDetailsStyle.text}>Data inicio: {listaViagensUsuario.dataInicio}</Text>*/}
            {/*        <Text style={travelDetailsStyle.text}>Data encerramento: {listaViagensUsuario.dataFim}</Text>*/}
            {/*    </View>*/}
            {/*    <View style={travelDetailsStyle.priceContent}>*/}
            {/*        <Text style={[travelDetailsStyle.text, travelDetailsStyle.textPrice]}> R$: {listaViagensUsuario.preco}</Text>*/}
            {/*        <Text style={travelDetailsStyle.text}>Preço final: </Text>*/}
            {/*    </View>*/}

            {/*</View>*/}
            {/*<View>*/}

            {/*<Text>{}</Text>*/}


            <View style={{
            }}>
                <View style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom: -370,
                    left: 10,
                    width: 370,
                    flex: 1,

                    marginRight: 22
                }}>
                    <Button onPress={goHome} mode="contained" style={registerStyle.button} >Home</Button>
                </View>

            </View>




        </SafeAreaView>
    )
}

export default PurchaseDetailsScreen;