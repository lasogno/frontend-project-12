import React from 'react';
import {
  Button, ButtonGroup, Col, Dropdown, Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import filter from 'leo-profanity';
import { getAllChannels, getCurrentChannelId } from '../../slices/selectors';
import { actions } from '../../slices/channelsSlice';
import { openModal } from '../../slices/modalsSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => getAllChannels(state));
  const currentChannelId = useSelector((state) => getCurrentChannelId(state));
  const showModal = (type, id) => () => {
    dispatch(openModal({ type, id }));
  };

  return (
    <Col
      md="2"
      className="col-4 border-end pt-5 px-0 bg-light"
    >
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={showModal('add')}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        fill
        variant="pills"
        as="ul"
        className="flex-column px-2"
      >
        {channels && currentChannelId && (
          channels.map(({ id, name, removable }) => {
            const variant = id === currentChannelId ? 'secondary' : 'light';
            const filteredName = filter.clean(name);
            return (removable) ? (
              <Nav.Item key={id} className="w-100">
                <Dropdown
                  as={ButtonGroup}
                  className="d-flex rounded-0"
                >
                  <Button
                    variant={variant}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => { dispatch(actions.setCurrentChannelId(id)); }}
                  >
                    <span className="me-1">#</span>
                    {filteredName}
                  </Button>
                  <Dropdown.Toggle
                    variant={variant}
                  >
                    <span className="visually-hidden">{t('modals.buttons.controle_channel')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={showModal('rename', id)}
                    >
                      {t('modals.buttons.rename')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={showModal('delete', id)}
                    >
                      {t('modals.buttons.remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            ) : (
              <Nav.Item key={id}>
                <Button
                  variant={variant}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => { dispatch(actions.setCurrentChannelId(id)); }}
                >
                  <span className="me-1">#</span>
                  {filteredName}
                </Button>
              </Nav.Item>
            );
          })
        )}
      </Nav>
    </Col>
  );
};

export default ChannelsList;
