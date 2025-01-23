import type { RequestHandler } from "express";
import { param, validationResult } from "express-validator";

export const validateBudgetId: RequestHandler = async (req, res, next) => {
    await param('id')
        .isInt().withMessage('Not valid ID')
        .custom(value => value > 0).withMessage('Not valid ID')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })

    } else {
        next()
    }
}