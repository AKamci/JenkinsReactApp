import birthdays from '../../data/birthdays.json';

export interface Birthday {
  name: string;
  date: string;
}

export const checkTodaysBirthdays = (): Birthday[] => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayFormatted = `${month}-${day}`;

  return birthdays.birthdays.filter((birthday) => birthday.date === todayFormatted);
}; 