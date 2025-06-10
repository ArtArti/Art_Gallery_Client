import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, Mail, Lock } from "lucide-react";
import { useAuth } from "../../AuthContect/AuthContext";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 100,
      });
    }
    setOpen(!open);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

 const handleSelect = (action) => {
  setOpen(false);
  if (action === 'logout') {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/"); 
  } else if (typeof action === 'string') {
    navigate(action);
  }
};


  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex -space-x-2 overflow-hidden"
      >
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Default Avatar"
          className="inline-block size-8 rounded-full ring-2 ring-white"
        />
      </button>

      {/* Portal Dropdown */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute z-[9999] w-48 bg-white rounded-md shadow-lg border border-gray-200"
                style={{
                  top: position.top,
                  left: position.left,
                  position: "absolute",
                }}
              >
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => handleSelect("#change-password")}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                    >
                      <Lock size={16} />
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelect("/contact")}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                    >
                      <Mail size={16} />
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelect("logout")}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
