export function getWeekDaysStartingFromToday() {
  const daysArray = ['Пн', ' ', 'Ср', ' ', 'Пт', ' ', ' ']

  const currentDate = new Date()
  const currentDay = currentDate.getDay()

  const daysFromToday = [
    ...daysArray.slice(currentDay),
    ...daysArray.slice(0, currentDay),
  ]
  return daysFromToday
}

export function getMonthsStartingFromToday() {
  const monthsArray = [
    'Янв',
    'Февр.',
    'Март',
    'Апр.',
    'Май',
    'Июнь',
    'Июль',
    'Авг.',
    'Сент.',
    'Окт.',
    'Нояб.',
    'Дек.',
  ]

  const currentDate = new Date()
  const currentDayOfMonth = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const indexToSlice = currentDayOfMonth > 15 ? currentMonth + 1 : currentMonth

  const MonthFromToday = [
    ...monthsArray.slice(indexToSlice),
    ...monthsArray.slice(0, indexToSlice),
  ]
  return MonthFromToday
}
