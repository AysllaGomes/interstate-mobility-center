import * as yup from 'yup';
import {parse, isDate, format, toDate} from "date-fns";

// function parseDateString(value, originalValue) {
//     console.log('originalValue', originalValue);
//     console.log('value', value);
//     let date = originalValue.split('/')
//     let day = Number(date[0])
//     let month = Number(date[1])
//     let year = Number(date[2])
//     return isDate(originalValue) ? originalValue : toDate(new Date(year, month, day))
// }

export const registerForm = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    name: yup.string().required("Preencher campo!"),
    cpf: yup.string().required("Preencher campo!").test("validar-cpf", "CPF inválido!", (e) => validaCpf(e)),
    phoneNumber: yup.string().required("Preencher campo!").min(15, "Muito curto!").max(15),
    birthDate: yup.string().required("Preencher campo!").matches(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/, "Data inválida!").typeError("Data inválida!"),
    password: yup.string().max(20, "Deve conter no máximo 20 carácteres ").required("Preencher campo!").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 caracteres, 1 maiúsculo, 1 minúsculo, 1 número e 1 caracter especial"),
    ConfPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais!'),
})


function validaCpf(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')

    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}