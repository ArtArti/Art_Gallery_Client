import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Lock } from "lucide-react";
import { useAuth } from "../../AuthContect/AuthContext";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-white overflow-hidden"
      >
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleNavigate("/change-password")}
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Lock size={16} />
                Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate("/contact")}
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Mail size={16} />
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
