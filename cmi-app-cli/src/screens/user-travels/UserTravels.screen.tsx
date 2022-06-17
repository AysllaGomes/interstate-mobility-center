import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HeaderComponent} from '../../components/header/Header.component';
import {Text} from "react-native-paper";

interface ScreenProps {
    navigation: NativeStackNavigatorProps,
    route: NativeStackNavigatorProps
}
const UserTravelsScreen = (props: ScreenProps) => {

    return (
        <SafeAreaView>
            <HeaderComponent title="Minhas viagens" navigation={props.navigation}/>
            <View>
                <Text>My travels</Text>
            </View>
        </SafeAreaView>
    )
}
export default UserTravelsScreen;