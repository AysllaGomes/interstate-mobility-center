import React, {useEffect, useState} from "react";
import {SafeAreaView, View, FlatList, TouchableOpacity, StatusBar, Text, Image, Button} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import results from "./results";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
interface HomeScreenProps {
    navigation: any,
    page: null
}

const TravelListItem = ({ data, navigation } ) => {
    const toTravelPackage = () => navigation.navigate("Package", {data: data})
    return(
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <Image  style={indexStyle.images} source={data.image} />
            <View>
                <Text> {data.id}</Text>
                <Text> {data.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const HomeScreen = (props: HomeScreenProps) => {
    const toTravelPackage = () => props.navigation.navigate("Package")

    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results)
    const [dates, setDates] = useState({arrival: '', departure: ''})


    useEffect(() =>{
        if(searchText === '') {
            setList(results);
        }else {
            setList(
                results.filter(item=> (item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            );
        }
    }, [searchText]);

    useEffect(() =>{
        if(dates.departure === '' && dates.arrival === '') {
            setList(results);
        }else {
            setList(
                results.filter((pacote) => pacote.dateArrival == dates.arrival && pacote.dateDeparture == dates.departure)
            );
        }
    }, [dates]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState({departure: false, arrival: false});

    const showDatePickerDeparture = () => {
        setDatePickerVisibility({...isDatePickerVisible, departure: true, });
    }
    const hideDatePickerDeparture = () => {
        setDatePickerVisibility({...isDatePickerVisible, departure: false});
    }

    const handleConfirmDeparture = (date) => {
         const departureDate = date.getDate().toString().concat("/").concat((date.getUTCMonth()+1).toString()).concat("/").concat(date.getFullYear().toString())
         hideDatePickerDeparture()

        setDates({...dates, departure: departureDate})
    }
    const showDatePickerArrival = () => {
        setDatePickerVisibility({...isDatePickerVisible, arrival: true, });


    }
    const hideDatePickerArrival = () => {
        setDatePickerVisibility({...isDatePickerVisible, arrival: false, });
    }


    const handleConfirmArrival = (date) => {
        const dateArrival = date.getDate().toString().concat("/").concat((date.getUTCMonth()+1).toString()).concat("/").concat(date.getFullYear().toString())
        hideDatePickerArrival()

        setDates({...dates, arrival: dateArrival})
    }

    const filterByDate = (dateArrival, dateDeparture) => {
        return results.filter((pacote) => pacote.dateArrival == dateArrival && pacote.dateDeparture == dateDeparture);
    }

    console.log('Arrival Date', dates.arrival);
    console.log('Departure Date', dates.departure);
    console.log('Datas ', filterByDate(dates.arrival, dates.departure))

    function handleOrderClick() {

    }

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
                <Button title="Show date partida" onPress={showDatePickerDeparture}>Date</Button>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible.departure}
                    mode="date"
                    onConfirm={handleConfirmDeparture}
                    onCancel={hideDatePickerDeparture}

                />
                <Button title="Show date Picker Chegada" onPress={showDatePickerArrival}>Data chegada</Button>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible.arrival}
                    mode="date"
                    onConfirm={handleConfirmArrival}
                    onCancel={hideDatePickerArrival}

                />
            </View>
            <FlatList data={list} renderItem={({item}) => <TravelListItem navigation={props.navigation} data={item}  />}
                      keyExtractor={(item) => item.id}
            />
            <StatusBar />
        </SafeAreaView>
    );

}


export default HomeScreen;
