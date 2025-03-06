import { object, string } from "yup";

export const signInSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export const onboardingSchema = object({
  firstname: string().required(),
  lastname: string().required(),
  phone: string().optional(),
  country: string().required(),
});
