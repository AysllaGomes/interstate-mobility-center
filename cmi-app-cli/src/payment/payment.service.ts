import axios from "axios";
import {GetUsuarioLogadoData} from "../../assets/DadosUsuarioLogado/DadosUsuarioLogado";
const registrarViagem = async () => {
    const urlBase = "http://192.168.0.110:3007/"

    try {
        const values = await GetUsuarioLogadoData()
        const res = await axios.post(urlBase+'passageiro/vinculoPassageiro', {
            idUsuario: values.idUsuario,
            idViagem: values.idViagem,
            usuarioPassageiro: values.usuarioPassageiro,
            dadosPagamento: values.DadosPagamento
        })
        console.log('tudo Certooo', res.status);

        return res
    } catch (error) {
        return error.response
    }
}
export default registrarViagem;