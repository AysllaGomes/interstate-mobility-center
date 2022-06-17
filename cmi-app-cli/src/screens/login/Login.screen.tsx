import React, {useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card} from "react-native-paper";
import { TextInput } from 'react-native-paper';
import {loginStyle} from "./login.style";
import firebase from "../../firebase/firebaseconfig";
import {Formik} from 'formik';
import {loginForm} from "./login.form";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import {DadosUsuarioLogado} from '../../../assets/DadosUsuarioLogado/DadosUsuarioLogado';
import * as Animatable from 'react-native-animatable';
import ToastMessage from "../../components/Toast/ToastMessage"
import {RootSiblingParent} from 'react-native-root-siblings';
import {theme} from "../../../App.style";

interface LoginScreenProps {
    navigation: NativeStackNavigatorProps;
}

const LoginScreen = (props: LoginScreenProps) => {
    const register = () => props.navigation.navigate("Register")
    const resetPassword = () => props.navigation.navigate("ResetPassword")
    const [errorPassword, setErrorPassword] = useState("");

    // Consula se usuario possui termo de uso 
    const buscarIDUsuarioPorEmail = async (email: string) => {
        const urlBase = "http://192.168.0.110:3001"
        const config = {
            headers: {
                email: email
            }
        }
        try {
            let res = await axios.get(urlBase + "/usuario/detalhar", config)
            return res.data._id
        } catch (error) {
            return error.response
        }
    }

    const verificaTermoDeUso = async (id) => {
        const urlBase = "http://192.168.0.110:3008"
        try {
            let res = await axios.post(urlBase + "/usuario/consultaAssinaturaTermoUsuario", {"idUsuario": id})
            return res.data.assinado;
        } catch (error) {
            return error.response
        }
    }
    // Consula se usuario possui termo de uso -Fim

    const LoginFirebase = async (email: string, password: string) => {

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)

            let idUsuario = await buscarIDUsuarioPorEmail(email)

            let termoAssinado = await verificaTermoDeUso(idUsuario)

            {
                (termoAssinado === false) ? props.navigation.navigate("TermoUso", {emailUsuario: email}) : props.navigation.navigate("Home", {emailUsuario: email})
            }
            //Guarda em memória - assets/

            await DadosUsuarioLogado({"idUsuario": idUsuario})

        } catch (error) {
            // Só esse switch maravilhoso porque o Firebase não retorna erro como numérico kk :)
            let errorMessage = "Erro"
            switch (error.code.substr(5)) {
                case 'wrong-password':
                    errorMessage = "Senha incorreta!"
                    break
                case 'too-many-requests':
                    errorMessage = "Muitas tentativas, aguarde!"
                    break
                case 'operation-not-allowed':
                    errorMessage = "Operação não permitida!"
                    break
                case 'user-not-found':
                    errorMessage = "Usuário não existe!"
                    break
                default:
                    return 'Algo de errado aconteceu!'
            }
            return ToastMessage(errorMessage)
        }
    }
    const [showPassword, setShowPassword] = useState(true);
    const [passwordEyeType, setPasswordEyeType] = useState("eye-off-outline");
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
        if (showPassword == false)
            setPasswordEyeType("eye-off-outline")
        else {
            setPasswordEyeType("eye")
        }
    }

    return (

        <RootSiblingParent>
            <SafeAreaView style={loginStyle.content}>
                <View style={loginStyle.view}>
                    <Card>
                        <Card.Title title="VoeJá" titleStyle={loginStyle.cardTitle}>
                        </Card.Title>
                        <Card.Content>
                            <Formik initialValues={{email: '', password: ''}}
                                    onSubmit={values => {
                                        LoginFirebase(values.email, values.password)
                                    }}
                                    validationSchema={loginForm}

                            >

                                {({
                                      handleSubmit,
                                      handleChange,
                                      touched,
                                      setFieldTouched,
                                      handleBlur,
                                      errors,
                                      values,

                                  }) => (
                                    <>
                                        <TextInput
                                            label="E-mail"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            onFocus={() => setFieldTouched('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />

                                        {
                                            touched.email && errors.email ? <Animatable.Text
                                                style={{color: theme.colors.diplayErrorMessage}}
                                                animation="shake"
                                                duration={500}
                                                easing={"linear"}>
                                                {errors.email}
                                            </Animatable.Text> : null
                                        }

                                        <TextInput
                                            label="Senha"
                                            secureTextEntry={showPassword}
                                            right={
                                                <TextInput.Icon
                                                    onPress={handleClickShowPassword}
                                                    name={passwordEyeType}
                                                    color={theme.colors.primary}
                                                />}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            onFocus={() => setFieldTouched('password')}
                                            value={values.password}
                                        />
                                        {
                                            touched.password && errors.password ?
                                                <Animatable.Text
                                                    style={{color: theme.colors.diplayErrorMessage}}
                                                    animation="shake"
                                                    duration={500}
                                                    easing={"linear"}>
                                                    {errors.password}
                                                </Animatable.Text> : null
                                        }
                                        <Button onPress={resetPassword} uppercase={false} style={loginStyle.cardButton}><Text
                                            style={loginStyle.text}>Esqueceu a senha?</Text></Button>
                                        <Button onPress={handleSubmit} mode="contained"
                                                style={loginStyle.cardButton}><Text
                                            style={loginStyle.text}>Entrar</Text></Button>
                                        <Button onPress={register} style={loginStyle.cardButton}><Text
                                            style={loginStyle.text}>Cadastro</Text></Button>
                                    </>
                                )}
                            </Formik>
                        </Card.Content>
                    </Card>
                </View>
            </SafeAreaView>
        </RootSiblingParent>
    );
}
export default LoginScreen;
