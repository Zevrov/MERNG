import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql';
import { useMutation } from '@apollo/client';

function PostForm(){

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    //had to make a copy of data so because it is read only
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
               query: FETCH_POSTS_QUERY
            });
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                getPosts: {
                    newData
                }
            } })
            values.body='';
        }
    });

    function createPostCallback(){
       createPost() 
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    />
                <Button type="submit" color="teal">
                    submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default PostForm