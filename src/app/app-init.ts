import dayjs from "dayjs";
import * as objectSupport from "dayjs/plugin/objectSupport";
import * as isoWeek from "dayjs/plugin/isoWeek";
import { Observable, of } from "rxjs";

export function initApp(): Observable<void> {
  dayjs.extend(objectSupport.default);
  dayjs.extend(isoWeek.default);
  return of();
}
