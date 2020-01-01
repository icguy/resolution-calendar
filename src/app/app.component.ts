import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { DbService } from "./db.service";
import { Calendar, Month } from './models';


function range(to: number): number[] {
	return [...Array(to).keys()];
}

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

	private now: moment.Moment;
	public isComplete: boolean = false;
	public calendar: Calendar;
	public isLoading: boolean = true;

	constructor(private db: DbService) {

	}

	public ngOnInit(): void {
		this.now = moment();
		this.initCalendar();
		this.loadCalendar();
	}

	public onCompleted(): void {
		this.db.saveDate(this.now.format("YYYY-MM-DD"), true).subscribe(_ => {
			this.isComplete = true;
			this.calendar.months.forEach(m => m.days.filter(d => d.isCurrent).forEach(d => d.isCompleted = true));
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

	private loadCalendar(): void {
		this.db.getCalendar().subscribe(resp => {
			Object.keys(resp || {}).forEach(key => {
				let [yy, mm, dd] = key.split("-").map(a => parseInt(a, 10));
				if (yy !== this.now.year())
					return;
				let day = this.calendar.months[mm - 1].days[dd - 1];
				day.isCompleted = !!resp[key];
				if (day.isCurrent)
					this.isComplete = day.isCompleted;
			});
			this.isLoading = false;
		});
	}
}
