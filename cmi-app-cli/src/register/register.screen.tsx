import React from "react";
import { Button, TextInput} from "react-native-paper";
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity, ToastAndroid} from "react-native";
import { registerStyle } from "./register.style";
import { HeaderComponent } from "../components/header/header.component";
import firebase from "../firebase/firebaseconfig";
import createUser from "./register.service";
import { Formik } from 'formik';
import {registerForm} from "./register.form";
import { Popup, Root, Toast } from 'popup-ui'

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
     */

    const RegisterWithFirebase = (email: string, password: string) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return errorCode;
            });

        return null;
    }

    // const validaPassword = (password) => {
    //     let errorPassword;
    //     if (!password) {
    //         errorPassword = 'Campo obrigatório!';
    //     }
    //     else if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)) {
    //         errorPassword = 'Favor informar um e-mail válido';
    //     }
    //     return errorPassword;
    // };

    const registerUser = async (values) => {
        let errorFirebase = RegisterWithFirebase(values.email, values.password)

        if (errorFirebase != null) {
            return console.log("Error with Firebase Register")
        }

        let errorMongo = await createUser(values)

        console.log(errorMongo)

        if (errorMongo.status != 200) {

            Toast.show({
                title: 'Houve um problema!',
                text: errorMongo.data.message,
                color: '#e74c3c'
            })
            return;
        }
            props.navigation.navigate("Home")
    }

        return (
            <Root>
                <SafeAreaView>
                    <ScrollView>
                    <HeaderComponent title="Register" navigation={props.navigation} page="Login"/>
                    <Formik initialValues={{name: '', email: '', phoneNumber: '', birthDate: '', password: '', ConfPassword: ''}}
                                onSubmit={values => registerUser(values)}
                                validationSchema={registerForm}>
                            {({handleSubmit, handleChange, touched, setFieldTouched, handleBlur, errors, values}) => (

                            <View style={registerStyle.content}>
                                    <TextInput
                                            label="Nome Completo"
                                            placeholder="Nome"
                                            onChangeText={handleChange('name')}
                                            onFocus={() => setFieldTouched('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                    />
                                    {
                                        touched.name && errors.name ? <Text style={{color: "red" }}>
                                            {errors.name}
                                        </Text> : null
                                    }

                                    <TextInput
                                        placeholder="Email"
                                        label="User"
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onFocus={() => setFieldTouched('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {
                                        touched.email && errors.email ? <Text style={{color: "red" }}>
                                            {errors.email}
                                        </Text> : null
                                    }

                                    <TextInput
                                            label="Phone number"
                                            keyboardType="phone-pad"
                                            onChangeText={handleChange('phoneNumber')}
                                            onFocus={() => setFieldTouched('phoneNumber')}
                                            onBlur={handleBlur('phoneNumber')}
                                            value={values.phoneNumber}
                                        />
                                    {
                                        touched.phoneNumber && errors.phoneNumber ? <Text style={{color: "red" }}>
                                            {errors.phoneNumber}
                                        </Text> : null
                                    }
                                       <TextInput
                                            placeholder="dd/mm/aaa"
                                            label="Data nascimento"
                                            keyboardType="numeric"
                                            onChangeText={handleChange('birthDate')}
                                            onFocus={() => setFieldTouched('birthDate')}
                                            onBlur={handleBlur('birthDate')}
                                            value={values.birthDate}
                                       />
                                    {
                                        touched.birthDate && errors.birthDate ? <Text style={{color: "red" }}>
                                            {errors.birthDate}
                                        </Text> : null
                                    }
                                    <TextInput
                                            placeholder="Password" secureTextEntry={true}
                                            right={<TextInput.Icon name="eye-off-outline"
                                            color={registerStyle.icon.color}/>}
                                            onChangeText={handleChange('password')}
                                            onFocus={() => setFieldTouched('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                    />
                                    {
                                        touched.password && errors.password ? <Text style={{color: "red" }}>
                                            {errors.password}
                                        </Text> : null
                                    }
                                    <TextInput
                                            label="Confirm password"
                                            secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline"
                                            color={registerStyle.icon.color}/>}
                                            onChangeText={handleChange('ConfPassword')}
                                            onFocus={() => setFieldTouched('ConfPassword')}
                                            onBlur={handleBlur('ConfPassword')}
                                            value={values.ConfPassword}
                                    />
                                    {
                                        touched.ConfPassword && errors.ConfPassword ? <Text style={{color: "red" }}>
                                            {errors.ConfPassword}
                                        </Text> : null
                                    }
                                    <Button onPress={handleSubmit}  mode="contained" style={registerStyle.button}>Register</Button>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                </SafeAreaView>
            </Root>
        );
    }