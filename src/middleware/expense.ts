import { RequestHandler } from "express"
import { body, param, validationResult } from "express-validator"

export const validateExpenseInput: RequestHandler = async (req, res, next) => {
    await body('name')
        .notEmpty().withMessage('Expense name is mandatory')
        .run(req)

    await body('amount')
        .notEmpty().withMessage('Expense amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Expense must be higher than 0.')
        .run(req)
    next()
}

export const validateExpenseId: RequestHandler = async (req, res, next) => {
    await param('expenseId')
        .isInt()
        .custom(value => value > 0 )
        .withMessage('Not valid ID')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })

    } else {
        next()
    }
}