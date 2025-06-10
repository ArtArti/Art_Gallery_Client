import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";



export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
const { setUser, setIsLoggedIn } = useOutletContext();
  return (
    <div className="min-h-screen bg-amber-100 flex flex-col items-center justify-center px-4 space-y-6">
      {/* Swap Button */}
      <button 
        onClick={() => setIsLogin(!isLogin)}
        className="w-80 mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition"
      >
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        {/* Animated Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} /> : <Register />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
