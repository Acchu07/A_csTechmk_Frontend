const baseURL = "http://localhost:3000/"; // Modify this to the port you chose

const loginURL = `${baseURL}api/auth/login`;
const createAgentURL = `${baseURL}api/agent/createAgent`;
const uploadCSVURL = `${baseURL}api/admin/uploadCSV`;
export { baseURL, loginURL, createAgentURL, uploadCSVURL };
