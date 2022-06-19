import axios from "axios";

const BuscarDetalhesViagem = async (idPassageiro) => {
    const urlBase = "http://192.168.0.110:3007"
    try {
        const res = await axios.get(urlBase+'/passageiro/detalharViagem', {
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

