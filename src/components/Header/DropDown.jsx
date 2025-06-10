import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContect/AuthContext';

export default function DropDown() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const handleChange = (e) => {
    const path = e.target.value;

    if (path === 'logout') {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <select
      onChange={handleChange}
      className="items-center space-x-1 border border-amber-600 rounded-md px-1 py-1"
    >
      <option value="">Select</option>
      <option value="/change-password">Change Password</option>
      <option value="/contact">Contact</option>
      <option value="logout" className="text-red-600">Log Out</option>
    </select>
  );
}
