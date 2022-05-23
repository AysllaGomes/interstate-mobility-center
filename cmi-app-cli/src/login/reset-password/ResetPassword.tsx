import React, {useState} from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {useValidation} from 'react-native-form-validator';
import {resetPasswordStyle} from "./ResetPassword.style";
import {HeaderComponent} from "../../components/header/Header.component";
import {theme} from '../../../App.style';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import ToastMessage from '../../components/Toast/ToastMessage';
import {RootSiblingParent} from 'react-native-root-siblings';

interface ScreenProps {
    navigation: any;
}

const ResetPassword = (props: ScreenProps) => {

    const [email, setEmail] = useState('')

    const messages = {
        en: {
            required: "Campo obrigatório não preenchido",
            email: "Favor informar um e-mail válido"
        }
    }

    const {validate, isFieldInError, getErrorsInField} =
        useValidation({
            state: {email},
            messages: messages
        });

    const validaEmail = () => {
        return validate({
            email: {required: true, email: true}
        })
    }

    const resetPasswordByEmail = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                ToastMessage("Senha recuperada, verifique seu e-mail!")
                setTimeout(function () {
                    props.navigation.navigate("Login")
                }, 2000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return ToastMessage("Nenhum usuário encontrado com esse e-mail, verifique e tente novamente!")
            });
    }
    return (
        <RootSiblingParent>
            <SafeAreaView style={resetPasswordStyle.content}>
                <View style={resetPasswordStyle.view}>
                    <HeaderComponent title="Recuperar senha" navigation={props.navigation}/>
                    <Card>
                        <Card.Content>
                            <TextInput
                                placeholder="E-mail"
                                label="E-mail"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                onTextInput={validaEmail}
                                value={email}
                            />
                            {isFieldInError('email') ?
                                <Text style={resetPasswordStyle.errorText}>{getErrorsInField("email")[0]}</Text> : null}
                            <Button onPress={() => (validaEmail()) ? resetPasswordByEmail() : null} mode="contained"
                                    style={resetPasswordStyle.cardButton}>Enviar</Button>
                        </Card.Content>
                    </Card>
                </View>
            </SafeAreaView>
        </RootSiblingParent>
    );
}
export default ResetPassword;