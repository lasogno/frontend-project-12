import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import * as Yup from 'yup';

import AuthContext from './AuthContext';
import AuthProvider from './AuthProvider';

const AuthForm = () => {
    const { setNotValid, setValid } = useContext(AuthContext);
    return (
        <AuthProvider>
            <Formik
                initialValues={{ name: '', password: '' }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        axios.post('/api/v1/login', { username: values.name, password: values.password })
                            .then((response) => {
                                console.log(response.data)
                                const result = response.data;
                                localStorage.setItem(result.username, result.token);
                            })
                            .catch((e) => {
                                console.log(e);
                                console.log(setNotValid)
                            });
                    }, 1000);
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(5, 'Must be 5 characters minimum')
                        .max(15, 'Must be 15 characters or less')
                        .required('Name is required'),
                    password: Yup.string()
                        .required('No password provided.')
                        .min(5, 'Must be 5 characters minimum'),
                })}
            >
                {(formik, isSubmitting) => (
                    <Form className='col-12 col-md-6 mt-3 mt-mb-0'>
                        <h1 className='text-center mb-4'>Войти</h1>
                        <div className="form-floating mb-3">

                            <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" placeholder="Ваш ник" />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                            <label htmlFor="name">Ваш ник</label>
                        </div>

                        <div className="form-floating mb-4">

                            <Field name="password" className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'} type="password" placeholder="Пароль" />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>{isSubmitting ? "Пожалуйста, подождите..." : "Войти"}</button>
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    </Form>
                )
                }
            </Formik >
        </AuthProvider>
    );
};

export default AuthForm;