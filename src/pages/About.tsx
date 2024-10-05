import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen text-dark-text-color bg-gray-100">
      {/* Sekcja Hero */}
      <div className="relative h-[400px] bg-gradient-to-r from-orange-500 to-gray-500 flex items-center justify-center">
        <div className="bg-opacity-60 bg-black p-6 rounded-lg text-center">
          <h1 className="text-5xl font-bold text-white">Witamy w Sport Event App</h1>
          <p className="mt-4 text-lg text-gray-200">Łączymy sportowców i entuzjastów sportu z wydarzeniami na całym świecie.</p>
        </div>
      </div>

      {/* Sekcja O nas */}
      <div className="container mx-auto p-8 bg-white text-dark-text-color shadow-lg mt-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Nasza misja</h2>
        <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700">
          Sport Event App ma na celu łączenie sportowców i entuzjastów sportu, oferując platformę, na której każdy może znaleźć i wziąć udział w wydarzeniach sportowych. Naszym celem jest budowanie społeczności, w której ludzie mogą dzielić się pasją do sportu, pozostawać aktywnymi i rywalizować z innymi.
        </p>
      </div>

      {/* Sekcja Funkcje */}
      <div className="container mx-auto p-8 mt-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Co oferujemy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <img src="https://example.com/icon1.png" alt="Łatwa rejestracja" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Łatwa rejestracja</h3>
            <p className="text-gray-600">Zarejestruj się i uczestnicz w wydarzeniach bez wysiłku, dzięki przyjaznemu interfejsowi.</p>
          </div>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <img src="https://example.com/icon2.png" alt="Różnorodne wydarzenia" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Różnorodne wydarzenia</h3>
            <p className="text-gray-600">Wybieraj spośród szerokiej gamy wydarzeń sportowych, od maratonów po sporty zespołowe.</p>
          </div>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <img src="https://example.com/icon3.png" alt="Rankingi na żywo" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Rankingi na żywo</h3>
            <p className="text-gray-600">Śledź swoje wyniki w czasie rzeczywistym i porównuj je z innymi uczestnikami.</p>
          </div>
        </div>
      </div>

      {/* Sekcja Opinie */}
      <div className="container mx-auto p-8 mt-12 bg-gray-50 text-dark-text-color shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Co mówią ludzie</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg italic text-gray-600">"Aplikacja Sport Event sprawiła, że ​​z łatwością mogłem znaleźć i wziąć udział w lokalnych wydarzeniach sportowych. Uwielbiam społeczność i wygodę!"</p>
            <p className="text-right mt-4 text-sm text-gray-500">- Jan Kowalski</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg italic text-gray-600">"Udało mi się wziąć udział w wielu maratonach i na bieżąco śledzić moje wyniki dzięki aplikacji. To zmieniło moje podejście do sportu!"</p>
            <p className="text-right mt-4 text-sm text-gray-500">- Anna Nowak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
