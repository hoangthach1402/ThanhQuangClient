import { gql } from "@apollo/client";

const getProducts =gql`
query{
  products {
    id
    name
    type
    price
    stock
    img
  }
}
`

const getUsers = gql`
  query getUsers{
    users {
      id
      name
      mobile
     
      orders {
        user {
          id
          name
        }
        payying
        products {
          id
          name
          price
        }
      }
    }
  }
`



const getBooks = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

const getSingleBook = gql`
  query getSingleBookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const getAuthors = gql`
  query getAuthorsQuery {
    authors {
      id
      name
    }
  }
`;

export { getBooks, getSingleBook, getAuthors,getUsers, getProducts };
