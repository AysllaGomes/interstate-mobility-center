import axios from "axios";
import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";

const UserTravelsService = async (values) => {
    const urlBase = "http://192.168.0.110:3007/"
    try {
        const res = await axios.get(urlBase+'passageiro/listarViagensVinculadoAoUsuario', {
            headers:{"id-usuario": values.idUsuario}
        })
        console.log('Lista de viagens ok', res.status);


        return res
    } catch (error) {
        return error.response
    }
}
export default UserTravelsService;