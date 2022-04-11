import React from 'react'
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
  if(error) return <p>Select a book ...</p>
  

  return (
    <>
  <div></div>       
      {/* {data ?<Card bg='info' text='white' className='shadow' >  
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
    
    </Card>: <p>select book</p>}     */}
    </>

  )
}

export default BookDetail