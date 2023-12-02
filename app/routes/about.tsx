import { Link, Outlet } from "@remix-run/react";

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the settings page.</p>
      <nav>
        <Link to="team">Meet the Team</Link> |{" "}
        <Link to="history">Our History</Link>
      </nav>
      <Outlet />
    </div>
  );
}
