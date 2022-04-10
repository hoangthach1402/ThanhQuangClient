import React, { useContext,useState } from 'react'
// import {} from 'react-bootstrap'
import { useQuery, gql, useMutation } from "@apollo/client";
import {getBooks,getAuthors} from '../../graphql-client/queries'
const Form = () => {
  const [author,setAuthor] = useState({
    name:'',
    age:'',
    })
    const [book,setBook] = useState({
    name:'',
    genre:'',
    authorId:''
    })

  const [ addBook,mutationforAdd ] = useMutation(gql`
  mutation($name: String!, $genre: String!, $authorId: String!){
  createBook(name: $name, genre: $genre, authorId: $authorId) {
    name 
  }
}
 `)
   const [addAuthor,mutationAuthor] = useMutation(gql`
    mutation($name: String!, $age: Int!){
  createAuthor(name: $name, age: $age) {
    name
  }
}
`) 
const handleChangeAuthor =(change)=>{
  setAuthor({...author,...change})
}
const handleSubmitAuthor =()=>{
  addAuthor({
  variables:{
  name:author.name,
  age:author.age 
  },
  refetchQueries:[{query:getAuthors}]
  })
}
 
  const { loading, error, data } = useQuery(gql`
  query {
  authors{
   id
   name 
  }
  }
 `)
   
   const handleChange =(change)=>{
    setBook({...book,...change})
    // console.log(book)
   }
 const submitAddBook=()=>{
  addBook({
  variables:{
  name:book.name ,
  genre:book.genre,
  authorId:book.authorId
  },
  refetchQueries:[{query:getBooks}]
})   
}


  return (
    <div className='row'>
      <div className='col-6'>
        <div>
          <div class="form-group">
            <label for="name">Book Name</label>
            <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter bookName" value={book.name} onInput={e=>handleChange({name:e.target.value})}/>

            <label for="genre">Book genre</label>
            <input type="text" class="form-control" id="genre" aria-describedby="emailHelp" placeholder="Enter genre" value={book.genre} onInput={e=>handleChange({genre:e.target.value})}/>

            <select class="custom-select" 
            onChange={e=>handleChange({authorId:e.target.value})}
            id="inputGroupSelect01">
              <option selected>Choose...</option>
              {data && data.authors.map(author => (
                <option key={author.id} value={author.id} >{author.name}</option>
              ))}
            </select>
          </div>


          <button type="submit" onClick={submitAddBook} class="btn btn-primary">Submit</button>
        </div>
      </div>
      <div className="col-6">
        <div>
          <div class="form-group">
            <label for="authorName">Author Name</label>
            <input type="text" value={author.name} onInput={e=>handleChangeAuthor({name:e.target.value})} class="form-control" id="authorName" aria-describedby="emailHelp" placeholder="Enter authorName" />

            <label for="age">Author Age </label>
            <input type="Number" value={author.age} onChange={e=>handleChangeAuthor({age:parseInt(e.target.value)})} class="form-control" id="age" aria-describedby="emailHelp" placeholder="Enter AuthorAge" />

          </div>


          <button onClick={handleSubmitAuthor} type="submit" class="btn btn-primary">Submit</button>
        </div>

      </div>
    </div>

  )
}

export default Form