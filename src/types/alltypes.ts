import type { FieldError } from "react-hook-form";

type UserLogin = {
  email: string;
  password: string;
};

type isLoggedIN = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

type InputField = {
  name: string;
  label: string;
  type: string;
  register: any; // TODO: fix this
  restrictions: any; // TODO: fix this
  error?: FieldError;
};

export type { UserLogin, isLoggedIN, InputField };
