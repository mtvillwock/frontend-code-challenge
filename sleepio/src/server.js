const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) // for parsing application/json


app.post('/api/sleep_data', (req, res) => {
  console.log("request received", req.body)
  // res.status(200).json({ ok: true })
  console.log(req.body)
  res.json(req.body)
  // res.status(400).json({ error: 'Bad Request' })
})

app.listen(port, () => {
  console.log(`Sample backend listening on port ${port}`)
})
