import { Link, useLocation } from "react-router-dom";
import type { CategoryNode } from "../../lib/api";
import { useCategoryTree } from "../../lib/hooks";

function findCategoryPath(
  tree: CategoryNode[],
  slug: string,
): CategoryNode[] | null {
  const result: CategoryNode[] = [];

  const walk = (nodes: CategoryNode[], acc: CategoryNode[]): boolean => {
    for (const node of nodes) {
      const next = [...acc, node];
      if (node.slug === slug) {
        result.push(...next);
        return true;
      }
      if (node.children && walk(node.children, next)) {
        return true;
      }
    }
    return false;
  };

  walk(tree, []);
  return result.length > 0 ? result : null;
}

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const { data: categoryTree } = useCategoryTree();

  const staticLabels: Record<string, string> = {
    catalog: "Каталог",
    categories: "Карта каталога",
    products: "Каталог",
    contacts: "Контакты",
  };

  const prettify = (seg: string) =>
    seg.replace(/-/g, " ").replace(/\s+/g, " ").trim();

  const getCachedCategoryName = (slug: string) => {
    if (typeof window === "undefined") return null;
    try {
      return window.sessionStorage.getItem(`catName:${slug}`);
    } catch {
      return null;
    }
  };

  const getCachedProductName = (slug: string) => {
    if (typeof window === "undefined") return null;
    try {
      return window.sessionStorage.getItem(`prodName:${slug}`);
    } catch {
      return null;
    }
  };

  const isCatalogDetail = segments[0] === "catalog" && segments.length > 1;
  const activeCategorySlug = isCatalogDetail
    ? decodeURIComponent(segments[1])
    : null;

  const categoryPath =
    categoryTree && activeCategorySlug
      ? findCategoryPath(categoryTree, activeCategorySlug)
      : null;

  const dynamicItems =
    isCatalogDetail && categoryPath && categoryPath.length > 0
      ? [
          { label: staticLabels.catalog, path: "/catalog" },
          ...categoryPath.map((node) => ({
            label: node.name,
            path: `/catalog/${encodeURIComponent(node.slug)}`,
          })),
        ]
      : segments.map((seg, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const decoded = decodeURIComponent(seg);
          let label: string | null = staticLabels[decoded] ?? null;

          if (!label) {
            const prev = segments[index - 1];
            if (prev === "catalog") {
              label = getCachedCategoryName(decoded);
            } else if (prev === "products") {
              label = getCachedProductName(decoded);
            }
          }

          if (!label) {
            label = prettify(decoded);
          }

          return { label, path };
        });

  const items = [{ label: "Главная", path: "/" }, ...dynamicItems];

  if (items.length <= 1) return null;

  return (
    <nav aria-label="Хлебные крошки" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <span className="text-slate-400">/</span>}
              {isLast ? (
                <span className="text-slate-600">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="text-sky-700 hover:text-sky-900"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
