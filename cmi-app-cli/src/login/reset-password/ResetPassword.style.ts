import { StyleSheet } from "react-native";
import {theme} from "../../../App.style";

export const resetPasswordStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgb(101,37,131)"
    },
    view: {
        width: "80%"
    },
    cardTitle: {
        color: "rgb(101,37,131)"
    },
    cardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0
    },
    errorText: {
        color: "#ff0000"
    }
})
