import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useResolvedPath,
  useRouteError,
} from "@remix-run/react";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import styles from "./tailwind.css";
import {
  DiscoverIcon,
  LoginIcon,
  LogoutIcon,
  RecipeBookIcon,
  SettingsIcon,
} from "./components/icons";
import classNames from "classnames";
import { getCurrentUser } from "./utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "/theme.css" },
    { rel: "stylesheet", href: styles },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getCurrentUser(request);

  return json({ isLoggedIn: user !== null });
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="md:flex md:h-screen bg-background">
        <nav
          className={classNames(
            "bg-primary text-white",
            "flex justify-between md:flex-col"
          )}
        >
          <ul className="flex md:flex-col">
            <AppNavLink to="discover">
              <DiscoverIcon />
            </AppNavLink>
            {data.isLoggedIn ? (
              <AppNavLink to="app/recipes">
                <RecipeBookIcon />
              </AppNavLink>
            ) : null}
            <AppNavLink to="settings">
              <SettingsIcon />
            </AppNavLink>
          </ul>
          <ul>
            {data.isLoggedIn ? (
              <AppNavLink to="/logout">
                <LogoutIcon />
              </AppNavLink>
            ) : (
              <AppNavLink to="/login">
                <LoginIcon />
              </AppNavLink>
            )}
          </ul>
        </nav>
        <div className="p-4 w-full md:w-[calc(100%-4rem)]">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

type AppNavLinkProps = {
  to: string;
  children: React.ReactNode;
};
function AppNavLink({ to, children }: AppNavLinkProps) {
  const path = useResolvedPath(to);
  const navigation = useNavigation();
  const isLoading =
    navigation.state === "loading" &&
    navigation.location.pathname === path.pathname &&
    navigation.formData === null;
  return (
    <li className="w-16">
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={classNames(
              "py-4 flex justify-center hover:bg-primary-light",
              {
                "bg-primary-light": isActive,
              },
              isLoading ? "animate-pulse bg-primary-light" : ""
            )}
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html>
      <head>
        <title>Whoops!!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-4">
          {isRouteErrorResponse(error) ? (
            <>
              <h1 className="text-2xl pb-3">
                {error.status} - {error.statusText}
              </h1>
              <p>You're seeing this page because an error occurred.</p>
              <p className="my-4 font-bold">{error.data.message}</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl pb-3">Whoops!</h1>
              <p>
                You're seeing this page because an unexpected error occurred.
              </p>
              {error instanceof Error ? (
                <p className="my-4 font-bold">{error.message}</p>
              ) : null}
            </>
          )}
          <Link to="/" className="text-primary">
            Take me home
          </Link>
        </div>
      </body>
    </html>
  );
}
