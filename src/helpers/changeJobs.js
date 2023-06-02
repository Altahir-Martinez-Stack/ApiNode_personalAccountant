import { scheduleJob } from "node-schedule";
import { Detail } from "../models/Details";
import isNotArray from "./isNotArray";

async function changeJobs() {
    console.log("initial changeJobs")
    try {
        const details = await Detail.findAll({
            include: DetailType, // muestra un nueva propiedad "detailType" extendiendo la tabla detailtypes
            order: [["date", "DESC"]], // muestra en orden a la fecha de forma descente
        });
        if (isNotArray(details))
            throw new ("Bad Request. fill in the details")

        for (const { id, jobDate, jobDateState } of details) {
            if (jobDate && jobDateState)
                scheduleJob(jobDate, function () {
                    //enviar los correos 
                    console.log(`id: ${id},jobDate: ${jobDate}`);
                });
        }

    } catch (error) {
        return error.message
    }
}

export default changeJobs