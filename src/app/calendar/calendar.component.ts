import { Component, Input } from "@angular/core";
import { Calendar } from '../models';

@Component({
	selector: "calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent {

	@Input()
	public calendar: Calendar = { months: [] };
}
