import { Component, inject, OnInit, signal } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PersistenceService } from "./shared/persistence.service";
import { pairwise, startWith } from "rxjs";
import dayjs from "dayjs";
import { Month } from "./shared/model";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CalendarComponent, ReactiveFormsModule]
})
export class App implements OnInit {
  targets: string[] = [];

  newTargetValue = "<new>";
  deleteTargetValue = "<delete>";

  targetControl: FormControl<string | undefined> = new FormControl<string | undefined>(undefined, { nonNullable: true });
  selectedTarget?: string;

  private persistence = inject(PersistenceService);

  ngOnInit(): void {
    this.targets = this.persistence.getTargets();
    this.targetControl.valueChanges.pipe(
      startWith(undefined),
      pairwise()
    ).subscribe(([prev, curr]) => {
      switch (curr) {
        case this.newTargetValue: this.addTarget(); break;
        case this.deleteTargetValue: this.deleteTarget(prev); break;
        default: this.selectedTarget = curr; break;
      }
    });
    this.targetControl.setValue(this.targets[0]);
  }

  deleteTarget(target: string | null | undefined) {
    if (target) {
      this.persistence.removeTarget(target);
      this.targets = this.targets.filter(t => t !== target);
      let current = this.targets[0];
      this.targetControl.setValue(current);
    }
  }

  addTarget() {
    let name = prompt("Choose a name");
    if (name) {
      this.targets.push(name);
      this.persistence.createTarget(name);
      this.targetControl.setValue(name);
    }
  }
}
