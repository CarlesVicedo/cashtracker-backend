import { Router } from "express";
import { AuthControler } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";

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
    AuthControler.createAccount
)

router.post('/confirm-account',
    limiter,
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid token'),
    handleInputErrors,
    AuthControler.confirmAccount
)

export default router