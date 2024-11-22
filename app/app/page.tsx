import { getCurrentSessionOrRedirectToPathname } from "@/lib/session";
import Heading from "./heading";

export default async function Dashboard() {
  await getCurrentSessionOrRedirectToPathname();

  return (
    <div>
      <Heading>Dashboard</Heading>
    </div>
  );
}
