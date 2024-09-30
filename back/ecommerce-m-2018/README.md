# E-commerce API with NestJS, TypeORM, and PostgreSQL

This is an e-commerce API built using [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and [PostgreSQL](https://www.postgresql.org/). The project demonstrates the creation of an API for user, product, and authentication management, featuring role-based access control, JWT authentication, and file uploads with Cloudinary.

## Features

- **Modular Design**: Separate modules for `Products`, `Users`, and `Auth`.
- **CRUD Operations**: Full CRUD for products and users with proper HTTP status codes.
- **Authentication**: JWT-based authentication for sign-up, sign-in, and route protection.
- **Role-based Access**: Admin role implemented for restricted access to certain routes.
- **Pagination**: Pagination implemented for product and user listings.
- **Middleware**: Global logging middleware to log requests.
- **Database**: PostgreSQL with TypeORM for database interactions, including relations between entities.
- **File Uploads**: Product image uploads to Cloudinary.
- **Swagger**: API documentation available via Swagger.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-github-username>/ecommerce-<your-github-username>.git
2.	Install dependencies:
bash
Copy code
cd ecommerce-<your-github-username>
npm install
3.	Set up environment variables:
Create a .env file with the following variables:
bash
Copy code
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
4.	Run the database migrations:
bash
Copy code
npm run migration:run
5.	Start the server:
bash
Copy code
npm run start:dev
API Endpoints
Auth
•	POST /auth/signup - Register a new user.
•	POST /auth/signin - Log in with email and password.
Products
•	GET /products - Get all products (supports pagination).
•	POST /products - Add a new product (Admin only).
•	PUT /products/
- Update a product (Admin only).
•	DELETE /products/
- Delete a product (Admin only).
Users
•	GET /users - Get all users (Admin only).
•	GET /users/
- Get a user by ID (Admin only).
•	PUT /users/
- Update a user by ID (Admin only).
•	DELETE /users/
- Delete a user by ID (Admin only).
Orders
•	POST /orders - Create a new order for a user.
•	GET /orders/
- Get an order by ID.
File Uploads
•	POST /files/uploadImage/
- Upload a product image (Admin only).
Running in Docker
1.	Build the Docker image:
bash
Copy code
docker build -t ecommerce-api .
2.	Run the application using Docker Compose:
bash
Copy code
docker-compose up
3.	The application will be available at http://localhost:3000.
Testing
Unit and integration tests are implemented for key modules of the application. To run tests:
bash
Copy code
npm run test
Swagger Documentation
API documentation is automatically generated using Swagger. You can access it at http://localhost:3000/api.
License
This project is licensed under the MIT License.
