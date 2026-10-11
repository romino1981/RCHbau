const SITE = "https://rchbau.sk";

export function pageHead(title: string, description: string, path: string) {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
