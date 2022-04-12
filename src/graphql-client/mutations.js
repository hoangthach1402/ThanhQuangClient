import { gql } from '@apollo/client'

const createProduct =gql`
mutation($name: String!, $stock: Int!, $type: String!, $img: String!, $price: Float!){
  createProduct(name: $name, stock: $stock, type: $type, img: $img, price: $price) {
    name
  }
}
`
const editProduct =gql`
mutation($editProductId: ID!, $name: String!, $stock: Int!, $type: String!, $img: String!, $price: Float!){
  editProduct(id: $editProductId, name: $name, stock: $stock, type: $type, img: $img, price: $price) {
    name 
  }
}
`
const createUser = gql`
 mutation addUser($name: String!, $mobile: String!, $address: String!){
  createUser(name: $name, mobile: $mobile, address: $address) {
    name
  }
}
`
const deleteUser =gql`
	mutation {
  deleteUser(id: $deleteUserId) {
    name
  }
}
`
const deleteProduct =gql`
  mutation deleteProduct($deleteProductId: ID!){
  deleteProduct(id: $deleteProductId) {
   name 
  }
}
`


const addSingleAuthor = gql`
	mutation addSingleAuthorMutation($name: String, $age: Int) {
		createAuthor(name: $name, age: $age) {
			id
			name
		}
	}
	`
  const deleteOrder =gql`
  mutation deleteOrder($deleteOrderId: ID!){
  deleteOrder(id: $deleteOrderId) {
  payying
  }
}
  `

const createOrder =gql`
mutation createOrder($userId: ID!, $input: [InputProduct]!, $payying: Int!){
  createOrder(userId: $userId, input: $input, payying: $payying) {
    payying
  }
}
`	;
const editUser =gql`
  mutation editUser($editUserId: ID!, $name: String!, $mobile: String!, $address: String!){
  editUser(id: $editUserId, name: $name, mobile: $mobile, address: $address) {
    name
  }
}
`

export {  addSingleAuthor ,createUser,deleteUser,editProduct,createProduct,createOrder,deleteProduct,deleteOrder}