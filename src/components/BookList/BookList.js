import React ,{useState} from "react";
import styles from "./BookList.module.scss";
import { Card, Row, Col, CardGroup } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { getBooks } from "../../graphql-client/queries";
// import CardColumns from 'react-bootstrap'
import BookDetail from "../BookDetail/BookDetail";
const BookList = () => {
  const [bookSelected,setBookSelected] =useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <Row>
      <Col xs={8}>
        <div className="row justify-content-around">
          {data.books.map((book) => (
            <Card className="m-6 sm-12 col-6">
          
              <Card.Body onClick={setBookSelected.bind(this,book.id)}>{book.name}</Card.Body>
            </Card>
          ))}
        </div>
      </Col>

      <Col xs={4}>
        <BookDetail bookId={bookSelected}/>
      </Col>
    </Row>
  );
};

export default BookList;
