import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import './App.css'

import {
  ApolloClient,
  InMemoryCache,

  ApolloProvider,

} from "@apollo/client";


const client = new ApolloClient({
  uri: "https://monkeyapp.herokuapp.com/",
  cache: new InMemoryCache(),
});
  
ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
      <App />
     </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
  );
     

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
