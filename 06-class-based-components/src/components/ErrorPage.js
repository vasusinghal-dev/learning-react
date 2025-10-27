import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>😕 Oops! Page not found.</h1>
      <p>The page you’re looking for doesn’t exist or something went wrong.</p>
      <Link href="/">⬅ Go back home</Link>
    </div>
  );
};
export default ErrorPage;
