import { StyleSheet } from "react-native";
import {theme} from "../../App.style";

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
    }
});

