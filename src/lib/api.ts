const API_BASE = "/api/laserio";

export type CategoryNode = {
  id: number;
  name: string;
  slug: string;
  children?: CategoryNode[];
};

export type CategoryTreeResponse = CategoryNode[];

export type CategoryChildPreview = {
  id: number;
  name: string;
  slug: string;
  desc_product_count: number;
  description?: string | null;
  products_preview: {
    name: string;
    slug: string;
    primary_image_url: string | null;
  }[];
};

export type FeaturedProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  primary_image_url: string | null;
  doc_url: string | null;
};

export type CategoryDetailNonLeaf = {
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
  };
  children: CategoryChildPreview[];
  featured: FeaturedProduct[];
};

export type PaginatedProductsResponse = {
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
  };
  products: ProductSummary[];
  meta?: {
    page: number;
    pages: number;
    total: number;
    per_page: number;
  };
};

export type ProductSummary = {
  id: number;
  name: string;
  slug: string;
  price?: number;
  primary_image_url?: string | null;
  image?: string | null;
};

export type ProductGalleryItem = {
  id: string;
  alt: string;
  url: string;
  mime: string;
  size: number;
  sort: number;
  filename: string;
};

export type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  price: number;
  primary_image_url: string | null;
  gallery?: ProductGalleryItem[] | null;
  content_html?: string | null;
  specs_html?: string | null;
  doc_url?: string | null;
};

export type ProductsListResponse = {
  products: ProductSummary[];
  meta?: {
    page: number;
    pages: number;
    total: number;
    per_page: number;
  };
};

export type ProductsListParams = {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type OrderPayload = {
  customer: {
    full_name: string;
    company?: string;
    email: string;
    phone: string;
    comment?: string;
  };
  items: { product_id: number; qty: number }[];
  shipped_items?: number[];
  customer_name?: string;
  email?: string;
  phone?: string;
  comment?: string;
  address?: string;
};

export type OrderResponse = {
  id: number;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return (await res.json()) as T;
}

export function normalizeImageUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = API_BASE.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export async function fetchCategoryTree(): Promise<CategoryTreeResponse> {
  const res = await fetch(`${API_BASE}/categories/tree`);
  return handleResponse<CategoryTreeResponse>(res);
}

export async function fetchCategoryDetail(
  slug: string,
  page?: number,
): Promise<CategoryDetailNonLeaf | PaginatedProductsResponse> {
  const params = new URLSearchParams();
  if (page && page > 1) {
    params.set("page", String(page));
  }
  const query = params.toString();
  const url = `${API_BASE}/categories/${encodeURIComponent(slug)}${
    query ? `?${query}` : ""
  }`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function fetchProduct(slug: string): Promise<ProductDetail> {
  const res = await fetch(`${API_BASE}/products/${encodeURIComponent(slug)}`);
  return handleResponse<ProductDetail>(res);
}

export async function fetchProductsList(
  params: ProductsListParams = {},
): Promise<ProductsListResponse> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.sort) search.set("sort", params.sort);
  if (params.page && params.page > 1) {
    search.set("page", String(params.page));
  }
  if (params.limit) search.set("limit", String(params.limit));

  const query = search.toString();
  const url = `${API_BASE}/products${query ? `?${query}` : ""}`;
  const res = await fetch(url);
  return handleResponse<ProductsListResponse>(res);
}

export async function fetchCategoryProducts(
  slug: string,
  page?: number,
): Promise<PaginatedProductsResponse> {
  const params = new URLSearchParams();
  if (page && page > 1) {
    params.set("page", String(page));
  }
  const query = params.toString();
  const url = `${API_BASE}/categories/${encodeURIComponent(
    slug,
  )}/products${query ? `?${query}` : ""}`;
  const res = await fetch(url);
  return handleResponse<PaginatedProductsResponse>(res);
}

export async function postOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<OrderResponse>(res);
}
