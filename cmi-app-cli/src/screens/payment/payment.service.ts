import axios from "axios";
// import {GetUsuarioLogadoData} from "../../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
import {HOST_API_PASSAGEIRO} from "@env";

const registrarViagem = async (values) => {
    try {
        // const values = await GetUsuarioLogadoData()
        const res = await axios.post(HOST_API_PASSAGEIRO + '/passageiro/vinculoPassageiro', {
            idUsuario: values.idUsuario,
            idViagem: values.idViagem,
            usuarioPassageiro: values.usuarioPassageiro,
            dadosPagamento: values.DadosPagamento,
            listaPassageiros: values.passageiros
        })
        return res
    } catch (error) {
        return error.response
    }
}
export default registrarViagem;