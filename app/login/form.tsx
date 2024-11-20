"use client";

import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "./validation";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(loginAction, {
    state: "initial",
    fields: {
      email: "asdf",
      password: "",
    },
  });
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: state.fields,
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={form.handleSubmit(() => formRef.current?.submit())}
    >
      <div>
        <input
          type="text"
          id="email"
          placeholder="Email"
          {...form.register("email")}
        />
        {state.state === "validation-error" && state.errors.email?.[0] && (
          <span>{state.errors.email?.[0]}</span>
        )}
        {form.formState.errors.email && (
          <span>{form.formState.errors.email?.message}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...form.register("password")}
        />
        {state.state === "validation-error" && state.errors.password?.[0] && (
          <span>{state.errors.password?.[0]}</span>
        )}
        {form.formState.errors.password && (
          <span>{form.formState.errors.password?.message}</span>
        )}
      </div>

      {state.state === "unkown-error" && <p>{state.message}</p>}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <button>{pending ? "Cargando" : "Ingresar"}</button>;
}
