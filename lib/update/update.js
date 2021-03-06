const gitPull = require('./gitpull')
const npmInstall = require('./npminstall')


const scheduledUpdate = async (path) => {
	// Here is where the real update executes
	console.log('Now updating ... please wait!')
	let git = await gitPull(path).then(res => res) // async
	npmInstall(path) // sync
	return git
}
const delay = (duration) =>
	new Promise(resolve => setTimeout(resolve, duration))

const update = async (when, path) => {
	if (when >=0) console.log('Update will start in', when, 'second(s)')
	await delay(when * 1000)
	await scheduledUpdate(path)
	return true
}

module.exports = update


// ---------------------------- LATER FOR REACT UI ----------------------------

const updateFuture = (date) => {
	const current = parseInt((Date.now() / 1000).toFixed(0))
	const future = parseInt((date.getTime() / 1000).toFixed(0))
	return parseInt(future - current)
}

let futureDate = new Date('2018.10.30 14:26:00 +0100')

// console.log(updateFuture(futureDate))