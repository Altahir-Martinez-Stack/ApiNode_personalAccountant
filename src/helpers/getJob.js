const OPTIONS_DAYS = {
    everyday: "0-6", //todos los dias
    weekends: '6,0', //fin de semanas
    mondays: '1', //lunes
    tuesday: '2', //martes
    wednesday: '3', //miercoles
    thursday: '4', //jueves
    friday: '5', //viernes
    saturday: '6', //sabado
    sunday: '0', //domingo
}

const isDay = (day) => {
    if (typeof day !== "string") return false
    if (Object.values(OPTIONS_DAYS).includes(day)) return day
    return false
}

const isHour = (hour) => {
    if (typeof hour !== "number") return false
    if (hour >= 0 && hour <= 23) return hour
    return false
}

const isMinute = (minute) => {
    if (typeof minute !== "number") return false
    if (minute >= 0 && minute <= 59) return minute
    return false
}

function getJob({ day, hour, minute }) {
    if (!isDay(day)) return;
    if (!isHour(hour)) return;
    if (!isMinute(minute)) return;

    return `${minute} ${hour} * * ${day}`
}

export default getJob


/*
Falta usar node-schedule
- crear estas dos columnas jobtext jobstatus en la tabla Details
- Averiguar como crear multijobs dinamicos
*/