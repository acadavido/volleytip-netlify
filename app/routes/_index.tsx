import type { MetaFunction } from "@remix-run/node";
import { NextUIProvider } from "@nextui-org/react";
import Counter from "~/components/counter";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <NextUIProvider>
      <Counter/>
    </NextUIProvider>
  );
}
