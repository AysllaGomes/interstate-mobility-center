import {DefaultTheme} from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(101,37,131)",
        secondary: "#212121",
        textColor: "rgba(32,32,32, 0.6)" +

            "",
        background: "transparent",
        error: "red"
    },
    fontFamily: {
        fontFamily: "GermaniaOne_400Regular",
    },
    buttons: {
        color: "white",
        borderRadius: 4,
        // backgroundColor: "#FE7700",
        backgroundColor: "rgb(101,37,131)",
    }
}

