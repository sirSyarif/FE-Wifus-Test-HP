import axios from "axios";

const login = ({ email, password }) => {
  const response = axios.post("http://localhost:3000/api/login", {
    email,
    password,
  });

  return response;
};

const UserService = {
  login,
};

export default UserService;
