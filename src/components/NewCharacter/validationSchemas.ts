import * as Yup from "yup";
import { Required } from "-/src/utils/YupPremades";

export const basicInformationValidationSchema = Yup.object({
  name: Yup.string().required(...Required()),
  age: Yup.string()
    .required(...Required())
    .min(1)
});

export const steticFormValidationSchema = Yup.object({
  appearance: Yup.string().required(...Required()),
  height: Yup.string().required(...Required()),
  race: Yup.string().required(...Required())
});

export const loreFormValidationSchema = Yup.object({
  lore: Yup.string()
    .required(...Required())
    .min(3)
    .max(255)
});

export const personalityValidationSchema = Yup.object({
  personality: Yup.string()
    .required(...Required())
    .min(3)
    .max(255)
});
