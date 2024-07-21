const express = require('express');
const dotenv = require('dotenv');
const databaseConnection = require('./Config/database');
const cookieParser = require('cookie-parser');
const userRoute = require('./routers/userRoutes');
const cors = require('cors');


// Configure .env file
dotenv.config({
    path: './.env'
});

// Database config
databaseConnection();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};

app.use(cors(corsOptions));

// API routes
app.use('/api/v1/user', userRoute);

// Creating server on the port
app.listen(process.env.PORT, () => {
    console.log(`Server is running at the port ${process.env.PORT}`);
});
