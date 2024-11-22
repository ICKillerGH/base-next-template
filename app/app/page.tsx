import { headers } from "next/headers";
import Heading from "./heading";
import { getCurrentSessionOrRedirect } from "@/lib/session";

export default async function Dashboard() {
  const headerList = await headers();

  await getCurrentSessionOrRedirect(headerList.get("x-pathname"));

  return (
    <div>
      <Heading>Dashboard</Heading>
    </div>
  );
}
