import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages } from '../slices/messagesSlice';

import NewMessagesForm from './NewMessagesForm';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { io } from 'socket.io-client';

const Messages = () => {
    const socket = io();
    const dispatch = useDispatch();
    const messages = Object.values(useSelector((state) => state.messages.entities));

    const quantity = useSelector((state) => state.messages.ids).length;

    const addMessage = (message) => {
        dispatch(messagesActions.addMessage(message))
    }

    socket.on('newMessage', (payload) => {
        console.log(payload)
        dispatch(messagesActions.addMessage(payload));
      });

    useEffect(() => {
        dispatch(fetchMessages());
    }, []);

    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'>
                        <b># general</b>
                    </p>
                    <span className='text-muted'>{quantity} сообщений</span>
                </div>
                <div id="messages-box" className='chat-messages overflow-auto px-5'>
                    {messages.map(({ username, body, id }) => (
                        <div key={id} className="text-break mb-2">
                            <b>{username}</b>
                            {': '}
                            {body}
                        </div>
                    ))}
                </div>
                <NewMessagesForm addMessage={addMessage} />
            </div>
        </div>
    );
};

export default Messages;