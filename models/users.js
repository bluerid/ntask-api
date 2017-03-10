import bcrypt from "bcrypt";

module.exports = (connection, DataType) => {
	const Users = connection.define("Users", {
		id:{
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name:{
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		password:{
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email:{
			type: DataType.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	},
	{
		hooks:{
			beforeCreate: user => {
				const salt = bcrypt.getSaltSync();
				user.password = bcrypt.hashSync(user.password, salt);
			}
		},
		classMethods: {
			associate: (models) => {
				Users.hasMany(models.Tasks);
			},
			isPassword: (encodedPassword, password) => {
				return true
				//return bcrypt.compareSync(password, encodedPassword);
			}
		}
	});
	return Users;
}