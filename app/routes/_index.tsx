import type { MetaFunction } from "@remix-run/node";
import { NextUIProvider } from "@nextui-org/react";
import Counter from "~/components/counter";

export const meta: MetaFunction = () => {
  return [
    { title: "Volleytip scorer" },
    { name: "description", content: "Welcome to Volleytip!" },
  ];
};

export default function Index() {
  return (
    <NextUIProvider>
      <Counter/>
    </NextUIProvider>
  );
}
