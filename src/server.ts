import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'

const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Connected to the DB'))

    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Failed connection to the DB'))

    }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budgets', budgetRouter)

export default app