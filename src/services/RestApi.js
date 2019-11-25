import axios from "axios";
import { STORAGE_TOKEN } from "../constants/constants";

function getHeader() {
  const token = sessionStorage.getItem(STORAGE_TOKEN);
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  };
}

const Api = base => {
  const client = axios.create({
    baseURL: base
  });

  const get = endpoint => client.get(endpoint, getHeader());
  const post = (endpoint, data) => client.post(endpoint, data, getHeader());
  const del = endpoint => client.delete(endpoint, getHeader());
  const update = (endpoint, data) => client.patch(endpoint, data, getHeader());

  return {
    login: user => post("users/login", user)
  };
};

export default Api;
