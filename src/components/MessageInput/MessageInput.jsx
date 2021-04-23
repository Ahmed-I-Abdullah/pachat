import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import { createMessage } from '../../graphql/mutations';
import './MessageInput.scss';

const MessageInput = ({ roomID, currentUserID }) => {
  const [message, setMessage] = useState('');

  const onSend = async () => {
    if (message !== '') {
      await API.graphql(graphqlOperation(
        createMessage, {
          input: {
            content: message,
            userID: currentUserID,
            chatRoomID: roomID,
          },
        },
      )).then(setMessage(''))
        .catch((e) => console.log('Message send error: ', e));
    }
  };

  return (
    <div className="message-input">
      <div id="message-form">
        <input id="text-message" type="text" autoComplete="off" placeholder="Type your message here ..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={onSend} type="submit">SEND</button>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  roomID: PropTypes.string.isRequired,
  currentUserID: PropTypes.string.isRequired,
};

export default MessageInput;
