import type { Route } from "./+types/movies.$id"; // ini opsional sih, buat typing
import { useParams } from "react-router";
import { MovieDetail } from "../movies/detailMovies";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detail Movie"},
    { name: "description", content: "Detail halaman film" },
  ];
}

export default function MovieDetailRoute() {
  const { id } = useParams(); // dapetin ID dari URL

  return (
    <div className="min-h-screen bg-black">
      <MovieDetail id={id!} />
    </div>
  );
}
