import type { formRestrictions } from "./types/alltypes";

const requiredParameters: formRestrictions = {
  patternMobileNumber: /^[0-9]{10}$/,
  patternEmail: /^[^\s@]+@[^\s@]+\.com$/,
  minLengthMobileNumber: 10,
  minLengthPassword: 5,
};

export default requiredParameters;
