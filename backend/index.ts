require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
		methods: ['POST', 'GET'],
		credentials: true,
	})
)

const PORT = process.env.PORT || 3000

const DB = mysql.createConnection({
	host: 'localhost',
	port: '3307',
	user: 'Ilya',
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

app.get('/DopCleaningOffice', (req, res) => {
	const sql = 'SELECT * FROM DopServicesOffices'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/DopCleaningWindows', (req, res) => {
	const sql = 'SELECT * FROM DopServicesWindows'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/PriceCleaning', (req, res) => {
	const sql = 'SELECT * FROM price'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/Cities', (req, res) => {
	const sql = 'SELECT * FROM cities'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/ReviewsUser', (req, res) => {
	const sql = 'SELECT * FROM Reviews'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/base', (req, res) => {
	const sql = 'SELECT * FROM base WHERE name = ?'
	DB.query(sql, [req.body.Name], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
