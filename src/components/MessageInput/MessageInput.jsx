import React, { useState } from 'react';
import './MessageInput.scss';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const onSend = () => {
    // send to API
    setMessage('');
  };

  return (
    <div className="message-input">
      <form id="message-form" onSubmit={onSend}>
        <input id="text-message" type="text" autoComplete="off" placeholder="Type your message here ..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default MessageInput;
