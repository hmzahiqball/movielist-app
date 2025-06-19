import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function TV() {
  return <Welcome />;
}
