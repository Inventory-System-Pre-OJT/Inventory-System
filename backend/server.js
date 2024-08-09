import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import stockRoute from "./routes/stock.route.js";
import authRoute from "./routes/auth.route.js";
import express from "express";
import protectedRoute from "./middleware/protectRoutes.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/stock/", stockRoute);

app.listen(PORT, (error) => {
    console.log('Server is running at http://localhost:' + PORT);
    connectDB();
});

