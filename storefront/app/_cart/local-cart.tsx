"use client";

import dynamic from "next/dynamic";
const Cart = dynamic(() => import("./cart").then((mod) => mod.Cart), {
  ssr: false,
  loading: () => <>Cart―</>,
});

export function LocalCart() {
  return <Cart />;
}
