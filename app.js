const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose') // 載入 mongoose

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}) // 設定連線到 mongoDB

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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes settings
app.get('/', (req, res) => {
	res.render('index')
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on http://localhost:${port}`)
})
