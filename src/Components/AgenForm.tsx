import { useForm } from "react-hook-form";
import InputField from "./InputComponent";
import formRestrictions from "../formRestrictions";
import { useState } from "react";
import type { AgentForm } from "../types/alltypes";
import getData from "../fetchApi";
import { createAgentURL } from "../urls";

export default function AgentForm() {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    console.log(jsonReceived);
    jsonReceived ??
      alert("Duplicate Credentials || Not In DB || Or Server Not Reachable"); // ToDo: Show Error Message using state and setTimeout
    setIsSending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="name"
        label="Name"
        type="text"
        register={register}
        restrictions={{ required: true }}
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
      <select id="countryCode" {...register("countryCode", { required: true })}>
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
      <button type="submit" disabled={isSending}>
        {isSending ? "Sending..." : "Add Agent"}
      </button>
    </form>
  );
}
