import { Router } from "express";
import apiRouter from "./api";
import path from "path";

const router = Router();

router.use("/api", apiRouter);

export default router;
