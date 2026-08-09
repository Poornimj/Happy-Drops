const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

export async function apiRequest(path, options = {}) {
  const { auth = false, headers = {}, ...fetchOptions } = options;
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(getCartSession() ? { "X-Cart-Session": getCartSession() } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (data?.cart?.sessionId) localStorage.setItem("happyDropsCartSession", data.cart.sessionId);

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export function getCartSession() {
  return localStorage.getItem("happyDropsCartSession");
}

export async function findApiProduct(name) {
  const { products } = await apiRequest(`/api/products?search=${encodeURIComponent(name)}`);
  return products.find((product) => product.name.toLowerCase() === name.toLowerCase());
}

export async function addProductToCart(name, quantity = 1) {
  const product = await findApiProduct(name);
  if (!product) throw new Error("This product is not available.");
  return apiRequest("/api/cart/items", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ productId: product.id, quantity }),
  });
}

export function saveAuthSession({ token, user }, remember = true) {
  clearAuthSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("happyDropsToken", token);
  storage.setItem("happyDropsUser", JSON.stringify(user));
}

export function getAuthToken() {
  return localStorage.getItem("happyDropsToken") || sessionStorage.getItem("happyDropsToken");
}

export function getStoredUser() {
  const value = localStorage.getItem("happyDropsUser") || sessionStorage.getItem("happyDropsUser");
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem("happyDropsToken");
    storage.removeItem("happyDropsUser");
  }
}
