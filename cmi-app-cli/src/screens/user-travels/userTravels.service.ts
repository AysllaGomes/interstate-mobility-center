import axios from "axios";
import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {HOST_API_PASSAGEIRO} from "@env";

const UserTravelsService = async (values) => {
    try {
        const res = await axios.get(HOST_API_PASSAGEIRO + '/passageiro/listarViagensVinculadoAoUsuario', {
            headers:{"id-usuario": values.idUsuario}
        })
        return res
    } catch (error) {
        return error.response
    }
}
export default UserTravelsService;