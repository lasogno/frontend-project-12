import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllChannels, getModalChannel } from '../../slices/selectors';
import { useChatApi } from '../providers/ChatApiProvider';

const RenameChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const existingChannelsNames = useSelector(getAllChannels).map(({ name }) => name);
  const { id, initialName } = useSelector(getModalChannel);
  const { updateChannelName } = useChatApi();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('validation_errors.is_required'))
      .min(3, t('validation_errors.wrong_length'))
      .max(20, t('validation_errors.wrong_length'))
      .notOneOf(existingChannelsNames, t('validation_errors.has_to_be_unique')),
  });

  const formik = useFormik({
    initialValues: { name: initialName },
    validationSchema,
    onSubmit: ({ name }) => {
      updateChannelName({ name, id }, () => {
        formik.resetForm();
        onHide();
      });
      toast.success(t('toast_messages.channel_renamed'));
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modals.headers.rename')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              id="name"
              name="name"
            />
            <Form.Label
              htmlFor="name"
              className="visually-hidden"
            >
              {t('modals.body.channel_name_label')}
            </Form.Label>
            <Form.Control.Feedback
              type="invalid"
            >
              {t(formik.errors.name)}
            </Form.Control.Feedback>
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
                variant="primary"
                type="submit"
                className="me-2"
              >
                {t('modals.buttons.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};
export default RenameChannel;
