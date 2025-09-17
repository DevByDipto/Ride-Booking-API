import express from "express"
import notFound from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar"
export const app = express()


app.get('/', (req, res) => {
  res.send('welocome to ride booking')
})

app.use(globalErrorHandler)
app.use(notFound)