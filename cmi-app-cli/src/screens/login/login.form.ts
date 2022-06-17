import * as yup from 'yup';

export const loginForm = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    password: yup.string().required("Preencher campo!")

})