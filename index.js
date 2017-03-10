import express from 'express'
import consign from 'consign'

const app = express()
const router = express.Router()
app.application_root = __dirname
app.set('port', 3000)

consign({verbose: false})
		.include('libs/config.js')
		.then('db.js')
		.then('auth.js')
		.then('libs/middlewares.js')
		.then('routes')
		.then('libs/boot.js')
		.into(app)