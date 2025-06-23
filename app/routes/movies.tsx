import type { Route } from "./+types/movies";
import { Movies } from "../movies/movies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function MoviesRoutes() {
  return <Movies />;
}
