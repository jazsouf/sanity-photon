"use client";

import { useActionState } from "react";
import { newsletterAction } from "../app/actions";

export default function Newsletter() {
  const [state, dispatch, isPending] = useActionState(newsletterAction, "idle");

  return (
    <section className="flex inline-space">
      {state !== "success" && (
        <div className="flex">
          <p>Subscribe</p>
          <form className="flex" action={dispatch}>
            <input
              name="email"
              placeholder="type your email here"
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
