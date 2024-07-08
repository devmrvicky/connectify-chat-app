import { SERVER_URL } from "./serverUrl";

console.log(SERVER_URL);

// const BASE_URL = `https://connectifyserver-wwog.onrender.com/api`;
// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = `${SERVER_URL}/api`;

const apiGet = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const apiPost = async (endpoint, body = {}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return await res.json();
};

const apiPut = async (endpoint, body = {}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return await res.json();
};

const apiDelete = async (endpoint, body={}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return await res.json();
};

export { apiGet, apiPost, apiPut, apiDelete };
