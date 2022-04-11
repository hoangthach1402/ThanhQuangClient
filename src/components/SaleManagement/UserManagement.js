import React, { useState } from "react";
import { createUser } from "../../graphql-client/mutations";
import {getUsers} from '../../graphql-client/queries';
import { useMutation, useQuery } from "@apollo/client";

const UserManagement = () => {
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
  };

  return (
    <div className="bg-success w-100  p-2 text-dark ">
      <div class="mb-3">
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
        className=" btn btn-primary text-white d-block m-auto"
      >
        Create
      </button>
    </div>
  );
};

export default UserManagement;
