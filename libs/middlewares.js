import bodyParser from "body-parser";

module.exports = app => {
	app.set('port', 3000)
	app.set('json spaces', 4)
	app.use(bodyParser.json());
	app.use((req, res, next) => {
		//Middleware for pre-execution of all the following routes.
		delete req.body.id;
		next();
	})
}