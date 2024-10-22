import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto flex justify-between items-start flex-wrap">
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-2">1234 Sports Arena, Krakow, Poland</p>
            <p className="text-gray-400 mb-2">Phone: +48 123 456 789</p>
            <p className="text-gray-400 mb-2">Email: info@sportsapp.com</p>
          </div>
  
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="font-bold text-lg mb-4">Information</h2>
            <ul>
              <li className="mb-2">
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="/support" className="text-gray-400 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
  
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="font-bold text-lg mb-4">Connect with Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 pt-4 mt-6 text-center">
          <p className="text-gray-500">&copy; 2024 SportsApp. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  