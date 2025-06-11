import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Mail, Lock } from "lucide-react";
import { useAuth } from "../../AuthContect/AuthContext";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const toggleDropdown = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (
      open &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (path) => {
    setOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  const menuItems = [
    { label: "Change Password", icon: <Lock size={16} />, path: "#change-password" },
    { label: "Contact", icon: <Mail size={16} />, path: "/contact" },
  ];

  return (
    <>
      <button
        id="toggleBtn"
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex -space-x-2 overflow-hidden"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="User Avatar"
          className="inline-block size-8 rounded-full ring-2 ring-white"
        />
      </button>

      {typeof window !== "undefined" && open &&
        createPortal(
          <div
            data-testid="avatar-menu"
            ref={dropdownRef}
            className="w-48 bg-white border border-gray-200 rounded-md shadow-lg absolute z-999 right-20 top-14"
            id="AvatarMenu"
            role="menu"
          >
            <ul className="py-1 text-sm text-gray-700">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(item.path)}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )}
    </>
  );
}
