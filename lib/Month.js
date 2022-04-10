import { MONTHS_SIZE, isLeapYear } from "../utils/utils.js";
import Day from "./Day.js";

export default class Month {
    constructor(date = null, lang = 'default', startDayOfWeek = 'sunday') {
        const day = new Day(date, lang, startDayOfWeek)
        const monthsSize = MONTHS_SIZE
        this.lang = lang

        this.name = day.month
        this.number = day.monthNumber
        this.year = day.year
        this.numberOfDays = monthsSize[this.number - 1]
        this.startDayOfWeek = startDayOfWeek

        // It means February
        if (this.number === 2) {
            this.numberOfDays += isLeapYear(day.year) ? 1 : 0
        }
    }

    *[Symbol.iterator]() {
        let number = 1
        yield this.getDay(number)
        while (number < this.numberOfDays) {
            ++number
            yield this.getDay(number)
        }
    } 

    getDay(date) {
        return new Day(new Date(this.year, this.number - 1, date), this.lang, this.startDayOfWeek)
    }
}
