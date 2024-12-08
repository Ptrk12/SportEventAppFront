import React from 'react';

const Documentation = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <nav className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-4xl mx-auto">
        <ul className="flex flex-col gap-4 justify-center">
          <li>
            <a
              href="#create-account-doc"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Create Account Documentation
            </a>
          </li>
          <li>
            <a
              href="#sports-event-signup"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Sports Event Signup
            </a>
          </li>
          <li>
            <a
              href="#create-sports-event"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Create Sports Event
            </a>
          </li>
          <li>
            <a
              href="#facility-details"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Object Details
            </a>
          </li>
          <li>
            <a
              href="#create-sports-facility"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Create Sports Object
            </a>
          </li>
          <li>
            <a
              href="#my-events-objects"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              My Events and Objects
            </a>
          </li>
          <li>
            <a
              href="#edit-sports-event"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Edit Sports Event
            </a>
          </li>
          <li>
            <a
              href="#change-password"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Change Password
            </a>
          </li>
        </ul>
      </nav>
      <div id="create-account-doc" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Account Documentation
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Step 1: Register</h2>
          <p className="text-gray-700 mb-4 text-center">
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
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Step 2: Fill the Registration Form</h2>
          <p className="text-gray-700 mb-4 text-center">
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
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <img
              src="/assets/doc-3.jpg"
              alt="Success message"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
      <div id="sports-event-signup" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Sports Event Signup
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign up for a Sports Event</h2>
          <p className="text-gray-700 mb-4 text-center">
            To sign up for a sports event, go to the <span className="font-medium text-blue-500">Events</span> tab 
            and click <span className="font-medium text-blue-500">Sign In</span> on the chosen event. 
            To unsubscribe, click the <span className="font-medium text-blue-500">Sign Out</span> button.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-4.jpg"
              alt="Sports event signup"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
      <div id="create-sports-event" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Sports Event
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Sports Event</h2>
          <p className="text-gray-700 mb-4 text-center">
            To create a new sports event, click the 
            <span className="font-medium text-blue-500"> Create Event </span> button and fill in the form. 
            After completing the form correctly, the sports event will be created.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-5.jpg"
              alt="Create sports event"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
      <div id="facility-details" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Object Details
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">View Object Details</h2>
          <p className="text-gray-700 mb-4 text-center">
            To view details of the Object where the sports event is being created, click the 
            <span className="font-medium text-blue-500"> question mark icon </span> in the event creation form. 
            You will be redirected to a view with detailed information about the Object.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-6.jpg"
              alt="Facility details view"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
            <div id="create-sports-facility" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Sports Object
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Sports Facility</h2>
          <p className="text-gray-700 mb-4 text-center">
            If the Object you want to organize a sports event at is not listed, you can create it by clicking the 
            <span className="font-medium text-blue-500"> Can't See Interested Object? Create One </span> button. 
            You will be redirected to a form that needs to be filled out. After completing the form, the data will 
            be validated, and the Object will be created.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-7.jpg"
              alt="Create sports facility form"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
       <div id="my-events-objects" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          My Events and Objects
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Manage Your Events and Objects</h2>
          <p className="text-gray-700 mb-4 text-center">
            After clicking your email in the top-right corner and then clicking the 
            <span className="font-medium text-blue-500"> My Events and Objects </span> button, 
            you will be redirected to a new tab where you can see the sports facilities you created. 
            You can delete them, but only if no sports event is currently taking place on them.
          </p>
          <div className="flex justify-center mb-8">
            <img
              src="/assets/doc-10.jpg"
              alt="My events and objects screen"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
          <p className="text-gray-700 mb-4 text-center">
            If you click the <span className="font-medium text-blue-500"> My Events </span> button, 
            you will be redirected to a tab where you can see the sports events you are registered for.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-11.jpg"
              alt="My events screen"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
        <div id="edit-sports-event" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Edit Sports Event
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Edit or Delete a Sports Event</h2>
          <p className="text-gray-700 mb-4 text-center">
            To edit a sports event you created, click the button highlighted in the image below, 
            then fill out the form. You can also delete the event if you are its creator. 
            In such a case, all participants registered for the event will have their coins refunded.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-12.jpg"
              alt="Edit sports event button"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/doc-13.jpg"
              alt="Edit sports event button"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
       <div id="registered-list" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Registered Participants List
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            View Registered Participants
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            To see who registered for a sports event, click the button highlighted in the image below. 
            You will then see a list of emails of the people who have signed up for the event.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-14.jpg" 
              alt="Button to view registered participants"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/doc-15.jpg" 
              alt="Button to view registered participants"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
       <div id="change-password" className="w-full max-w-4xl mx-auto">
        <header className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Change Password
        </header>
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            How to Change Your Account Password
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            To change your account password, click your email in the top-right corner and then 
            click the <span className="font-medium text-blue-500"> Settings </span> button. 
            You will be redirected to a password change form where you need to provide your old password and a new one. 
            After filling out the form, click the <span className="font-medium text-blue-500"> Submit </span> button.
          </p>
          <div className="flex justify-center">
            <img
              src="/assets/doc-9.jpg" 
              alt="Password change form"
              className="rounded-md shadow-lg max-w-full"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
