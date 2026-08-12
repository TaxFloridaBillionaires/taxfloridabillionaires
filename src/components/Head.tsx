import { useEffect } from "react";

interface HeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}


function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export const Head = ({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogType = "website",
}: HeadProps) => {
  useEffect(() => {
    const t = ogTitle ?? title;
    const d = ogDescription ?? description;
    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);
    if (canonical) upsertLink("canonical", canonical);
    if (robots) upsertMeta("name", "robots", robots);

    upsertMeta("property", "og:type", ogType);
    if (t) {
      upsertMeta("property", "og:title", t);
      upsertMeta("name", "twitter:title", t);
    }
    if (d) {
      upsertMeta("property", "og:description", d);
      upsertMeta("name", "twitter:description", d);
    }
    if (canonical) upsertMeta("property", "og:url", canonical);
  }, [title, description, canonical, robots, ogTitle, ogDescription, ogType]);
  return null;
};

