import {StyleSheet} from "react-native";
import {theme} from "../../../App.style";

export const userTravelsStyle = StyleSheet.create({

        packagesContent: {
            marginBottom: 10,
        },
        images: {
            width: 480,
            height: 209
        },
        textSemviagens: {
            alignSelf: "center",
            fontFamily: theme.fontFamily.fontFamily,
            fontSize: 18,
            color: theme.colors.textColor,
            marginBottom: 5,
            marginTop: 20
        },
        packagesContentInfo: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            // borderBottomRightRadius: 10,
            // borderBottomLeftRadius: 10,
            backgroundColor: theme.colors.secondary,
        },
        packagesText: {
            color: "white"
        },
        flatlist: {
        }
    }
)