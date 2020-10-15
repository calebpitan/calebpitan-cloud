import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import createError from 'http-errors'
import { favorite } from './routes'

const logger = morgan('dev')
const app = express()

app.use(logger)
app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: [
      'https://us-central1-caleb-97b50.cloudfunctions.net',
      'https://calebpitan.netlify.app',
      'https://www.calebpitan.com',
      'http://localhost:8000',
      'http://localhost:9000'
    ],
    methods: ['POST', 'GET'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favorite)

app.use(function (_req, res, next) {
  next(createError(404))
  res.sendStatus(404)
})

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
})

export default app
