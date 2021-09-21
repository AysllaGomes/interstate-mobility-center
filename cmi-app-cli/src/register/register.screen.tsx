import React, {useState} from "react";
import { Button, TextInput} from "react-native-paper";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { registerStyle } from "./register.style";
import { useValidation } from 'react-native-form-validator';
import { HeaderComponent } from "../components/header/header.component";

interface LoginScreenProps {
    navigation: any, // @todo nunca aceitável
    page: string
}

export const RegisterScreen = (props: LoginScreenProps) => {
    /**
     * @todo Ettore arrume!!!
     *
     * melhorar utilizando a máscara, e ao submeter ao formulário, deve ser enviado sem a máscara
     * exemplo: (61) 9 8207-2218
     * envio para o back-end --> 61982072218
     *
     * getErrorsInField('nomeDoAtributo')[0] não deve ser assim :)
     *
     * formalize o form em uma única construção
     * melhora na validação, sendo que cada campo tem uma forma esperada
     * alteração na troca de mensagem validação
     */

    const register = () => props.navigation.navigate("Home")

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [birthDate, setBirthDate] = useState('')
        const [phoneNumber, setPhoneNumber] = useState('')
        const [password, setPassword] = useState('')
        const [confPassword, setConfPassword] = useState('')

    const messages = {
        en: {
            equalPassword: "Os campos não coincidem",
            required: "Campo obrigatório não preenchido",
            email: "Favor informar um e-mail válido",
            date: "O formato deve ser: ",
            numbers: "Use somente números",
            hasUpperCase: "Deve conter pelo menos uma letra maiúscula",
            hasLowerCase: "Deve conter pelo menos uma letra minuscula",
            minlength: "Deve conter pelo menos 6 carácteres",
            maxlength: "Deve conter no máximo 20 carácteres ",
            hasNumber: "Deve conter um número"
        }
    }

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { name, email, birthDate, phoneNumber, password, confPassword },
            messages: messages
        });

  const validaNome = () => {
        return validate({
            name: { required: true, minlength: 3 }
        })
    }
    const validaEmail = () => {
        return validate({
            email: {required: true, email: true}
        })
    }
    const validaPhoneNumber = () => {
        return validate({ // Fazer funcao validar quantidade numeros telefone
            phoneNumber: { required: true, numbers: true, minlength: 11 }
        })
    }
    const validaBirthDate = () => {
        return validate({
            birthDate: {required: true, date: true}
        })
    }
    const validaPassword = () => {
        return validate({
            password: { required: true, minlength: 6, hasUpperCase: true, hasLowerCase: true, maxlength: 20, hasNumber:true, equalPassword: confPassword  }
        })
    }
    const validaConfPassword = () => {
        return validate({
            confPassword: { required: true, minlength: 6, hasUpperCase: true, hasLowerCase: true, maxlength: 20,hasNumber:true, equalPassword: password }
        })
    }
        return (
            <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Register" navigation={props.navigation} page="Login"/>
                    <View style={registerStyle.content}>
                            <TextInput
                                label="Nome Completo"
                                placeholder="Nome"
                                onChangeText={setName}
                                value={name}
                                onTextInput={validaNome}
                            />
                             {isFieldInError('name') ? <Text style={registerStyle.errorText}>{getErrorsInField("name")[0]}</Text> : null}
                            <TextInput
                                label="E-mail"
                                onChangeText={setEmail}
                                value={email}
                                onTextInput={validaEmail}
                            />
                              {isFieldInError('email') ? <Text style={registerStyle.errorText}>{getErrorsInField("email")[0]}</Text> : null}
                            <TextInput
                                label="Phone number"
                                keyboardType="phone-pad"
                                onChangeText={setPhoneNumber}
                                value={phoneNumber}
                                onTextInput={validaPhoneNumber}
                            />
                             {isFieldInError('phoneNumber') ? <Text style={registerStyle.errorText}>{getErrorsInField("phoneNumber")[0]}</Text> : null}

                           <TextInput
                                placeholder="dd/mm/aaa"
                                label="Data nascimento"
                                keyboardType="numeric"
                                onChangeText={setBirthDate}
                                value={birthDate}
                                onTextInput={validaBirthDate}
                           />
                            {isFieldInError('birthDate') ? <Text style={registerStyle.errorText}>{getErrorsInField("birthDate")[0]}</Text> : null}

                        <TextInput
                                placeholder="Password" secureTextEntry={true}
                                right={<TextInput.Icon name="eye-off-outline"
                                color={registerStyle.icon.color}/>}
                                onChangeText={setPassword}
                                onTextInput={validaPassword}
                                value={password}
                            />
                            {isFieldInError('password') ? <Text style={registerStyle.errorText}>{getErrorsInField("password")[0]}</Text> : null}

                        <TextInput
                                label="Confirm password"
                                secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"
                                color={registerStyle.icon.color}/>}
                                onChangeText={setConfPassword}
                                value={confPassword}
                                onTextInput={validaConfPassword}
                            />
                           {isFieldInError('confPassword') ? <Text style={registerStyle.errorText}>{getErrorsInField("confPassword")[0]}</Text> : null}

                        <Button onPress={() => (validaNome() && validaEmail() && validaPhoneNumber() && validaBirthDate() && validaPassword() && validaConfPassword()) ? register() : null}  mode="contained" style={registerStyle.button}>Register</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
