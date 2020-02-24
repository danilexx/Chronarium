import * as Yup from "yup";
import isUpperCase from "./isUpperCase";
import isLowerCase from "./isLowerCase";

function isEqual(ref: any) {
  return function resolve(this: any, value: string) {
    return value === this.resolve(ref);
  };
}

export const hasUpperCase = (): [string, any, any] => [
  "hasUpperCase",
  "Deve haver ao menos 1 letra maiuscula",
  (value: string) => value?.split("").some(isUpperCase)
];

export const hasLowerCase = (): [string, any, any] => [
  "hasLowerCase",
  "Deve haver ao menos 1 letra minuscula",
  (value: string) => value?.split("").some(isLowerCase)
];

export const hasNumber = (): [string, any, any] => [
  "hasNumber",
  "Deve haver ao menos 1 numero",
  (value: string) => /\d/.test(value)
];

export const Email = (): [string] => ["Email invalido"];

export const Required = (): [string] => ["Required"];

export const EmailEqual = (): [string, any, any] => [
  "isEqual",
  "Os Emails devem ser iguais",
  isEqual(Yup.ref("email"))
];

export const PasswordEqual = (): [string, any, any] => [
  "isEqual",
  "As Senhas devem ser iguais",
  isEqual(Yup.ref("password"))
];

export const UsernameMin = (): [number, any] => [
  4,
  "Não possui mais que 4 caracteres"
];

export const PasswordMin = (): [number, any] => [
  6,
  "Não possui mais que 6 caracteres"
];

export const PasswordMax = (): [number, any] => [
  50,
  "Possui mais do que 100 caracteres"
];
