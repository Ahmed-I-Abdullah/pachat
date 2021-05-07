import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../actions/userActions/userSelectors';
import { createMessage } from '../../graphql/mutations';
import './MessageInput.scss';

const MessageInput = ({ roomID }) => {
  const [message, setMessage] = useState('');
  const currentUser = useSelector(selectUser);

  const onSend = async () => {
    if (message !== '') {
      await API.graphql(graphqlOperation(
        createMessage, {
          input: {
            content: message,
            userID: currentUser.attributes.sub,
            chatRoomID: roomID,
          },
        },
      )).then(setMessage(''))
        .catch((e) => console.log('Message send error: ', e));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="message-input">
      <div id="message-form">
        <input id="text-message" type="text" autoComplete="off" placeholder="Type your message here ..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={onSend} type="submit">SEND</button>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  roomID: PropTypes.string.isRequired,
};

export default MessageInput;
