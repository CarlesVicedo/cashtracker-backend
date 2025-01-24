import { Router } from "express";
import { AuthControler } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty()
        .withMessage('Name can not be empty'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password is too short. It must be at least 8 characters'),
    body('email')
        .isEmail()
        .withMessage('Not valid email'),
    handleInputErrors,
    AuthControler.createAccount)

export default router