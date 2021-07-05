import React from 'react';
import { Button, Form } from 'semantic-ui-react' 
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../util/graphql';

function Register() {
    const [values, setValues] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value});
    };

    const [addUser, {loading }] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result)
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    };

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    palceholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Email"
                    palceholder="Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Password"
                    palceholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Confirm Password"
                    palceholder="Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register;