import axios from "axios";
const createUser = async (values) => {
    const urlBase = "http://192.168.0.107:3001/"
    console.log("Chegou aqui")
    try {
        let err = await axios.post(urlBase+'usuario/cadastro', {"nome": values.name, "email": values.email, "dataDeNascimento": values.birthDate, "numeroTelefoneCelular": values.phoneNumber.replace(/\D/g,''), "cpf": values.cpf})
        console.log('err', err);
    } catch (error) {
        console.log('error.response', error);
        return error.response
    }
}
export default createUser;
