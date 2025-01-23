import { RequestHandler } from "express"
import { body } from "express-validator"

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