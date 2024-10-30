const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post('/', (req, res) => {
	const { url, text } = req.body
	let score = 0
	if (text) {
		score = Math.random() > 0.5 ? 1 : 0
	}
  res.json( { url, score } )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})