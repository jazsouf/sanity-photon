"use server";

import { draftMode } from "next/headers";
import { z } from "zod";

export async function disableDraftMode() {
  "use server";
  await Promise.allSettled([
    (await draftMode()).disable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}

export async function newsletterAction(
  prev_state: string,
  formData: FormData,
): Promise<string> {
  const { data, success } = z
    .object({
      email: z.string().email(),
    })
    .safeParse(Object.fromEntries(formData));
  if (!success) return "error";
  const { email } = data;

  try {
    const url = "https://a.klaviyo.com/api/profile-import";

    const options = {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2025-01-15",
        "content-type": "application/vnd.api+json",
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
          },
        },
      }),
    };

    const res = await fetch(url, options);

    if (!res.ok) throw new Error("klaviyo req failed");

    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
