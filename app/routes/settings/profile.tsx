import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

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

export function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof Error)
    return (
      <div className="bg-red-300 border-2 border-red-600 rounded-md p-4">
        {error.message}
      </div>
    );
  return <div>Generic message</div>;
}
