module.exports = app => {
	const Tasks = app.db.models.Tasks;
	/*
	app.get('/tasks', (req, res) => {
		Tasks.findAll({}).then(tasks => {
			res.json({tasks: tasks})
		});
	});
	*/
	app.route('/tasks')
		.all(app.auth.authenticate())
		.get((req, res)	=> {
			//Tasks: List tasks.
			Tasks.findAll({}).then(
				result => res.json(result)
			).catch(error => {
				res.status(412).json({msg:error.message})
			});
		})
		.post((req, res) => {
			//Save Tasks: Save Task.
			Tasks.create(req.body).then(
				result => res.json(result)
			).catch(error => {
				res.status(412).json({msg:error.message})
			});
		});

	app.route('/tasks/:id')
		.get((req, res)	=> {
			//Tasks: Find task with id @param {id}.
			Tasks.findOne({where: req.params})
				.then(result => {
					if(result){
						res.json(result);
					}else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => {
			//Update Task: Update Task with id @param {id}.
			Tasks.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			//Delete task with id @param {id}
			Tasks.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}