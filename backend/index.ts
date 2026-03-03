import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import mysql from 'mysql2'
dotenv.config()

const salt = 10

const app = express()
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['POST', 'GET'],
		credentials: true,
	}),
)
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

// === Отдача React фронтенда ===
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })
const PORT = parseInt(process.env.PORT || '3000', 10)

const DB = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '3306', 10),
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
})
DB.connect(err => {
	if (err) console.error('Ошибка подключения к базе данных:', err)
	else console.log('Подключение к базе данных прошло успешно')
})

interface AuthRequest extends Request {
	cookies: { [key: string]: string }
	Login?: string
	UserName?: string
}

const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.token
	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	jwt.verify(
		token,
		process.env.JWT_SECRET || 'jwt-secret_key',
		(err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
			if (err) return res.status(403).json({ error: 'Invalid token' })
			if (decoded && typeof decoded !== 'string') {
				req.Login = decoded.Login as string
				req.UserName = decoded.UserName as string
			}
			next()
		},
	)
}

// Проверка авторизации
app.get('/', verifyUser, (req: AuthRequest, res: Response) => {
	return res.json({ Status: 'Success', userName: req.UserName })
})

// Login
app.post('/login', (req, res) => {
	const sql = 'SELECT * FROM users WHERE Login = ?'
	DB.query(sql, [req.body.Login], (err, data: any) => {
		if (err) return res.json({ error: 'DB error' })
		if (data.length === 0) return res.json({ error: 'User not found' })

		bcrypt.compare(req.body.Password, data[0].Password, (err, result) => {
			if (err) return res.json({ error: 'Error comparing passwords' })
			if (!result) return res.json({ error: 'Wrong password' })

			const token = jwt.sign(
				{ Login: data[0].Login, UserName: data[0].NameUser },
				process.env.JWT_SECRET || 'jwt-secret_key',
				{ expiresIn: '1d' },
			)
			res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
			return res.json({ Status: 'Success' })
		})
	})
})

app.get('/logout', (req, res) => {
	res.clearCookie('token')
	return res.json({ Status: 'Success' })
})

app.post('/signup', (req, res) => {
	const sql = 'INSERT INTO users ( `NameUser`,`Login`, `Password`) VALUES (?)'
	bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
		if (err) return res.json({ Error: 'Invalid password' })
		const values = [req.body.NameUser, req.body.Login, hash]
		DB.query(sql, [values], (err, data) => {
			if (err) {
				return res.json(err)
			} else {
				return res.json({ Status: 'Success' })
			}
		})
	})
})

app.get('/Contact', (req, res) => {
	const sql = 'SELECT * FROM Contact'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/ContactUpdate', (req, res) => {
	const sql = 'UPDATE Contact SET Value = ? WHERE id = ?'
	const value = [req.body.Value, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
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

app.post('/DegreeCleaningUpdate', (req, res) => {
	const sql = 'UPDATE Degree_cleaning SET price = ? WHERE id = ?'
	const value = [req.body.price, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.get('/PriceCleaning', (req, res) => {
	const sql = 'SELECT * FROM price'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/PriceCleaningUpdate', (req, res) => {
	const sql = 'UPDATE price SET MinPrice = ?, price = ? WHERE id = ?'
	const value = [req.body.MinPrice, req.body.price, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.get('/Parameters', (req, res) => {
	const sql = 'SELECT * FROM General_parameters'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/ParametersUpdate', (req, res) => {
	const sql = 'UPDATE General_parameters SET Value = ? WHERE id = ?'
	const value = [req.body.Value, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.get('/Cities', (req, res) => {
	const sql = 'SELECT * FROM cities ORDER BY Name ASC'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/CitiesUpdate', (req, res) => {
	const sql = 'UPDATE cities SET Distance = ? WHERE id = ?'
	const value = [req.body.Distance, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.get('/ReviewsUser', (req, res) => {
	const sql = 'SELECT * FROM Reviews'
	DB.query(sql, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/ReviewsUserUpdate', (req, res) => {
	const sql =
		'UPDATE Reviews SET Name = ?, QuantityStar = ?, Text = ?, Link = ?,Date = ?, LinkName = ? WHERE id = ?'
	const value = [
		req.body.Name,
		req.body.QuantityStar,
		req.body.Text,
		req.body.Link,
		req.body.Date,
		req.body.LinkName,
		req.body.id,
	]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/DeleteReviews', (req, res) => {
	const sql = 'DELETE FROM Reviews WHERE id= ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ STATUS: 'TRUE' })
	})
})

app.post('/AddReviews', (req, res) => {
	const sql =
		'INSERT INTO Reviews (Name, QuantityStar, Text, Link, Date, LinkName) VALUE (?)'
	const value = [
		req.body.Name,
		req.body.QuantityStar,
		req.body.Text,
		req.body.Link,
		req.body.Date,
		req.body.LinkName,
	]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AutoIncrReviews', (req, res) => {
	const sql = 'ALTER TABLE Reviews AUTO_INCREMENT = ?'
	DB.query(sql, [req.body.value], (err, data) => {
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

app.post('/UpdateDopOffice', (req, res) => {
	const sql =
		'UPDATE DopServicesOffices SET text = ?, price = ?, unit = ? WHERE id = ?'
	const value = [req.body.text, req.body.price, req.body.unit, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/DeleteDopOffice', (req, res) => {
	const sql = 'DELETE FROM DopServicesOffices WHERE id = ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AutoIncrDopOffice', (req, res) => {
	const sql = 'ALTER TABLE DopServicesOffices AUTO_INCREMENT = ?'
	DB.query(sql, [req.body.value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/AddDopCleaningOffice', (req, res) => {
	const sql = 'INSERT INTO DopServicesOffices (text, price, unit) VALUE (?)'
	const value = [req.body.text, req.body.price, req.body.unit]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/UpdateDopWindows', (req, res) => {
	const sql =
		'UPDATE DopServicesWindows SET text = ?, price = ?, unit = ? WHERE id = ?'
	const value = [req.body.text, req.body.price, req.body.unit, req.body.id]
	DB.query(sql, value, (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/DeleteDopWindows', (req, res) => {
	const sql = 'DELETE FROM DopServicesWindows WHERE id = ?'
	DB.query(sql, [req.body.id], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.post('/AutoIncrDopWindows', (req, res) => {
	const sql = 'ALTER TABLE DopServicesWindows AUTO_INCREMENT = ?'
	DB.query(sql, [req.body.value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post('/AddDopCleaningWindows', (req, res) => {
	const sql = 'INSERT INTO DopServicesWindows (text, price, unit) VALUE (?)'
	const value = [req.body.text, req.body.price, req.body.unit]
	DB.query(sql, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json({ Status: 'Success' })
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
