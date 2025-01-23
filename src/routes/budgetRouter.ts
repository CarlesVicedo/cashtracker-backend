import { Router } from "express"
import { body, param } from "express-validator"
import { BudgetControler } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetId } from "../middleware/budget"

const router = Router()

router.get('/', BudgetControler.getAll)

router.post('/',
    body('name')
        .notEmpty().withMessage('Budget name is mandatory'),
    body('amount')
        .notEmpty().withMessage('Budget amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Budget must be higher than 0.'),
    handleInputErrors,
    BudgetControler.create
)

router.get('/:id', 
    validateBudgetId,
    BudgetControler.getById
)

router.put('/:id', 
    validateBudgetId,
    body('name')
        .notEmpty().withMessage('Budget name is mandatory'),
    body('amount')
        .notEmpty().withMessage('Budget amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Budget must be higher than 0.'),
    handleInputErrors,
    BudgetControler.updateById
)

router.delete('/:id', 
    validateBudgetId,
    handleInputErrors,
    BudgetControler.deleteById
)

export default router