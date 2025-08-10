
export interface Month {
  year: number;
  month: number;
  weeks: Week[];
}


export interface Week {
  days: Day[];
}


export interface Day {
  done?: boolean;
  num: number;
  isToday?: boolean;
  isCurrentMonth?: boolean;
}
