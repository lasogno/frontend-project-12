import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';
import {
  Formik, Form,
} from 'formik';
import {
  Container, Col, Card, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import TextField from '../TextField';
import { useAuth } from '../providers/AuthProvider';
import loginAvatar from '../../images/love-message.png';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onSignup } = useAuth();
  const [authError, setAuthError] = useState();
  const firstInput = useRef(null);

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };
  const validationSchema = object({
    username: string().required(t('validation_errors.is_required')).matches(/^[\S]{3,20}$/, t('validation_errors.wrong_length')),
    password: string().required(t('validation_errors.is_required')).min(6, t('validation_errors.too_short')),
    passwordConfirmation: string().oneOf([ref('password'), null], t('validation_errors.passwords_must_match')),
  });
  const handleSubmit = async ({ passwordConfirmation, ...values }) => {
    try {
      await onSignup(values);
      navigate('/');
    } catch (e) {
      switch (Number(e.message)) {
        case 409: setAuthError(t('auth_errors.user_exist'));
          break;
        case 401: setAuthError(t('auth_errors.unauthorized'));
          break;
        case 500: toast.error(t('toast_messages.server_lost'));
          break;
        case 0: toast.error(t('toast_messages.connection'));
          break;
        default: toast.error(t('toast_messages.unknown'));
      }
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="coll-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  className="rounded-circle"
                  src={loginAvatar}
                  alt="Login avatar"
                  width={300}
                  height={300}
                />
              </Col>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={handleSubmit}
              >
                {({
                  values, errors, touched, handleChange, handleBlur,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('authorization.signup')}</h1>
                    <TextField
                      ref={firstInput}
                      name="username"
                      placeholder={t('placeholders.username_reg_ph')}
                      error={authError || errors.username}
                      errorMessage={errors.username}
                      value={values.username}
                      touched={touched.username}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TextField
                      name="password"
                      placeholder={t('placeholders.password_ph')}
                      error={authError || errors.password}
                      errorMessage={authError || errors.password}
                      value={values.password}
                      touched={touched.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TextField
                      name="passwordConfirmation"
                      placeholder={t('placeholders.password_сonfirmation_ph')}
                      error={authError || errors.passwordConfirmation}
                      errorMessage={authError || errors.passwordConfirmation}
                      value={values.passwordConfirmation}
                      touched={touched.passwordConfirmation}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <button
                      className="w-100 mb-3 btn btn-outline-primary"
                      type="submit"
                    >
                      {t('authorization.signup_btn')}
                    </button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Signup;
