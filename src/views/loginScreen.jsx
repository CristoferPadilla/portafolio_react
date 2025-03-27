import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { setAccessToken } from '../auth'; 

export function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    const data = isLogin
      ? { email, password }
      : { full_name:fullName, email, password }; 

    try {
      const response = await fetch(`https://apiport.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        setFullName("");

        if (isLogin) {
          console.log(result);

          const { access_token } = result;

          setAccessToken(access_token);

            navigate('/portafolio_react/home');
        }
      } else {
        const errorData = await response.json(); 
        setErrorMessage(
          errorData.message || "Authentication failed. Please check your credentials."
        ); 
        console.error("Error Response:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="relative w-1/2 bg-[#3c787a] hidden md:block">
        <svg
          className="absolute w-52 h-52 top-1/3 left-1/7 animate-move"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#39A072"
            d="M426.5,315Q393,380,315,420.5Q237,461,174,409Q111,357,81.5,278.5Q52,200,106.5,134Q161,68,244.5,55.5Q328,43,388.5,101Q449,159,452.5,229.5Q456,300,426.5,315Z"
          />
        </svg>
        <svg
          className="absolute top-1/3 left-1/4 w-80 h-80 animate-move"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFEEC1"
            d="M426.5,315Q393,380,315,420.5Q237,461,174,409Q111,357,81.5,278.5Q52,200,106.5,134Q161,68,244.5,55.5Q328,43,388.5,101Q449,159,452.5,229.5Q456,300,426.5,315Z"
          />
        </svg>

        <svg
          className="absolute top-1/10 left-1/3 w-80 h-80 animate-move"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#1C4E4F"
            d="M426.5,315Q393,380,315,420.5Q237,461,174,409Q111,357,81.5,278.5Q52,200,106.5,134Q161,68,244.5,55.5Q328,43,388.5,101Q449,159,452.5,229.5Q456,300,426.5,315Z"
          />
        </svg>

        <svg
          className="absolute top-1/5 left-1/4 w-80 h-80 animate-move"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#232a5d"
            d="M426.5,315Q393,380,315,420.5Q237,461,174,409Q111,357,81.5,278.5Q52,200,106.5,134Q161,68,244.5,55.5Q328,43,388.5,101Q449,159,452.5,229.5Q456,300,426.5,315Z"
          />
        </svg>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isLogin ? "Log In" : "Create your Free Account"}
        </h2>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {isLogin ? (
            // Login Form
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center">
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot your password?
                </a>
              </div>

              <div className="flex items-center justify-center border-t pt-4">
                <button
                  className="bg-[#064E3B] hover:bg-[#06583a] text-white font-bold py-2 px-4 rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Iniciar sesión
                </button>
              </div>
            </>
          ) : (
            // Signup Form
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullName"
                  type="text"
                  placeholder="Enter your Full Name here"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your Email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your Password here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center border-t pt-4">
                <button
                  className="bg-[#064E3B] hover:bg-[#06583a] text-white font-bold py-2 px-4 rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <a
                className="font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                onClick={toggleForm}
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                className="font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                onClick={toggleForm}
              >
                Log in
              </a>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center">
          <div className="mx-4 text-gray-500">- OR -</div>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            className=" cursor-pointer flex items-center border rounded py-2 px-4 text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <img
              src="https://img.icons8.com/color/20/000000/google-logo.png"
              alt="Google Logo"
              className="mr-2 "
            />
            Sign up with Google
          </button>
          <div></div>
          <button
            className=" cursor-pointer flex items-center border rounded py-2 px-4 text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <img
              src="https://img.icons8.com/material-outlined/20/000000/github.png"
              alt="GitHub Logo"
              className="mr-2"
            />
            Sign up with GitHub
          </button>
        </div>
        <p className="mt-6 text-gray-500 text-sm">Powered By FleTechnologies M.R. LLC</p>
      </div>
    </div>
  );
}