import Month from './lib/Month.js'
import Year from './lib/Year.js'

export default class Kaalendar extends Year {
  /**
   *
   * @param {Number | null} year
   * @param {Number | null} month
   * @param {String | 'default'} lang
   * @param {String | 'sunday'} startDayOfWeek
   * @param {Object} options
   */
  constructor(year = null, month = null, lang = 'default', startDayOfWeek = 'sunday', options = {}) {
    //TODO: Implement a functionnality to provide public holidays & lock them

    //TODO: Implement Working hours

    // TODO: Implement day splitting on working hours
    // let cutTheDaysBy = 0

    // if (
    //     options?.cutTheDaysBy !== undefined &&
    //     typeof options?.cutTheDaysBy === 'number' &&
    //     options?.cutTheDaysBy > 0
    // )
    //     cutTheDaysBy = options?.cutTheDaysBy

    // TODO: implement the options to child classes
    super(year, month, lang, startDayOfWeek)

    this.startDayOfWeek = startDayOfWeek
    this.generateOnlyDaysOfCurrentMonth = options?.generateOnlyDaysOfCurrentMonth ?? false
    this.generateASingleArray = options?.generateASingleArray ?? true
  }

  getPreviousMonth() {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, 11), this.lang, this.startDayOfWeek)
    }
    console.log(this.month.number)
    return new Month(new Date(this.year, this.month.number - 2), this.lang, this.startDayOfWeek)
  }

  getNextMonth() {
    if (this.month.number === 12) {
      return new Month(new Date(this.year + 1, 0), this.lang, this.startDayOfWeek)
    }
    console.log(this.month.number)
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
    if (this.month.number === 12) {
      return this.goToNextYear()
    }
    this.month = new Month(new Date(this.year, this.month.number), this.lang, this.startDayOfWeek)
  }

  goToPreviousMonth() {
    if (this.month.number === 1) {
      this.goToPreviousYear()
    }
    this.month = new Month(new Date(this.year, this.month.number - 2), this.lang, this.startDayOfWeek)
  }

  generateDaysBeforeAndAfter(
    previousMonthDays,
    nextMonthDays,
    [dayNumberOfFirstDayOfMonth, dayNumberOfLastDayOfMonth]
  ) {
    const numberOfDaysToSkipFromPreviousMonth = previousMonthDays.length - dayNumberOfFirstDayOfMonth
    const numberOfDaysToTakeFromNextMonth = 6 - dayNumberOfLastDayOfMonth

    return this.generateOnlyDaysOfCurrentMonth
      ? [new Array(previousMonthDays.length - numberOfDaysToSkipFromPreviousMonth), new Array(numberOfDaysToTakeFromNextMonth)]
      : [
          previousMonthDays.slice(numberOfDaysToSkipFromPreviousMonth, previousMonthDays.length),
          nextMonthDays.slice(0, numberOfDaysToTakeFromNextMonth),
        ]
  }

  singleArrayGeneration() {
    const dayNumberOfFirstDayOfMonth = this.month.getDay(1).dayNumber
    const dayNumberOfLastDayOfMonth = this.month.getDay(this.month.numberOfDays).dayNumber
    const previousMonthDays = [...this.getPreviousMonth()]
    const nextMonthDays = [...this.getNextMonth()]

    const [daysBeforeCurrentMonth, daysAfterCurrentMonth] = this.generateDaysBeforeAndAfter(
      previousMonthDays,
      nextMonthDays,
      [dayNumberOfFirstDayOfMonth, dayNumberOfLastDayOfMonth]
    )

    return [...daysBeforeCurrentMonth, ...this.month, ...daysAfterCurrentMonth]
  }

  // TODO: Implement 2D array generation
  doubleArrayGeneration() {}

  generateArray() {
    if (this.generateASingleArray) return this.singleArrayGeneration()

    return this.doubleArrayGeneration()
  }
}

const calendar = new Kaalendar(null, null, 'en', 'sunday', {
  generateOnlyDaysOfCurrentMonth: false,
})

console.log(calendar)

console.table(calendar.generateArray())

// const today = calendar.today

// today.data = {name: 'This is a name'}

// console.log(today.data)

// console.log(today.getSpecificData('name'))

// today.setSpecificData('message', (data, found) => {
//     console.log(found, data);
// })

// today.data = {message: 'This is an awesome message'}

// today.setSpecificData('message', (data, found) => {
//     if (found) data.number = 4
//     console.log('number' in data);
// })

// console.log(today.data)

// console.log(calendar);
