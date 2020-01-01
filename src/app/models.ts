export interface CalendarDto {
	[key: string]: boolean;
}

export interface Calendar { months: Month[]; }
export interface Month { days: Day[]; }

export interface Day {
	isCurrent: boolean;
	isCompleted: boolean;
	isFuture: boolean;
}
