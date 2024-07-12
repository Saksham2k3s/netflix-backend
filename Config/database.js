const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "../config/.env" });

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1); // Exit process with failure
        });
};

module.exports = databaseConnection;
