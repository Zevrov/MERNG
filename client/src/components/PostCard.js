import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({post: {body, createdAt, id, username, likeCount, commentCount}}){
    
  function likePost(){
    console.log('Like')
  }

  function comment(){
    console.log('comment')
  }

  return (
        <Card Fluid>
      <Card.Content>
        <Image floated='right' 
               size='mini' 
               src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button as='div' labelPosition='right' onClick={likePost}>
            <Button icon>
            <Icon name='heart' />
              Like
            </Button>
            <Label as='a' basic pointing='left'>
            {likeCount}
            </Label>
          </Button>

          <Button as='div' labelPosition='right' onClick={comment}>
            <Button icon>
            {/* <Icon name='heart' /> */}
              Comments
            </Button>
            <Label as='a' basic pointing='left'>
            {commentCount}
            </Label>
          </Button>
      </Card.Content>
    </Card>
    )
}

export default PostCard