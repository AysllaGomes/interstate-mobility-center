import React, {useEffect, useState} from "react";
import {SafeAreaView, View, FlatList, TouchableOpacity, StatusBar, Text, Image, ScrollView, AsyncStorage} from "react-native";
import {Button} from "react-native-paper";
import {TextInput} from "react-native-paper";
import results from "./results";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from "@react-navigation/native";
import { GetUsuarioLogadoData } from "../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
interface HomeScreenProps {
    navigation: NativeStackNavigatorProps
}
// Chega a ser cômico, mas precisa disso para habilitar Scroll sem Wornings kkkk
function VirtualizedView(props: any) {
    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            ListHeaderComponent={() => (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        />
    );
}
// Fim
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
    const [searchText, setSearchText] = useState('')
    const [list, setList] = useState(results)
    const [dates, setDates] = useState({arrival: '', departure: ''})
    const [selectedState, setSelectedState] = useState({arrival: '', departure: ''})
    const [usuarioLogado, setUsuarioLogado] = useState({email: ''})


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
        let packagesFiltered = results
        let packagesWithDatesFiltered = results

        const filterByDate = () => {
                if (dateDeparture.isValid()) {
                    packagesFiltered = packagesFiltered.filter(travelPackages => Math.abs(moment(travelPackages.dateDeparture, dateFormat).diff(dateDeparture, "days")) <= dateDiffAccepted)
                }
                if (dateArrival.isValid()) {
                    packagesFiltered = packagesFiltered.filter(travelPackages => Math.abs(moment(travelPackages.dateArrival, dateFormat).diff(dateArrival, "days")) <= dateDiffAccepted)
                }
        }

        const filterByStates = () => {
            if(selectedState.departure != null && selectedState.departure != ''){
                packagesFiltered = packagesFiltered.filter(travelPackages => travelPackages.estadoOrigem == selectedState.departure)
            }
            if(selectedState.arrival != null && selectedState.arrival != ''){
                packagesFiltered = packagesFiltered.filter(travelPackages => travelPackages.estadoDestino == selectedState.arrival)
            }
        }

        filterByDate()
        filterByStates()
        setList(packagesFiltered)
    }, [dates, selectedState]);

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
        setSelectedState({arrival: null, departure: null})
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
        <VirtualizedView>
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
                            minimumDate={new Date()}

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
                        minimumDate={new Date()}
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
                                onChangeValue={value => setSelectedState({...selectedState, departure: value != null ? value.toString() : ''})}
                                schema={{
                                    label: 'nome',
                                    value: 'nome'
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
                                onChangeValue={value => setSelectedState({...selectedState, arrival: value != null ? value.toString() : ''})}
                                schema={{
                                    label: 'nome',
                                    value: 'nome'
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
        </VirtualizedView>
        </SafeAreaView>

    );
}
export default HomeScreen;
