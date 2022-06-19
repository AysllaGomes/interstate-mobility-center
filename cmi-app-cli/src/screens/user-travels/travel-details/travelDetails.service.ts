import axios from "axios";
import {HOST_API_PASSAGEIRO} from "@env";

const BuscarDetalhesViagem = async (idPassageiro) => {
    try {
        const res = await axios.get(HOST_API_PASSAGEIRO + '/passageiro/detalharViagem', {
            headers: {
                "id-passageiro": idPassageiro
            }
        })
        return res
    } catch (error) {
        return error.response
    }
}
export default BuscarDetalhesViagem;

