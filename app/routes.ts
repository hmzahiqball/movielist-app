import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movies", "routes/movies.tsx", [
    route(":id", "routes/movies.$id.tsx"),
  ]),
  route("tv", "routes/tv.tsx"),
] satisfies RouteConfig;
