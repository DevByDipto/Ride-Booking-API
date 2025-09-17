import express from "express"
import notFound from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar"
import cors from "cors"
import { router } from "./app/routes"
export const app = express()

app.use(express.json())
app.use(cors())
app.use('/api',router)


app.get('/', (req, res) => {
  res.send('welocome to ride booking')
})

app.use(globalErrorHandler)
app.use(notFound)