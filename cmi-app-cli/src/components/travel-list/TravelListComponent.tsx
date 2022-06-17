import {MergeUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {Image, TouchableOpacity, View} from "react-native";
import {indexStyle} from "../../screens/home/index.style";
import {Text} from "react-native-paper";
import React from "react";

const TravelListComponent = ({data, navigation}) => {

    const toTravelPackage = () => MergeUsuarioLogadoData({idViagem: data._id}).then(
        navigation.navigate("Package", {data: data})
    )
    return (
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <View style={indexStyle.packagesContent}>
                <Image style={indexStyle.images} source={{uri: data.image}}/>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Origem: {data.estadoOrigem}</Text>
                    <Text style={indexStyle.packagesText}>Destino: {data.estadoDestino}</Text>
                </View>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Período: {data.duracao} dias</Text>
                    <Text style={indexStyle.packagesText}>R$ {data.preco},00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default TravelListComponent;