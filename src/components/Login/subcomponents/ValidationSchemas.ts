import * as yup from "yup";
import isUpperCase from "-/src/utils/isUpperCase";
import isLowerCase from "-/src/utils/isLowerCase";
import {
  UsernameMin,
  PasswordMin,
  PasswordMax,
  Required,
  Email,
  EmailEqual,
  PasswordEqual,
  hasLowerCase,
  hasNumber,
  hasUpperCase
} from "-/src/utils/YupPremades";

const Yup = yup;

export const RegisterValidationSchema = Yup.object({
  username: Yup.string()
    .min(...UsernameMin())
    .required(...Required()),
  password: Yup.string()
    .min(...PasswordMin())
    .max(...PasswordMax())
    .required(...Required())
    .test(...hasUpperCase())
    .test(...hasLowerCase())
    .test(...hasNumber()),
  password_confirmation: Yup.string()
    .required(...Required())
    .test(...PasswordEqual()),
  email: Yup.string()
    .email(...Email())
    .required(...Required()),
  email_confirmation: Yup.string()
    .email(...Email())
    .required(...Required())
    .test(...EmailEqual())
});
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(...UsernameMin())
    .required(...Required()),
  password: Yup.string()
    .min(...PasswordMin())
    .max(...PasswordMax())
    .required(...Required())
    .test(...hasUpperCase())
    .test(...hasLowerCase())
    .test(...hasNumber())
});
