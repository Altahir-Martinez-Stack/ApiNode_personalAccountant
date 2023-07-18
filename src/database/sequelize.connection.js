import Sequelize from 'sequelize'
import { config } from './config'

const { nameDB, username, password, host, dialect } = config

export const sequelize = new Sequelize(
    nameDB,
    username,
    password, {
    host,
    dialect
})