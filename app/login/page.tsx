import { loginAction, test } from "./actions";
import Form from "./form";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  return (
    <div className="font-[family-name:var(--font-inter)]">
      <h1 className="text-xl text-center">The Login Route</h1>

      <Form />
    </div>
  );
}
