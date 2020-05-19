import React, { useState } from "react";
import axios from "axios";

export default function useUserData() {
  const [state, setState] = useState({
    users: []
  });

  const validate = () => {
    axios.get(``)
  }
  
  return {
    state,
    validate,
  }
}