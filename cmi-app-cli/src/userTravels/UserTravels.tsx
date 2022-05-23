import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/Header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';
import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
}
const UserTravels = (props: ScreenProps) => {

    return (
        <SafeAreaView>
            <HeaderComponent title="Minhas viagens" navigation={props.navigation}/>
            <View>
                <Text>My travels</Text>
            </View>
        </SafeAreaView>
    )
}
export default UserTravels;