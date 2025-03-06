import { Router } from "express";
import { searchController } from "../controllers/SearchController";

const router = Router();

router.get("/", (req, res, next) => {
  searchController(req, res, next);
});

export default router;
