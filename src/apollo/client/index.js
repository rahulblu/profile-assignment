import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.poc.graphql.dev.vnplatform.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlVua25vd24iLCJpc19jYW5kaWRhdGUiOnRydWUsImlhdCI6MTY5NDQ1MTE3OSwiZXhwIjoxNjk0OTY5NTc5fQ.Ok3nMdUUp4wstpN0YdwIyTkLKjNIa0-bE3iVhu0vzC0";

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

//
