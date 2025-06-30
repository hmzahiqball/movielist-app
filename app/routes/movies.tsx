import type { Route } from "./+types/movies";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies Outlet FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function MoviesRoutes() {
  return <Outlet />;
}
