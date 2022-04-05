import axios from 'axios';

const instance = axios.create({
  baseURL: "https://emt-lab2-library-backend.herokuapp.com/api",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default instance;