const usersList = new Map();

const setUserToList = (userId, socketId) => {
  usersList.set(userId, socketId);
};

const getUserFromList = (userId) => {
  return usersList.get(userId);
};

const getAllUsers = () => {
  return Array.from(usersList.keys());
};

const deleteUserFromList = (userId) => {
  usersList.delete(userId);
};

export { setUserToList, getUserFromList, deleteUserFromList, getAllUsers };
