import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  {
    getPosts {
      id,
      title,
      description,
      status
    }
  }
`;

export const VIEW_POSTS = gql`
  query ($id: Int){
    getPostInfo(id: $id) {
      id,
      title,
      description,
      status
    }
  }
`;

export const ADD_POST = gql`
  mutation($title: String, $status: String, $description: String) {
    createPost (title: $title, description: $description, status: $status)
  }
`;

export const EDIT_POST = gql`
  mutation($id: Int, $title: String, $status: String, $description: String) {
    updatePostInfo (id: $id, title: $title, status: $status, description: $description)
  }
`;

export const DELETE_POST = gql`
  mutation($id: Int) {
    deletePost(id: $id)
  }
`
