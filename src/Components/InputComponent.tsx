import type { InputField } from "../types/alltypes";

// Reusable Input Component for Forms whose Field Type is textual in nature
export default function InputField({
  name,
  label,
  type,
  register,
  restrictions,
  error,
}: InputField) {
  return (
    <div className="inputField-container">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-field"
        id={name}
        type={type}
        {...register(name, restrictions)}
        aria-invalid={error ? "true" : "false"}
      />
      {error && renderError(error.type, label)}
    </div>
  );
}
// Function to render error messages based on the type of error - To be extended depending on error
function renderError(type: string, label: string) {
  switch (type) {
    case "required":
      return (
        <p className="error-text" role="alert">
          {label} is required
        </p>
      );
    case "pattern":
      return (
        <p className="error-text" role="alert">
          {label} is invalid
        </p>
      );
    case "minLength":
      return (
        <p className="error-text" role="alert">
          {label} is too short
        </p>
      );
    default:
      return null;
  }
}

// Maybe use Zod instead of the inbuilt validators that way same validation for front and back and access to more validators
