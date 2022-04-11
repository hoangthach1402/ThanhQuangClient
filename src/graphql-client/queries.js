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
`;
const getUser =gql`
query($userId: ID!){
  user(id: $userId) {
    id
    name
    address
  }
}
`;
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
`;



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
const getOrders =gql`
query{
  orders {
    id
    user {
      name 
    }
    products {
      id
      name
      price
    }
    payying
  }
}
`;
 const getOrderByUser =gql`
  query($userId: ID!){
  user(id: $userId) {
    orders {
      payying
      products {
        name
        price
      }
    }
  }
}
 ` ;



export { getBooks, getSingleBook, getAuthors,getUsers,getUser, getProducts ,getOrderByUser,getOrders};
