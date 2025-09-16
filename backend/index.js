// require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['POST', 'GET'],
		credentials: true,
	})
)

const PORT = 5000 || 3000

const DB = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Admin1994@!',
	database: 'onyxcleaning',
})

app.get('/DopCleaningApartment', (req, res) => {
	const sql = 'SELECT * FROM DopServicesApartment'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
