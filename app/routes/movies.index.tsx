import type { Route } from "./+types/movies.index";
import { Movies } from "../movies/movies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies - Filmscape MovieApp"},
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function MoviesIndexRoute() {
  return <Movies />;
}
