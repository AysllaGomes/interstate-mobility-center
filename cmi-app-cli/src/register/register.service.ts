import axios from "axios";
const createUser = async (values) => {
    const urlBase = "http://192.168.0.107:3000/"
    try {
        return await axios.post(urlBase+'usuario/cadastro', {"nome": values.name, "email": values.email, "dataDeNascimento": values.birthDate, "numeroTelefoneCelular": values.phoneNumber})
    } catch (error) {
        return error.response
    }
}
export default createUser;
