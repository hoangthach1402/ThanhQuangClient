import { gql } from "@apollo/client";

const getProducts = gql`
  query {
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
const getUser = gql`
query getUserById($userId: ID!){
  user(id: $userId) {
     id 
    name 
    address 
    orders {
      id
      products {
        id
        name 
        price
        stock 
      }
    payying        
    }
  }
  }

`;
const getUsers = gql`
query getUsers{
  users {
    id
    name
    mobile
    address
  }
}
  
`;

const getOrders = gql`
  query {
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
const getOrderByUser = gql`
  query ($userId: ID!) {
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
`;

export {
  getUsers,
  getUser,
  getProducts,
  getOrderByUser,
  getOrders,
};
