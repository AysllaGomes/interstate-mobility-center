import * as yup from 'yup';
import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
    return isDate(originalValue)
        ? originalValue
        : parse(originalValue, "dd/MM/yyyy", new Date().getDate());
}

export const registerForm = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    name : yup.string().required("Preencher campo!"),
    cpf : yup.string().required("Preencher campo!"),
    phoneNumber: yup.string().required("Preencher campo!"),
    birthDate: yup.date().required("Preencher campo!").transform(parseDateString),
    password: yup.string().min(6, "Deve conter pelo menos 6 carácteres").max(20, "Deve conter no máximo 20 carácteres ").required("Preencher campo!").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Deve conter 8 carácteres, 1 maiúsculo, 1 minúsculo, 1 número e 1 carácteres special"),
   ConfPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})