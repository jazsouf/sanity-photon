"use client";

import { useActionState } from "react";
import { newsletterAction } from "../app/actions";
import { PAGE_QUERYResult } from "../sanity.types";

export default function Newsletter() {
  const [state, dispatch, isPending] = useActionState(newsletterAction, "idle");

  return (
    <section className="flex">
      {state !== "success" && (
        <>
          <h3>Get in our newsletter</h3>
          <form className="flex" action={dispatch}>
            <input
              name="email"
              placeholder="Email"
              required
              type="email"
              size={20}
            />
            <button type="submit">{isPending ? "Sending" : "Submit"}</button>
          </form>
        </>
      )}
      {state === "success" && <p>You're in, we'll keep you updated.</p>}
      {state === "error" && (
        <div>
          <p>An error occured while sending the form.</p>
        </div>
      )}
    </section>
  );
}
