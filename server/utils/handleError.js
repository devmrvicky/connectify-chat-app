const handleError = (error, res) => {
  console.log(error.message);
  return res.status(500).json({ status: false, message: error.message });
};

export { handleError };
