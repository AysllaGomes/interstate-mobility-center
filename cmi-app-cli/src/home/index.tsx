import React, {useEffect, useState} from "react";
import {SafeAreaView, View, FlatList, TouchableOpacity, StatusBar, Text, Image, ScrollView} from "react-native";
import {Button} from "react-native-paper";
import {TextInput} from "react-native-paper";
import results from "./results";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';

interface HomeScreenProps {
    navigation: NativeStackNavigatorProps
}

const TravelListItem = ({data, navigation}) => {
    const toTravelPackage = () => navigation.navigate("Package", {data: data})
    return (
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <View style={indexStyle.packagesContent}>
                <Image style={indexStyle.images} source={data.image}/>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Duração: {data.duracao}</Text>
                    <Text style={indexStyle.packagesText}>Preço: {data.preco}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const HomeScreen = (props: HomeScreenProps) => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results)
    const [dates, setDates] = useState({arrival: '', departure: ''})

    useEffect(() => {
            (searchText === '') ? setList(results) : setList(results.filter(item => (item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)))
        }, [searchText]
    );

    useEffect(() => {
        // datas picker
        const dateFormat = 'DD/MM/YYYY'
        const dateDiffAccepted = 2

        let dateDeparture = moment(dates.departure, dateFormat)
        let dateArrival = moment(dates.arrival, dateFormat)
        let packagesWithDatesFiltered = results

        if (!dateArrival.isValid() && !dateDeparture.isValid()) {
            setList(results)
        } else {
            if (dateDeparture.isValid()) {
                packagesWithDatesFiltered = packagesWithDatesFiltered.filter(travelPackages => Math.abs(moment(travelPackages.dateDeparture, dateFormat).diff(dateDeparture, "days")) <= dateDiffAccepted)
            }
            if (dateArrival.isValid()) {
                packagesWithDatesFiltered = packagesWithDatesFiltered.filter(travelPackages => Math.abs(moment(travelPackages.dateArrival, dateFormat).diff(dateArrival, "days")) <= dateDiffAccepted)
            }
        }
        setList(packagesWithDatesFiltered)
    }, [dates]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState({departure: false, arrival: false});

    const showDatePickerDeparture = () => {
        setDatePickerVisibility({...isDatePickerVisible, departure: true,});
    }
    const hideDatePickerDeparture = () => {
        setDatePickerVisibility({...isDatePickerVisible, departure: false});
    }
    const handleConfirmDeparture = (date) => {
        const departureDate = date.getDate().toString().concat("/").concat((date.getUTCMonth() + 1).toString()).concat("/").concat(date.getFullYear().toString())
        hideDatePickerDeparture()
        setDates({...dates, departure: departureDate})
    }
    const showDatePickerArrival = () => {
        setDatePickerVisibility({...isDatePickerVisible, arrival: true,});
    }
    const hideDatePickerArrival = () => {
        setDatePickerVisibility({...isDatePickerVisible, arrival: false,});
    }

    const handleConfirmArrival = (date) => {
        const dateArrival = date.getDate().toString().concat("/").concat((date.getUTCMonth() + 1).toString()).concat("/").concat(date.getFullYear().toString())
        hideDatePickerArrival()
        setDates({...dates, arrival: dateArrival})
    }

    const [estadosBrasil, setEstadosBrasil] = useState([])
    const [valueDropdownPartida, setValueDropdownPartida] = useState(null)
    const [openDropdownPartida, setOpenDropdownPartida] = useState(false)

    const [valueDropdownDestino, setValueDropdownDestino] = useState(null)
    const [openDropdownDestino, setOpenDropdownDestino] = useState(false)

    const cleanFilters = () => {
        setSearchText('')
        setDates({arrival: null, departure: null})
        setValueDropdownPartida(null)
        setValueDropdownDestino(null)
    }

    useEffect(() => {
        const buscarEstadosApiGov = async () => {
            try {
                let res = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
                setEstadosBrasil(res.data)
            } catch (error) {

            }
        }
        buscarEstadosApiGov().then(r => r)
    }, []);
    DropDownPicker.setTheme("DARK")
    return (
        <SafeAreaView>
            <View style={indexStyle.content}>
                <View style={indexStyle.filters}>
                    <TextInput
                        placeholder="Pesquise um pacote"
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                    />
                    <View style={indexStyle.textDateFilter}>
                        <Text>Periodo da Viagem</Text>
                    </View>

                    <View style={indexStyle.dateFilters}>
                        <TouchableOpacity onPress={showDatePickerDeparture}>
                            <View style={indexStyle.DepartureDatePickerButton}>
                                <Text style={indexStyle.datePickerButtonText}>Partida: {dates.departure}</Text>
                            </View>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible.departure}
                            mode="date"
                            onConfirm={handleConfirmDeparture}
                            onCancel={hideDatePickerDeparture}
                            locale="es-ES"
                        />
                        <TouchableOpacity onPress={showDatePickerArrival}>

                            <View style={indexStyle.ArrivalDatePickerButton}>
                                <Text style={indexStyle.datePickerButtonText}>Volta: {dates.arrival}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible.arrival}
                        mode="date"
                        onConfirm={handleConfirmArrival}
                        onCancel={hideDatePickerArrival}
                        locale="es-ES"
                    />


                    <View style={indexStyle.dropdownPickerContainer}>
                        <View style={[indexStyle.dropdownPicker, indexStyle.dropdownPickerOrigem]}>
                            <DropDownPicker
                                items={estadosBrasil}
                                value={valueDropdownPartida}
                                setItems={setEstadosBrasil}
                                setValue={setValueDropdownPartida}
                                open={openDropdownPartida}
                                setOpen={setOpenDropdownPartida}
                                searchable={true}
                                placeholder="Origem"
                                searchPlaceholder="Pesquise um estado"
                                schema={{
                                    label: 'nome',
                                    value: 'id'
                                }}
                            />
                        </View>
                        <View style={[indexStyle.dropdownPicker, indexStyle.dropdownPickerDestino]}>
                            <DropDownPicker
                                items={estadosBrasil}
                                value={valueDropdownDestino}
                                setItems={setEstadosBrasil}
                                setValue={setValueDropdownDestino}
                                open={openDropdownDestino}
                                setOpen={setOpenDropdownDestino}
                                searchable={true}
                                placeholder="Destino"
                                searchPlaceholder="Pesquise um estado"
                                schema={{
                                    label: 'nome',
                                    value: 'id'
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Button onPress={cleanFilters} style={indexStyle.buttonCleanFilters}><Text
                            style={indexStyle.buttonsText}>Limpar filtros</Text></Button>
                    </View>
                </View>

                <View style={indexStyle.flatlist}>
                    <FlatList data={list}
                              renderItem={({item}) => <TravelListItem navigation={props.navigation} data={item}/>}
                              keyExtractor={(item) => item.id}
                    />
                    <StatusBar/>
                </View>

            </View>
        </SafeAreaView>

    );
}
export default HomeScreen;
