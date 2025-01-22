import { Router } from "express"
import { body, param } from "express-validator"
import { BudgetControler } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"

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
    BudgetControler.create)

router.get('/:id', 
    param('id')
        .isInt().withMessage('Not valid ID')
        .custom(value => value > 0).withMessage('Not valid ID'),
    handleInputErrors,
    BudgetControler.getById)

router.put('/:id', 
    param('id')
        .isInt().withMessage('Not valid ID')
        .custom(value => value > 0).withMessage('Not valid ID'),
    body('name')
        .notEmpty().withMessage('Budget name is mandatory'),
    body('amount')
        .notEmpty().withMessage('Budget amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Budget must be higher than 0.'),
    handleInputErrors,
    BudgetControler.updateById)

router.delete('/:id', BudgetControler.deleteById)

export default router