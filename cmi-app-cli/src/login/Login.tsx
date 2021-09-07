import React from 'react';
import {Alert, SafeAreaView, View} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";

interface LoginScreenProps {
    navigation: any;
}

const Login = (props: LoginScreenProps) => {

    const logar = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Mobility Center" titleStyle={loginStyle.cardTitle}></Card.Title>
                    <Card.Content>
                        <TextInput label="User" keyboardType="email-address"></TextInput>
                        <TextInput label="Password" secureTextEntry={true}></TextInput>
                        <Button uppercase={false} style={loginStyle.cardButton}>Esqueceu email/password?</Button>
                        <Button onPress={logar} mode="contained" style={loginStyle.cardButton}>Login</Button>
                        <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default Login;