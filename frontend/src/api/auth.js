import api from "./axios.js"

export const loginUser = (data) => api.post("/auth/login",data)
export const registerUser = (data) => api.post("/auth/register",data)

export const getMe = () => api.get("/users/me")
export const logoutUser = () => api.post("/auth/logout")
export const verifyUserEmail = (token) => api.get(`/auth/verify-email/${token}`)