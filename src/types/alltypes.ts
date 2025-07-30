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

type AgentForm = {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  password: string;
};

interface formRestrictions {
  patternMobileNumber: RegExp;
  patternEmail: RegExp;
  minLengthMobileNumber: number;
  minLengthPassword: number;
}

export type { UserLogin, isLoggedIN, InputField, AgentForm, formRestrictions };
