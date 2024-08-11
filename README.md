# realEstate.com

## Overview

This project is a real estate application built using Node.js, Express, and MongoDB. The application manages real estate listings, user authentication, and other features essential to a real estate platform.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [npm](https://www.npmjs.com/) - Node Package Manager
- [MongoDB](https://www.mongodb.com/) - NoSQL database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/real-estate.git
2. **Navigate to the project directory:**

    ```bash
    cd real-estate
3. **Install server-side dependencies:**

    ```bash
    npm install
4. **Install client-side dependencies:**

     ```bash
     npm install --prefix client
     
### Environment Variables

**Create a .env file in the root directory of your project and add the following environment variables:**

  ```bash
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
```
Replace your_mongodb_connection_string with your MongoDB connection URI and your_jwt_secret with your desired JWT secret key.


## Scripts
- `npm run dev`: Run the API in development mode with nodemon.
- `npm start`: Start the API in production mode.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [React](https://reactjs.org/) - Front-end JavaScript library

## Dependencies

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Password hashing library.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Parse HTTP request cookies.
- [dotenv](https://www.npmjs.com/package/dotenv): Load environment variables from a .env file.
- [express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generate and verify JSON Web Tokens.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.
- [nodemon](https://www.npmjs.com/package/nodemon): Monitor for changes and automatically restart the server.

