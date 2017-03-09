module.exports = app => {
	app.db.sequelize.sync().done(() => {
		app.listen(app.get('port'), () => {
				console.log(`Node Invoice server running on Port:${app.get('port')}`);
		});
	});
}