import React from 'react';

const AccountHeader = () => {
  return (
    <div className="bg-[#fff8ee] py-4 pl-20">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold ">My Account</h2>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <a href="/">Blink</a>
          <span className="mx-2">&gt;</span>
          <span>My Account</span>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;