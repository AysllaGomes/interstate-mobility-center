import React, {useEffect, useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import {SafeAreaView, View, Text, Image, ScrollView} from "react-native";
import {HeaderComponent} from "../components/header/header.component";
import {theme} from "../../App.style";
import {registerStyle} from '../register/register.style';
import {FieldArray, Formik, Field, Form} from 'formik';
import travelInfo from "./travelInfo.form"
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {GetUsuarioLogadoData} from '../../assets/DadosUsuarioLogado/DadosUsuarioLogado';

interface ScreenProps {
    navigation: NativeStackNavigatorProps
    route: NativeStackNavigatorProps
}

const TravelInfo = (props: ScreenProps) => {
    const criarFormularioPassageiro = () => ({
        nome: '',
        idade: '',
        cpf: '',
        telefone: ''
    });

    // // Get user email storaged on device
    // Promise.resolve(GetUsuarioLogadoData()).then(function (value) {
    //     console.log(value); // "Success"
    // }, function (value) {
    //     // not called
    // });

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const maskPhone = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    const validaNome = (nome) => {
        if ((nome == "" || nome == null)) {
            return {valid: false, errorMsg: "Obrigatório"}
        }
        return {valid: true, errorMsg: ""}
    }

    const validaIdade = (idade) => {
        if (idade == "" || idade == null) {
            return {
                valid: false, errorMsg: "Obrigatório!"
            }
        } else if (isNaN(idade)) {
            return {
                valid: false, errorMsg: "Idade inválida!"
            }
        } else if (idade > 130) {
            return {
                valid: false, errorMsg: "Você não pode estar vivo !"
            }
        } else {
            return {valid: true, errorMsg: ""}
        }
    }

    function validaCpf(cpf) {
        if (cpf == "" || cpf == null) {
            return {
                valid: false, errorMsg: "Obrigatório!"
            }
        } else if (typeof cpf !== "string") return {valid: false, errorMsg: "CPF inválido!"}
        cpf = cpf.replace(/[\s.-]*/igm, '')

        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"
        ) {
            return {valid: false, errorMsg: "CPF inválido!"}
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) return {valid: false, errorMsg: "CPF inválido!"}
        soma = 0
        for (var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) return {valid: false, errorMsg: "CPF inválido!"}
        return {valid: true, errorMsg: ""}

    }

    const validaTelefone = (telefone) => {
        if (telefone == "" || telefone == null) {
            return {
                valid: false, errorMsg: "Obrigatório!"
            }
        }
        return {valid: true, errorMsg: ""}
    }

    const goPayment = (values) => {
        let hasError = false
        values.map((value) => {

                if (!validaNome(value.nome).valid ||
                    !validaIdade(value.idade).valid ||
                    !validaCpf(value.cpf).valid ||
                    !validaTelefone(value.telefone).valid
                ) {
                    hasError = true
                }

            }
        )
        if (!hasError) {
            props.navigation.navigate("Payment")
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Informações da Viagem" navigation={props.navigation}/>
                <Text style={{
                    ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                        textAlign: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: 18
                    }
                }}>Digite as informações do usuário que irá realizar a viagem</Text>

                <Formik
                    initialValues={{passageiros: [criarFormularioPassageiro()],}}
                    onSubmit={values => goPayment(values.passageiros)}
                >
                    {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          setFieldValue,
                          errors,
                          touched,
                          setTouched,
                          isSubmitting,
                          setSubmitting,
                          validateOnMount
                      }) => {
                        const adicionarFormularioPassageiro = () => {
                            if (values.passageiros.length <= 2) setFieldValue('passageiros', [...values.passageiros, criarFormularioPassageiro()])
                        }
                        const removerFormularioPassageiro = () => {
                            if (values.passageiros.length > 1) {
                                setFieldValue('passageiros', [...values.passageiros].slice(0, values.passageiros.length - 1))
                            }
                        }
                        return (
                            <View>
                                <Button onPress={adicionarFormularioPassageiro}>Adicionar passageiro</Button>
                                <Button onPress={removerFormularioPassageiro}>Remover passageiro</Button>

                                {values.passageiros.map((text, index) => {
                                        let validations = {
                                            nome: validaNome(values.passageiros[index].nome),
                                            idade: validaIdade(values.passageiros[index].idade),
                                            cpf: validaCpf(values.passageiros[index].cpf),
                                            telefone: validaTelefone(values.passageiros[index].telefone)
                                        }
                                        return (<View key={index}>
                                            <Text style={{
                                                fontFamily: theme.fontFamily.fontFamily,
                                                fontSize: 18,
                                                marginTop: 20
                                            }}>Passageiro {index + 1}</Text>
                                            <TextInput
                                                key={index}
                                                placeholder="Nome completo"
                                                onChangeText={handleChange(`passageiros.${index}.nome`)}
                                                onBlur={handleBlur(`passageiros[${index}].nome`)}
                                                value={values.passageiros[index].nome}
                                            />
                                            {!validations.nome.valid && isSubmitting ?
                                                <Text
                                                    style={{color: theme.colors.diplayErrorMessage}}>{validations.nome.errorMsg}</Text> : null}
                                            <TextInput
                                                placeholder="Idade"
                                                keyboardType="decimal-pad"
                                                onChangeText={handleChange(`passageiros[${index}].idade`)}
                                                onBlur={handleBlur(`passageiros[${index}].idade`)}
                                                value={values.passageiros[index].idade}
                                            />
                                            {!validations.idade.valid && isSubmitting ?
                                                <Text
                                                    style={{color: theme.colors.diplayErrorMessage}}>{validations.idade.errorMsg}</Text> : null}

                                            <TextInput
                                                placeholder="CPF"
                                                keyboardType="decimal-pad"
                                                onChangeText={(e) => setFieldValue(`passageiros[${index}].cpf`, maskCPF(e))}
                                                onBlur={handleBlur(`passageiros[${index}].cpf`)}
                                                value={values.passageiros[index].cpf}
                                            />
                                            {!validations.cpf.valid && isSubmitting ?
                                                <Text
                                                    style={{color: theme.colors.diplayErrorMessage}}>{validations.cpf.errorMsg}</Text> : null}
                                            <TextInput
                                                placeholder="Celular"
                                                keyboardType="phone-pad"
                                                onChangeText={(e) => setFieldValue(`passageiros[${index}].telefone`, maskPhone(e))}
                                                onBlur={handleBlur(`passageiros[${index}].telefone`)}
                                                value={values.passageiros[index].telefone}
                                            />
                                            {!validations.telefone.valid && isSubmitting ?
                                                <Text
                                                    style={{color: theme.colors.diplayErrorMessage}}>{validations.telefone.errorMsg}</Text> : null}
                                        </View>)
                                    }
                                )}
                                <Button onPress={handleSubmit}
                                        style={{...theme.buttons, ...{marginTop: 20, margin: 5}}}><Text
                                    style={{
                                        color: theme.buttons.color,
                                        fontFamily: theme.fontFamily.fontFamily,
                                        fontSize: 18
                                    }}>Efetuar
                                    Compra</Text></Button>
                            </View>
                        )
                    }}

                </Formik>
            </ScrollView>
        </SafeAreaView>
    )

}
export default TravelInfo;