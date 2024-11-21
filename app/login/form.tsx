"use client";

import { loginAction } from "./actions";
import { useActionState } from "react";

export default function Form() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    status: "initial",
    fields: {
      email: "",
      password: "",
    },
  });

  return (
    <form action={formAction}>
      <div>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={state.fields.email}
        />
        {state.status === "validation-error" && state.errors.email?.[0] && (
          <span>{state.errors.email?.[0]}</span>
        )}
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          defaultValue={state.fields.password}
        />
        {state.status === "validation-error" && state.errors.password?.[0] && (
          <span>{state.errors.password?.[0]}</span>
        )}
      </div>

      {state.status === "unkown-error" && <p>{state.message}</p>}

      <button>{isPending ? "Cargando" : "Ingresar"}</button>
    </form>
  );
}
