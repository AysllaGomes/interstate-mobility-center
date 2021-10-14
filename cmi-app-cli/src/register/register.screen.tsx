import React from "react";
import {Button, TextInput} from "react-native-paper";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {registerStyle} from "./register.style";
import {HeaderComponent} from "../components/header/header.component";
import firebase from "../firebase/firebaseconfig";
import createUser from "./register.service";
import {Formik} from 'formik';
import {registerForm} from "./register.form";
import {Root, Toast} from 'popup-ui'
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";

interface LoginScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string
}

export const RegisterScreen = (props: LoginScreenProps) => {
    const RegisterWithFirebase = (email: string, password: string) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user;
            })
            .catch((error) => {
                console.error(`
                    ERRO no APP, método "RegisterWithFirebase".
                    <'ERRO EXTERNO'>
                      message:  Não foi possível salvar o usuário, na base do Firebase...
                      CODE: ${error.code}
                      MESSAGE RTN: ${error.message}
                    Parâmetros da requisição:
                      E-MAIL: ${email},
                      PSWD: ${password}
                `);
                return error.code;
            });

        return null;
    }

    const registerUser = async (values) => {
            let errorMongo = await createUser(values)
            if (errorMongo.status != 200) {
                Toast.show({
                    title: 'Houve um problema!',
                    text: errorMongo.data.message,
                    color: '#e74c3c'
                })
                return;
            }
            let errorFirebase = RegisterWithFirebase(values.email, values.password)
            if (errorFirebase != null) {
                return console.error("Error with Firebase Register")
            }
            console.error(errorMongo)
            props.navigation.navigate("Home")
    }

    const [showPassword, setShowPassword] = React.useState({password: true, confPassword: true});

    const handleClickShowPassword = () => {
        setShowPassword({...showPassword, password: !showPassword.password});
    }
    const handleClickShowConfPassword = () => {
        setShowPassword({...showPassword, confPassword: !showPassword.confPassword});
    }

    const maskDate = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d+?)$/, "$1");
    };
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

    return (
        <Root>
            <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Cadastro" navigation={props.navigation} page="Login"/>
                    <Formik initialValues={{
                        name: '',
                        email: '',
                        phoneNumber: '',
                        birthDate: '',
                        password: '',
                        ConfPassword: '',
                        cpf: ''
                    }}
                            onSubmit={values => registerUser(values)}
                            validationSchema={registerForm}>
                        {({
                              handleSubmit,
                              handleChange,
                              touched,
                              setFieldTouched,
                              setFieldValue,
                              handleBlur,
                              errors,
                              values
                          }) => (

                            <View style={registerStyle.content}>
                                <TextInput
                                    label="Nome Completo"
                                    onChangeText={handleChange('name')}
                                    onFocus={() => setFieldTouched('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {
                                    touched.name && errors.name ? <Text style={{color: "red"}}>
                                        {errors.name}
                                    </Text> : null
                                }
                                <TextInput
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    onChangeText={handleChange('email')}
                                    onFocus={() => setFieldTouched('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {
                                    touched.email && errors.email ? <Text style={{color: "red"}}>
                                        {errors.email}
                                    </Text> : null
                                }

                                <TextInput
                                    label="CPF"
                                    placeholder="000.000.000-00"
                                    keyboardType="numeric"
                                    onChangeText={(e) => setFieldValue('cpf', maskCPF(e))}
                                    onFocus={() => setFieldTouched('cpf')}
                                    onBlur={handleBlur('cpf')}
                                    value={values.cpf}
                                />
                                {
                                    touched.cpf && errors.cpf ? <Text style={{color: "red"}}>
                                        {errors.cpf}
                                    </Text> : null
                                }
                                <TextInput
                                    label="Celular"
                                    placeholder="(99) 99999-9999"
                                    keyboardType="phone-pad"
                                    onChangeText={(e) => setFieldValue('phoneNumber', maskPhone(e))}
                                    onFocus={() => setFieldTouched('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                />
                                {
                                    touched.phoneNumber && errors.phoneNumber ? <Text style={{color: "red"}}>
                                        {errors.phoneNumber}
                                    </Text> : null
                                }
                                <TextInput
                                    placeholder="dd/mm/aaa"
                                    label="Data nascimento"
                                    keyboardType="numeric"
                                    onChangeText={(e) => setFieldValue('birthDate', maskDate(e))}
                                    onFocus={() => setFieldTouched('birthDate')}
                                    onBlur={handleBlur('birthDate')}
                                    value={values.birthDate}
                                />
                                {
                                    touched.birthDate && errors.birthDate ? <Text style={{color: "red"}}>
                                        {errors.birthDate}
                                    </Text> : null
                                }

                                <TextInput
                                    placeholder="Senha"
                                    secureTextEntry={showPassword.password}
                                    right={
                                        <TextInput.Icon
                                            onPress={handleClickShowPassword}
                                            name="eye-off-outline"
                                            color={registerStyle.icon.color}
                                        />}
                                    onChangeText={handleChange('password')}
                                    onFocus={() => setFieldTouched('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {
                                    touched.password && errors.password ? <Text style={{color: "red"}}>
                                        {errors.password}
                                    </Text> : null
                                }
                                <TextInput
                                    label="Confirmar senha"
                                    secureTextEntry={showPassword.confPassword}
                                    right={
                                        <TextInput.Icon
                                            onPress={handleClickShowConfPassword}
                                            name="eye-off-outline"
                                            color={registerStyle.icon.color}
                                        />}
                                    onChangeText={handleChange('ConfPassword')}
                                    onFocus={() => setFieldTouched('ConfPassword')}
                                    onBlur={handleBlur('ConfPassword')}
                                    value={values.ConfPassword}
                                />
                                {
                                    touched.ConfPassword && errors.ConfPassword ? <Text style={{color: "red"}}>
                                        {errors.ConfPassword}
                                    </Text> : null
                                }
                                <Button onPress={handleSubmit} mode="contained"
                                        style={registerStyle.button}>Cadastrar</Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </Root>
    );
}
