import React, {useEffect, useState} from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Text,
    Image,
    ActivityIndicator, SafeAreaView
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import {Button, TextInput} from "react-native-paper";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import {MergeUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import { theme } from "../../../App.style";
interface HomeScreenProps {
    navigation: NativeStackNavigatorProps
}

const TravelListItem = ({data, navigation}) => {

    const toTravelPackage = () => MergeUsuarioLogadoData({idViagem: data._id}).then(
        navigation.navigate("Package", {data: data})
    )
    return (
        <TouchableOpacity onPress={() => toTravelPackage()}>
            <View style={indexStyle.packagesContent}>
                <Image style={indexStyle.images} source={{uri: data.image}}/>
                <View style={indexStyle.packagesContentInfo}>
                    <Text style={indexStyle.packagesText}>Destino: {data.titulo}</Text>
                    <Text style={indexStyle.packagesText}>Duração: {data.duracao}</Text>
                    <Text style={indexStyle.packagesText}>Preço: R$ {data.preco},00</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
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

    const listaPacotesViagensFiltrados = async () => {
        const urlBase = "http://192.168.0.110:3002"
        const dateFormat = 'DD/MM/YYYY'
        const dateDepartureUTC = moment(dates.departure, dateFormat)
        const dateArrivalUTC = moment(dates.arrival, dateFormat)

        let config = {
            headers: {}
        }
        if(dateDepartureUTC.isValid()) {
            config.headers["data-inicio"] = dateDepartureUTC.format("YYYY-MM-DD")
        }
        if(dateArrivalUTC.isValid()) {
            config.headers["data-fim"] = dateArrivalUTC.format("YYYY-MM-DD")
        }
        if(selectedState.departure != null) {
            config.headers["estado-origem"] = selectedState.departure
        }
        if(selectedState.arrival != null) {
            config.headers["estado-destino"] = selectedState.arrival
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
        listaPacotesViagensFiltrados();
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
            <ScrollView>
                <View>
                    {isLoaded ?
                        (<View style={indexStyle.loader}><Text > <ActivityIndicator size="large" color={theme.colors.primary} /></Text></View>)
                        :
                        (
                            <View>
                                <View style={indexStyle.content}>
                                    <View style={indexStyle.filtersContent}>
                                        <View style={indexStyle.botaoBuscaLivre}>
                                            <TextInput
                                                placeholder="Pesquise um pacote"
                                                value={searchText}
                                                onChangeText={(t) => setSearchText(t)}
                                            />
                                        </View>

                                        <View style={indexStyle.textDateFilter}>
                                            <Text  style={{
                                                ...{fontFamily: theme.fontFamily.fontFamily}, ...{
                                                    fontSize: 18
                                                }}}>Período da Viagem</Text>
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
                                        <View>
                                            <Button onPress={listaPacotesViagensFiltrados} style={indexStyle.buttonCleanFilters}><Text
                                                style={indexStyle.buttonsText}>Buscar</Text></Button>
                                        </View>
                                    </View>
                                    <View style={indexStyle.flatlist}>
                                        <FlatList data={minhaLista}
                                                  renderItem={({item}) =>
                                                      <TravelListItem navigation={props.navigation} data={item}/>
                                                  }
                                                  keyExtractor={(item) => item._id}
                                        />
                                        <StatusBar/>
                                    </View>
                                </View>
                            </View>
                        )}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
export default HomeScreen;
