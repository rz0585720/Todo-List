const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
	const userId = req.user._id
	Todo.find({userId}) // 取出 Todo model 裡的所有資料
		.lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
		.sort({ _id: 'asc' }) // desc→降冪, asc→升冪
		.then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
		.catch(error => console.error(error)) // 錯誤處理
})

module.exports = router
