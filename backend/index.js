const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

connectDB();

// List of allowed origins
const allowedOrigins = [
  "https://moonshot-data-visualization-app.vercel.app",
  "http://localhost:5173", // For local development
];

// Dynamic CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Block the origin
    }
  },
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/data", dataRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
