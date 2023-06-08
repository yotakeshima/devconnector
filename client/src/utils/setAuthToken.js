import axios from 'axios';

// Creates a global header for axios
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if it is not a token, delete it from the global headers
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
