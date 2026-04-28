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
| GET | `/current-user` | Get current user (Secured) |
| PATCH | `/change-password` | Change password (Secured) |
| POST | `/refresh-token` | Refresh access token |
| POST | `/forgot-password` | Request reset link |
| POST | `/reset-password/:resetToken`| Reset password |
| GET | `/verify-email/:verificationToken` | Verify email |
| POST | `/resend-email` | Resend verification email (Secured) |

#### Users Routes (`/api/v1/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/me` | Customer | Get profile |
| PATCH | `/me` | Customer | Update profile |
| PATCH | `/me/password` | Customer | Update profile |
| GET | `/` | Admin | Get all users |
| DELETE | `/:id` | Admin | Delete user |

#### Categories (`/api/v1/categories`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET |	`/`	| Retrieves all categories. Available to all users (public). |
| GET |	`/:id` | Retrieves a single category and its metadata. |
| POST | `/` | (Admin Only) Creates a new category (e.g., "Consoles", "Peripherals"). |
| PUT/PATCH | `/:id` | (Admin Only) Updates category details. |
| DELETE | `/:id` | (Admin Only) Deletes a category. Logic: Must check if products still belong to it before deletion. |

#### Product (`/api/v1/product`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET |	`/`	| Retrieves all products. Logically includes query params for searching and category filtering  |
| GET |	`/:id` | Retrieves detailed information for a single product  |
| GET |	`/featured` | Retrieves only featured products that active subscribers can access  |
| POST | `/` | (Admin Only) Creates a new product. Logically validates category existence before saving. |
| PATCH | `/:id` | (Admin Only) Updates product details. |
| DELETE | `/:id` | (Admin Only) Removes a product from the catalog. |

#### Cart (`/api/v1/cart`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET |	`/`	| Retrieves the current user's cart. Logically populates product details like name and price.  |
| POST |	`/items` | Adds a product to the cart. Logic: Checks if the requested quantity is available in stock   |
| PATCH |	`/items:productId` | Updates the quantity of a specific item already in the cart.  |
| DELETE | `/items:productId` | Removes a specific item from the cart. |
| DELETE | `/` | Clears the entire cart (e.g., after an order is placed). |

#### Order (`/api/v1/orders`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST |	`/`	| Converts the current cart into a permanent order. Logic: Snapshots prices and decrements product stock   |
| GET |	`/my-orders` | Retrieves the order history for the currently authenticated customer  |
| GET |	`/:id` | Retrieves full details of a specific order, including the snapshotted items.  |
| GET | `/` | (Admin Only) Retrieves all orders in the system for fulfillment management. |
| PATCH | `/:id/status` | (Admin Only) Updates the order status (e.g., from 'placed' to 'shipped'). |

#### Payments (`/api/v1/payments`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST |	`/process`	|  Processes a payment for a specific order.  |
| GET |	`/:orderId` | Retrieves detailed information for a single product  |
| GET |	`/payment` | (Admin Only) Retrieves all transaction logs for financial auditing. |

#### Subscription (`/api/v1/subscriptions`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET |	`/plans`	| Public route to view available tiers (Standard, Gamer, Gold).  |
| POST |	`/plans` | (Admin Only) Creates a new plan template.  |
| POST |	`/subscribe` | Subscribes the current user to a plan. Logically calculates the end_date   |
| GET | `/me` | Shows the user's current active plan and remaining days . |
| DELETE | `/cancel` |  Cancels auto-renewal but keeps benefits until end_date . |


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
| **Subscription Status** | `active`, `expired`, `cancelled` |
| **Subscription Plans** | `standard`, `gamer`, `premium` |

---

## 7. Key Business Logic
1. **Stock Control:** Prevent overselling via strict stock checks.
2. **Order Snapshot:** Snapshot product data at order time to preserve history.
3. **Dynamic Pricing:** Real-time cart price calculation.
3. **Subscription Features:** Featured Product discounts that depend on user subscription plans.
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
