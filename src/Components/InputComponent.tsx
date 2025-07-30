import type { InputField } from "../types/alltypes";

export default function InputField({
  name,
  label,
  type,
  register,
  restrictions,
  error,
}: InputField) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name, restrictions)}
        aria-invalid={error ? "true" : "false"}
      />
      {error && renderError(error.type, label)}
    </div>
  );
}

function renderError(type: string, label: string) {
  switch (type) {
    case "required":
      return <p role="alert">{label} is required</p>;
    case "pattern":
      return <p role="alert">{label} is invalid</p>;
    case "minLength":
      return <p role="alert">{label} is too short</p>;
    default:
      return null;
  }
}

// Maybe use Zod instead of the inbuilt validators that way same validation for front and back and access to more validators
