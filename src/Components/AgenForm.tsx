import { useForm } from "react-hook-form";
import InputField from "./InputComponent";
import formRestrictions from "../formRestrictions";
import { useState, useRef } from "react";
import type { AgentForm } from "../types/alltypes";
import getData from "../fetchApi";
import { createAgentURL } from "../urls";

// Form To Create An Agent
export default function AgentForm() {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasCreated, setHasCreated] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentForm>();

  const onSubmit = async (data: AgentForm) => {
    setIsSending(true);
    const updatedData = {
      ...data,
      mobile: Number(data.mobile),
    };

    const request = new Request(createAgentURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });
    const jsonReceived = await getData(request);
    if (jsonReceived.status === 200) {
      setHasCreated(jsonReceived.data.message);
      timeoutRef.current = setTimeout(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setHasCreated("");
        reset();
      }, 5000);
    } else {
      setErrorMessage(jsonReceived.data.message);
    }
    setIsSending(false);
  };

  return hasCreated ? (
    <p>{hasCreated}</p>
  ) : (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="name"
          label="Name"
          type="text"
          register={register}
          restrictions={{
            minLength: formRestrictions.minLengthPassword,
            required: true,
          }}
          error={errors.name}
        />
        <InputField
          name="email"
          label="Email"
          type="email"
          register={register}
          restrictions={{
            required: true,
            pattern: formRestrictions.patternEmail,
          }}
          error={errors.email}
        />
        <label htmlFor="countryCode">Country Code</label>
        <select
          id="countryCode"
          {...register("countryCode", { required: true })}
        >
          <option value="+91">+91</option>
        </select>

        <InputField
          name="mobile"
          label="Mobile Number"
          type="tel"
          register={register}
          restrictions={{
            required: true,
            pattern: formRestrictions.patternMobileNumber,
            minLength: formRestrictions.minLengthMobileNumber,
          }}
          error={errors.mobile}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          register={register}
          restrictions={{
            required: true,
            minLength: formRestrictions.minLengthPassword,
          }}
          error={errors.password}
        />
        <button className="btn" type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Add Agent"}
        </button>
        {errorMessage && (
          <div className="error-text flex items-center" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
