import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { getToken } from "./services/authService";

const httpLink = new HttpLink({
  uri: "http://localhost/Tirocinio/CMS_headless/graphql",
  credentials: "omit",
});

//permetto lacomunicazione con apollo client
const authLink = new ApolloLink((operation, forward) => {
  const token= getToken(); //utilizzo la get di authservice per recuperare il token
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;