import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';
import authService from '../services/authService';
import PopupInfo from '../components/PopupInfo';

type FormData = {
    name: string;
    description: string;
    address: string;
    city: string;
    objectType: string;
};

const cityOptions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const objectTypeOptions = ['Residential', 'Commercial', 'Industrial'];

const CreateObject: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        address: '',
        city: cityOptions[0],
        objectType: objectTypeOptions[0]
    });

    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const { name, description, address, city, objectType } = formData;
        if (name && description && address && city && objectType) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                const response = await axios.put('/api/objects', formData, {
                    headers: authHeader(),
                });

                setFormData({
                    name: '',
                    description: '',
                    address: '',
                    city: cityOptions[0],
                    objectType: objectTypeOptions[0]
                });
                if (response.status === 201) {
                    setPopupMessage("Event created successfully!");
                    setPopupSeverity("success");
                    setShowPopup(true);
                    navigate('/events');
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 400 || error.response.status === 409) {
                        setPopupMessage("Something went wrong! Event could not be created.");
                        setPopupSeverity("error");
                        setShowPopup(true);
                    }
                    else if (error.response.status === 403) {
                        authService.logout();
                        navigate('/login')
                    }
                } else {
                    console.error("Error creating event", error);
                    setPopupMessage("An unexpected error occurred.");
                    setPopupSeverity("error");
                    setShowPopup(true);
                }
            }
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
            {/* Popup message for success or error */}
            <PopupInfo
                message={popupMessage}
                severity={popupSeverity}
                open={showPopup}
                handleClose={handleClosePopup}
            />

            {/* Motivational text */}
            <div className="text-center mb-6">
                <p className="text-lg text-gray-700">Can't find the object you're looking for?</p>
                <p className="text-2xl font-bold text-orange-600">Create one now!</p>
            </div>

            {/* Form for creating a new object */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-orange-600 mb-4">Create New Object</h2>

                {/* Name Field */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
                        required
                    />
                </div>

                {/* Description Field */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
                        required
                    />
                </div>

                {/* Address Field */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
                        required
                    />
                </div>

                {/* City Dropdown */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-2">City</label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleSelectChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
                        required
                    >
                        {cityOptions.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Object Type Dropdown */}
                <div className="flex flex-col">
                    <label className="text-gray-600 mb-2">Object Type</label>
                    <select
                        name="objectType"
                        value={formData.objectType}
                        onChange={handleSelectChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
                        required
                    >
                        {objectTypeOptions.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded font-semibold text-white ${isFormValid ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        disabled={!isFormValid}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateObject;
