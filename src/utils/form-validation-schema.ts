import * as yup from "yup";

//#region Users
export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .required("Please accept the terms and conditions and our privacy policy.")
    .oneOf(
      [true],
      "Please accept the terms and conditions and our privacy policy."
    ),
});
//#end region

export type CategoryListProps = {
  id: number,
  name: string,
};
//#region Category
export const categoryDetailsSchema = yup.object().shape({
  id: yup.number().optional(),
  name: yup.string().required("Category name is required"),
});
//#end region
