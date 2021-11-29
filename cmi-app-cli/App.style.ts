import {DefaultTheme} from "react-native-paper";
const primary = "#105652"
const secondary = "#212121"
export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: primary,
        secondary: secondary,
        textColor: "rgba(32,32,32, 0.6)",
        background: "transparent",
        diplayErrorMessage: "red",
        buttons: "#B91646"
    },
    toastErrorMensage: {
        background: secondary,
        successsTextColor: "green",
        warningTextColor: "yellow",
        dangerTextColor: "white"
    },
    fontFamily: {
        fontFamily: "GermaniaOne_400Regular",

    },
    buttons: {
        color: "white",
        borderRadius: 4,
        // backgroundColor: "#FE7700",
        backgroundColor: primary,
    }
}

