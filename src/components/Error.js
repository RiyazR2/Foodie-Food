import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../utils/logo.png";

const Error = () => {
  const err = useRouteError();
  // console.log("Error:", err);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto text-center bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">
          {err.status} : {err.statusText}
        </h1>
        <p className="text-gray-600 mb-8 mt-4">
          {
            "The page you are looking for might have been removed or is temporarily unavailable. Please check the URL or try again later."
          }
          <br />
          {err.data}
        </p>

        <Link to="/">
          <img className="w-52 mx-auto mb-5" src={logo} alt="Logo" />
        </Link>

        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
