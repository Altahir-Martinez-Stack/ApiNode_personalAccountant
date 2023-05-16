import express from "express";
import config from "./config";
import cors from "cors";
//export router
import detailRoutes from "./src/routes/details.routes";
import detailTypeRoutes from "./src/routes/detailTypes.routes";
import mailRoutes from "./src/routes/mail.routes";
import authRoutes from "./src/routes/auth.routes";
const app = express();

//settings
app.set("port", config.port || 3000);

//middiewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use(detailRoutes);
app.use(detailTypeRoutes);
app.use(mailRoutes);
app.use(authRoutes);

export default app;
