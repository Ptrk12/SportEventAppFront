import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import authService from '../services/authService';
import PopupInfo from '../components/PopupInfo';

const Register = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const register = await authService.register(formData.email, formData.password);
  
      if (register) {
        setPopupMessage("Account created!");
        setPopupSeverity("success");
        setShowPopup(true);
  
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setPopupMessage("Something went wrong!");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    } catch (error: any) {
      setPopupMessage("Something went wrong!");
      setPopupSeverity("error");
      setShowPopup(true);
      console.log(error);
    }
  };
  

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <PopupInfo
      message={popupMessage}
      severity={popupSeverity}
      open={showPopup}
      handleClose={handleClosePopup}
    />
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-150"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Click here to login!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
