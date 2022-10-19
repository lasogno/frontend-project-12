import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { getcurrentChannelMessages } from '../../slices/selectors';

filter.add(filter.getDictionary('ru'));

const MessagesBox = () => {
  const channellsMesages = useSelector((state) => getcurrentChannelMessages(state));

  const messagesBoxRef = useRef(null);
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  });

  return (
    <div
      id="message-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesBoxRef}
    >
      {channellsMesages && (
        channellsMesages.map(({ id, body, username }) => {
          const filteredBody = filter.clean(body);
          return (
            <div className="text-break mb-2" key={id}>
              <b>{username}</b>
              :
              {filteredBody}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessagesBox;
