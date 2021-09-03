import React from 'react';
import {SafeAreaView, View} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";

const Login = () => {
    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Mobility Center" titleStyle={loginStyle.cardTitle}></Card.Title>
                    <Card.Content>
                        <TextInput label="User" keyboardType="email-address"></TextInput>
                        <TextInput label="Password" secureTextEntry="True"></TextInput>
                        <Button uppercase={false} style={loginStyle.cardButton}>Esqueceu email/password?</Button>
                        <Button mode="contained" style={loginStyle.cardButton}>Login</Button>
                        <Button style={loginStyle.cardButton}>Register</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default Login;