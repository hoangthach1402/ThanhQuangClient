import React, { useState,useContext } from "react";
import { createUser } from "../../graphql-client/mutations";
import {getUsers} from '../../graphql-client/queries';
import { useMutation, useQuery } from "@apollo/client";
import {ThanhQuangContext} from '../../App';
const UserManagement = ({handleIsCreate}) => {
  const {handleCreateUserSuccess} = useContext(ThanhQuangContext)     
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [addUser, userMutated] = useMutation(createUser);
  const handleChange = (changes) => {
    setUser({ ...user, ...changes });
  };
  const handleSubmit = () => {
    addUser({
      variables: {
        name: user.name,
        mobile: user.mobile,
        address: user.address,
      },
      refetchQueries: [{ query:getUsers}]
    });
    handleCreateUserSuccess()
    handleIsCreate();
    setUser({
      name: "",
    mobile: "",
    address: "",
    })

  };

  return (
    <div className="bg-dark  w-100  p-4 text-light border m-2">
      <div class="mb-3">
        <h4 >Form Thong Tin Khach hang</h4>
        <label for="exampleFormControlInput1" class="form-label">
          Ten Khach Hang
        </label>
        <input
          type="text"
          value={user.name}
          onInput={(e) => handleChange({ name: e.target.value })}
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="tran thi buoi"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Mobile
        </label>
        <input
          type="text"
          value={user.mobile}
          onInput={(e) => handleChange({ mobile: e.target.value })}
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="enter mobile: 0912345678"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Dia Chi
        </label>
        <input
          type="text"
          value={user.address}
          onInput={(e) => handleChange({ address: e.target.value })}
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>

      <button
        onClick={() => handleSubmit()}
        className=" btn border border-light px-4  bg-dark text-white d-block m-auto"
      >
        Create Customer
      </button>
    </div>
  );
};

export default UserManagement;
