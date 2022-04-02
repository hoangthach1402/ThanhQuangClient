import React from 'react'
import {Card} from 'react-bootstrap'
import { useQuery } from "@apollo/client";
import { getSingleBook } from "../../graphql-client/queries";
const BookDetail = ({bookId}) => {
  // console.log(bookId)
  const {loading,error,data} = useQuery(getSingleBook,{
  variables:{
  id:bookId
  }
  })
  if(loading) return <p>Loading...</p>
  // if(bookId!==null && error) return <p>Error Loading...</p>
  if(error) return <p>Error ...</p>
  
  // if(bookId===null) return <p>not selected</p>
  // if(loading) return <p>Loading...</p>
  return (
    <Card bg='info' text='white' className='shadow' >  
    <Card.Body>
    
    <Card.Title>{data.book.name}</Card.Title>
    <Card.Subtitle>{data.book.genre}</Card.Subtitle>
    <Card.Text>
    <p>{data.book.author.name}</p>
    <p>{data.book.author.age}</p>
    <p>All book by this author</p>
    <ul>
       {data.book.author.books.map(book=>(
       
        <li>{book.name}</li>
       ))
       }
      
    </ul>
    </Card.Text>
    </Card.Body>
    
    </Card>
  )
}

export default BookDetail