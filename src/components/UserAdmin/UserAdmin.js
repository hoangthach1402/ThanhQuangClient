import React,{useEffect} from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const UserAdmin = () => {
  

 
  
  let users;
  useEffect(()=>{
    console.log('load');
    const client = new ApolloClient({
      uri: 'http://localhost:4000/',
      cache: new InMemoryCache()
    });
    async function getUsers(){
    return await client
    .query({
     query: gql`
     query ExampleQuery {
   users {
     name
   }
  }`
  })
  console.log(getUsers());
  // .then(result => result.data.users);
  // console.log(users);
    }
    
  },[])
  


    
// console.log(users);

  return (
    <div>
    {users !== undefined && users.map(user=>{
    return (
    <div>{user.name}</div>
    )
    })}
    {/* {users && users.map(user=>{
    return (
    <div>{user.name}</div>
    )
     })} */}
    user admin
    <form action=""></form>
    </div>
  )
}

 
export default UserAdmin