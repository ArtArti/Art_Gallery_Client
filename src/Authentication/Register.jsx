import { useState } from "react";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Client-side validation
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (userData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      // Make API call to register endpoint
      const response = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
         
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess("Registration successful! You can now login with your credentials.");
        if (data.token) {
          console.log('Registration successful, token received:', data.token);
        }
        
        // Clear form
        setUserData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        
        });
      } else {
        // Handle API errors
        setError(data.message || data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      // Handle network errors
      console.error('Registration error:', err);
      setError("Network error. Please check your connection and try again.");
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

        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={loading}
            required
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
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={loading}
            required
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
            placeholder="••••••••"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={loading}
            required
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
            placeholder="••••••••"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            className="w-full px-3 py-2 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={loading}
            required
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg flex items-center justify-center transition-colors"
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-5 h-5 mr-2 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" stroke="#fff" strokeWidth="10" strokeOpacity="0.3" />
                <path
                  d="M93 50a43 43 0 10-43 43"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Already have an account */}
        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button className="text-amber-600 hover:underline cursor-pointer">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;