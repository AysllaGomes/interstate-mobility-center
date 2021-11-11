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
    // Estados

    // // Get user email storaged on device
    // Promise.resolve(GetUsuarioLogadoData()).then(function (value) {
    //     console.log(value); // "Success"
    // }, function (value) {
    //     // not called
    // });

    const[estaValidando, setEstaValidando] = useState(false);

    const [errosIdade, setErrosIdade] = useState("Algo aconteceu!")

    const validaNome = (nome, submited) => {
        if ((nome == "" || nome == null) && submited == true) {
            return false
        }
        return true
    }


    const validaIdade = (idade, submited) => {
        if (submited == true){

            if (!isNaN(idade) === true && idade != "" || idade != null) {
                setErrosIdade("Obrigatório!")
                return false
            }
            else if(isNaN(idade) == true && idade == "" || idade == null) {
                setErrosIdade("Obrigatório!")
                return false
            }else {
                setErrosIdade("Não é um numero!")
return false
            }

        }
        return true

    }
    return (
        <SafeAreaView>
            <ScrollView>
            <HeaderComponent title="Informações da Viagem" navigation={props.navigation}/>
            <Text>Digite as informações do usuário que irá realizar a viagem</Text>

            <Formik
                initialValues={{passageiros: [],}}
                onSubmit={values => setEstaValidando(true)}
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
                      setSubmitting
                  }) => {
                    const adicionarFormularioPassageiro = () => {
                        if (values.passageiros.length <= 2) setFieldValue('passageiros', [...values.passageiros, criarFormularioPassageiro()])
                    }
                    const removerFormularioPassageiro = () => {
                        setFieldValue('passageiros', [...values.passageiros].slice(0, values.passageiros.length - 1))
                    }
                    return (
                        <View>
                            <Button onPress={adicionarFormularioPassageiro}>Adicionar passageiro</Button>
                            <Button onPress={removerFormularioPassageiro}>Remover passageiro</Button>

                            {values.passageiros.map((text, index) => (
                                <View key={index}>
                                    <Text>Passageiro {index + 1}</Text>
                                    <TextInput
                                        key={index}
                                        placeholder="Nome completo"
                                        onChangeText={handleChange(`passageiros.${index}.nome`)}
                                        onBlur={handleBlur(`passageiros[${index}].nome`)}
                                        value={values.passageiros[index].nome}
                                    />
                                    {validaNome(values.passageiros[index].nome, estaValidando) ? null :
                                        <Text>Obrigatório!</Text>}

                                    <TextInput
                                        placeholder="Idade"
                                        onChangeText={handleChange(`passageiros[${index}].idade`)}
                                        onBlur={handleBlur(`passageiros[${index}].idade`)}
                                        value={values.passageiros[index].idade}
                                    />
                                    {validaIdade(values.passageiros[index].idade, estaValidando) ? null :
                                        <Text>{errosIdade}</Text>}

                                    <TextInput
                                        placeholder="CPF"
                                        onChangeText={handleChange(`passageiros[${index}].cpf`)}
                                        onBlur={handleBlur(`passageiros[${index}].cpf`)}
                                        value={values.passageiros[index].cpf}
                                    />
                                    <TextInput
                                        placeholder="Celular"
                                        onChangeText={handleChange(`passageiros[${index}].telefone`)}
                                        onBlur={handleBlur(`passageiros[${index}].telefone`)}
                                        value={values.passageiros[index].telefone}
                                    />
                                </View>
                            ))}
                            <Button onPress={handleSubmit}>Submit</Button>
                        </View>
                    )
                }}

            </Formik>
            </ScrollView>
        </SafeAreaView>
    )

}
export default TravelInfo;