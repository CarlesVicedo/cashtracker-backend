import { Router } from "express"
import { body } from "express-validator"
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
router.get('/:id', BudgetControler.getById)
router.put('/:id', BudgetControler.updateById)
router.delete('/:id', BudgetControler.deleteById)

export default router