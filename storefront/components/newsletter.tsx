"use client";

import { useActionState } from "react";
import { newsletterAction } from "../app/actions";

export default function Newsletter() {
  const [state, dispatch, isPending] = useActionState(newsletterAction, "idle");

  return (
    <section className="flex">
      {state !== "success" && (
        <div className="flex">
          <h3>Subscribe</h3>
          <form className="flex" action={dispatch}>
            <input
              name="email"
              placeholder="email"
              required
              type="email"
              size={18}
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
