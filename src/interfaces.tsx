export interface SportEvent {
  id: number;
  discipline: string;
  objectCity: string;
  address: string;
  dateWhen: string;
  dateTime: string; 
  amountOfPlayers: number; 
  peopleAssigned: number;
  price: number;
  skillLevel: string;
  isMultisportCard: boolean;
}

interface DateTimeParts {
  date: string;
  time: string;
}

export function extractDateTime(input: string): DateTimeParts {
  const [date, time] = input.split('T');
  const timePart = time.slice(0, 5);

  return {
    date,
    time: timePart
  };
}