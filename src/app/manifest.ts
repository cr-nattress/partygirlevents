import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Party Girl Events",
    short_name: "Party Girl",
    description: "Colorado Mountain Wedding Planning — Reimagined",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#C4926E",
  };
}
