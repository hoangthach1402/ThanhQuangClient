import React, { useState, useEffect } from "react";
import styles from "./BookList.module.scss";
import { Card, Row, Col, CardGroup } from "react-bootstrap";
import EditBookForm from "../EditBookForm";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getBooks, getAuthors } from "../../graphql-client/queries";
// import CardColumns from 'react-bootstrap'
import BookDetail from "../BookDetail/BookDetail";

const BookList = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEditBook = (id) => {
    setIsEdit(!isEdit);
  };

  const [deleteBook, deleteBookMutation] = useMutation(gql`
    mutation ($deleteBookId: ID!) {
      deleteBook(id: $deleteBookId) {
        name
      }
    }
  `);

  const [bookSelected, setBookSelected] = useState(null);

  useEffect(() => {
    console.log(bookSelected);
  }, [bookSelected]);

  const { loading, error, data } = useQuery(getBooks);
  const handleDeleteBook = (id) => {
    deleteBook({
      variables: {
        deleteBookId: id,
      },
      refetchQueries: [{ query: getBooks }, { query: getAuthors }],
    });
    setBookSelected(null);
  };

  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <Row>
      <Col xs={8}>
        <div className="row justify-content-around">
          {data.books.map((book) => (
            <Card key={book.id} className="m-6 sm-12 col-6">
              <Card.Body
                className={
                  bookSelected == book.id ? "bg-dark text-white" : "bg-white"
                }
                onClick={setBookSelected.bind(this, book.id)}
              >
                {book.name}{" "}
                <button
                  onClick={() => handleEditBook(book.id)}
                  className="btn btn-primary"
                >
                  {isEdit && bookSelected == book.id ? "Info" : "Edit"}
                </button>{" "}
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="btn btn-danger"
                >
                  X
                </button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>

      <Col xs={4}>
        {isEdit ? (
          <EditBookForm bookId={bookSelected} />
        ) : (
          <BookDetail bookId={bookSelected} />
        )}
      </Col>
    </Row>
  );
};

export default BookList;
