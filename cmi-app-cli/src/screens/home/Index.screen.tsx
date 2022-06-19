import React, {useEffect, useRef, useState} from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator, Animated
} from "react-native";
import {  ScrollView } from 'react-native-virtualized-view';
import {Button, TextInput} from "react-native-paper";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import {MergeUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import { theme } from "../../../App.style";
import TravelListComponent from "../../components/travel-list/TravelListComponent";
interface HomeScreenProps {
    navigation: NativeStackNavigatorProps
}



const HomeScreen = (props: HomeScreenProps) => {
    const [estadosBrasil, setEstadosBrasil] = useState([])
    const [valueDropdownPartida, setValueDropdownPartida] = useState(null)
    const [openDropdownPartida, setOpenDropdownPartida] = useState(false)
    const [valueDropdownDestino, setValueDropdownDestino] = useState(null)
    const [openDropdownDestino, setOpenDropdownDestino] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [dates, setDates] = useState({arrival: '', departure: ''})
    const [selectedState, setSelectedState] = useState({arrival: '', departure: ''})
    const [minhaLista, setMinhaLista] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [isScrolling, setIsScrolling] = useState(true);

    const listaPacotesViagensFiltrados = async () => {
        const urlBase = "http://192.168.0.110:3002"
        const dateFormat = 'DD/MM/YYYY'
        const dateDepartureUTC = moment(dates.departure, dateFormat)
        const dateArrivalUTC = moment(dates.arrival, dateFormat)

        console.log('valueDropdownPartida', valueDropdownPartida);
        console.log('valueDropdownDestino', valueDropdownDestino);

        let config = {
            headers: {

            }
        }
        config.headers['Accept-Encoding'] = "gzip, deflate, br"
        config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        if(dateDepartureUTC.isValid()) {
            config.headers["data-inicio"] = dateDepartureUTC.format("YYYY-MM-DD")
        }
        if(dateArrivalUTC.isValid()) {
            config.headers["data-fim"] = dateArrivalUTC.format("YYYY-MM-DD")
        }
        if(valueDropdownPartida != null) {
            config.headers["estado-origem"] = valueDropdownPartida
        }
        if(valueDropdownDestino != null) {
            config.headers["estado-destino"] = valueDropdownDestino
        }
        if(searchText != ''){
            config.headers["titulo"] = searchText
        }

        try {
            let res = await axios.get(urlBase + "/viagem/listar", config)
            setMinhaLista(res.data)
            setIsLoaded(false)
        } catch (error) {
            return console.error('Erro carregar viagens!')
        }

    }

    useEffect(() => {
        listaPacotesViagensFiltrados().then(r => r);
    }, [])

    const [isDatePickerVisible, setDatePickerVisibility] = useState({departure: false, arrival: false});
    const showDatePickerDeparture = () => {setDatePickerVisibility({...isDatePickerVisible, departure: true,});}
    const hideDatePickerDeparture = () => {setDatePickerVisibility({...isDatePickerVisible, departure: false});}
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

    const cleanFilters = () => {
        setSearchText('')
        setDates({arrival: null, departure: null})
        setValueDropdownPartida(null)
        setValueDropdownDestino(null)
        setSelectedState({arrival: null, departure: null})

    }

    const searchComponent = (isLoaded) => {

        return(
            isLoaded ?
                (<View style={indexStyle.loader}><Text > <ActivityIndicator size="large" color={theme.colors.primary} /></Text></View>)
                :
                (
                    <View>
                        <View style={indexStyle.content}>
                            <View style={indexStyle.filtersContent}>
                                <View style={indexStyle.textDateFilter}>
                                    <Text  style={{
                                        ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                                            fontSize: 18
                                        }}}>Periodo da Viagem</Text>
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
                                            listMode="MODAL"
                                            scrollViewProps={{nestedScrollEnabled: true,}}
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
                                                value: 'nome'
                                            }}
                                        />
                                    </View>
                                    <View style={[indexStyle.dropdownPicker, indexStyle.dropdownPickerDestino]}>
                                        <DropDownPicker
                                            listMode="MODAL"
                                            scrollViewProps={{nestedScrollEnabled: true,}}
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
                                                value: 'nome'
                                            }}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Button onPress={cleanFilters} style={indexStyle.buttonCleanFilters}><Text
                                        style={indexStyle.buttonsText}>Limpar filtros</Text></Button>
                                </View>
                                <View>
                                    <Button onPress={listaPacotesViagensFiltrados} style={indexStyle.buttonCleanFilters}><Text
                                        style={indexStyle.buttonsText}>Buscar</Text></Button>
                                </View>
                            </View>
                        </View>
                    </View>
                )


        )
    }

    DropDownPicker.setTheme("DARK")

    return (
        <View>
            <ScrollView style={{zIndex: 0}}>
                {
                    searchComponent(isLoaded)
                }
                <View style={[indexStyle.flatlist]}>
                    <FlatList
                        listKey="key1"
                        data={minhaLista}
                        renderItem={({item}) => (
                            <TravelListComponent navigation={props.navigation} data={item}/>
                        )}
                        keyExtractor={(item, index) => `_key${index.toString()}`}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
export default HomeScreen;
