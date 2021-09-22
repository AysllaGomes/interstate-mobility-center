import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";
import { useValidation } from 'react-native-form-validator';
import firebase from "../firebase/firebaseconfig";



interface LoginScreenProps {
    navigation: any;
}


const Login = (props: LoginScreenProps) => {

    const signUp = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")
    const resetPassword = () => props.navigation.navigate("ResetPassword")


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let provider = new firebase.auth.GoogleAuthProvider();

    const LoginWithGoogle = () => {
        firebase.auth().signInWithRedirect(provider);
    }

const LoginFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            props.navigation.navigate("Home")
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    const messages = {
        en: {
            required: "Campo obrigatório não preenchido",
            email: "Favor informar um e-mail válido"
        }
    }

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { email, password },
            messages: messages
        });

    const validaEmail = () => {
        return validate({
            email: {required: true, email: true}
        })
    }

    const validaPassword = () => {
        return validate({
            password: { required: true}
        })
    }

    return (
                <SafeAreaView style={loginStyle.content}>
                    <View style={loginStyle.view}>
                        <Card>
                            <Card.Title title="Mobility Center" titleStyle={loginStyle.cardTitle}>
                            </Card.Title>
                            <Card.Content>
                                <TextInput
                                    placeholder="Email"
                                    label="User"
                                    keyboardType="email-address"
                                    onChangeText={setEmail}
                                    onTextInput={validaEmail}
                                    value={email}
                                />
                                {isFieldInError('email') ? <Text style={loginStyle.errorText}>{getErrorsInField("email")[0]}</Text> : null}

                                <TextInput
                                    label="Password"
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    onTextInput={validaPassword}
                                    value={password}
                                />
                                {isFieldInError('password') ? <Text style={loginStyle.errorText}>{getErrorsInField("password")[0]}</Text> : null}

                                <Button onPress={() => (validaEmail() && validaPassword())? LoginFirebase() : null} mode="contained" style={loginStyle.cardButton}>Login</Button>
                                <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                                <Button onPress={resetPassword} uppercase={false} style={loginStyle.cardButton}>Esqueceu email/password?</Button>
                            </Card.Content>
                        </Card>
                    </View>
                </SafeAreaView>
    );
}

export default Login;