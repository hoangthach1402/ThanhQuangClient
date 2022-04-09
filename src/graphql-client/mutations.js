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

const addSingleBook = gql`
	mutation addSingleBookMutation {
		createBook(name: $name, genre: $genre, authorId: $authorId) {
			id
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
const editBook =gql`
mutation($editBookId: ID!, $name: String!, $genre: String!, $authorId: String!){
  editBook(id: $editBookId, name: $name, genre: $genre, authorId: $authorId) {
    name
    genre 
    author{
    name 
    age
    }
  }
}

`	

export { addSingleBook, addSingleAuthor,editBook ,createUser,deleteUser,editProduct,createProduct}