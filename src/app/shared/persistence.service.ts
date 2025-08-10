import { Injectable } from "@angular/core";
import { Day, Month, Week } from "./model";
import dayjs from "dayjs";

@Injectable({ providedIn: 'root' })
export class PersistenceService {

  createTarget(name: string) {
    let now = dayjs();
    let year = now.year();
    let month = now.month() + 1;
    let model: Month = { year, month, weeks: [] };
    this.save(name, model);
  }

  getTargets(): string[] {
    let allTargets = Object.keys(localStorage)
      .map(k => this.parseKey(k)?.target)
      .filter((t): t is string => !!t);
    let targets = new Set(allTargets);
    return [...targets];
  }

  removeTarget(target: string) {
    [...Object.keys(localStorage)].forEach(k => {
      let kt = this.parseKey(k)?.target;
      if (kt === target)
        localStorage.removeItem(k);
    });
  }

  load(target: string, year: number, month: number): Month {
    let key = this.getKey(target, year, month);
    let raw = localStorage.getItem(key);
    let doneDays = new Set<number>(raw ? JSON.parse(raw) : []);

    let first = dayjs({ year, month: month - 1, day: 1 }); // months are 0 indexed
    let firstMonday = first.day() === 1 ? first : first.startOf('isoWeek');
    let today = dayjs();

    let weeks: Week[] = [];
    for (let weekStart = firstMonday; weekStart.month() === first.month() || weekStart.isBefore(first); weekStart = weekStart.add(7, "days")) {
      let days: Day[] = [];
      for (let i = 0; i < 7; i++) {
        let d = weekStart.add(i, "days");
        days.push({
          num: d.date(),
          done: doneDays.has(d.date()),
          isCurrentMonth: d.month() === first.month(),
          isToday: d.isSame(today, 'day'),
        });
      }
      weeks.push({ days });
    }

    return { year, month, weeks };
  }

  save(target: string, model: Month) {
    let key = this.getKey(target, model.year, model.month);
    let doneDays: number[] = [];
    for (const week of model.weeks) {
      for (const day of week.days) {
        if (day.isCurrentMonth && day.done) {
          doneDays.push(day.num);
        }
      }
    }
    localStorage.setItem(key, JSON.stringify(doneDays));
  }

  private parseKey(key: string): { target: string, year: number, month: number } | undefined {
    const groups = /^(?<target>[^|]+)-(?<year>\d{4})-(?<month>\d{1,2})$/.exec(key)?.groups;
    if (groups) {
      let { target, year, month } = groups;
      return { target, year: +year, month: +month };
    }
    return undefined;
  }
  private getKey(target: string, year: number, month: number) {
    return `${target}-${year}-${month}`;
  }
}
