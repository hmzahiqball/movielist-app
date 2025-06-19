import type { Route } from "./+types/home";
import { Home } from "../home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function HomeRoutes() {
  return <Home />;
}
