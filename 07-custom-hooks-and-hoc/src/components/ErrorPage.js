import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="space-y-2 p-8 text-center">
      <h1 className="text-2xl font-bold">😕 Oops! Page not found.</h1>
      <div className="text-[16px]">
        <p>
          The page you’re looking for doesn’t exist or something went wrong.
        </p>
        <Link href="/" className="hover:text-blue-500 hover:underline">
          ⬅ Go back home
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
