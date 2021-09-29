import React from 'react';
import {SafeAreaView, View, Text} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";
import {loginStyle} from "./login.style";
import firebase from "../firebase/firebaseconfig";
import { Formik } from 'formik';
import {loginForm} from "./login.form";
interface LoginScreenProps {
    navigation: any;
}

const Login = (props: LoginScreenProps) => {
    const register = () => props.navigation.navigate("Register")
    const resetPassword = () => props.navigation.navigate("ResetPassword")

const LoginFirebase = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            props.navigation.navigate("Home")
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log((errorCode))
            console.log((errorMessage))
        });
    }
    return (
                <SafeAreaView style={loginStyle.content}>
                    <View style={loginStyle.view}>
                        <Card>
                            <Card.Title title="Mobility Center" titleStyle={loginStyle.cardTitle}>
                            </Card.Title>
                            <Card.Content>
                                <Formik initialValues={{email: '', password:''}}
                                        onSubmit={values => {LoginFirebase(values.email, values.password)}}
                                        validationSchema={loginForm}>
                                    {({handleSubmit, handleChange, touched, setFieldTouched, handleBlur, errors, values}) => (
                                        <>
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
                                            label="Password"
                                            secureTextEntry={true}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            onFocus={() => setFieldTouched('password')}
                                            value={values.password}
                                            />
                                            {
                                                touched.password && errors.password ? <Text style={{color: "red"}}>
                                                    {errors.password}
                                                </Text> : null
                                            }
                                            <Button onPress={resetPassword} uppercase={false} disabled={values.email == ''} style={loginStyle.cardButton}>Esqueceu a senha?</Button>
                                            <Button onPress={handleSubmit} mode="contained" style={loginStyle.cardButton}>Login</Button>
                                            <Button onPress={register} style={loginStyle.cardButton}>Register</Button>
                                        </>
                                    )}
                                </Formik>
                            </Card.Content>
                        </Card>
                    </View>
                </SafeAreaView>
    );
}

export default Login;