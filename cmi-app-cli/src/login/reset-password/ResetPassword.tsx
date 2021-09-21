import React, {useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import { useValidation } from 'react-native-form-validator';
import {resetPasswordStyle} from "./ResetPassword.style";
import {HeaderComponent} from "../../components/header/header.component";

interface LoginScreenProps {
    navigation: any;
}
const ResetPassword = (props: LoginScreenProps) => {

    const send = () => props.navigation.navigate("Home")

    const [email, setEmail] = useState('')
    const [password] = useState('')

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

    return (
        <SafeAreaView style={resetPasswordStyle.content}>
            <View style={resetPasswordStyle.view}>
                <HeaderComponent title="Reset Password" navigation={props.navigation} page="Login"/>

                <Card>
                    <Card.Title title="Mobility Center" titleStyle={resetPasswordStyle.cardTitle}>
                    </Card.Title>
                    <Card.Content>
                        <TextInput
                            placeholder="Email"
                            label="Usuário"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            onTextInput={validaEmail}
                            value={email}
                        />
                        {isFieldInError('email') ? <Text style={resetPasswordStyle.errorText}>{getErrorsInField("email")[0]}</Text> : null}

                        <Button onPress={() => (validaEmail())? send() : null} mode="contained" style={resetPasswordStyle.cardButton}>Enviar</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default ResetPassword;