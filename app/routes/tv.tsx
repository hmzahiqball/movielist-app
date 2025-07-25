import type { Route } from "./+types/home";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Series - Filmscape MovieApp"},
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function TVRoutes() {
  return <Outlet />;
}
