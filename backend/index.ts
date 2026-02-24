require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['POST', 'GET'],
		credentials: true,
	}),
)
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 3000

const DB = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: process.env.PASSWORD,
	database: process.env.DB_NAME,
})

app.get('/Contact', (req, res) => {
	const sql = 'SELECT * FROM Contact'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.get('/ListCleaning', (req, res) => {
	const sql = 'SELECT * FROM list_cleaning'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
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

app.get('/DegreeCleaning', (req, res) => {
	const sql = 'SELECT * FROM Degree_cleaning'
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

app.get('/Parameters', (req, res) => {
	const sql = 'SELECT * FROM General_parameters'
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

app.get('/AllListUsers', (req, res) => {
	const sql = 'SELECT * FROM base'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/DeleteUser', (req, res) => {
	const sql = 'DELETE FROM base WHERE id= ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ STATUS: 'TRUE' })
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
	const sql =
		'UPDATE base SET Name = ?, OrderQuantity = ?, Name_cleaning = ?, Date = ? WHERE id = ?'
	const value = [
		req.body.Name,
		req.body.OrderQuantity,
		req.body.Name_cleaning,
		req.body.Date,
		req.body.id,
	]
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

//Админка
app.post('/UpdateStringBase', (req, res) => {
	const sql = 'UPDATE list_cleaning SET Text = ? WHERE id = ?'
	const value = [req.body.list_cleaning, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/DeleteStringBase', (req, res) => {
	const sql = 'DELETE FROM list_cleaning WHERE id = ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AddStringBase', (req, res) => {
	const sql =
		'INSERT INTO list_cleaning (Name_cleaning, Name_Room, Text) VALUE (?)'
	const value = [req.body.Name_cleaning, req.body.Name_Room, req.body.Text]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AutoIncr', (req, res) => {
	const sql = 'ALTER TABLE list_cleaning AUTO_INCREMENT = ?'
	DB.query(sql, [req.body.value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/UpdateDopApartment', (req, res) => {
	const sql =
		'UPDATE DopServicesApartment SET text = ?, price = ?, unit = ? WHERE id = ?'
	const value = [req.body.text, req.body.price, req.body.unit, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/DeleteDopApartment', (req, res) => {
	const sql = 'DELETE FROM DopServicesApartment WHERE id = ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AutoIncrDopApartment', (req, res) => {
	const sql = 'ALTER TABLE DopServicesApartment AUTO_INCREMENT = ?'
	DB.query(sql, [req.body.value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})
app.post('/AddDopCleaningApartment', (req, res) => {
	const sql =
		'INSERT INTO DopServicesApartment (text, price, NameCatCleaning, NameCatRooms, unit) VALUE (?)'
	const value = [
		req.body.text,
		req.body.price,
		req.body.NameCatCleaning,
		req.body.NameCatRooms,
		req.body.unit,
	]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
