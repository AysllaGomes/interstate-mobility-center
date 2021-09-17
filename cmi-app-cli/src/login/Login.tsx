import React, {useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";
import { useValidation } from 'react-native-form-validator';

interface LoginScreenProps {
    navigation: any;
}

const Login = (props: LoginScreenProps) => {

    const signUp = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")
    const resetPassword = () => props.navigation.navigate("ResetPassword")


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const messages = {
        en: {
            required: "Campo obrigatório",
            email: "Não é um email",
            hasUpperCase: "Deve conter pelo menos uma letra maiúscula",
            hasLowerCase: "Deve conter pelo menos uma letra minuscula",
            minlength: "Deve conter pelo menos 6 carácteres",
            maxlength: "Deve conter no máximo 20 carácteres ",
            hasNumber: "Deve conter um número"
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
            password: { required: true, minlength: 6, hasUpperCase: true, hasLowerCase: true, maxlength: 20, hasNumber:true}
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

                                <Button onPress={resetPassword} uppercase={false} style={loginStyle.cardButton}>Esqueceu email/password?</Button>
                                <Button onPress={() => (validaEmail() && validaPassword())? signUp() : null} mode="contained" style={loginStyle.cardButton}>Login</Button>
                                <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                            </Card.Content>
                        </Card>
                    </View>
                </SafeAreaView>
    );
}

export default Login;