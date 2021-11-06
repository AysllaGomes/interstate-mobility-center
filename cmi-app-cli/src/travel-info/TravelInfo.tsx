import React, {useEffect, useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import {SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import {HeaderComponent} from "../components/header/header.component";
import {theme} from "../../App.style";
import { registerStyle } from '../register/register.style';
import {FieldArray, Formik, Field, Form } from 'formik';
import travelInfo  from "./travelInfo.form"
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

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

    return (
        <SafeAreaView>
            <HeaderComponent title="Informações da Viagem" navigation={props.navigation}/>
            <Text>Digite as informações do usuário que irá realizar a viagem</Text>

            <Formik
                initialValues={{passageiros: [],}}
                onSubmit={values => console.log(values)}
            >
                {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {
                    const adicionarFormularioPassageiro = () => {
                            if(values.passageiros.length <= 2) setFieldValue('passageiros', [...values.passageiros, criarFormularioPassageiro()])
                    }
                    const removerFormularioPassageiro = () => {
                        setFieldValue('passageiros', [...values.passageiros].slice(0, values.passageiros.length - 1))
                    }
                    return(
                    <View>
                        <Button onPress={adicionarFormularioPassageiro}>Adicionar passageiro</Button>

                        {values.passageiros.map((text, index) => (
                            <View key={index}>

                                <Text>Passageiro {index+1}</Text>
                                <TextInput
                                    placeholder="Nome completo"
                                    onChangeText={handleChange(`passageiros[${index}].nome`)}
                                    onBlur={handleBlur(`passageiros[${index}].nome`)}
                                    value={values.passageiros[index].nome}
                                />
                                <TextInput
                                    placeholder="Idade"
                                    onChangeText={handleChange(`passageiros[${index}].idade`)}
                                    onBlur={handleBlur(`passageiros[${index}].idade`)}
                                    value={values.passageiros[index].idade}
                                />
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
                        <Button onPress={removerFormularioPassageiro}>Remover passageiro</Button>
                        <Button onPress={handleSubmit}>Submit</Button>
                    </View>
                    )
                }}

            </Formik>
        </SafeAreaView>
    )

}
export default TravelInfo;