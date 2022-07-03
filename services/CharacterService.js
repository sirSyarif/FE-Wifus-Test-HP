import axios from "axios";

const getCharacter = () => {
  const response = axios.get("http://hp-api.herokuapp.com/api/characters");

  return response;
};

const CharacterService = {
  getCharacter,
};

export default CharacterService;
