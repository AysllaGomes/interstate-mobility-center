import * as yup from 'yup';
import {parse, isDate} from "date-fns";

function parseDateString(value, originalValue) {
    return isDate(originalValue)
        ? originalValue
        : parse(originalValue, "dd/MM/yyyy", new Date().getDate());
}

export const registerForm = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    name: yup.string().required("Preencher campo!"),
    cpf: yup.string().required("Preencher campo!").test("validar-cpf", "CPF inválido!", (e) => validaCpf(e)),
    phoneNumber: yup.string().required("Preencher campo!"),
    birthDate: yup.date().required("Preencher campo!").transform(parseDateString).typeError("Data Inválida!"),
    password: yup.string().min(6, "Deve conter pelo menos 6 carácteres").max(20, "Deve conter no máximo 20 carácteres ").required("Preencher campo!").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 carácteres, 1 maiúsculo, 1 minúsculo, 1 número e 1 carácteres special"),
    ConfPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
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