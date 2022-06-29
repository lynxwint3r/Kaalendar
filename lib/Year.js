import Day from "./Day.js";
import Month from "./Month.js";

export default class Year {
    weekDays = [...Array(7)]
    
    constructor(year = null, monthNumber = null, lang = 'default', startDayOfWeek = 'sunday') {
        if(year && typeof year !== 'number') throw new TypeError('The year must be a number')

        if(monthNumber && typeof monthNumber !== 'number') throw new TypeError('The month must be a number')

        this.today = new Day(null, lang, startDayOfWeek)
        this.year = year ?? this.today.year
        this.month = new Month(new Date(this.year, (monthNumber || this.today.monthNumber) - 1), lang, startDayOfWeek)
        this.lang = lang
        this.startDayOfWeek = startDayOfWeek

        // TODO: move in utils 
        this.weekDays.forEach((_, i) => {
            const day = this.month.getDay(i)

            if(!this.weekDays.includes(day.day)){
                this.weekDays[day.dayNumber] = day.day
            }
        })
    }

    *[Symbol.iterator]() {
        let number = 1
        yield this.getMonth(number)
        while (number < 12) {
            ++number
            yield this.getMonth(number)
        }
    } 

    getMonth(monthNumber) {
        return new Month(new Date(this.year, monthNumber - 1), this.lang, this.startDayOfWeek)
    }
}

// const year = new Year(2020, 2, 'en')

// console.log(year.weekDays)