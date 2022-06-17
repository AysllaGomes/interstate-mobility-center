import * as yup from 'yup';
import {parse, isDate, format, toDate} from "date-fns";

export const paymentForm = yup.object().shape({
    numeroCartao: yup.string().required("Obrigatório!").matches(/^4[0-9]{12}(?:[0-9]{3})?$/, "Cartão inválido!"),
    mesCartao: yup.number().min(1, "Formato inválido!").max(12, "Formato inválido!").required("Obrigatório!"),
    anoCartao: yup.string().min(2, "Formato inválido!").max(2, "Formato inválido!").required("Obrigatório!"),
    cvcCartao: yup.string().min(3, "Formato inválido!").max(3, "Formato inválido!").required("Obrigatório!"),
    nomeTitularCartao: yup.string().required("Obrigatório!"),
    cpfTitular: yup.string().required("Obrigatório!").test("validar-cpf", "CPF inválido!", (e) => validaCpf(e)),

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