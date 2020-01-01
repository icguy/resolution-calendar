import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { DbService } from "../db.service";


@Component({
	selector: "app-detail",
	templateUrl: "./detail.component.html",
	styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
	public currDate: string = "";
	public isDone: boolean = false;

	private currDateMoment!: moment.Moment;

	constructor(private db: DbService) {

	}

	public ngOnInit(): void {
		this.updateDate(moment());
	}

	public next(): void {
		this.updateDate(this.currDateMoment.add(1, "day"));
	}

	public prev(): void {
		this.updateDate(this.currDateMoment.add(-1, "day"));
	}

	public toggle(): void {
		this.db.saveDate(this.currDate, !this.isDone).subscribe(resp => this.isDone = resp);
	}

	private updateDate(date: moment.Moment): void {
		this.currDate = date.format("YYYY-MM-DD");
		this.currDateMoment = date;
		this.db.getDate(this.currDate).subscribe(resp => this.isDone = resp);
	}
}