import {StyleSheet} from "react-native";
import {theme} from "../../../../App.style";

export const travelDetailsStyle = StyleSheet.create({
        content: {
            margin: 10,
        },
        images: {
            width: 480,
            height: 209
        },

        titleAnPricePackageContent: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 20
        },
        textTitle: {
            fontSize: 24,
        },
        priceContent: {
            display: "flex",
            flexDirection: "row-reverse",
            alignSelf: "flex-start"
        },
        descriptionContent: {
            marginBottom: 20,
        },
        text: {
            fontFamily: theme.fontFamily.fontFamily,
            fontSize: 18,
            color: theme.colors.textColor,
            marginBottom: 5,
        },
        textPrice: {
            fontSize: 20,
            color: "#339E00"
        },
        buttonText: {
            color: "white"
        }
    }
)