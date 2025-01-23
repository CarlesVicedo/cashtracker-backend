import { Router } from "express"
import { body } from "express-validator"
import { BudgetControler } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget"

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.get('/', BudgetControler.getAll)

router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetControler.create
)

router.get('/:budgetId', 
    BudgetControler.getById
)

router.put('/:budgetId', 
    validateBudgetInput,
    handleInputErrors,
    BudgetControler.updateById
)

router.delete('/:budgetId', BudgetControler.deleteById)

export default router