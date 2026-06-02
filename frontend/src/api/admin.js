import api from "./axios.js";

// Users
export const adminGetUsers = () => api.get("/users")
export const adminGetUser = (id) => api.get(`/users/${id}`)
export const adminDeleteUser = (id) => api.delete(`/users/${id}`)

// Categories
export const adminGetCategories = () => api.get("/categories")
export const adminCreateCategory = (data) => api.post("/categories", data)
export const adminUpdateCategory = (id, data) => api.patch(`/categories/${id}`, data)
export const adminDeleteCategory = (id) => api.delete(`/categories/${id}`)

// Products
export const adminGetProducts = (params) => api.get("/products", { params })
export const adminCreateProduct = (data) => api.post("/products", data)
export const adminUpdateProduct = (id, data) => api.patch(`/products/${id}`, data)
export const adminToggleFeatured = (id) => api.patch(`/products/${id}/feature`)
export const adminDeleteProduct = (id) => api.delete(`/products/${id}`)

// Orders
export const adminGetOrders = () => api.get("/orders")
export const adminUpdateOrderStatus = (orderId, status) => api.patch(`/orders/${orderId}/status`, { status })

// Payments
export const adminGetPayments = () => api.get("/payments/payment")

// Subscription Plans
export const adminGetPlans = () => api.get("/subscriptions/plans")
export const adminCreatePlan = (data) => api.post("/subscriptions/plans", data)
