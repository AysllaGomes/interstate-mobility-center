import axios from "axios";
import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";

const UserTravels = async () => {
    const urlBase = "http://192.168.0.110:3002/"

    try {
        const values = await GetUsuarioLogadoData()
        const res = await axios.get(urlBase+'viagem/listar', {})
        console.log('tudo Certooo', res.status);

        return res
    } catch (error) {
        return error.response
    }
}
export default UserTravels;