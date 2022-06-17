import axios from "axios";

const BuscarDetalhesViagem = async (idViagem, idUsuario) => {
    const urlBase = "http://192.168.0.110:3007"
    try {
        const res = await axios.get(urlBase+'/passageiro/detalhamentoViagem', {
            headers: {
                "id-usuario": idUsuario,
                "id-viagem": idViagem
            }
        })
        console.log('tudo Certooo', res.status);

        return res
    } catch (error) {
        return error.response
    }
}
export default BuscarDetalhesViagem;