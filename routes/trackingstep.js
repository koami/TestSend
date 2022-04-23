import express from "express";

const router = express.Router();

import { trackingstepController } from "../controllers/index.js";

router.get("/", trackingstepController.getAll);
router.get("/:id", trackingstepController.get);
router.post("/", trackingstepController.create);
router.put("/:id", trackingstepController.update);
router.delete("/:id", trackingstepController.delete);

export default router;
