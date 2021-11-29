import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from "../firebase/firebaseconfig"
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';

interface ScreenProps {
    navigation: NativeStackNavigatorProps;
}
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer'


function DrawerContent(props) {

    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            props.navigation.navigate("Login")
        } catch (e) {
            console.error(e);
        }
    }

    const goToTermoDeUso = () => {
        props.navigation.navigate("UserTravels")

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
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;