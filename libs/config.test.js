module.exports = {
	database : 'ntask_test',
	username : 'root',
	password : 'root',
	params : {
		dialect : 'mysql',
		port: 3306,
		host : 'localhost'
	},
	jwtSecret:"NTASK-TEST",
	jwtSession: { session: false }
}