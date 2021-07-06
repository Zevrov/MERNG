import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react' 
import { useState, useContext } from 'react'

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { LOGIN_USER } from '../util/graphql';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
  
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: '',
      password: ''
    });
  
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, {data: {login: userData}}) {
        
        context.login(userData);
        props.history.push('/');
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values
    });
  
    function loginUserCallback() {
      loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    palceholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true: false}
                    onChange={onChange}
                    />
                <Button type="submit" primary>
                    Login
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

export default Login;