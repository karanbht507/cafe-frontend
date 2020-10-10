import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cafe-delhi.herokuapp.com/',
  method: 'get', //default
  responseType: 'json',
});

export default instance;