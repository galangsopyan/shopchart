export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
};

const CART_KEY = "shopcart_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: Omit<CartItem, "quantity">) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateCartQuantity(
  id: string,
  quantity: number
) {
  const cart = getCart();

  const item = cart.find((item) => item.id === id);

  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
}

export function getCartCount() {
  return getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function clearCart() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("shopcart_cart");

  window.dispatchEvent(
    new Event("cart-updated")
  );
}