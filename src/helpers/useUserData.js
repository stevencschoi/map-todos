import React, { useState } from "react";
import axios from "axios";

export default function useUserData() {
  const [state, setState] = useState({
    users: [],
  });

  const validate = (username, password) => {
    axios
      .post(`http://localhost:4000/login`, {
        username: username,
        password: password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  return {
    state,
    validate,
  };
}
