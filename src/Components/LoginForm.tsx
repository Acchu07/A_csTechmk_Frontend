import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import getData from "../fetchApi";
import { loginURL } from "../urls";
import type { UserLogin, isLoggedIN } from "../types/alltypes";
import InputField from "./InputComponent";

const requiredParameters: { minLength: number } = {
  minLength: 5,
};

export default function LoginPage({ setIsLoggedIn }: isLoggedIN) {
  const [isLoading, setIsLoading] = useState(false);

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
    });
    const jsonReceived = await getData(request);
    console.log(jsonReceived);
    jsonReceived && setIsLoggedIn(true);
    jsonReceived ?? alert("Invalid Credentials"); // ToDo: Show Error Message using state and setTimeout
    setIsLoading(false);
  };

  return isLoading ? (
    <p>Checking With Server...</p>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="email"
        label="Email"
        type="email"
        register={register}
        restrictions={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.com$/ }}
        error={errors.email}
      />

      <InputField
        name="password"
        label="Password"
        type="password"
        register={register}
        restrictions={{
          required: true,
          minLength: requiredParameters.minLength,
        }}
        error={errors.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
