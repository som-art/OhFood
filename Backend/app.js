const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const connectDatabase = require("./config/database");

console.log(__dirname + "/config/config.env");
// Load environment variables
dotenv.config({ path: __dirname + "/config/config.env" });

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ohfood-frontend.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

// Use routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Error middleware
app.use(errorMiddleware);

app.get("/ping", (_, res) => {
  res.send("Pong");
});

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connect to Database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
