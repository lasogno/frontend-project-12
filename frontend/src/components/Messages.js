import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages } from '../slices/messagesSlice';

import NewMessagesForm from './NewMessagesForm';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { io } from 'socket.io-client';

const Messages = () => {
    const socket = io();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages());
    }, []);
    
    const allMessages = Object.values(useSelector((state) => state.messages.entities));
    const channels = Object.values(useSelector((state) => state.channels.entities));

    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const activeChannel = channels.find(({ id }) => id === currentChannelId);
    const channelName = activeChannel ? activeChannel.name : 'general';

    const messages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
    const quantity = messages.length;

    socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
      });

    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'>
                        <b># {channelName}</b>
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
                <NewMessagesForm />
            </div>
        </div>
    );
};

export default Messages;