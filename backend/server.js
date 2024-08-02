import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import stockRoute from "./routes/stock.route.js";
import authRoute from "./routes/auth.route.js";
import Voucher from "./routes/voucher.route.js";
import express from "express";
const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/stock/", stockRoute);
app.use("/api/v1/Voucher/", Voucher);

app.listen(PORT, (error) => {
    console.log('Server is running at http://localhost:'+ 'COnnected' + PORT);
  
    connectDB();
});

