import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  email: yup.string()
    .email("El correo electrónico")
    .required("El email es obligatorio"),
  password: yup.string()
    .required("El password es obligatorio"),
});