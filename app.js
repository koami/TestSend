import "dotenv/config";
import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is working !",
  });
});

import {
  shipmentRoutes,
  containerRoutes,
  trackingstepRoutes,
} from "./routes/index.js";
server.use("/shipment", shipmentRoutes);
server.use("/container", containerRoutes);
server.use("/trackingstep", trackingstepRoutes);

server.listen(process.env.SERVER_PORT);

export default server;
