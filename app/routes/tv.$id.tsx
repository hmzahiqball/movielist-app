import type { Route } from "./+types/movies.$id";
import { useParams } from "react-router";
import { TvDetail } from "../series/detailTv";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Series - Filmscape MovieApp"},
    { name: "description", content: "Detail halaman film" },
  ];
}

export default function TvDetailRoute() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black">
      <TvDetail id={id!} />
    </div>
  );
}
