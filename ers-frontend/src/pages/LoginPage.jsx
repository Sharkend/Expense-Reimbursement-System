import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = (values) => {
        console.log(values)
        axios.post("http://localhost:9000/api/employee/login", values)
            .then((response) => {
                console.log("response:");
                console.log(response.data);
                navigate('/', {state: response.data})
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('email is required').email('email should be valid'),
        password: Yup.string().required('password is required').min(6, 'password should be 6 character long')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <h2>Login</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" value={formik.values.username}
                                    name="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'}
                                />
                                {formik.touched.username && formik.errors.username ? <small className='text-danger'>{formik.errors.username}</small> : null}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'} />
                                {formik.touched.password && formik.errors.password ? <small className='text-danger'>{formik.errors.password}</small> : null}
                            </div>
                            <input type="submit" value="Login" disabled={!formik.isValid} className="btn btn-primary btn-block" />
                        </form>
                        <br />
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
export default LoginPage;