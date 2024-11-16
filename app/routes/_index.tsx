import type { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <NextUIProvider>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <header className="flex flex-col items-center gap-9">
            <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span>Volleytip</span>
            </h1>
          </header>
          <Link to="/counter">Go to score counter</Link>
        </div>
      </div>
    </NextUIProvider>
  );
}
