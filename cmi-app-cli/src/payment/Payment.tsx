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



const Payment = (props: ScreenProps) => {

    const resumoViagem = () => {
        props.navigation.navigate("ResumoCompra")

    }
    return (
        <SafeAreaView>
            <HeaderComponent title="Pagamento" navigation={props.navigation}/>
            <ScrollView>
                <Text>Payment </Text>
                <Formik initialValues={{
                    name: '',
                    email: '',
                    cardNumber: '',
                    cpf: ''
                }}
                        onSubmit={values => resumoViagem()}
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

                        <View style={paymentStyle.content}>

                            <TextInput
                                label="Número do cartão"
                                onChangeText={handleChange('cardNumber')}
                                onFocus={() => setFieldTouched('cardNumber')}
                                onBlur={handleBlur('cardNumber')}
                                value={values.cardNumber}
                            />



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
                                touched.cpf && errors.cpf ?       <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.cpf}
                                </Animatable.Text> : null
                            }

                            <TextInput
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={handleChange('email')}
                                onFocus={() => setFieldTouched('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {
                                touched.email && errors.email ?       <Animatable.Text
                                    style={{color: theme.colors.diplayErrorMessage}}
                                    animation="shake"
                                    duration={500}
                                    easing={"linear"}>
                                    {errors.email}
                                </Animatable.Text> : null
                            }
                            <Button onPress={handleSubmit} mode="contained"
                           >Realizar compra</Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>

    )
}
export default Payment;