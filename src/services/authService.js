import { gql } from "@apollo/client";
import client from "../apolloClient";

//mutazione graphql per il login
const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
      authToken
      user {
        id
        name
      }
    }
  }
`;



//salvo il token ed effettuo il login
export const loginUser = async(username, password) => {
  try {
    const{ data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    //salvo il token nel localstorage dello store
    if (data?.login?.authToken) {
      localStorage.setItem("token", data.login.authToken);
      return { success: true, user: data.login.user };
    } else {
      return { success: false, message: "CREADENZIALI ERRATE" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//prendo il token dal localStorage per mantenere la sessione
export const getToken =() => localStorage.getItem("token");

//per il logout elimino il token
export const logoutUser = () => {
  localStorage.removeItem("token");
};


//Registrazione del nuovo user

// Mutation per registrare un nuovo utente
const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(
      input: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

// Funzione per registrare l'utente
export const registerUser = async (username, email, password) => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_USER,
      variables: {username, email, password },
    });

    if (data?.registerUser?.user) {
      return { success: true, user: data.registerUser.user };
    } else {
      return { success: false, message: "registrazione fallita." };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//prendo lo user che ho loggato in questo momento
const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    viewer {
      id
      email
      firstName
      lastName
    }
  }
`;

//aspetto di prendere lo user(subscriber)
export const fetchCurrentUser = async () => {
  try {
    const { data } = await client.query({
      query: GET_CURRENT_USER,
      fetchPolicy: "network-only", //evita la cache
    });
    return data.viewer;
  } catch (error) {
    console.error("errore nel recupero  dati utente:", error);
    return null;
  }
};

