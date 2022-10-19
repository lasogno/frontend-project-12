import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getModalChannel } from '../../slices/selectors';
import { useChatApi } from '../providers/ChatApiProvider';

const DeleteChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const { deleteChannel } = useChatApi();
  const { id } = useSelector(getModalChannel);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.headers.rename')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.body.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
            onClick={onHide}
          >
            {t('modals.buttons.decline')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            className="me-2"
            onClick={() => {
              deleteChannel(id, () => {
                onHide();
              });
              toast.success(t('toast_messages.channel_deleted'));
            }}
          >
            {t('modals.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
export default DeleteChannel;
