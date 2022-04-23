import express from "express";

const router = express.Router();

import { containerController } from "../controllers/index.js";

router.get("/", containerController.getAll);
router.get("/by-shipment/:id", containerController.getContainerByShipment);
router.get("/:id", containerController.get);
router.post("/", containerController.create);
router.put("/:id", containerController.update);
router.delete("/:id", containerController.delete);

export default router;
