import React, {useState} from "react";
import {Button, TextInput} from "react-native-paper";
import {Keyboard, SafeAreaView, ScrollView, Text, View} from "react-native";
import {registerStyle} from "./register.style";
import {HeaderComponent} from "../components/header/Header.component";
import firebase from "../firebase/firebaseconfig";
import createUser from "./register.service";
import {Formik} from 'formik';
import {registerForm} from "./register.form";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import {DadosUsuarioLogado} from "../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {RootSiblingParent} from 'react-native-root-siblings';
import {theme} from "../../App.style";
import ToastMessage from "../components/Toast/ToastMessage"
import * as Animatable from 'react-native-animatable';

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
}

export const RegisterScreen = (props: ScreenProps) => {
    const RegisterWithFirebase = (email: string, password: string) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user;
            })
            .catch((error) => {
                console.error(`
                    ERRO no APP, método "RegisterWithFirebase".
                    <'ERRO EXTERNO'>
                      message:  Não foi possível salvar o usuário, na base do Firebase...
                      CODE: ${error.code}
                      MESSAGE RTN: ${error.message}
                    Parâmetros da requisição:
                      E-MAIL: ${email},
                      PSWD: ${password}
                `);
                return error.code;
            });

        return null;
    }

    const registerUser = async (values) => {
        let errorMongo = await createUser(values)
        let errorMessage = "Algo muito errado aconteceu ;("
        //Toast mensagens de erro

        if (errorMongo.status != 200) {
            return ToastMessage(errorMongo.data.message)
        }
        let errorFirebase = RegisterWithFirebase(values.email, values.password)
        if (errorFirebase != null) {
            return console.error("Error with Firebase Register")
        }
        props.navigation.navigate("TermoUso", {emailUsuario: values.email})
        //Guarda em memória - assets/
        DadosUsuarioLogado({email: values.email, idUsuario: errorMongo.data._id})

    }
//Funções icone Hide Password kkkk
    const [showPassword, setShowPassword] = useState({password: true, confPassword: true});
    const [passwordEyeType, setPasswordEyeType] = useState({
        eyePassword: "eye-off-outline",
        eyeConfPassword: "eye-off-outline"
    });

    const handleClickShowPassword = () => {
        setShowPassword({...showPassword, password: !showPassword.password});
        if (showPassword.password == false)
            setPasswordEyeType({...passwordEyeType, eyePassword: "eye-off-outline"})
        else {
            setPasswordEyeType({...passwordEyeType, eyePassword: "eye"})
        }
    }
    const handleClickShowConfPassword = () => {
        setShowPassword({...showPassword, confPassword: !showPassword.confPassword});
        if (showPassword.confPassword == false)
            setPasswordEyeType({...passwordEyeType, eyeConfPassword: "eye-off-outline"})
        else {
            setPasswordEyeType({...passwordEyeType, eyeConfPassword: "eye"})
        }
    }
    //Funções icone Hide Password kkkk -fim
    const maskDate = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d+?)$/, "$1");
    };
    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const maskPhone = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    const buscarIDUsuarioPoEmail = async (email: string) => {
        const urlBase = "http://192.168.0.107:3001"
        try {
            let res = await axios.post(urlBase + "/usuario/detalhar", {"email": email})
            return res.data._id
        } catch (error) {
            return error.response
        }
    }


    return (
        <RootSiblingParent>
            <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Cadastro" navigation={props.navigation}/>
                    <Formik initialValues={{
                        name: '',
                        email: '',
                        phoneNumber: '',
                        birthDate: '',
                        password: '',
                        ConfPassword: '',
                        cpf: ''
                    }}
                            onSubmit={values => registerUser(values)}
                            validationSchema={registerForm}>
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

                            <View style={registerStyle.content}>
                                <TextInput
                                    label="Nome Completo"
                                    onChangeText={handleChange('name')}
                                    onFocus={() => setFieldTouched('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {
                                    touched.name && errors.name ?  <Animatable.Text
                                        style={{color: theme.colors.diplayErrorMessage}}
                                        animation="shake"
                                        duration={500}
                                        easing={"linear"}>
                                        {errors.name}
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

                                <TextInput
                                    maxLength={14}
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
                                    maxLength={15}
                                    label="Celular"
                                    placeholder="(99) 99999-9999"
                                    keyboardType="phone-pad"
                                    onChangeText={(e) => setFieldValue('phoneNumber', maskPhone(e))}
                                    onFocus={() => setFieldTouched('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                />
                                {
                                    touched.phoneNumber && errors.phoneNumber ?       <Animatable.Text
                                        style={{color: theme.colors.diplayErrorMessage}}
                                        animation="shake"
                                        duration={500}
                                        easing={"linear"}>
                                        {errors.phoneNumber}
                                    </Animatable.Text> : null
                                }
                                <TextInput
                                    maxLength={10}
                                    placeholder="dd/mm/aaa"
                                    label="Data nascimento"
                                    keyboardType="numeric"
                                    onChangeText={(e) => setFieldValue('birthDate', maskDate(e))}
                                    onFocus={() => setFieldTouched('birthDate')}
                                    onBlur={handleBlur('birthDate')}
                                    value={values.birthDate}
                                />

                                {
                                    touched.birthDate && errors.birthDate ?       <Animatable.Text
                                        style={{color: theme.colors.diplayErrorMessage}}
                                        animation="shake"
                                        duration={500}
                                        easing={"linear"}>
                                        {errors.birthDate}
                                    </Animatable.Text> : null
                                }

                                <TextInput
                                    placeholder="Senha"
                                    secureTextEntry={showPassword.password}
                                    right={
                                        <TextInput.Icon
                                            onPress={handleClickShowPassword}
                                            name={passwordEyeType.eyePassword}
                                            color={theme.colors.primary}
                                        />}
                                    onChangeText={handleChange('password')}
                                    onFocus={() => setFieldTouched('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {
                                    touched.password && errors.password ?       <Animatable.Text
                                        style={{color: theme.colors.diplayErrorMessage}}
                                        animation="shake"
                                        duration={500}
                                        easing={"linear"}>
                                        {errors.password}
                                    </Animatable.Text> : null
                                }
                                <TextInput
                                    label="Confirmar senha"
                                    secureTextEntry={showPassword.confPassword}
                                    right={
                                        <TextInput.Icon
                                            onPress={handleClickShowConfPassword}
                                            name={passwordEyeType.eyeConfPassword}
                                            color={theme.colors.primary}
                                        />}
                                    onChangeText={handleChange('ConfPassword')}
                                    onFocus={() => setFieldTouched('ConfPassword')}
                                    onBlur={handleBlur('ConfPassword')}
                                    value={values.ConfPassword}
                                />
                                {
                                    touched.ConfPassword && errors.ConfPassword ?       <Animatable.Text
                                        style={{color: theme.colors.diplayErrorMessage}}
                                        animation="shake"
                                        duration={500}
                                        easing={"linear"}>
                                        {errors.ConfPassword}
                                    </Animatable.Text> : null
                                }
                                <Button onPress={handleSubmit} mode="contained"
                                        style={registerStyle.button}>Cadastrar</Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </RootSiblingParent>
    );
}
