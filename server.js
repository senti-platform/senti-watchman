require('dotenv').config({ path: './.env' })
const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
var systemctl = require('systemctl')

var chokidar = require('chokidar');

const updateClient = () => {
	console.log('System restarting ...')
}

var watcher = chokidar.watch('.', {
	ignored: ['node_modules', 'package.json', '.git', /(^[\/\\])\../],
	persistent: true
})

watcher.on('all', (event, path) => { 
	console.log(event, path)
	updateClient()
})

watcher.getWatched()

/* // One-liner for current directory, ignores .dotfiles
chokidar.watch('./', { ignored: /(^|[\/\\])\../ }).on('all', (event, path) => {
	console.log(event, path)
	
	// systemctl.restart('senti-watchman.service').then(output => console.log)
})
 */

 const app = express()

app.use(bodyParser.json())

// Routes will go here

// Default root route
app.get("/", (req, res, next) => {
	var date = new Date().toISOString()
	console.log('sending date: ', date)
	res.end(date)
})

const startServer = async () => {
	const port = process.env.SERVER_PORT || 3000
	await promisify(app.listen).bind(app)(port)
	console.log(`Senti Watchman Server listening on port ${port}`)
}

startServer()
