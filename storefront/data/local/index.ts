import { Cart, CartItem } from "../../shopify/types";

const CART_STORAGE_KEY = "photon_shopify_cart";

// Helper function to get cart from localStorage
const getStoredCart = (): Cart | null => {
  if (typeof window === "undefined") return null;
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : null;
};

// Helper function to save cart to localStorage
const saveCart = (cart: Cart) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export async function createCart(): Promise<Cart> {
  const newCart: Cart = {
    id: "local-cart",
    checkoutUrl: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/`,
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "EUR" },
      totalAmount: { amount: "0", currencyCode: "EUR" },
      totalTaxAmount: { amount: "0", currencyCode: "EUR" },
    },
  };

  saveCart(newCart);
  return newCart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const cart = getStoredCart();
  if (!cart || cart.id !== cartId) return undefined;
  return cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart | undefined> {
  const cart = getStoredCart();
  if (!cart || cart.id !== cartId) return undefined;

  lines.forEach(({ merchandiseId, quantity }) => {
    const existingLineIndex = cart.lines.findIndex(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (existingLineIndex >= 0) {
      cart.lines[existingLineIndex].quantity += quantity;
      const lineItem = cart.lines[existingLineIndex];
      const amount = parseFloat(lineItem.cost.totalAmount.amount);
      lineItem.cost.totalAmount.amount = (
        (amount / lineItem.quantity) *
        (lineItem.quantity + quantity)
      ).toString();
    } else {
      const newLine: CartItem = {
        id: undefined,
        quantity,
        cost: {
          totalAmount: {
            amount: "0",
            currencyCode: "EUR",
          },
        },
        merchandise: {
          id: merchandiseId,
          title: "",
          selectedOptions: [],
          product: {
            id: "",
            handle: "",
            title: "",
            featuredImage: {
              url: "",
              altText: "",
              width: 0,
              height: 0,
            },
          },
        },
      };
      cart.lines.push(newLine);
    }
  });

  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0,
  );
  cart.cost.subtotalAmount.amount = subtotal.toString();
  cart.cost.totalAmount.amount = subtotal.toString();

  saveCart(cart);
  return cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart | undefined> {
  const cart = getStoredCart();
  if (!cart || cart.id !== cartId) return undefined;

  cart.lines = cart.lines.filter((line) => !lineIds.includes(line.id!));

  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0,
  );
  cart.cost.subtotalAmount.amount = subtotal.toString();
  cart.cost.totalAmount.amount = subtotal.toString();

  saveCart(cart);
  return cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart | undefined> {
  const cart = getStoredCart();
  if (!cart || cart.id !== cartId) return undefined;

  lines.forEach(({ id, quantity }) => {
    const lineIndex = cart.lines.findIndex((line) => line.id === id);
    if (lineIndex >= 0) {
      const line = cart.lines[lineIndex];
      const pricePerItem =
        parseFloat(line.cost.totalAmount.amount) / line.quantity;
      line.quantity = quantity;
      line.cost.totalAmount.amount = (pricePerItem * quantity).toString();
    }
  });

  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0,
  );
  cart.cost.subtotalAmount.amount = subtotal.toString();
  cart.cost.totalAmount.amount = subtotal.toString();

  saveCart(cart);
  return cart;
}
