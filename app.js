const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

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
