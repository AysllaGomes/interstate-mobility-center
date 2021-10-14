import {StatusBar, StyleSheet} from "react-native";
import {theme} from "../../App.style";
import {red50} from "react-native-paper/lib/typescript/styles/colors";

export const indexStyle = StyleSheet.create({
    content: {
        padding: 15,
        paddingTop: 0
    },
    icon: {
        color: theme.colors.primary
    },
    button: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0
    },
    errorText: {
        color: "#ff0000"
    },
    dateComponent: {
        width: 350,
    },
    images: {
        width: 480,
        height: 209
    },
    dateFilters: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        margin: 10
    },
    DepartureDatePickerButton: {
        flexGrow: 1
    },
    ArrivalDatePickerButton: {
        flexGrow: 1,
    },
    datePickerButtonText: {
        textAlign: "center",
        padding: 10,
        color: "white",
        backgroundColor: '#106EBE',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,

    }
});

