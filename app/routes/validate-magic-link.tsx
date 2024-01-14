import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getMagicLinkPayload, invalidMagicLink } from "~/magic-links.server";
import { getUser } from "~/models/user.server";
import { commitSession, getSession } from "~/sessions";

const magicLinkMaxAge = 1000 * 60 * 10; // 10 minutes

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const magicLinkPayload = getMagicLinkPayload(request);

  const createdAt = new Date(magicLinkPayload.createdAt);
  const expiresAt = createdAt.getTime() + magicLinkMaxAge;

  if (Date.now() > expiresAt) {
    throw invalidMagicLink("The magic link has expired");
  }

  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  if (session.get("nonce") !== magicLinkPayload.nonce) {
    throw invalidMagicLink("Invalid nonce");
  }

  const user = await getUser(magicLinkPayload.email);

  if (user) {
    session.set("userId", user.id);
    return redirect("/app", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json("ok", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
