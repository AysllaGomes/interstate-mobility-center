import {StatusBar, StyleSheet} from "react-native";
import {theme} from "../../App.style";
import {red50} from "react-native-paper/lib/typescript/styles/colors";

export const indexStyle = StyleSheet.create({

    content: {
        // View principal
    },
    filters: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    packagesContent: {
        marginBottom: 10
    },
    packagesContentInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: theme.colors.secondary,
    },
    packagesText: {
        color: "white"
    },
    buttonCleanFilters: {
        display: "flex",
        flexDirection: "column",
        color: "white",
        borderRadius: 4,
        backgroundColor: theme.colors.primary,

    },
    buttonsText: {
        color: "white",
        fontFamily: theme.fontFamily.fontFamily,

    },
    errorText: {
        color: theme.colors.error,
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
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 10,
    },
    textDateFilter: {
        marginTop: 20,
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
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        fontFamily: theme.fontFamily.fontFamily,
    },

    dropdownPickerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dropdownPicker: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: 10
    },
    dropdownPickerOrigem: {
        marginRight: 5
    },
    dropdownPickerDestino: {
        marginLeft: 5
    },
    text: {
        fontFamily: theme.fontFamily.fontFamily,
    },
    flatlist: {
        marginBottom: 10
    }
});

