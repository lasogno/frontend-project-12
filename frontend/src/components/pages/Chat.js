import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Col, Row, Spinner,
} from 'react-bootstrap';
import { useAuth } from '../providers/AuthProvider';
import { fetchData } from '../../slices/channelsSlice';
import ChannelsList from '../chatComponents/ChannelsList';
import ChannelsHeader from '../chatComponents/ChannelHeader.js';
import MessagesBox from '../chatComponents/MessagesBox';
import MessageField from '../chatComponents/MessageField';
import ChatModal from '../chatComponents/ChatModal';

const Chat = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader));
  }, [dispatch, getAuthHeader]);

  const { channelsState } = useSelector((state) => state.channels);

  if (channelsState === 'idle') {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <ChatModal />
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsList />
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ChannelsHeader />
              <MessagesBox />
              <div className="mt-auto px-5 py-3">
                <MessageField />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Chat;
