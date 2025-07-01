import type { Route } from "./+types/tv.index";
import { TV } from "../series/tv";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Series - Filmscape MovieApp"},
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function TvIndexRoute() {
  return <TV />;
}
