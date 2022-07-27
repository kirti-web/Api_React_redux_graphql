import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS, VIEW_POSTS } from "./Queries";
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';

function App() {
  const getAllPosts = useQuery(GET_POSTS);
  const postInfo = useQuery(VIEW_POSTS, { variables: { id: 1 }});
  if (getAllPosts.loading || postInfo.loading) return <Spinner color="dark" />;
  if (getAllPosts.error || postInfo.error) return <React.Fragment>Error :(</React.Fragment>;

  return (
    <div className="container">
      <Card>
        <CardHeader>Query - Displaying all data</CardHeader>
        <CardBody>
          <pre>
            {JSON.stringify(getAllPosts.data, null, 2)}
          </pre>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Query - Displaying data with args</CardHeader>
        <CardBody>
          <CardSubtitle>Viewing a post by id</CardSubtitle>
          <pre>
            {JSON.stringify(postInfo.data, null, 2)}
          </pre>
        </CardBody>
      </Card>
    </div>
  )
}

export default App;
