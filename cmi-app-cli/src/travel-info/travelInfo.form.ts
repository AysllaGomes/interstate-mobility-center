import * as yup from 'yup';
import {parse, isDate} from "date-fns";

const travelFromSchema = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    nome: yup.string().min(3).required("Preencher campo!"),
    phoneNumber: yup.string().required("Preencher campo!"),
    idade: yup.number().max(3).required("Preencher campo!"),
})

export default travelFromSchema;