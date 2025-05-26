import { gql } from "@apollo/client";


export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      success
      user {
        email
      }
    }
  }
`;


export const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {
    resetUserPassword(input: {
      key: $key,
      login: $login,
      password: $password
    }) {
      user {
        id
        username
      }
    }
  }
`;
