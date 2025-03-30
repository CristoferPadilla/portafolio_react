// LoginScreen.js
import { useNavigate } from "react-router-dom";
import { setAccessToken } from '../auth';
import { useState, useEffect } from "react";

const mockUsers = [
    {
        id: "1",
        fullName: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
    },
    {
        id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        password: "securePassword",
    },
];

export function LoginScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (!storedUsers) {
            // Initialize users in localStorage if it's empty
            localStorage.setItem('users', JSON.stringify(mockUsers));
        }
    }, []);


    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (isLogin) {
            // Login Logic
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find((u) => u.email === email && u.password === password);

            if (user) {
                // Successful Login
                console.log("Login successful!", user);
                // Store the user ID in localStorage
                localStorage.setItem('loggedInUserId', user.id);

                // Store a dummy token (in a real app, you'd generate this server-side)
                const accessToken = "dummy_token_" + user.id;
                setAccessToken(accessToken); // Assuming setAccessToken handles storage

                setEmail("");
                setPassword("");
                navigate('/portafolio_react/home');
            } else {
                // Invalid credentials
                setErrorMessage("Invalid email or password.");
            }
        } else {
            // Registration Logic
            if (!fullName) {
                setErrorMessage("Full Name is required for registration.");
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = storedUsers.find((u) => u.email === email);

            if (existingUser) {
                setErrorMessage("Email already exists. Please use a different email.");
                return;
            }

            // Create a new user object
            const newUser = {
                id: String(Date.now()), // Generate a unique ID
                fullName,
                email,
                password,
            };

            // Add the new user to the array
            storedUsers.push(newUser);

            // Update local storage
            localStorage.setItem('users', JSON.stringify(storedUsers));

            console.log("Registration successful!", newUser);
             // Logs the user automatically after succesfull register
            localStorage.setItem('loggedInUserId', newUser.id);
            setAccessToken(newUser.id); // Assuming setAccessToken handles storage

            setEmail("");
            setPassword("");
            setFullName("");
             navigate('/portafolio_react/home');

        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SVG Background (unchanged) */}
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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