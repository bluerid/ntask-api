describe("Routes: Token", () => {
	const Users = app.db.models.Users;
	describe("POST /token", () => {
		/*
		beforeEach(done => {
			Users
				.destroy({where: {}})
				.then(()=>Users.create({
					name: "WyoMing",
					email: "John@mail.com",
					password: "12345"
				})).then(() => done());
		});
		*/

		describe("status 200", () => {
			it("returns authenticated user token", done => {
				request.post("/token")
				.send({
					email: "john@yopmail.net",
					password: "12345"
				})
				.expect(200)
				.end((err, res) => {
					done(err);
				});
			});
		});		

		describe("status 401", () => {
			
			it("throws error when password is incorrect", done => {
				request.post("/token")
				.send({
					email: "John@mail.com",
					password: "34354"
				})
				.expect(401)
				.end((err, res) => {
					done(err);
				});
			});
				
			it("throws error when email does not exist", done => {
				request.post("/token")
				.send({
					email: "homfray@yahoo.com",
					password: "12345"
				})
				.expect(401)
				.end((err, res) => {
					done(err);
				});
			});

			it("throws error when email and passwords are blank.", done =>{
				request.post("/token")
				.expect(401)
				.end((err, res) => {
					done(err);
				});
			});

		});
		
	});
});