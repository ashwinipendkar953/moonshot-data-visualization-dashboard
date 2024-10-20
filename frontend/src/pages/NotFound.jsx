import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-2 fw-bold">404</h1>
        <p>
          The page you are looking for does not exist. But you can click the
          button below to go back to the homepage.
        </p>
        <Link className="btn btn-primary px-3 rounded-0" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
