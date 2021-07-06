import React from 'react';
import { Button, Form } from 'semantic-ui-react' 
import { useState } from 'react'
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../util/graphql';
import { useForm } from '../util/hooks';

function Register(props) {
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, {loading }] = useMutation(REGISTER_USER, {
        update(_, result){
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser(){
        addUser();
    };

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    palceholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true: false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Email"
                    palceholder="Email.."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email ? true: false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Password"
                    palceholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true: false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Confirm Password"
                    palceholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true: false}
                    onChange={onChange}
                    />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
        <div className="ui error message">
            <ul className="list">
                {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                ))}
            </ul>
        </div>
        )}
    </div>
    );
}

export default Register;