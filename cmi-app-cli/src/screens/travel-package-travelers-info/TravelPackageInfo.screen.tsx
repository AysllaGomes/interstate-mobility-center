import React, {useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import {SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import CheckBox from 'expo-checkbox';
import {HeaderComponent} from "../../components/header/Header.component";
import {theme} from "../../../App.style";
import {Formik} from 'formik';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {MergeUsuarioLogadoData} from '../../../assets/DadosUsuarioLogado/DadosUsuarioLogado';
import {RootSiblingParent} from 'react-native-root-siblings';
import ToastMessage from '../../components/Toast/ToastMessage';

interface ScreenProps {
    navigation: NativeStackNavigatorProps
    route: NativeStackNavigatorProps
}

const TravelPackageInfoScreen = (props: ScreenProps) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const formularioPassageiro = {
        nome: '',
        dataDeNascimento: '',
        cpf: '',
        numeroTelefoneCelular: ''
    };
    const [checkBoxDisable, setCheckBoxDisable] = useState(false)

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


    const validaDataNascimento = (dataDeNascimento) => {
        const regex = new RegExp(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/);
        if(!regex.test(dataDeNascimento)){
            return {
                valid: false, errorMsg: "Data inválida!"
            }
        }else {
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

    const birthdayMask = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d+?)$/, "$1");
    };
    const goPayment = (values) => {

        if(toggleCheckBox == true && values.length >2) {
            return ToastMessage("No máximo 3 passageiros abordos, incluindo você ;)")
        }
        if (toggleCheckBox == false && values.length == 0){
            return ToastMessage("Deve haver pelo menos 1 passageiro!")
        }

        let hasError = false
        values.map((value) => {

                if (!validaNome(value.nome).valid ||
                    !validaDataNascimento(value.dataDeNascimento).valid ||
                    !validaCpf(value.cpf).valid ||
                    !validaTelefone(value.numeroTelefoneCelular).valid
                ) {
                    hasError = true
                }

            }
        )

        if (!hasError) {
            //fazer funcao adicionar
            if(toggleCheckBox == false && values.length == 0){
                //fazer consulta banco e trazer dados do usuario

            }

            try {
                MergeUsuarioLogadoData({passageiros: values, usuarioPassageiro: toggleCheckBox}).then(() => {
                    props.navigation.navigate("Payment")
                })

            }catch (error){

            }

            // const enviarPassageiros = async (values) => {
            //     const urlBase = "http://192.168.0.107:3007/"
            //     try {
            //         return await axios.post(urlBase+'passageiro/vinculoPassageiro', {"nome": values.name, "email": values.email, "dataDeNascimento": values.birthDate, "numeroTelefoneCelular": values.phoneNumber.replace(/\D/g,''), "cpf": values.cpf})
            //     } catch (error) {
            //         return error.response
            //     }
            // }
        }
    }

    return (
        <RootSiblingParent>
            <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Informações da Viagem" navigation={props.navigation}/>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={{
                            ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                                textAlign: "center",
                                marginTop: 20,
                                marginBottom: 20,
                                fontSize: 18
                            }
                        }}>Digite as informações do usuário que irá realizar a viagem</Text>

                        <Formik
                            initialValues={{passageiros: [],}}
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
                                    if (values.passageiros.length >1 && toggleCheckBox == true){
                                        return ToastMessage("O limite são 3 passageiros dadasdas!")
                                    }
                                    if(values.passageiros.length >1 && toggleCheckBox == false){
                                        setFieldValue('passageiros', values.passageiros.concat(formularioPassageiro))
                                    }else {
                                        setFieldValue('passageiros', values.passageiros.concat(formularioPassageiro))

                                    }
                                    // if (values.passageiros.length <= 2) {
                                    //     setFieldValue('passageiros', values.passageiros.concat(formularioPassageiro))
                                    //
                                    // }
                                    //
                                    // if(values.passageiros.length === 2)   {
                                    //     setCheckBoxDisable(true)
                                    //     setToggleCheckBox(false)
                                    // }
                                    //
                                    // if(values.passageiros.length >= 3){
                                    //     return ToastMessage("O limite são 3 passageiros !")
                                    // }
                                }
                                const removerFormularioPassageiro = () => {

                                    if(values.passageiros.length <= 3){
                                        setCheckBoxDisable(false)
                                    }
                                    if (values.passageiros.length <= 1 && toggleCheckBox == false) {
                                        return ToastMessage("Deve haver ao menos 1 passageiro!")
                                    }
                                    else {
                                        setFieldValue('passageiros', [...values.passageiros].slice(0, values.passageiros.length - 1))
                                    }
                                }

                                return (
                                    <View>
                                        <Text style={{
                                            ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                                                textAlign: "center",
                                                marginBottom: 20,
                                                fontSize: 18
                                            }}}>Adicione ou Remova passageiros</Text>
                                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                            <Button style={{backgroundColor: theme.buttons.backgroundColor}} onPress={adicionarFormularioPassageiro}><Text style={{color: theme.buttons.color}}>Adicionar</Text></Button>
                                            <Button style={{backgroundColor: theme.buttons.backgroundColor}} onPress={removerFormularioPassageiro}><Text style={{color: theme.buttons.color}}>Remover</Text></Button>
                                        </View>

                                        {values.passageiros.map((text, index) => {
                                                let validations = {
                                                    nome: validaNome(values.passageiros[index].nome),
                                                    dataDeNascimento: validaDataNascimento(values.passageiros[index].dataDeNascimento),
                                                    cpf: validaCpf(values.passageiros[index].cpf),
                                                    numeroTelefoneCelular: validaTelefone(values.passageiros[index].numeroTelefoneCelular)
                                                }

                                                return (
                                                    <View key={index}>
                                                        <Text style={{
                                                            fontFamily: theme.fontFamily.fontFamily,
                                                            fontSize: 18,
                                                            marginTop: 20
                                                        }}>Passageiro {index + 1}</Text>
                                                        <View style={{flex: 2, paddingRight: 20}}>
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

                                                        </View>
                                                        <View style={{flex: 2, paddingRight: 20}}>
                                                            <TextInput
                                                                key={index}
                                                                maxLength={14}
                                                                label="CPF"
                                                                placeholder="000.000.000-00"
                                                                keyboardType="decimal-pad"
                                                                onChangeText={(e) => setFieldValue(`passageiros[${index}].cpf`, maskCPF(e))}
                                                                onBlur={handleBlur(`passageiros[${index}].cpf`)}
                                                                value={values.passageiros[index].cpf}
                                                            />
                                                            {!validations.cpf.valid && isSubmitting ?
                                                                <Text
                                                                    style={{color: theme.colors.diplayErrorMessage}}>{validations.cpf.errorMsg}</Text> : null}
                                                        </View>
                                                        <View style={{display: "flex", flexDirection: "row"}}>
                                                            <View style={{flex: 1, paddingRight: 20}}>
                                                                <TextInput
                                                                    key={index}
                                                                    maxLength={15}
                                                                    label="Celular"
                                                                    placeholder="(99) 99999-9999"
                                                                    keyboardType="phone-pad"
                                                                    onChangeText={(e) => setFieldValue(`passageiros[${index}].numeroTelefoneCelular`, maskPhone(e))}
                                                                    onBlur={handleBlur(`passageiros[${index}].numeroTelefoneCelular`)}
                                                                    value={values.passageiros[index].numeroTelefoneCelular}
                                                                />
                                                                {!validations.numeroTelefoneCelular.valid && isSubmitting ?
                                                                    <Text
                                                                        style={{color: theme.colors.diplayErrorMessage}}>{validations.numeroTelefoneCelular.errorMsg}</Text> : null}
                                                            </View>

                                                            <View style={{flex: 1, paddingRight: 20 }}>
                                                                <TextInput
                                                                    key={index}
                                                                    maxLength={10}
                                                                    label="Data Nascimento"
                                                                    placeholder="22/05/1982"
                                                                    keyboardType="numeric"
                                                                    onBlur={handleBlur(`passageiros[${index}].dataDeNascimento`)}
                                                                    value={values.passageiros[index].dataDeNascimento}
                                                                    onChangeText={(e) => setFieldValue(`passageiros[${index}].dataDeNascimento`, birthdayMask(e))}
                                                                />
                                                                {!validations.dataDeNascimento.valid && isSubmitting ?
                                                                    <Text
                                                                        style={{color: theme.colors.diplayErrorMessage}}>{validations.dataDeNascimento.errorMsg}</Text> : null}
                                                            </View>
                                                        </View>

                                                    </View>)
                                            }
                                        )}
                                        <View  style={
                                            {display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginTop: 20
                                            }}>
                                            <CheckBox
                                                disabled={checkBoxDisable}
                                                value={toggleCheckBox}
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                            />
                                            <Text style={{fontFamily: theme.fontFamily.fontFamily, marginLeft: 5}}  onPress={() => setToggleCheckBox(!toggleCheckBox)}>Você será um passageiro?</Text>
                                        </View>
                                        <Button onPress={handleSubmit}
                                                style={{...theme.buttons, ...{marginTop: 20}}}><Text
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        </RootSiblingParent>

    )

}
export default TravelPackageInfoScreen;