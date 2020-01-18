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

export const adventureFormValidationSchema = Yup.object({
  adventureName: Yup.string()
    .required(...Required())
    .min(...minName()),
  adventureDescription: Yup.string()
    .required(...Required())
    .min(...minName())
    .max(...max())
});
