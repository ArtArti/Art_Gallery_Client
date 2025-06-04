import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Simulate registration logic here
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your name"
          required
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          minLength={8}
          required
          placeholder="••••••••"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          minLength={8}
          required
          placeholder="••••••••"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
          className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center"
      >
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-5 h-5 mr-2 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="#fff" strokeWidth="10" />
            <path
              d="M93 50a43 43 0 10-43 43"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        Register
      </button>

      {/* Already have an account */}
      <div className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-amber-600 hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default Register;
