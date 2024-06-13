const setUserToClient = (userData) => {
  localStorage.setItem("auth-user", JSON.stringify(userData));
};

export { setUserToClient };
