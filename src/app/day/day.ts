import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from "../shared/model";

@Component({
  selector: 'app-day',
  imports: [],
  templateUrl: './day.html',
  styleUrl: './day.scss'
})
export class DayComponent {
  @Input({required: true}) day!: Day;
  @Output() change = new EventEmitter<Day>();
}
