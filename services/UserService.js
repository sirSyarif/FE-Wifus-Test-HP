import axios from "axios";

const login = ({ email, password }) => {
  const response = axios.post(`${process.env.BASE_API_URL}/api/login`, {
    email,
    password,
  });

  return response;
};

const UserService = {
  login,
};

export default UserService;
