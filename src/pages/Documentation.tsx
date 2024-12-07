import React from 'react';

const Documentation = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <header className="text-3xl font-bold text-blue-600 mb-6">
        Create Account Documentation
      </header>
      <section className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Step 1: Register</h2>
        <p className="text-gray-700 mb-4">
          If you don’t have an account in our application, you can create one by clicking the 
          <span className="font-medium text-blue-500"> Register </span> 
          button in the top-right corner or 
          <span className="font-medium text-blue-500"> Click here to register </span> 
          under the login form.
        </p>
        <div className="flex justify-center">
          <img
            src="/assets/doc-1.jpg"
            alt="Register screen"
            className="rounded-md shadow-lg max-w-full"
          />
        </div>
      </section>
      <section className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Step 2: Fill the Registration Form</h2>
        <p className="text-gray-700 mb-4">
          In this form, you need to enter your email and a password containing at least 5 characters, 
          one uppercase letter, one number, and one special character. Then click the 
          <span className="font-medium text-blue-500"> Register </span> button. If everything is successful, 
          you will receive an appropriate message and will be able to log in to the application 
          using the previously provided registration details.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <img
            src="/assets/doc-2.jpg"
            alt="Form screen"
            className="rounded-md shadow-lg max-w-full"
          />
        </div>
        <div className='flex flex-col md:flex-row justify-center gap-6'>
        <img
            src="/assets/doc-3.jpg" 
            alt="Success message"
            className="rounded-md shadow-lg max-w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default Documentation;
