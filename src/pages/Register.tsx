import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Register = () => {
  const userContext = useContext(UserContext); // Access context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registeredUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    if (userContext) {
      userContext.login(registeredUser); 
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
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
