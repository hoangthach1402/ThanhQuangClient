import React from 'react'
// import {} from 'react-bootstrap'
const Form = () => {
  return (
    <div className='row'>
    <div className='col-6'>
    <form>
    <div class="form-group">
      <label for="name">Book Name</label>
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter bookName" />
    
      <label for="genre">Book genre</label>
      <input type="text" class="form-control" id="genre" aria-describedby="emailHelp" placeholder="Enter genre" />
     
      <select class="custom-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
    </div>
   
  
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    </div>
    <div className="col-6">
    <form>
    <div class="form-group">
      <label for="authorName">Author Name</label>
      <input type="text" class="form-control" id="authorName" aria-describedby="emailHelp" placeholder="Enter authorName" />
    
      <label for="age">Author Age </label>
      <input type="Number" class="form-control" id="age" aria-describedby="emailHelp" placeholder="Enter AuthorAge" />
 
    </div>
   
  
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    
    </div>
    </div>

  )
}

export default Form