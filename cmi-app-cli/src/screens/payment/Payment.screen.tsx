import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import registrarViagem from './payment.service'
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../../components/header/Header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';
import {paymentForm} from './payment.form';
import {paymentStyle} from './payment.style';
import {theme} from '../../../App.style';
import * as Animatable from 'react-native-animatable';
import {GetUsuarioLogadoData, MergeUsuarioLogadoData} from '../../../assets/DadosUsuarioLogado/DadosUsuarioLogado';
import moment from "moment";
import BuscarDetalhesViagem from "../user-travels/travel-details/travelDetails.service";
import UserTravelsService from "../user-travels/userTravels.service";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
}

const maskCPF = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};


const cardMask = (value) => {
    return value.replace(/\D/g, "")
}
const dateMask = (value) => {
    return value.replace(/\D/g, "")
}
// limitar tamanho para 3
const cvcMask = (value) => {
    return value.replace(/\D/g, "")
}


const PaymentScreen = (props: ScreenProps) => {

    const goResumoViagem = async (DadosPagamento) => {
        try {
            //await MergeUsuarioLogadoData({DadosPagamento: values})
            // Modifica na memória primeiro depois envia tudo no merge

            let dadosArmazenados = await GetUsuarioLogadoData()
            dadosArmazenados.DadosPagamento = DadosPagamento

            dadosArmazenados.passageiros =  dadosArmazenados.passageiros.map(x => {
                const dateFormat = 'DD/MM/YYYY'
                x.cpf = x.cpf.replace(/[.-]/g, '')
                x.numeroTelefoneCelular = x.numeroTelefoneCelular.replace(/[() -]/g, '')
                x.dataDeNascimento = moment(x.dataDeNascimento, dateFormat).format('YYYY-MM-DD')
                return x
            })
            dadosArmazenados.DadosPagamento.cpfTitular = dadosArmazenados.DadosPagamento.cpfTitular.replace(/[.-]/g, '')

            await registrarViagem(dadosArmazenados)

            // await MergeUsuarioLogadoData(dadosArmazenados)

            // Executa service para cadastro da viagem
//

            props.navigation.navigate("PurchaseDetailsScreen")
            // let dadosDaCompraDoUsuario = await GetUsuarioLogadoData()
            // const idViagem = await UserTravelsService(dadosDaCompraDoUsuario.idUsuario)
            // const dadosCompraEmBanco = await BuscarDetalhesViagem(idViagem.idPassageiro)
            // props.navigation.navigate("PurchaseDetailsScreen", {"dadosDaCompra": dadosCompraEmBanco})


        }catch(error){

        }
    }

    return (
        <SafeAreaView>
            <HeaderComponent title="Pagamento" navigation={props.navigation}/>
            <View style={paymentStyle.content}>
                <Text style={{
                    ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                        textAlign: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: 18
                    }
                }}>Digite as informações do cartão de crédito VISA que você
                    deseja usar para o pagamento</Text>
                <Formik initialValues={{
                    nomeTitularCartao: '',
                    numeroCartao: '',
                    cpfTitular: '',
                    mesCartao: '',
                    anoCartao: '',
                    cvcCartao: ''
                }}
                        onSubmit={values => goResumoViagem(values)}
                        validationSchema={paymentForm}>
                    {({
                          handleSubmit,
                          handleChange,
                          touched,
                          setFieldTouched,
                          setFieldValue,
                          handleBlur,
                          errors,
                          values
                      }) => (

                        <View>
                            <TextInput
                                maxLength={16}
                                keyboardType="numeric"
                                label="Número do Cartão"
                                placeholder="0000 0000 0000"
                                onChangeText={(value) => setFieldValue('numeroCartao', cardMask(value))}
                                onFocus={() => setFieldTouched('numeroCartao')}
                                onBlur={handleBlur('numeroCartao')}
                                value={values.numeroCartao}
                            />

                            {
                                touched.numeroCartao && errors.numeroCartao ? <Animatable.Text
                                    style={{
                                        color: theme.colors.diplayErrorMessage,
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.numeroCartao}
                                </Animatable.Text> : null
                            }

                            <View style={{display: "flex", flexDirection: "row"}}>
                                <View style={{flex: 1, paddingRight: 20}}>
                                    <TextInput
                                        maxLength={2}
                                        placeholder="MM"
                                        keyboardType="numeric"
                                        onChangeText={(value) => setFieldValue('mesCartao', dateMask(value))}
                                        onFocus={() => setFieldTouched('mesCartao')}
                                        onBlur={handleBlur('mesCartao')}
                                        value={values.mesCartao}
                                    />
                                    {
                                        touched.mesCartao && errors.mesCartao ? <Animatable.Text
                                            style={{
                                                color: theme.colors.diplayErrorMessage,
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                            animation="shake"
                                            duration={500}
                                            easing={"linear"}>
                                            {errors.mesCartao}
                                        </Animatable.Text> : null
                                    }
                                </View>
                                <View style={{flex: 1, paddingRight: 20}}>
                                    <TextInput
                                        maxLength={2}
                                        placeholder="AA"
                                        keyboardType="numeric"
                                        onChangeText={(value) => setFieldValue('anoCartao', dateMask(value))}
                                        onFocus={() => setFieldTouched('anoCartao')}
                                        onBlur={handleBlur('anoCartao')}
                                        value={values.anoCartao}
                                    />
                                    {
                                        touched.anoCartao && errors.anoCartao ? <Animatable.Text
                                            style={{
                                                color: theme.colors.diplayErrorMessage,
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                            animation="shake"
                                            duration={500}
                                            easing={"linear"}>
                                            {errors.anoCartao}
                                        </Animatable.Text> : null
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                    <TextInput
                                        maxLength={3}
                                        placeholder="CVC"
                                        keyboardType="numeric"
                                        onChangeText={(value) => setFieldValue('cvcCartao', cvcMask(value))}
                                        onFocus={() => setFieldTouched('cvcCartao')}
                                        onBlur={handleBlur('cvcCartao')}
                                        value={values.cvcCartao}
                                    />
                                    {
                                        touched.cvcCartao && errors.cvcCartao ? <Animatable.Text
                                            style={{
                                                color: theme.colors.diplayErrorMessage,
                                                display: "flex",
                                                flexDirection: "row"
                                            }}
                                            animation="shake"
                                            duration={500}
                                            easing={"linear"}>
                                            {errors.cvcCartao}
                                        </Animatable.Text> : null
                                    }
                                </View>
                            </View>

                            <TextInput
                                label="Nome no cartão"
                                onChangeText={handleChange('nomeTitularCartao')}
                                onFocus={() => setFieldTouched('nomeTitularCartao')}
                                onBlur={handleBlur('nomeTitularCartao')}
                                value={values.nomeTitularCartao}
                            />
                            {
                                touched.nomeTitularCartao && errors.nomeTitularCartao ? <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.nomeTitularCartao}
                                </Animatable.Text> : null
                            }

                            <TextInput
                                maxLength={14}
                                label="CPF do titular do cartao"
                                placeholder="000.000.000-00"
                                keyboardType="numeric"
                                onChangeText={(e) => setFieldValue('cpfTitular', maskCPF(e))}
                                onFocus={() => setFieldTouched('cpfTitular')}
                                onBlur={handleBlur('cpfTitular')}
                                value={values.cpfTitular}
                            />
                            {
                                touched.cpfTitular && errors.cpfTitular ? <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.cpfTitular}
                                </Animatable.Text> : null
                            }

                            <Button onPress={handleSubmit} mode="contained"
                                    style={{...theme.buttons, ...{marginTop: 20}}}><Text
                                style={{
                                    color: theme.buttons.color,
                                    fontFamily: theme.fontFamily.fontFamily,
                                    fontSize: 18
                                }}>Realizar compra</Text></Button>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}
export default PaymentScreen;