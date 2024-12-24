import React, { useState } from 'react';

const AddMoney: React.FC = () => {
  const amounts = [5, 10, 15, 20, 50, 100, 200, 500, 1000];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleAddMoney = () => {
    if (selectedAmount !== null) {
      alert(`Added: ${selectedAmount} $`);
    } else {
      alert('Please choose amount.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 font-sans">
      <h2 className="text-2xl font-bold text-gray-800">Choose amount</h2>
      <div className="grid grid-cols-3 gap-4">
        {amounts.map((amount) => (
          <div
            key={amount}
            className={`flex justify-center items-center w-20 h-20 rounded-lg text-lg font-bold cursor-pointer transition-all border-2 
              ${selectedAmount === amount ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
            onClick={() => handleSelect(amount)}
          >
            {amount} $
          </div>
        ))}
      </div>
      <button
        className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
        onClick={handleAddMoney}
      >
        Add
      </button>
    </div>
  );
};

export default AddMoney;
