import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type UserLogin = {
  email: string;
  password: string;
};

const requiredParameters: { minLength: number } = {
  minLength: 5,
};

function Homepage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    console.log(typeof data, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register("email", {
          required: true,
          /* Todo compile list of email address it will validate with, Zod?
          Current validation: string@string.com */
          pattern: /^[^\s@]+@[^\s@]+\.com$/,
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email?.type === "required" && (
        <p role="alert">Email is required</p>
      )}
      {errors.email?.type === "pattern" && <p role="alert">Email is invalid</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        {...register("password", {
          required: true,
          minLength: requiredParameters.minLength,
        })}
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password?.type === "required" && (
        <p role="alert">Password is required</p>
      )}
      {errors.password?.type === "minLength" && (
        <p role="alert">
          Password must be at least {requiredParameters.minLength} characters
          long
        </p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Homepage;
