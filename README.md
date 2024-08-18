# Product Search & Filter Backend

## Overview
This repository contains the backend code for the Fullstack functionality-based single-page website. The backend is built with Node.js, Express.js, and MongoDB, and provides the necessary APIs to manage and retrieve product data, including functionalities such as pagination, searching, categorization, and sorting.

## Features
- **Pagination**: Efficiently load products with pagination.
- **Search**: Search for products by name.
- **Categorization**: Filter products by brand, category, and price range.
- **Sorting**: Sort products by price and date added.
- **Authentication**: JWT-based authentication for secure access to APIs.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 

## Project Setup

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed locally or a cloud MongoDB instance.

### Installation

1. **Clone the repository**:

    ```bash
    git clone [https://github.com/yourusername/product-search-filter-backend.git](https://github.com/Afnansayed/jod-task-scic-server.git)
    cd jod-task-scic-server
    ```

2. **Install dependencies**:

    ```bash
    npm install mongodb express dotenv cors
    ```

3. **Create a `.env` file** in the root directory and add your environment variables:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    MONGODB-PASS=your_mongodb_database_pass
    ```

4. **Seed the database with dummy product data** (if you haven't done it manually):

    ```bash
    npm run seed
    ```

5. **Start the backend server**:

    ```bash
    npm start  // nodemon index.js
    ```

### API Endpoints

- **GET /api/products**: Retrieve a list of products with pagination, sorting, and filtering.
- **GET /api/productsCount: Retrieve the product amount for pagination.


### Running the Project

After starting the backend server, the APIs will be available at `http://localhost:5000/api`. You can interact with the endpoints using Postman or any API client, or connect it with the frontend.

