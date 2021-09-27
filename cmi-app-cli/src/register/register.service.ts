import axios from "axios";
const createUser = (values) => {
    console.log(values)
        axios.post('http://localhost:3000/usuario/cadastro', {"nome": values.name, "email": values.email, "dataDeNascimento": values.birthDate, "numeroTelefoneCelular": values.phoneNumber}).then(response => {
            console.log(response.data)
        }).catch((error) => {
            console.log('Error retrieving data')
            console.log(error)
            return error;
        })
    return null;
}
export default createUser;
