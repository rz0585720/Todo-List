const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
	name: {
		type: 'string',
		required: true,
	},
	isDone: {
		type: 'boolean',
		default: false,
	},
})

module.exports = mongoose.model('Todo', todoSchema)
