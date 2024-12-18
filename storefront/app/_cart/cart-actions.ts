import { redirect } from "next/navigation";
import { startTransition } from "react";
import { Cart } from "../../shopify/types";
import { CART_STORAGE_KEY } from "./cart-context";

export function saveCart(cart: Cart) {
  startTransition(() =>
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)),
  );
}

export function redirectToCheckout(cart: Cart) {
  const checkoutParams = cart.lines.map((item) => {
    return item.merchandise.id.split("/").at(-1) + ":" + item.quantity;
  });
  const cartPermalink = `${cart.checkoutUrl}${checkoutParams}`;
  redirect(cartPermalink);
}
