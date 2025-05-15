"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Price from "../../components/price";
import { DEFAULT_OPTION } from "../../shopify/constants";
import { CartItem } from "../../shopify/types";
import { createUrl } from "../../shopify/utils";
import { redirectToCheckout, saveCart } from "./cart-actions";
import { useCart } from "./cart-context";
import s from "./cart.module.css";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export function Cart() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart) saveCart(cart);
  }, [cart]);

  console.log(cart);

  return (
    <>
      {!isOpen ? (
        <button
          aria-label="Open cart"
          onClick={openCart}
          className={s.cartButton}
        >
          <OpenCart quantity={cart?.totalQuantity} />
        </button>
      ) : (
        <button
          aria-label="Close cart"
          onClick={closeCart}
          className={s.cartButton}
        >
          <CloseCart />
        </button>
      )}
      {isOpen && (
        <aside className={s.cart}>
          {!cart || cart.lines.length === 0 ? (
            <div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div>
              <ul className="main-grid">
                {cart.lines
                  .sort((a, b) =>
                    a.merchandise.product.title.localeCompare(
                      b.merchandise.product.title,
                    ),
                  )
                  .map((item, i) => {
                    const merchandiseSearchParams =
                      {} as MerchandiseSearchParams;

                    item.merchandise.selectedOptions.forEach(
                      ({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      },
                    );

                    const merchandiseUrl = createUrl(
                      `/product/${item.merchandise.product.handle}`,
                      new URLSearchParams(merchandiseSearchParams),
                    );

                    const cartImage =
                      item.merchandise.variantImage ??
                      item.merchandise.product.featuredImage;

                    return (
                      <li key={i}>
                        <div>
                          <div>
                            <DeleteItemButton
                              item={item}
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                          <div>
                            <div>
                              <Image
                                width={124}
                                height={124}
                                alt={
                                  cartImage.altText ||
                                  item.merchandise.product.title
                                }
                                src={cartImage.url}
                              />
                            </div>
                            <Link href={merchandiseUrl} onClick={closeCart}>
                              <div>
                                <span>{item.merchandise.product.title}</span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p>{item.merchandise.title}</p>
                                ) : null}
                              </div>
                            </Link>
                          </div>
                          <div>
                            <p>
                              <Price
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                            </p>
                            <div className="flex">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                optimisticUpdate={updateCartItem}
                              />
                              <p>
                                <span>{item.quantity}</span>
                              </p>
                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div className="total-checkout">
                <div>
                  <div>
                    <p>Taxes</p>
                    <p>
                      <Price
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </p>
                  </div>
                  <div>
                    <p>Shipping calculated at checkout</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p>
                      <Price
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </p>
                  </div>
                </div>
                <form
                  action={() => {
                    redirectToCheckout(cart);
                  }}
                  className="block-space"
                >
                  <CheckoutButton />
                </form>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "..." : "Proceed to Checkout"}
    </button>
  );
}

function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div>
      {"Cart "}
      {quantity ? <> {quantity}</> : null}
    </div>
  );
}

function CloseCart() {
  return <div className="color-black">Close</div>;
}

function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const merchandiseId = item.merchandise.id;

  return (
    <form
      action={() => {
        optimisticUpdate(merchandiseId, "delete");
      }}
    >
      <button type="submit" aria-label="Remove cart item">
        ×
      </button>
    </form>
  );
}

function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };

  return (
    <form
      action={() => {
        optimisticUpdate(payload.merchandiseId, type);
      }}
    >
      <SubmitButton type={type} />
    </form>
  );
}

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
    >
      {type === "plus" ? "+" : "−"}
    </button>
  );
}
