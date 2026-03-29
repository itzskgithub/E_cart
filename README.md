# E_cart

A MERN shopping cart application with product listing, cart management, user authentication, order placement, and PayPal checkout integration.

## Project structure

- `backend/` - Express server, MongoDB connection, API routes, and backend logic
  - `controllers/` - request handlers for products, users, orders
  - `models/` - Mongoose schemas for Product, User, Order
  - `routes/` - Express route definitions
  - `middleware/` - auth and error handling middleware
  - `config/db.js` - MongoDB connection setup
  - `server.js` - application entry point
- `frontend/` - React app
  - `src/` - React source code
  - `src/screens/` - page components for home, product, cart, order, user, and admin screens
  - `src/components/` - reusable UI components
  - `src/actions/` - Redux action creators
  - `src/reducers/` - Redux reducers
  - `src/constants/` - action type constants
- `uploads/` - static folder for uploaded images

## Features

- Product listing, search, and pagination
- Product detail page with reviews and rating
- Shopping cart management
- User login, registration, and profile update
- Order creation and order detail pages
- Admin management for products, users, and orders
- PayPal payment integration using environment config

## Environment variables

Create a `.env` file in the project root with:

```dotenv
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PAYPAL_CLIENT_ID=<your_paypal_client_id>
```

## Backend setup

From the project root:

```bash
npm install
npm run server
```

This starts the backend at `http://localhost:5000`.

## Frontend setup

From the project root:

```bash
npm install --prefix frontend
npm run client
```

or run both at once:

```bash
npm run dev
```

The React frontend runs at `http://localhost:3000` and proxies API requests to the backend.

## Useful npm scripts

From the root project:

- `npm start` - start backend server
- `npm run server` - start backend server with nodemon
- `npm run client` - start React frontend
- `npm run dev` - run backend and frontend concurrently
- `npm run data:import` - import sample data using backend/seeder
- `npm run data:destroy` - destroy seeded data

## API endpoints

### Products
- `GET /api/products` - list products
- `GET /api/products/:id` - get product details
- `POST /api/products` - create product (admin only)
- `PUT /api/products/:id` - update product (admin only)
- `DELETE /api/products/:id` - delete product (admin only)
- `POST /api/products/:id/reviews` - create product review
- `GET /api/products/top` - get top rated products

### Users
- `POST /api/users` - register user
- `POST /api/users/login` - login user
- `GET /api/users/profile` - get logged-in user profile
- `PUT /api/users/profile` - update profile
- `GET /api/users` - list users (admin only)
- `GET /api/users/:id` - get user by id (admin only)
- `PUT /api/users/:id` - update user (admin only)
- `DELETE /api/users/:id` - delete user (admin only)

### Orders
- `POST /api/orders` - create order
- `GET /api/orders/myorders` - get logged in user orders
- `GET /api/orders/:id` - get order by id
- `PUT /api/orders/:id/pay` - mark order as paid
- `PUT /api/orders/:id/deliver` - mark order as delivered (admin only)
- `GET /api/orders` - list all orders (admin only)

### PayPal config
- `GET /api/config/paypal` - returns PayPal client ID from `.env`

## Notes

- The frontend uses Redux for state management.
- The backend requires a valid MongoDB URI and JWT secret.
- `POST /api/products` currently creates a sample product; you can update it via `PUT /api/products/:id` or customize the controller to accept request body fields.

## License

MIT
