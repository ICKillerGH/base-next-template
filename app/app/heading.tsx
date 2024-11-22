import { ComponentProps } from "react";

export default function Heading(props: ComponentProps<"h2">) {
  return <h2 {...props} className="text-xl" />;
}
