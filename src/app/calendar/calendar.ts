import { Component, inject, Input } from '@angular/core';
import { DayComponent } from "../day/day";
import { Day, Month } from "../shared/model";
import { PersistenceService } from "../shared/persistence.service";
import dayjs from "dayjs";

@Component({
  selector: 'app-calendar',
  imports: [DayComponent],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarComponent {
  @Input({ required: true }) set target(value: string) {
    this._target = value;
    let today = dayjs();
    this.model = this.persistence.load(value, today.year(), today.month() + 1);
  }
  get target(): string { return this._target; }
  private _target!: string;

  model!: Month;

  currentYear = dayjs().year();
  monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  private persistence = inject(PersistenceService);

  constructor() {
  }

  shift(delta: number) {
    let date = dayjs({ year: this.model.year, month: this.model.month - 1, day: 1 });
    date = date.add(delta, 'months');
    this.model = this.persistence.load(this.target, date.year(), date.month() + 1);
  }

  dayClicked(day: Day) {
    day.done = !day.done;
    this.persistence.save(this.target, this.model);
  }
}
