import toast from "react-hot-toast";

function handleInputError(data) {
  if (Object.values(data).some((field) => field === "")) {
    toast.error("All fields are required", {
      id: "empty field",
    });
    return false;
  }
  if (data.confirmPassword) {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password should be match", {
        id: "incorrect password",
      });
      return false;
    }
  }

  if (data.password.length < 6) {
    toast.error("Password length shouldn't be less 6");
    return false;
  }

  return true;
}

export { handleInputError };
