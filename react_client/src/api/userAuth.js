import { apiClient } from "./apiClient";

// TODO: /login
// export const executeJwtAuthenticationService
// = (username, password) => apiClient.post(`/api/user/login`, 
//     { username, password} // pass user & pass directly in request body
// );

// TODO: /register
export const registerUser
= (username, password) => apiClient.post(`/api/user/register`, 
    { username, password } // pass user & pass directly in request body
);