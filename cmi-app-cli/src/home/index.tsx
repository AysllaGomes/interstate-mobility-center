import React, {Component, useEffect, useState} from "react";
import {SafeAreaView, ScrollView, Text, View, FlatList, Image, TouchableOpacity, StatusBar} from "react-native";
import {Button, TextInput} from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {indexStyle} from "./index.style";
import results from "./results";
import TravelList from "../components/home/travelList";

interface LoginScreenProps {
    navigation: any;
}


const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results)

    useEffect(() =>{
        if(searchText === '') {
            setList(results);
        }else {
            setList(
                results.filter(item=> (item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            );
        }
    }, [searchText]);

    const handleOrderClick = () => {};

    return(
        <SafeAreaView>
            <View>
                <TextInput
                    placeholder="Pesquise um pacote"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                    />
                <TouchableOpacity onPress={handleOrderClick}>
                    <MaterialCommunityIcons
                        name="order-alphabetical-ascending"
                        size={32}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
            <FlatList data={list} renderItem={({item}) => <TravelList data={item} />}
                      keyExtractor={(item) => item.id}
            />

            <StatusBar />
        </SafeAreaView>
    );

}

export default HomeScreen;