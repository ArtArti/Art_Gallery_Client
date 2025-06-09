import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate} from "react-router";
import { useAuth } from "../AuthContect/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { setUser, setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://blog-server-nu-weld.vercel.app/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user); 
        setIsLoggedIn(true); 
        setSuccess("you successfully logged in ");
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError(
        "Network error. Please check your connection and try again. " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            minLength="8"
            disabled={loading}
          />
        </div>

        <button
          id="loginBtn"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-white bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-2 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#fff"
                  strokeWidth="10"
                  strokeOpacity="0.3"
                />
                <path
                  d="M93 50a43 43 0 10-43 43"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </>
          )}
        </button>
        <div className="text-sm font-medium text-gray-500 text-center">
          Not registered?
          <button className="text-blue-700 hover:underline cursor-pointer">
            Create account
          </button>
        </div>

        {/* Optional: Forgot Password Link */}
        <div className="text-center">
          <Link to="#forgotpassword" className="text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot your password?
          </Link>
        </div>
      </div>
    
    </>
  );
};

export default Login;
