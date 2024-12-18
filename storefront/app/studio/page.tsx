import { redirect } from "next/navigation";
import { studioUrl } from "../../sanity/api";

export default function Page() {
  redirect(studioUrl);
  return null;
}
