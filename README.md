# About
## The package
Kaalendar is a TypeScript library that works with 0 dependency. It was made for help to manage calendars generation/creation and datepickers.

## Me
I had initially made this code for a personnel project that uses calendars but 
as a citation that I really like say: 
> "All we have to decide is what to do with the time that is given us." ***J. R. R. Tolkien***

So that is why I decided to use mine to publish Kaalendarjs which is my first public package for the wonderful world of Open Source & JavaScript.

## In the future

I will add more features to the package in the futur like: 
- The possibility to provide a public holiday list
- The possibility to disable the weekend days
- Add hours:
  - Add working hours
  - Splitting the day on working hours
- Others ?

# Installation
### Installation from npm
See [npm documentation](https://docs.npmjs.com) on how to get started with npm.

`npm install --save kaalendar`

# How to use it ?
## Kaalendar
> How to use the Kaalendar class ?
### Instanciation
You can instanciate a new Kaalendar using its class:

#### Instanciation without any parameters:
```typescript
import Kaalendar from 'kaalendar';

const kaalendar = new Kaalendar();
```

If you create the **kaalendar** like this, it will be instanciate with Date.now and use the current year and month as default.

#### Instanciation with parameters:
1. The year
2. The month
3. The language
4. An enum of the days of the week so you can start the week by the day of you choice (monday to sunday)
5. An option object to provide optionnal parameters (available options are listed in the interface in Kaalendar file)


```typescript
import Kaalendar from 'kaalendar';
import { DaysOfWeek } from 'kaalendar/utils/utils';

const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, {
  generateOnlyDaysOfCurrentMonth: false,
  generateASingleArray: false,
});
```

### Methods

The kaalendar class provides a bunch of methods and features:

#### Navigation:
> The class provides methods to navigate through the calendar

- goToDate()

    params:
    1. `year`
    2. `month`

    👉 `kaalendar.goToDate(2021, 3)`

- goToNextMonth() 
    👉 `kaalendar.goToNextMonth()`

- goToPreviousMonth()
    👉 `kaalendar.goToPreviousMonth()`

- goToNextYear() 
    👉`kaalendar.goToNextYear()`

- goToPreviousYear()
    👉 `kaalendar.goToPreviousYear()`

#### Getter:

- getNextMonth() 
    👉 `kaalendar.getNextMonth()`

- getPreviousMonth()
    👉 `kaalendar.getPreviousMonth()`

- getMonth()

    params:
    1. `month`
   
   👉 `kaalendar.getMonth(12)`

#### Generation:

- generateArray()
    ##### Description: 
    This method will return either a singleArray of days of the current month or a 2D array **AND** either the last days of the previous month + first days of the next month or not, depending on the options passed while instanciation:
    - generateASingleArray: `boolean`
    - generateOnlyDaysOfCurrentMonth: `boolean`

    👉 `kaalendar.generateArray()`

- Iterator()
    > You can use iterable features on your `kaalendar` object to get all month of the current year. This to avoid any memory leaks or useless memory requirement
    - Spread operator
    ```typescript
    const months: Month[] = [...kaalendar];
    ```
    - `for of` loop
    ```typescript
    for (const month of kaalendar) {
        // do some stuff...
    }
    ```

## Month
> How to use the Month class ?

### Intanciation
In a "classic" usage of the package, you would not like to instanciate the Month class by your own since you can get the months from various methods.

But even if you need to, you do it like this:
#### Instanciation without any parameters:
```typescript
import Month from 'kaalendar/lib/Month';

const month = new Month();
```

If you create the **month** like this, it will be instanciate with Date.now and use the current month as default.

#### Instanciation with parameters:
1. The date
2. The language
3. An enum of the days of the week so you can start the week by the day of you choice (monday to sunday)


```typescript
import Month from 'kaalendar/lib/Month';
import { DaysOfWeek } from 'kaalendar/utils/utils';

const dateOfYourChoice = new Date();

const month = new Month(dateOfYourChoice, 'en', DaysOfWeek.SUNDAY);
```

### Methods

#### Getter:

- getDay()

    params:
    1. `day`

   👉 `month.getDay(31)`

#### Generation:
- Iterator()
    > You can use iterable features on your `month` object to get all day of the current month. This to avoid any memory leaks or useless memory requirement
    - Spread operator
    ```typescript
    const days: Day[] = [...month];
    ```
    - `for of` loop
    ```typescript
    for (const day of month) {
        // do some stuff...
    }
    ```

## Day
> How to use the Day class ?

### Intanciation
In a "classic" usage of the package, you would not like to instanciate the Day class by your own since you can get the days from various methods.

But even if you need to, you do it like this:
#### Instanciation without any parameters:
```typescript
import Day from 'kaalendar/lib/Day';

const day = new Day();
```

If you create the **day** like this, it will be instanciate with Date.now and use the current day as default.

#### Instanciation with parameters:
1. The date
2. The language
3. An enum of the days of the week so you can start the week by the day of you choice (monday to sunday)
4. An option object to provide optionnal parameters (available options are listed in the interface in Day file)

```typescript
import Day from 'kaalendar/lib/Day';
import { DaysOfWeek } from 'kaalendar/utils/utils';

const dateOfYourChoice = new Date();

const day = new Day(dateOfYourChoice, 'en', DaysOfWeek.SUNDAY, {
    activated: false,
});
```

### Methods
The day class provides a bunch of methods and features:

### Utilities

- get isToday()
    👉 `day.isToday`
- isEqualTo()

    params:
    1. `date`

    👉 `day.isEqualTo(date)`
- format()

    params:
    1. `string`

    👉 `day.format(stringToFormat)`

#### Data management
> The class provides methods to manage the data of each day

- resetDatas()
    👉 `day.resetDatas()`

- get data()
    👉 `day.data`

- set data(dataToAdd)
    👉 `day.data = {newData: 'some new data'}`

- getSpecificData()

    params:
    1. `theKeyYouWantToGet`

    👉 `day.getSpecificData(theKeyYouWantToGet)`

- setSpecificData()

    params:
    1. `theKeyYouWantToSet`
    2. `callback(data, keyFound)`

```typescript
day.setSpecificData('message', (data, found) => {
    if (found) // do some stuff
    else // do some stuff
})
```
