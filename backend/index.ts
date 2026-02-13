require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: ['http://localhost:3004'],
		methods: ['POST', 'GET'],
		credentials: true,
	}),
)
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 3004

const DB = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: process.env.PASSWORD,
	database: process.env.DB_NAME,
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

app.post('/baseSearch', (req, res) => {
	const sql = 'SELECT * FROM base WHERE `Phone` = ?'
	DB.query(sql, [req.body.Phone], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/baseUpdateOrder', (req, res) => {
	const sql = 'UPDATE base SET OrderQuantity = ? WHERE id = ?'
	const value = [req.body.OrderQuantity, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/base', (req, res) => {
	const sql =
		'INSERT INTO base (`Name`, `Phone`, `Name_cleaning`, `Date`, `OrderQuantity`) VALUE (?)'
	const value = [
		req.body.Name,
		req.body.Phone,
		req.body.Name_cleaning,
		req.body.Date,
		req.body.OrderQuantity,
	]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
