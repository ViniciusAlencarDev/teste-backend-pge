import { Sequelize } from 'sequelize'

const database = process.env.DB_DATABASE || '';
const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const dialect = process.env.DB_DIALECT || '';

const connection = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
})

export default connection
