import express, { RequestHandler } from "express";
import { login, logout, register, verifyAuth } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import authValidator from "../validators/authValidator";

const router = express.Router();

router.post("/login", validate(authValidator.login), login);
router.post("/register", validate(authValidator.register), register);
router.post("/logout", logout);
router.get("/auth", verifyAuth as unknown as RequestHandler);

export default router;
