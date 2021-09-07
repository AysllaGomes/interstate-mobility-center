import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";

interface LoginScreenProps {
    navigation: any;
}

const Login = (props: LoginScreenProps) => {

    const logar = () => props.navigation.navigate("Home")
    const register = () => props.navigation.navigate("Register")

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Mobility Center" titleStyle={loginStyle.cardTitle}></Card.Title>
                    <Card.Content>
                        <TextInput
                            placeholder="Email"
                            label="User"
                            keyboardType="email-address"
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            label="Password"
                            secureTextEntry={true}
                            onChangeText={value => setPassword(value)}
                        />
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