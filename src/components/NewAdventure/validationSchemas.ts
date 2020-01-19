import * as Yup from "yup";
import { Required } from "-/src/utils/YupPremades";

export const minName = (): [number, any] => [
  4,
  "Não possui mais que 4 caracteres"
];

export const max = (): [number, any] => [
  255,
  "Não pode possuir mais que 255 caracteres"
];
export const loreMax = (): [number, any] => [
  500,
  "Não pode possuir mais que 500 caracteres"
];

export const adventureFormValidationSchema = Yup.object({
  adventureName: Yup.string()
    .required(...Required())
    .min(...minName()),
  adventureDescription: Yup.string()
    .required(...Required())
    .min(...minName())
    .max(...max())
});

export const masterFormValidationSchema = Yup.object({
  masterName: Yup.string()
    .required(...Required())
    .min(...minName())
});

export const loreFormValidationSchema = Yup.object({
  adventureLore: Yup.string()
    .required(...Required())
    .min(...minName())
    .max(...loreMax())
});
