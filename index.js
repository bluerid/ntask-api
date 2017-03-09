import express from 'express'
import consign from 'consign'

const app = express()
app.application_root = __dirname

consign({verbose: false})
		.include('libs/config.js')
		.then('db.js')
		.then('libs/middlewares.js')
		.then('routes')
		.then('libs/boot.js')
		.into(app)
