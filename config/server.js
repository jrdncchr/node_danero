'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({  
	NODE_ENV: joi.string()
		.allow(['development', 'production'])
		.default('development'),
	PORT: joi.number()
		.required(),
	DB_CONNECTION: joi.string()
		.required()
}).unknown()
	.required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)  
if (error) {  
	throw new Error(`Config validation error: ${error.message}`)
}

const config = {  
	server: {
		nodeEnv: envVars.NODE_ENV,
		dbConn: envVars.DB_CONNECTION,
		port: envVars.PORT
	}
}

module.exports = config;;