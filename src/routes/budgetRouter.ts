import { Router } from "express"
import { body } from "express-validator"
import { BudgetControler } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetExists, validateBudgetId } from "../middleware/budget"

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

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

router.get('/:budgetId', 
    BudgetControler.getById
)

router.put('/:budgetId', 
    body('name')
        .notEmpty().withMessage('Budget name is mandatory'),
    body('amount')
        .notEmpty().withMessage('Budget amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Budget must be higher than 0.'),
    handleInputErrors,
    BudgetControler.updateById
)

router.delete('/:budgetId', BudgetControler.deleteById)

export default router