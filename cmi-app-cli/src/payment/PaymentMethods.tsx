import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/Header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';
import {paymentForm} from './payment.form';
import {paymentStyle} from './payment.style';
import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';
import {GetUsuarioLogadoData, MergeUsuarioLogadoData} from '../../assets/DadosUsuarioLogado/DadosUsuarioLogado';

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


const PaymentMethods = (props: ScreenProps) => {

    const goResumoViagem = (values) => {
        try {
            MergeUsuarioLogadoData({DadosPagamento: values})
            props.navigation.navigate("ResumoCompra")

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
                    name: '',
                    cardNumber: '',
                    cpf: '',
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
                                onChangeText={(value) => setFieldValue('cardNumber', cardMask(value))}
                                onFocus={() => setFieldTouched('cardNumber')}
                                onBlur={handleBlur('cardNumber')}
                                value={values.cardNumber}
                            />

                            {
                                touched.cardNumber && errors.cardNumber ? <Animatable.Text
                                    style={{
                                        color: theme.colors.diplayErrorMessage,
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.cardNumber}
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
                                onChangeText={handleChange('name')}
                                onFocus={() => setFieldTouched('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {
                                touched.name && errors.name ? <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.name}
                                </Animatable.Text> : null
                            }

                            <TextInput
                                maxLength={14}
                                label="CPF do titular do cartao"
                                placeholder="000.000.000-00"
                                keyboardType="numeric"
                                onChangeText={(e) => setFieldValue('cpf', maskCPF(e))}
                                onFocus={() => setFieldTouched('cpf')}
                                onBlur={handleBlur('cpf')}
                                value={values.cpf}
                            />
                            {
                                touched.cpf && errors.cpf ? <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.cpf}
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
export default PaymentMethods;