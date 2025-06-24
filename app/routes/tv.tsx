import type { Route } from "./+types/home";
import { TV } from "../series/tv";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Series FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function TVRoutes() {
  return <TV />;
}
