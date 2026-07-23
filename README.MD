# ShoppyGlobe Backend

A RESTful e-commerce backend built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. This project provides APIs for user authentication, product management, and shopping cart operations.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Product Management
- Shopping Cart Management
- MongoDB Atlas Integration
- Error Handling
- RESTful API Design

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv

---

## Project Structure

```
ShoppyGlobe-Backend/
│
├── config/
│   └── Db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── cartController.js
│
├── middleware/
│   └── authMiddleware.js
│   └── validator.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Cart.js
│
├── routes/
│   ├── userRoute.js
│   ├── productRoute.js
│   └── cartRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── .gitignore
├── server.js
└── package.json
```

---

## Installation

### Clone the repository

```bash
git clone <https://github.com/mohitsingh540zs-dotcom/shoppy-globe-backend-url>
```

### Navigate into project

```bash
cd ShoppyGlobe-Backend
```

### Install dependencies

```bash
npm install
```

### Create a .env file

```env
PORT=5100

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### Start Development Server

```bash
npm run dev
```

or

```bash
npm start
```

---

# API Endpoints

## Authentication

### Register User

```
POST /auth/register
```

### Login User

```
POST /auth/login
```

---

## Products

### Get All Products

```
GET /products
```

### Get Product By ID

```
GET /products/:id
```

### Create Product

```
POST /products
```

---

## Cart

> Protected Routes (Require JWT)

### Get Cart

```
GET /cart
```

### Add Product to Cart

```
POST /cart
```

### Update Cart Item

```
PUT /cart/:productId
```

### Remove Product from Cart

```
DELETE /cart/:productId
```

---

## Authentication

This project uses **JWT (JSON Web Token)** for authentication.

After login, include the token in the request header.

Example:

```
Authorization: Bearer <your_token>
```

---

## 📦 Database Models

### User

- First Name
- Last Name
- Email
- Password (Hashed)

### Product

- Product Name
- Description
- Price
- Stock Quantity

### Cart

- User
- Items
  - Product
  - Quantity

---

## Testing

The APIs can be tested using:

- Thunder Client
- Postman

---

## Future Improvements
- Product Categories
- Product Images
- Wishlist
- Order Management
- Payment Gateway Integration
- Role-Based Authentication
- Refresh Tokens
- Cookie-Based Authentication

---

## Author

**Mohit Singh Bisht**

---

## License

This project is developed for learning purposes.