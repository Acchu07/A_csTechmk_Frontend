import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import getData from "../fetchApi";
import { loginURL } from "../urls";
import type { UserLogin, isLoggedIN } from "../types/alltypes";
import InputField from "./InputComponent";
import formRestrictions from "../formRestrictions";

export default function LoginPage({ setIsLoggedIn }: isLoggedIN) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    setIsLoading(true);
    const request = new Request(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const dataReceived = await getData(request);
    setIsLoading(false);
    if (dataReceived?.status === 200) {
      setIsLoggedIn(true);
    } else {
      setErrorMessage(dataReceived.data.message);
    }
  };

  return isLoading ? (
    <p>Checking With Server...</p>
  ) : (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
