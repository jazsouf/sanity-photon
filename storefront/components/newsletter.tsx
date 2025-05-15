"use client";

import { useActionState } from "react";
import { newsletterAction } from "../app/actions";

export default function Newsletter() {
  const [state, dispatch, isPending] = useActionState(newsletterAction, "idle");

  return (
    <section className="flex">
      {state !== "success" && (
        <div className="flex">
          <p>Get in our newsletter</p>
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
        </div>
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
