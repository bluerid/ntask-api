module.exports = app => {
	const Tasks = app.db.models.Tasks;

	app.route('/tasks')
		.all(app.auth.authenticate())
		/**
		 * @api {get} /tasks List the user's tasks
		 * @apiGroup Tasks
		 * @apiHeader {String} Authorization Token of authenticated user
		 * @apiSuccess {Number} id Task id
		 * @apiSuccessExample {json} Success
		 * HTTP/1.1 200 OK
		 * {
		 *   "id": 1,
		 *   "title": "Study",
		 *   "done": false,
		 *   "updated_at": "2016-02-10T15:46:51.778Z",
		 *   "created_at": "2016-02-10T15:46:51.778Z",
		 * 	 "UserId": 1
		 * }
		 */
		.get((req, res)	=> {
			//Tasks: List tasks.
			Tasks.findAll({
				where: { UserId: req.user.id }
			}).then(
				result => res.json(result)
			).catch(error => {
				res.status(412).json({msg:error.message})
			});
		})
		.post((req, res) => {
			//Save Tasks: Save Task.
			req.body.UserId = req.user.id;
			Tasks.create(req.body).then(
				result => res.json(result)
			).catch(error => {
				res.status(412).json({msg:error.message})
			});
		});

	app.route('/tasks/:id')
		.all(app.auth.authenticate())
		.get((req, res)	=> {
			//Tasks: Find task with id @param {id}.
			Tasks.findOne({where: {
				id:req.params.id,
				UserId:req.user.id
			}})
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
			Tasks.update(req.body, {where: {
				id:req.params.id,
				UserId:req.user.id
			}})
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		})
		.delete((req, res) => {
			//Delete task with id @param {id}
			Tasks.destroy({where: {
				id:req.params.id,
				UserId:req.user.id
			}})
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		});
}