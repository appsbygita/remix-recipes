import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ request }: LoaderFunctionArgs) {
  return json({ message: "Hi there" });
}

export default function Profile() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Profile Settings</h1>
      <p>This is the profile settings page.</p>
      <p>Message: {data.message}</p>
    </div>
  );
}
