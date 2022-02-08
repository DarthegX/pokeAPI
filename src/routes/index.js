import express from 'express'

const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
  return res.status(200).text({ message: 'Hi! Welcome at Poke Server. :)\n\n' })
})

export default indexRouter
