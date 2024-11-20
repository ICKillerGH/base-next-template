"use client";

import { useFormStatus } from "react-dom";
import { loginAction, LoginActionState } from "./actions";
import { useActionState } from "react";

const initialState: LoginActionState = {
  success: true,
};

export default function Form() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction}>
      <div>
        <input type="text" id="email" name="email" placeholder="Email" />
        {!state.success && state.errors.email?.[0] && (
          <span>{state.errors.email?.[0]}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        {!state.success && state.errors.password?.[0] && (
          <span>{state.errors.password?.[0]}</span>
        )}
      </div>

      {!state.success && <p>{!state.message}</p>}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <button>{pending ? "Cargando" : "Ingresar"}</button>;
}
