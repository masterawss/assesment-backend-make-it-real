import * as yup from 'yup';

export const schemaRegister = yup.object().shape({
  email: yup.string()
    .email("El correo electrónico")
    .required("El email es obligatorio"),
  password: yup.string()
    .min(4, "La contraseña debe tener almenos 4 caracteres")
    .required("El password es obligatorio"),
});