function logger() {
    const loggingTime = new Date()
    const loggingTimeYear = loggingTime.getFullYear()
    const loggingTimeMonth = loggingTime.getMonth()
    const loggingTimeDay = loggingTime.getDate()
    const loggingTimeHour = loggingTime.getHours()
    const loggingTimeMinute = loggingTime.getMinutes()
    const loggingTimeSecond = loggingTime.getSeconds()

    return `[${loggingTimeYear}-${loggingTimeMonth}-${loggingTimeDay} ${loggingTimeHour}:${loggingTimeMinute}:${loggingTimeSecond}]`
}

module.exports = { logger }