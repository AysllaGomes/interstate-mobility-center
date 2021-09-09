import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";
import { useValidation } from 'react-native-form-validator';
interface LoginScreenProps {
    navigation: any;
}
const Login = (props: LoginScreenProps) => {

    const signUp = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { validate, isFieldInError } =
        useValidation({
            state: { email, password },
        });

    const validar = () => {
        return validate({
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: true }
        });
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
                                    value={email}
                                />
                                {isFieldInError('email') ? (<Text style={loginStyle.errorText}>Preencha o campo corretamente!</Text>) : null}
                                <TextInput
                                    label="Password"
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                                {(isFieldInError('password')) ? (<Text style={loginStyle.errorText}>Preencha o campo corretamente!</Text>) : null}

                                <Button uppercase={false} style={loginStyle.cardButton}>Esqueceu email/password?</Button>
                                <Button onPress={() => validar() == true ? signUp() : null} mode="contained" style={loginStyle.cardButton}>Login</Button>
                                <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                            </Card.Content>
                        </Card>
                    </View>
                </SafeAreaView>
    );
}

export default Login;