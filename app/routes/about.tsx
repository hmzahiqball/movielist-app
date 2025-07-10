import type { Route } from "./+types/home";
import { About } from "../about/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - FilmScape MovieApp" },
    { name: "description", content: "Welcome to FilmScape!" },
  ];
}

export default function AboutRoutes() {
  return <About />;
}
