import React from "react";
import {Appbar} from "react-native-paper";

interface HeaderComponentParams {
    navigation: any;
    title: string,
}

export const HeaderComponent = (props: HeaderComponentParams) => {
    const signUp = () => props.navigation.goBack()
    return (
        <Appbar>
            <Appbar.BackAction onPress={() => {
                signUp()
            }}/>
            <Appbar.Content title={props.title}/>
        </Appbar>
    )
}