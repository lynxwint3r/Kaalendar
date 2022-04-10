import Month from "./lib/Month.js";
import Year from "./lib/Year.js";

export default class Kaalendar extends Year {
    /**
     * 
     * @param {Number | null} year 
     * @param {Number | null} month 
     * @param {String | 'default'} lang 
     * @param {String | 'sunday'} startDayOfWeek 
     */
    constructor(year = null, month = null, lang = 'default', startDayOfWeek = 'sunday') {

        super(year, month, lang, startDayOfWeek)
        
        this.startDayOfWeek = startDayOfWeek
    }

    getPreviousMonth() {
        if(this.month.number === 1) {
            return new Month(new Date(this.year - 1, 11), this.lang, this.startDayOfWeek)
        }
        console.log(this.month.number);
        return new Month(new Date(this.year, this.month.number - 2), this.lang, this.startDayOfWeek)
    }
    
    getNextMonth() {
        if(this.month.number === 12) {
            return new Month(new Date(this.year + 1, 0), this.lang, this.startDayOfWeek)
        }
        console.log(this.month.number);
        return new Month(new Date(this.year, this.month.number), this.lang, this.startDayOfWeek)
    }

    goToDate(year, monthNumber) {
        this.month = new Month(new Date(year, monthNumber - 1), this.lang, this.startDayOfWeek)
        this.year = year
    }

    goToNextYear() {
        this.year += 1
        this.month = new Month(new Date(this.year, 0), this.lang, this.startDayOfWeek)
    }

    goToPreviousYear() {
        this.year -= 1
        this.month = new Month(new Date(this.year, 11), this.lang, this.startDayOfWeek)
    }

    goToNextMonth() {
        if(this.month.number === 12) {
            return this.goToNextYear()
        }
        this.month = new Month(new Date(this.year, this.month.number), this.lang, this.startDayOfWeek)
    }

    goToPreviousMonth() {
        if(this.month.number === 1) {
            this.goToPreviousYear()
        }
        this.month = new Month(new Date(this.year, this.month.number - 2), this.lang, this.startDayOfWeek)
    }
}

const calendar = new Kaalendar()

console.log(calendar)
