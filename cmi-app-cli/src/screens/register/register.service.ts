import axios from "axios";
import {HOST_API_USUARIO} from "@env";

const createUser = async (values) => {
    try {
         return await axios.post(HOST_API_USUARIO + '/usuario/cadastro', {"nome": values.name, "email": values.email, "dataDeNascimento": values.birthDate, "numeroTelefoneCelular": values.phoneNumber.replace(/\D/g,''), "cpf": values.cpf})
    } catch (error) {
        return error.response
    }
}
export default createUser;
