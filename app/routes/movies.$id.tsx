import type { Route } from "./+types/movies.$id";
import { useParams } from "react-router";
import { MovieDetail } from "../movies/detailMovies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies - Filmscape MovieApp"},
    { name: "description", content: "Detail halaman film" },
  ];
}

export default function MovieDetailRoute() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black">
      <MovieDetail id={id!} />
    </div>
  );
}
