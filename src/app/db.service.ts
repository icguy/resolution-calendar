import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CalendarDto } from "./models";

const dbBaseUrl = "https://resolution-calendar.firebaseio.com/db";

@Injectable()
export class DbService {

	constructor(private http: HttpClient) {

	}

	public getDate(date: string): Observable<boolean> {
		return this.http.get<boolean | null>(`${dbBaseUrl}/${date}.json`).pipe(map(a => a || false));
	}

	public saveDate(date: string, value: boolean): Observable<boolean> {
		return this.http.put<boolean>(`${dbBaseUrl}/${date}.json`, value);
	}

	public getCalendar(): Observable<CalendarDto> {
		return this.http.get<CalendarDto>(`${dbBaseUrl}.json`);
	}
}
