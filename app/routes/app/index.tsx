import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/app/pantry",
    },
  });
};
