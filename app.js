const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose') // 載入 mongoose
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

// routes settings
app.get('/', (req, res) => {
	Todo.find() // 取出 Todo model 裡的所有資料
		.lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
		.then((todos) => res.render('index', { todos })) // 將資料傳給 index 樣板
		.catch((error) => console.error(error)) // 錯誤處理
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on http://localhost:${port}`)
})
