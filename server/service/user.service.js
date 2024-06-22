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

class VerifiedUsers {
  verifiedUsersList;
  key;

  constructor() {
    this.verifiedUsersList = new Map();
  }
  setUser(keys) {
    this.key = keys?.email ? keys.email : keys?.phone;
    this.verifiedUsersList.set(this.key, true);
  }
  isUserVerified(keys) {
    this.key = keys?.email ? keys.email : keys?.phone;
    return this.verifiedUsersList.get(this.key);
  }
  deleteUser(keys) {
    this.key = keys?.email ? keys.email : keys?.phone;
    this.verifiedUsersList.delete(this.key);
  }
}

const verifiedUsers = new VerifiedUsers();

export { verifiedUsers };
export { setUserToList, getUserFromList, deleteUserFromList, getAllUsers };
