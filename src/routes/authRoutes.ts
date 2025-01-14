import { Router } from "express";
import { signupController, loginController, getProfileController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, getProfileController);


export default router;
