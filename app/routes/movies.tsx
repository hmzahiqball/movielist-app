import type { Route } from "./+types/movies";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies - Filmscape MovieApp"},
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function MoviesRoutes() {
  return <Outlet />;
}
