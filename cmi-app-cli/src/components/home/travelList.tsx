import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {StyleSheet} from "react-native-web";

const TravelList = ( { data, navigation } ) => {
    const toTravelPackage = () => navigation.navigate("Package", {data: data})
    return(
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <Image source={data.image} />
            <View>
                <Text> {data.id}</Text>
                <Text> {data.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

//  const styles = StyleSheet.create({
//     image: {
//         width: 480,
//         height: 209
//     }
// })

export default TravelList;