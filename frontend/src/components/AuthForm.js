import React from 'react';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';

const AuthForm = () => {

    return (
        <Formik
            initialValues={{ name: '', password: ''}}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting, validate }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    validate(values)
                    setSubmitting(false);
                }, 1000);
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(5, 'Must be 55 characters minimum')
                    .max(15, 'Must be 15 characters or less')
                    .required('Name is required'),
                password: Yup.string()
                    .required('No password provided.') 
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                    ),
            })}
        >
            {(formik, isSubmitting) => (
                <Form className='col-12 col-md-6 mt-3 mt-mb-0'>
                    <h1 className='text-center mb-4'>Войти</h1>
                    <div className="form-floating mb-3">
                        
                        <Field name="name" className={(formik.touched.name && formik.errors.name) ? 'form-control is-invalid' : 'form-control'} type="text" placeholder="Ваш ник"/>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                        <label htmlFor="name">Ваш ник</label>
                    </div>

                    <div className="form-floating mb-4">
                        
                        <Field name="password" className={(formik.touched.password && formik.errors.password) ? 'form-control is-invalid' : 'form-control'} type="password" placeholder="Пароль"/>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>{isSubmitting ? "Пожалуйста, подождите..." : "Войти"}</button>

                </Form>
            )
            }
        </Formik >
    );
};

export default AuthForm;