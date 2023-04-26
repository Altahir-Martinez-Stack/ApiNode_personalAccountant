import app from "../app";
import { sequelize } from './database'

async function main() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        app.listen(app.get("port"))
        console.log("server on port", app.get("port"));
    
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


main()

