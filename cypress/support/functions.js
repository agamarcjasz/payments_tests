export function nextMonth15th() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();    
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    const d = new Date(nextYear, nextMonth, 15)
    const nextMonth15th = new Intl.DateTimeFormat('en-US').format(d);

    return nextMonth15th
}

export function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return randomNumber
}