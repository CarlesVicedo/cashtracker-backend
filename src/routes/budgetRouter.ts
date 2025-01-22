import { Router } from "express"
import { BudgetControler } from "../controllers/BudgetController"

const router = Router()

router.get('/', BudgetControler.getAll)
router.post('/', BudgetControler.create)
router.get('/:id', BudgetControler.getById)
router.put('/:id', BudgetControler.updateById)
router.delete('/:id', BudgetControler.deleteById)

export default router