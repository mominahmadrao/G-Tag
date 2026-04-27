# Product Requirements Document (PRD)
## G-TAG E-commerce Backend (Advanced Lab)

---

## 1. Product Overview
* **Product Name:** G-TAG E-commerce Backend
* **Version:** 1.0.0
* **Product Type:** RESTful API for Gaming & Electronics E-commerce Platform

**Description:**
G-TAG Backend is a modular API designed for managing an e-commerce platform with focus on clean architecture, secure authentication, and real-world business logic such as stock control, order lifecycle, and subscription-based pricing.

---

## 2. Target Users
* **Admins:** Manage products, categories, users, orders, and subscription plans.
* **Customers:** Browse products, manage cart, place orders, and subscribe.

---

## 3. Core Features

### 3.1 Authentication & Authorization (Enhanced)
* User registration with email verification.
* Secure login with JWT (access + refresh tokens).
* Logout with token invalidation (blacklisting).
* **Password Management:**
    * Change password (authenticated).
    * Forgot/reset password (token-based).
* Email verification & resend mechanism.
* Role-based access control (Admin, Customer).

### 3.2 Product & Category Management
* Admin-controlled categories.
* Product CRUD with category reference.
* Search, filtering, and sorting.
* Stock validation.

### 3.3 Cart System
* Add/update/remove items.
* Stock validation before adding.
* Dynamic total calculation.

### 3.4 Order Management
* Convert cart -> order.
* Snapshot product data (preserve price/details at time of purchase).
* Atomic stock deduction.
* Order lifecycle management.

### 3.5 Payment Processing
* Simulated payment system.
* Order validation before payment.
* Payment status tracking.

### 3.6 Subscription System (Advanced)
* Plan-based subscriptions.
* Discount injection via middleware.
* Optional feature gating.

---

## 4. Technical Specifications

### 4.1 API Endpoints Structure

#### Authentication Routes (`/api/v1/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout (Secured) |
| GET | `/me` | Get current user (Secured) |
| PATCH | `/change-password` | Change password (Secured) |
| POST | `/refresh-token` | Refresh access token |

#### Password Recovery
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/forgot-password` | Request reset link |
| POST | `/reset-password/:token`| Reset password |

#### Email Verification
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/verify-email/:token` | Verify email |
| POST | `/resend-verification` | Resend verification email |

#### Users Routes (`/api/v1/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/me` | Customer | Get profile |
| PATCH | `/me` | Customer | Update profile |
| GET | `/` | Admin | Get all users |
| DELETE | `/:id` | Admin | Delete user |

#### Categories & Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/categories` | List categories |
| POST | `/api/v1/categories` | Create category (Admin) |
| GET | `/api/v1/products` | Search/filter/sort products |
| POST | `/api/v1/products` | Create product (Admin) |

#### Cart & Orders
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/v1/cart` | View cart |
| POST | `/api/v1/cart/items` | Add items |
| POST | `/api/v1/orders` | Place order |
| PATCH | `/api/v1/orders/:id/status`| Update status (Admin) |

#### Payments & Subscriptions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/v1/payments/process` | Process simulated payment |
| GET | `/api/v1/subscriptions/plans` | View plans |
| POST | `/api/v1/subscriptions/subscribe`| Purchase subscription |

---

## 5. Middleware & System Logic
* **Authentication Middleware:** Verifies JWT and attaches `req.user`.
* **Authorization Middleware:** Role-based restrictions (Admin/Customer).
* **Subscription Middleware:** Checks active subscription and injects discount logic into the request.

---

## 6. Data Models Overview

| Model | Enum Values |
| :--- | :--- |
| **User Role** | `admin`, `customer` |
| **Order Status** | `placed`, `shipped`, `delivered`, `cancelled` |
| **Payment Status**| `pending`, `paid`, `failed` |
| **Subscription** | `active`, `expired`, `cancelled` |

---

## 7. Key Business Logic
1. **Stock Control:** Prevent overselling via strict stock checks.
2. **Order Snapshot:** Snapshot product data at order time to preserve history.
3. **Dynamic Pricing:** Real-time cart price calculation.
4. **Atomicity:** All-or-nothing order creation.
5. **Validation:** Strict payment validation (amount + status).

---

## 8. Security Features
* JWT authentication (Access + Refresh tokens).
* Password hashing with **Bcrypt**.
* Email verification flow.
* Secure, time-limited password reset tokens.
* Role-based access control (RBAC).
* Input validation middleware.

---

## 9. Scope Justification
This system includes advanced authentication features (email verification, reset password) because:
* They introduce real backend logic (tokens, expiry, hashing).
* They are industry standards for production systems.
* They justify workload for a collaborative team environment.

---

## 10. Success Criteria
* Clean modular architecture.
* Secure and complete authentication system.
* Functional Cart -> Order -> Payment flow.
* Proper MongoDB referencing.
* Working subscription-based discount system.
