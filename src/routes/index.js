import express from 'express'

const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hi! Welcome at Poke Server. :)' })
})

export default indexRouter
