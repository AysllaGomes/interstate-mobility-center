import React, {useState} from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import {Appbar, Button, TextInput} from "react-native-paper";
import {registerStyle} from "./register.style";
import {HeaderComponent} from "../components/header/header.component";

interface LoginScreenProps {
    navigation: any;
}



export const RegisterScreen = (props: LoginScreenProps) => {
    const logar = () => props.navigation.navigate("Home")

    const validaPassword = (password, confPassword) => password === confPassword

    const [nome, setNome] = useState(null)
    const [email, setEmail] = useState(null)
    const [dataNascimento, setDataNascimento] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [password, setPassword] = useState(null)
    const [confPassword, setConfPassword] = useState(null)
    console.log(email)
    console.log(validaPassword(password, confPassword))
    return(
         <SafeAreaView>
             <ScrollView>
                       <HeaderComponent title="Register" />
                    <View style={registerStyle.content}>
                          <TextInput
                          label="Nome Completo"
                          placeholder="Nome"
                          onChangeText={value => setNome(value)}
                          />
                        <TextInput
                            label="E-mail"
                            onChangeText={value => setEmail(value)}
                            keyboardType="email-address"
                        />
                        <TextInput
                            onChangeText={value => setPhoneNumber(value)}
                            label="Phone number"
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            onChangeText={value => setDataNascimento(value)}
                            placeholder="dd/mm/aaa"
                            label="Data nascimento"
                            keyboardType="numeric" />
                        <TextInput

                            onChangeText={value => setPassword(value)}
                            placeholder="Password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"
                            color={registerStyle.icon.color} />}
                        />
                        <TextInput
                            onChangeText={value => setConfPassword(value)}
                            label="Confirm password"
                            secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"
                            color={registerStyle.icon.color} />}
                        />
                        <Button onPress={logar} mode="contained" style={registerStyle.button}>Register</Button>
                    </View>
             </ScrollView>
        </SafeAreaView>
    );
}