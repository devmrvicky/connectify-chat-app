const getUserFromClient = () => {
  return JSON.parse(localStorage.getItem("auth-user"));
};

export { getUserFromClient };
