import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from "../firebase/firebaseconfig"
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ToastMessage from "../components/Toast/ToastMessage"

interface ScreenProps {
    navigation: NativeStackNavigatorProps;
}
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer'
import {GetUsuarioLogadoData} from "../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import UserTravelsService from "../screens/user-travels/userTravels.service";


function DrawerContent(props) {
    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            props.navigation.navigate("Login")
        } catch (e) {
            console.error(e);
        }
    }

    const deleteProfile = async () => {
        try {
            const user = firebase.auth().currentUser;
            await user.delete()
            // Implementar funcao para desabilitar usuario no mongo

            ToastMessage('Sua conta foi deletada :(')
            props.navigation.navigate("Login")
        } catch (e) {
            console.error(e);
            ToastMessage(e)
        }
    }
    const goToTermoDeUso = async () => {
        try {
            const values = await GetUsuarioLogadoData()
            props.navigation.navigate("TermoUso", {emailUsuario: values.emailUsuario})

        }catch (e) {
            console.error('Erro ao abrir termo de uso', e);
        }
        props.navigation.toggleDrawer()
    }

    const goToViagens = async () => {
        try {
            const values = await GetUsuarioLogadoData()
            let viagensUsuario = await UserTravelsService(values)

            viagensUsuario = viagensUsuario.data.filter((r) => {
                if(!r.viagemCancelada) {
                    return r
                }
            })

            props.navigation.navigate("UserTravels", {"listaViagensDoUsuario": viagensUsuario})
        }catch (e) {
            console.error("Erro ao buscar as viagens do usuário!", e)
        }
        props.navigation.toggleDrawer()
    }

    return (

        <DrawerContentScrollView   {...props}>
            <View >
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="car"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Minhas viagens"
                    onPress={goToViagens}
                />


                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="book-open"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Termo de Uso"
                    onPress={goToTermoDeUso}
                />

                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="delete"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Deletar Conta"
                    onPress={deleteProfile}
                />
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sair"
                    onPress={signOutUser}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;