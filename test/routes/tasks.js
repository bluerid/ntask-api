import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
	const Users = app.db.models.Users;
	const Tasks = app.db.models.Tasks;
	const jwtSecret = app.libs.config.jwtSecret;
	let token;
	let fakeTask;
	beforeEach( done => {
		Users
			.destroy({where: {}})
			.then(() => Users.create({
				name: "Hobos",
				email: "john@yopmail.net",
				password: "12345"				
			}))
			.then(user => {
				Tasks
					.destroy({where: {}})
					.then(() => Tasks.bulkCreate([{
							id: 1,
							title: "Work",
							UserId: user.id
						}, {
							id: 2,
							title: "Study",
							UserId: user.id
						}]))
						.then(tasks => {
							fakeTask = tasks[0];
							token = jwt.encode({id: user.id}, jwtSecret);
							done();
						});
			});
	});

	describe("GET /tasks", () => {
		describe("status 200", () => {
			it("Returns a list of Tasks", done => {
				request.get("/tasks")
					.set("Authorization", `JWT ${token}`)
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.have.length(2);
						expect(res.body[0].title).to.eql("Work");
						expect(res.body[1].title).to.eql("Study");
						done(err);
					})
			});
		});
	});

	describe("POST /tasks/", () => {
		describe("status 200", () => {
			it("Creates a new task", done => {
				done();
			});
		});
	});

	describe("GET /tasks/:id", () => {
		describe("status 200", () => {
			it("Returns one particular task for the give id", done => {
				done();
			});
		});
		describe("status 400", () => {
			it("Throws error when the task does not exist", done => {
				done();
			});		
		});
	});

	describe("PUT /tasks/:id", () => {
		describe("status 204", () => {
			it("Updates a particular task", done => {
				done();
			});
		});
	});

	describe("DELETE /tasks/:id", () => {
		describe("status 204", () => {
			it("Deletes a particular task", done => {
				done();
			});
		});
	});


});