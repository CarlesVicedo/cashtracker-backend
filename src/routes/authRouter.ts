import { Router } from "express";
import { AuthControler } from "../controllers/authController";

const router = Router()

router.post('/create-account', AuthControler.createAccount)

export default router