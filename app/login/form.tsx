"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginAction } from "./actions";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormGroup from "@/components/ui/form-group";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function Form() {
  const searchParams = useSearchParams();

  const intended = searchParams.get("intended");

  const [state, formAction, isPending] = useActionState(loginAction, {
    status: "initial",
    intendedUri: intended ?? undefined,
    fields: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="max-w-96 w-full">
      <CardHeader className="text-center">
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>Bienvenido a Next Base Template</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FormGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="example@domain.com"
              defaultValue={state.fields.email}
              autoFocus
            />
            {state.status === "validation-error" && state.errors.email?.[0] && (
              <span>{state.errors.email?.[0]}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" className="flex justify-between">
              <span>Contraseña</span>
              <a href="#" className="text-destructive" tabIndex={1}>
                Olvide mi contraseña
              </a>
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              defaultValue={state.fields.password}
            />
            {state.status === "validation-error" &&
              state.errors.password?.[0] && (
                <span>{state.errors.password?.[0]}</span>
              )}
          </FormGroup>

          <Button type="submit" className="flex w-full">
            {isPending ? "Cargando" : "Ingresar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center gap-1 text-sm">
        <p>¿No tienes cuenta?</p>
        <a href="#" className="font-semibold text-primary">
          Registrate
        </a>
      </CardFooter>
    </Card>
  );
}
