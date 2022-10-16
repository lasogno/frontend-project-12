import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React from 'react';

const ModalWindow = ({ handleClose, show, handleSubmit }) => {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Label visuallyHidden>Имя канала</Form.Label>
          <Form.Control type="text" name='name' id='name' className='mb-2' />
          <div className='d-flex justify-content-end'>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Сохранить изменения
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;