import type { Route } from "./+types/movies";
import { Movies } from "../movies/movies";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies FilmScape" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function MoviesIndexRoute() {
  return <Movies />;
}
