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
    }

    const goToViagens = async () => {

        try {
            const values = await GetUsuarioLogadoData()
            const travelList = await UserTravelsService(values)
            props.navigation.navigate("UserTravels", {listaViagensUsuario: travelList.data})

        }catch (e) {
            console.error("Erro ao buscar as viagens do usuário!", e)
        }

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
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign out"
                    onPress={signOutUser}
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

            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;