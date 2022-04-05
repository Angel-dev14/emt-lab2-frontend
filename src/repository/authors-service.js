import axios from '../custom-axios/axios';

const AuthorsService = {
  fetchAuthors: () => {
    return axios.get("/authors");
  }
};

export default AuthorsService;