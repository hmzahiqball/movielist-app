import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movies", "routes/movies.tsx", [
    index("routes/movies.index.tsx"),
    route(":id", "routes/movies.$id.tsx"),
  ]),
  route("tv", "routes/tv.tsx", [
    index("routes/tv.index.tsx"),
    route(":id", "routes/tv.$id.tsx"),
  ]),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
