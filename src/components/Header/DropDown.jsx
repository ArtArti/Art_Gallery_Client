import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContect/AuthContext";
import { MoreVertical } from "lucide-react"; // Optional icon package

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleNavigate = (path) => {
    setOpen(false); // close menu
    navigate(path);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleNavigate("#change-password")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate("/contact")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
