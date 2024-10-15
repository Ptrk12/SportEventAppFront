import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Use the UserContext
import authService from '../services/authService';

const Login = () => {
  const userContext = useContext(UserContext); // Access the UserContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await authService.login(formData.email, formData.password); // Call login from authService

      // Update the UserContext with the logged-in user
      if (userContext && userContext.login) {
        userContext.login(userData); // Update context with user info
      }

      navigate('/'); // Navigate to home after successful login
    } catch (error: any) {
      console.log(error);
      setErrorMessage('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Login</h2>
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
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-150"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          Not registered yet?{' '}
          <Link to="/register" className="text-orange-500 hover:underline">
            Click here to register!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
