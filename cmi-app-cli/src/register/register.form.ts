import * as yup from 'yup';

export const registerForm = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    name : yup.string().required("Preencher campo!"),
    phoneNumber: yup.number().required("Preencher campo!").positive().integer(),
    birthDate: yup.date().required("Preencher campo!"),
    password: yup.string().required("Preencher campo!"),

})

// const messages = {
//     en: {
//         equalPassword: "Os campos não coincidem",
//         required: "Campo obrigatório não preenchido",
//         email: "Favor informar um e-mail válido",
//         date: "O formato deve ser: ",
//         numbers: "Use somente números",
//         hasUpperCase: "Deve conter pelo menos uma letra maiúscula",
//         hasLowerCase: "Deve conter pelo menos uma letra minuscula",
//         minlength: "Deve conter pelo menos 6 carácteres",
//         maxlength: "Deve conter no máximo 20 carácteres ",
//         hasNumber: "Deve conter um número"
//     }
// }