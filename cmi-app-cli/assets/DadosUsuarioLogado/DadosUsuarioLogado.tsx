import { AsyncStorage } from "react-native";

// Async Storage, guardando dados do usuario no dispositivo
export const DadosUsuarioLogado = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@DadosUsuarioLogado_Key', jsonValue)
    } catch (e) {
        // saving error
    }
}

export const GetUsuarioLogadoData = async () => {
        try {
            const value = await AsyncStorage.getItem('@DadosUsuarioLogado_Key')
            if(value !== null) {
                // value previously stored
            }
            return Promise.resolve(value)
        } catch(e) {
            // error reading value
        }
}