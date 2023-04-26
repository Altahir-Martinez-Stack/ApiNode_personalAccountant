import express from "express";
import config from "./config";

import detailRoutes from "./src/routes/details.routes";
import detailTypeRoutes from "./src/routes/detailTypes.routes";

const app = express();

//settings
app.set("port", config.port || 3000);

//middiewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(detailRoutes);
app.use(detailTypeRoutes);

export default app;
