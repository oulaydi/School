const mongoose = require("mongoose");

// Connect to MongoDB
const MongoDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`database connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = MongoDB;
