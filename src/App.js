import GlobalState from "./components/GlobalState/GlobalState";
import { Container } from "react-bootstrap";
import BookList from "./components/BookList/BookList";
import { Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form";
import clsx from "clsx";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  ApolloProvider,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "https://hellographqlvn.herokuapp.com/",
    cache: new InMemoryCache(),
  });
  console.log(client);
  return (
    <ApolloProvider client={client}>
      <div
        className="container py-3 mt-3"
        style={{ backgroundColor: "lightcyan" }}
      >
        <h1 className="text-center text-info mb-3 ">My Books</h1>
        <hr />
        <Form />
        <hr />
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
