# About
## The package
Kaalendar is a TypeScript library that works with 0 dependency. It was made for help to manage calendars generation/creation and datepickers.

## Me
I had initially made this code for a personnel project that uses calendars but I'm said... *"Why don't share it with the beautiful land of Open Source & JavaScript's community?"* that's why I publish Kaalendarjs which is my first public package.

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

If you create the **kaalendar** like this, it wiil be instanciate with Date.now and use the current year and month as default.

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

    `params`:
    1. year
    2. month

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

    `params`:
    1. month
   
   👉 `kaalendar.getMonth(12)`

#### Generation:

- generateArray()
    ##### Description: 
    This method will return either a singleArray of days of the current month or a 2D array **AND** either the last days of the previous month + first days of the next month or not, depending on the options passed while instanciation:
    - generateASingleArray: `boolean`
    - generateOnlyDaysOfCurrentMonth: `boolean`

    👉 `kaalendar.generateArray()`

- Iterator()
    > You can use iterator features on your `kaalendar` object to get all month of the current year. This to avoid any memory leaks or useless memory requirement
    - Spread operator
    ```typescript
    const months = [...kaalendar];
    ```
    - `for of` loop
    ```typescript
    for (const month of kaalendar) {
        // do some stuff...
    }
    ```

## Month