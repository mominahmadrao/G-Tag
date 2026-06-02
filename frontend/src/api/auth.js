import api from "./axios.js"

export const loginUser = (data) => api.post("/auth/login",data)
export const registerUser = (data) => api.post("/auth/register",data)

export const getMe = () => api.get("/users/me")
export const logoutUser = () => api.post("/auth/logout")
export const verifyUserEmail = (token) => api.get(`/auth/verify-email/${token}`)
export const forgotPassword = (email) => api.post("/auth/forgot-password", { email })
export const resetPassword = (token, newPassword) => api.post(`/auth/reset-password/${token}`, { newPassword })
export const changePassword = (oldPassword, newPassword) => api.post("/auth/change-password", { oldPassword, newPassword })
export const resendEmailVerificationApi = () => api.post("/auth/resend-email-verification")
export const updateProfile = (data) => api.patch("/users/me", data)
export const checkEmailVerifiedStatus = (email) => api.get(`/auth/email-status/${email}`)
export const resendVerificationPublic = (email) => api.post("/auth/resend-verification-public", { email })