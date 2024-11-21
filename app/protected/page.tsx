import { getCurrentSessionOrRedirect } from "../../lib/session";

export default async function Protected() {
  const { user } = await getCurrentSessionOrRedirect();

  return (
    <div className="font-[family-name:var(--font-inter)]">
      <h1 className="text-xl text-center">The protected route</h1>
      <pre className="whitespace-pre">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
