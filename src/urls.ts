const baseURL = "http://localhost:3000/"; // Modify this to your Front End URL

const loginURL = `${baseURL}api/auth/login`;
const createAgentURL = `${baseURL}api/agent/createAgent`;
const uploadCSVURL = `${baseURL}api/admin/uploadCSV`;
export { baseURL, loginURL, createAgentURL, uploadCSVURL };
