import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../requests/req';
import authService from '../services/authService';
import authHeader from '../services/auth-header';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');
  const navigate = useNavigate();

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post('/user/change-password', {
        oldPassword,
        newPassword,
      }, { headers: authHeader() });

      if (response.status === 204) {
        setPopupMessage('Password changed successfully!');
        setPopupSeverity('success');
        setShowPopup(true);
        setOldPassword('');
        setNewPassword('');
      }
      else if (response.status === 403) {
        authService.logout();
        navigate('/login')
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setPopupMessage('Password change failed. Please check your input.');
        setPopupSeverity('error');
        setShowPopup(true);
      }
       else {
        setPopupMessage('An unexpected error occurred. Please try again.');
        setPopupSeverity('error');
        setShowPopup(true);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {showPopup && (
        <div
          className={`mt-4 p-3 rounded-md text-white ${
            popupSeverity === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Settings;
