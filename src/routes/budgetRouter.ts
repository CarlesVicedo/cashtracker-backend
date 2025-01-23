import { Router } from "express"
import { body } from "express-validator"
import { BudgetControler } from "../controllers/BudgetController"
import { handleInputErrors } from "../middleware/validation"
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget"
import { ExpensesController } from "../controllers/ExpensesController"

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

// Routes for expenses
router.get('/:budgetId/expenses', ExpensesController.getAll)
router.post('/:budgetId/expenses', ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router