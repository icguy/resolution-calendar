import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from "moment"

const dbBaseUrl = "https://resolution-calendar.firebaseio.com/db";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	public currDate: string = "";
	public isDone: boolean = false;

	private currDateMoment!: moment.Moment;

	constructor(private http: HttpClient) {

	}

	public ngOnInit() {
		this.updateDate(moment());
	}

	public next() {
		this.updateDate(this.currDateMoment.add(1, "day"));
	}

	public prev() {
		this.updateDate(this.currDateMoment.add(-1, "day"));
	}

	public toggle() {
		this.http.put<boolean>(`${dbBaseUrl}/${this.currDate}.json`, !this.isDone).subscribe(resp => {
			this.isDone = resp;
		});
	}

	private updateDate(moment: moment.Moment) {
		this.currDate = moment.format("YYYY-MM-DD");
		this.currDateMoment = moment;
		this.http.get<boolean | null>(`${dbBaseUrl}/${this.currDate}.json`).subscribe(resp => {
			this.isDone = resp || false;
		});
	}
}
