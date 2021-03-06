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
const getProductWithOrders =gql`
query getProductWithOrders($productId: ID!){
  product(id: $productId) {
    id 
    name 
    price
    stock
    type 
    orders {
      createdAt
      id
      user{
        name 
      }
      payying
      products {
        id 
        productId
        img
        name
        stock 
        price
        type 
      }
    } 
  }
}
`

const getUser = gql`
query getUserById($userId: ID!){
  user(id: $userId) {
     id 
    name 
    address 
    
    orders {
      createdAt
      id
      products {
        id 
        productId 
        name 
        price
        stock 
        img
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
    createdAt
      id
      user {
        name
      }
      products {
        id
        productId
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
        createdAt
        payying
        products {
          id
          productId 
          name
          price
          stock  
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
  getProductWithOrders
};
