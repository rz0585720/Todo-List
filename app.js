const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')
const Todo = require('./models/todo') // 載入 Todo model

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
	console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
	console.log('mongodb connected!')
})

// template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// routes settings
app.get('/', (req, res) => {
	Todo.find() // 取出 Todo model 裡的所有資料
		.lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
		.then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
		.catch(error => console.error(error)) // 錯誤處理
})

app.get('/todos/new', (req, res) => {
	return res.render('new')
})

app.post('/todos', (req, res) => {
	const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
	return Todo.create({ name }) // 存入資料庫
		.then(() => res.redirect('/')) // 新增完成後導回首頁
		.catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
	const id = req.params.id
	return Todo.findById(id)
		.lean()
		.then(todo => res.render('detail', { todo }))
		.catch(error => console.log(error))
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on http://localhost:${port}`)
})
