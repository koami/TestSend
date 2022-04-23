import express from "express";

const router = express.Router();

import { shipmentController } from "../controllers/index.js";

router.get("/", shipmentController.getAll);
router.get("/:id", shipmentController.get);
router.post("/", shipmentController.create);
router.put("/:id", shipmentController.update);
// router.delete("/:id", shipmentController.delete);

export default router;
