import React, {useEffect, useState} from "react";
import {SafeAreaView, View, FlatList, TouchableOpacity, StatusBar, Text, Image} from "react-native";
import { TextInput } from "react-native-paper";
import results from "./results";
import {indexStyle} from "./index.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import {Item} from "react-native-paper/lib/typescript/components/List/List";

interface HomeScreenProps {
    navigation: NativeStackNavigatorProps
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
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results)
    const [dates, setDates] = useState({arrival: '', departure: ''})

    useEffect(() =>{
            (searchText === '') ? setList(results) : setList(results.filter(item=> (item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)))
        },[searchText]
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
        }
        else {
            if(dateDeparture.isValid()) {
                packagesWithDatesFiltered = packagesWithDatesFiltered.filter(travelPackages=> Math.abs(moment(travelPackages.dateDeparture, dateFormat).diff(dateDeparture, "days")) <= dateDiffAccepted)
            }
            if (dateArrival.isValid()) {
                packagesWithDatesFiltered = packagesWithDatesFiltered.filter(travelPackages=> Math.abs(moment(travelPackages.dateArrival, dateFormat).diff(dateArrival, "days")) <= dateDiffAccepted)
            }
        }
        setList(packagesWithDatesFiltered)
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

    const [estadosBrasil, setEstadosBrasil] = useState([])
    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const buscarEstadosApiGov = async () => {
            try {
                let res = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
                setEstadosBrasil(res.data)
            } catch (error) {

            }
        }
        buscarEstadosApiGov().then(r => r)

        const buscarMunicipiosApiGov = async (value) => {
            try {
                let res = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+value+"/municipios")
                setEstadosBrasil(res.data)
            } catch (error) {

            }
        }
    }, []);

DropDownPicker.setTheme("DARK")
    return(
        <SafeAreaView>
            <View>
                <TextInput
                    placeholder="Pesquise um pacote"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                    />
                <View style={indexStyle.dateFilters}>
                    <TouchableOpacity onPress={showDatePickerDeparture}>
                        <View style={indexStyle.DepartureDatePickerButton}>
                            <Text style={indexStyle.datePickerButtonText}>Data de Partida</Text>
                        </View>
                        
                    </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible.departure}
                    mode="date"
                    onConfirm={handleConfirmDeparture}
                    onCancel={hideDatePickerDeparture}
                />
                    <TouchableOpacity onPress={showDatePickerArrival}>
                        <View style={indexStyle.ArrivalDatePickerButton}>
                            <Text style={indexStyle.datePickerButtonText}>Data de Chegada</Text>
                        </View>
                    </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible.arrival}
                    mode="date"
                    onConfirm={handleConfirmArrival}
                    onCancel={hideDatePickerArrival}
                />
                </View>
            </View>
            <DropDownPicker
                items={estadosBrasil}
                value={value}
                setItems={setEstadosBrasil}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
                searchable={true}
                placeholder="Selecione um estado"
                searchPlaceholder="Pesquise um estado"
                schema={{
                    label: 'nome',
                    value: 'id'
                }}
            />
            <FlatList data={list} renderItem={({item}) => <TravelListItem navigation={props.navigation} data={item}  />}
                      keyExtractor={(item) => item.id}
            />
            <StatusBar />
        </SafeAreaView>
    );
}
export default HomeScreen;
