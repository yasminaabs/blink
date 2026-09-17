import { useState, useEffect } from 'react';

const Notification = ({ messages }) => {
  const [activeMessages, setActiveMessages] = useState([]);

  // Whenever the messages prop changes, show the new message
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]; // Get the latest message
      setActiveMessages((prev) => [...prev, lastMessage]); // Add it to active messages
    }
  }, [messages]);

  // Auto dismiss after 3 seconds
  useEffect(() => {
    if (activeMessages.length > 0) {
      const timer = setTimeout(() => {
        setActiveMessages((prevMessages) => prevMessages.slice(1)); 
      }, 1000); // Notification lasts for 1 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [activeMessages]);

  return (
    <div className="fixed top-5 right-5 space-y-2 z-50">
      {activeMessages.map((message, index) => (
        <div
          key={index}
          className={`p-4 text-white rounded-lg shadow-lg transition-opacity duration-500 opacity-100`}
          style={{
            backgroundColor: '#B01736', 
          }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
