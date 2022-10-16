import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import cn from 'classnames';
import { actions as channelsActions } from '../slices/channelsSlice';
import ModalWindow from './ModalWindow';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { io } from 'socket.io-client';

const Channels = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    const socket = io();
    socket.on('newChannel', (payload) => {
        dispatch(channelsActions.addNewChannel(payload));
    });

    const channels = Object.values(useSelector((state) => state.channels.entities));

    const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    const changeChannel = (id) => {
        const payload = { channelId: id };
        dispatch(channelsActions.setCurrentChannel(payload));
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        const newChannelName = new FormData(e.target).get('name');
        const isNotUnique = channels.find(({ name }) => name === newChannelName);
        if (isNotUnique) {
            alert('Канал с таким названием уже существует!')
        } else {
            const socket = io();
            socket.emit('newChannel', { name: newChannelName });
        }
    }

    return channels && (
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
                <ModalWindow show={show} handleClose={handleClose} handleSubmit={handleSubmit} />
                <button type="button" class="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                        </path>
                    </svg>
                    <span class="visually-hidden">+</span>
                </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {channels.map(({ id, name, removable }) => (
                    <li key={id} className="nav-item w-100">
                        <Dropdown as={ButtonGroup} className="d-flex">
                            <button className={cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-truncate', {
                                'btn-secondary': currentChannelId === id,
                            })} onClick={() => changeChannel(id)}># {name}</button>
                            {removable && (
                                <>
                                    <Dropdown.Toggle variant={currentChannelId === id ? 'secondary' : 'light'} split className='flex-grow-0' id="dropdown-split-basic" />

                                    <Dropdown.Menu variant="light">
                                        <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                                    </Dropdown.Menu>
                                </>)}
                        </Dropdown>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Channels;
