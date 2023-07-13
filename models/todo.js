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
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
})

module.exports = mongoose.model('Todo', todoSchema)
