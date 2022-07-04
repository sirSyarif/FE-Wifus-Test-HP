import axios from "axios";

const login = ({ email, password }) => {
  const response = axios.post("/api/login", {
    email,
    password,
  });

  return response;
};

const UserService = {
  login,
};

export default UserService;
