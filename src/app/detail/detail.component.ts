import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as moment from "moment";


@Component({
	selector: "app-detail",
	templateUrl: "./detail.component.html",
	styleUrls: ["./detail.component.scss"]
})
export class DetailComponent {

	public currDate: string = "";

	@Input()
	public isComplete: boolean = false;

	@Output("completed")
	public completedEmitter: EventEmitter<void> = new EventEmitter();

	constructor() {
		this.currDate = moment().format("YYYY. MMMM Do, dddd");
	}

	public complete(): void {
		this.completedEmitter.emit();
	}
}
