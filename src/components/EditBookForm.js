import React,{useState} from 'react'
import mongoose from 'mongoose';
import {getSingleBook,getAuthors,getBooks} from '../graphql-client/queries';
import {editBook} from '../graphql-client/mutations';
import {useQuery,useMutation} from '@apollo/client'
const EditBookForm = ({bookId}) => {
  
  
 
   const [editBookVariable,{ data:data_edit, loading:loading_edit, error:err_edit }] = useMutation(editBook)
  // if(err_edit){
  // console.log(
  //   err_edit.graphQLErrors);
  // }
  const {loading:authors_loading,error:authors_err,data:authors_data} = useQuery(getAuthors)
    const {loading:book_loading,error:book_err,data:book_data} = useQuery(getSingleBook,{
    variables:{
    id:bookId}
    })
    const [book,setBook] = useState({
      id:bookId,
     name:book_data.book.name,
     genre:book_data.book.genre,
     authorId:book_data.book.author.id
     })
     
  const handleChange =(changes)=>{
       

      setBook({...book,id:bookId,...changes})
  }
    
   
  const handleSubmit =()=>{
    
    
      editBookVariable({
    variables:{
      "editBookId":book.id,
    "name":book.name ,
    "genre":book.genre,
    "authorId":book.authorId ,
    },
    refetchQueries:[{query:getBooks},{query:getSingleBook}]
    })
  }
  return (
    <> 
    {book_err && <p>fail to load</p>}
    {book_loading && <p>loading data</p>}
      {book_data && 
    <div className="p-2 bg-info text-white">
   <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">BookName</span>
  <input type="text" class="form-control" value={book.name} onInput={e=>handleChange({name:e.target.value})} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Genre</span>
  <input type="text" class="form-control" value={book.genre} onInput={e=>handleChange({genre:e.target.value})} placeholder="Genre" aria-label="Username" aria-describedby="basic-addon1" />
</div>
<div class="input-group mb-3">
  <select name="" id=""
  onChange={e=>handleChange({authorId:e.target.value})}
  >
  {/* <option value="">select author</option> */}
  <option selected value={book_data.book.author.id}>{book_data.book.author.name}</option>
  {authors_data && authors_data.authors.map(author=>(
  <option key={author.id} value={author.id}>{author.name}</option>
  ))}
  
  
  </select>
</div>
<button className="btn btn-primary" onClick={handleSubmit} >Update</button>
    </div>
      
      }  
    </>
  )
}

export default EditBookForm