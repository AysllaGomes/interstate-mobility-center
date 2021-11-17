import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../components/header/header.component';
import {Text} from "react-native-paper";
import {Formik} from 'formik';

import {theme} from '../../App.style';
import * as Animatable from 'react-native-animatable';

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    page: string,
    route: NativeStackNavigatorProps
}


const ResumoCompra = (props: ScreenProps) => {


    return (
        <SafeAreaView>
            <HeaderComponent title="Resumo compra" navigation={props.navigation}/>
            <ScrollView>
                <Text>Resumo compra</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResumoCompra;