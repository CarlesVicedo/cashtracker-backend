import type { RequestHandler } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

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

export const validateBudgetExists: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const budget = await Budget.findByPk(id)
        if(!budget) {
            const error = new Error('Budget not found')
            res.status(404).json({error: error.message})
            return
        }

        req.budget = budget

        next()

    } catch (error) {
        // console.log(error)
        res.status(500).json({error: "Something broke"})
    }
}