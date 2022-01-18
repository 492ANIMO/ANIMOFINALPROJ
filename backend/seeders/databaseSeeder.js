const config = require('../config/index');
const mongoose = require('mongoose');

// const userSeeder = require('./userSeeder');
// const customerSeeder = require('./customerSeeder');
// const productSeeder = require('./productSeeder');

const annoucementSeeder = require('./annoucementSeeder');

// connectDB();

// connect database
const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI)
		console.log("MongoDB connection SUCCESS");

	} catch (error) {
		console.error("MongoDB connection FAIL", error.message);
		process.exit(1);
	}
}

connectDB();
annoucementSeeder();
// userSeeder();
