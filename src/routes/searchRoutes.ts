import { Router } from "express";
import { searchController } from "../controllers/SearchController";


const router = Router();

router.get("/", (req, res, next) => {
  searchController(req, res)
  .then(() => next())
  .catch(err => next(err));
});


export default router;