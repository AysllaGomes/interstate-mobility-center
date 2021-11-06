import * as yup from 'yup';
import {parse, isDate} from "date-fns";

const travelInfo = yup.object().shape({
    email: yup.string().required("Preencher campo!").email("Email inválido!"),
    name: yup.string().required("Preencher campo!"),
    phoneNumber: yup.string().required("Preencher campo!"),
    idade: yup.number().max(3).required("Preencher campo!"),
})

export default travelInfo;