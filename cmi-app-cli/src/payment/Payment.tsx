import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';
import {paymentForm} from './payment.form';
import {paymentStyle} from './payment.style';
import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';

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


const Payment = (props: ScreenProps) => {

    const goResumoViagem = () => {
        props.navigation.navigate("ResumoCompra")
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
                }}>Digite as informações do cartão de crédito que você
                    deseja usar para o pagamento</Text>
                <Formik initialValues={{
                    name: '',
                    cardNumber: '',
                    cpf: '',
                    mesCartao: '',
                    anoCartao: '',
                    cvcCartao: ''
                }}
                        onSubmit={values => goResumoViagem()}
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
                                keyboardType="numeric"
                                label="Número do cartão"
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
                                label="CPF"
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
export default Payment;