import { notFound } from "next/navigation";

/** Deeper addresses don't exist; show the site's own not-found page. */
export default function CatchAll() {
  notFound();
}
