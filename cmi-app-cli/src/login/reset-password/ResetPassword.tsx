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

    const signUp = () => props.navigation.navigate("Home")

    const [email, setEmail] = useState('')
    const [password] = useState('')

    const messages = {
        en: {
            required: "Necessário preencher",
            email: "E-mail inválido!",
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
        <SafeAreaView style={resetPasswordStyle.content}>
            <View style={resetPasswordStyle.view}>
                <HeaderComponent title="Reset Password" navigation={props.navigation}/>

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

                        <Button onPress={() => (validaEmail() && validaPassword())? signUp() : null} mode="contained" style={resetPasswordStyle.cardButton}>Enviar</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default ResetPassword;