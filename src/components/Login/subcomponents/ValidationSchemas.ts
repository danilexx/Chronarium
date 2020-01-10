import * as yup from "yup";
import isUpperCase from "-/src/utils/isUpperCase";
import isLowerCase from "-/src/utils/isLowerCase";

const Yup = yup;

function isEqual(ref: any) {
  return function resolve(this: any, value: string) {
    return value === this.resolve(ref);
  };
}

export const RegisterValidationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Não possui mais que 4 caracteres")
    .required("Obrigatorio"),
  password: Yup.string()
    .min(6, "Não possui mais que 6 caracteres")
    .max(100, "Possui mais do que 100 caracteres")
    .required("Obrigatorio")
    .test(
      "hasUpperCase",
      "Deve haver ao menos 1 letra maiuscula",
      (value: string) => value?.split("").some(isUpperCase)
    )
    .test(
      "hasLowerCase",
      "Deve haver ao menos 1 letra minuscula",
      (value: string) => value?.split("").some(isLowerCase)
    )
    .test("hasNumber", "Deve haver ao menos 1 numero", (value: string) =>
      // eslint-disable-next-line no-restricted-globals
      value
        ?.split("")
        .some((e: string): boolean => typeof Number(e) === "number")
    ),
  password_confirmation: Yup.string()
    .required("Obrigatorio")
    .test(
      "isEqual",
      "As Senhas devem ser iguais",
      isEqual(Yup.ref("password"))
    ),
  email: Yup.string()
    .email("Email invalido")
    .required("Obrigatorio"),
  email_confirmation: Yup.string()
    .email("Email invalido")
    .required("Obrigatorio")
    .test("isEqual", "Os Emails devem ser iguais", isEqual(Yup.ref("email")))
});
