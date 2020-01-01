import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { DbService } from "../db.service";

interface Calendar { months: Month[]; }
interface Month { days: Day[]; }

interface Day {
	isCurrent: boolean;
	isCompleted: boolean;
	isFuture: boolean;
}

function range(to: number): number[] {
	return [...Array(to).keys()];
}

@Component({
	selector: "calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {

	public calendar: Calendar = { months: [] };
	public now: moment.Moment;

	constructor(private db: DbService) {
	}

	public ngOnInit(): void {
		this.now = moment();
		this.initCalendar();

		this.db.getCalendar().subscribe(resp => {
			Object.keys(resp).forEach(key => {
				let [yy, mm, dd] = key.split("-").map(a => parseInt(a, 10));
				if (yy !== this.now.year())
					return;
				let day = this.calendar.months[mm - 1].days[dd - 1];
				day.isCompleted = !!resp[key];
			});
		});
	}

	private initCalendar(): void {
		this.calendar = { months: [] };

		this.calendar = {
			months: range(12).map((_: any, idx: number) => this.initMonth(idx))
		};
	}

	private initMonth(idx: number): Month {
		let numDays = moment(new Date(this.now.year(), idx, 1)).daysInMonth();
		let nowMM = this.now.month();
		let nowDay = this.now.date() - 1;
		return {
			days: range(numDays).map((_, dayIdx: number) => ({
				isCurrent: nowMM === idx && dayIdx === nowDay,
				isCompleted: false,
				isFuture: nowMM * 100 + nowDay < idx * 100 + dayIdx
			}))
		};
	}
}
