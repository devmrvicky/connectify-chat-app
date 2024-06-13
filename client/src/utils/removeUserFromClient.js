const removeUserFromClient = () => {
  localStorage.removeItem("auth-user");
};

export { removeUserFromClient };
