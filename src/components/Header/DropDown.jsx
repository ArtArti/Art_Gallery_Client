import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContect/AuthContext';

export default function DropDown() {
  const navigate = useNavigate();
  const {setUser, setIsLoggedIn} = useAuth();

  const handleChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
      navigate("/");
  };



  return (
    <select
      onChange={handleChange}
      className="items-center space-x-1 border border-amber-600 rounded-md px-1 py-1 "
    >
      <option value="">Select</option>
      <option value="#changePassword">Change Password</option>
      <option value="#contact">Contact</option>
      <option onClick={handleLogout}
       className="text-sm text-red-600 hover:text-red-800 font-medium"
      >LogOut</option>
    </select>
  );
}
