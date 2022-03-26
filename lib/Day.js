import { getDayOfWeek, getWeekNumber } from "../utils/utils.js"

export default class Day {

    /**
     * 
     * @param {Date} date 
     * @param {String} lang 
     */
    constructor(date = null, lang = 'default') {
        date = date ?? new Date()

        this.Date = date
        this.date = date.getDate()
        this.day = date.toLocaleString(lang, { weekday: 'long' })
        // this.dayNumber = date.getDay() + 1
        // TODO: take the month from the top parent (Year or Calendar)
        this.dayNumber = getDayOfWeek(this.Date)
        this.dayShort = date.toLocaleString(lang, { weekday: 'short' })
        this.year = date.getFullYear()
        this.yearShort = +date.toLocaleString(lang, { year: '2-digit' })
        this.month = date.toLocaleString(lang, { month: 'long' })
        this.monthShort = date.toLocaleString(lang, { month: 'short' })
        this.monthNumber = +date.toLocaleString(lang, { month: '2-digit' })
        this.timestamp = date.getTime()
        this.week = getWeekNumber(date)
    }

    get isToday() {
        return this.isEqualTo(new Date())
    }

    isEqualTo(date) {
        date = date instanceof Day ? date.Date : date
        
        return date.getDate() === this.date &&
            date.getMonth() === this.monthNumber - 1 &&
            date.getFullYear() === this.year
    }

    /**
     * 
     * @param {String} formatStr 
     * @returns 
     */
    format(formatStr) {
        return formatStr
            .replace(/\bYYYY\b/, this.year)
            .replace(/\bYY\b/, this.yearShort)
            .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
            .replace(/\bW\b/, this.week)
            .replace(/\bDDDD\b/, this.day)
            .replace(/\bDDD\b/, this.dayShort)
            .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
            .replace(/\bDO\b/, this.date.toString() + 'th')
            .replace(/\bD\b/, this.date)
            .replace(/\bMMMM\b/, this.month)
            .replace(/\bMMM\b/, this.monthShort)
            .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
            .replace(/\bM\b/, this.monthNumber)
    }
}

// const day = new Day(new Date(2022, 2, 20))

// console.log(day)