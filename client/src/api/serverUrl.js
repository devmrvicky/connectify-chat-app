const SERVER_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_SERVER_URL
    : "http://localhost:8000";

export { SERVER_URL };
