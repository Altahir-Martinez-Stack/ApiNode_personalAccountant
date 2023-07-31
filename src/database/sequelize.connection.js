import Sequelize from 'sequelize'
import { config } from './config'

const { nameDB, username, password, host, dialect, urlConnect } = config

export const sequelize = urlConnect ? new Sequelize(urlConnect) : new Sequelize(
    nameDB,
    username,
    password, {
    host,
    dialect
})