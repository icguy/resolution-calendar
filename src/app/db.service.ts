import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EnvironmentService } from './environment.service';
import { CalendarDto } from "./models";

@Injectable()
export class DbService {

	private dbBaseUrl: string;

	constructor(private http: HttpClient, env: EnvironmentService) {
		this.dbBaseUrl = env.isLive
			? "https://resolution-calendar.firebaseio.com/db"
			: "https://resolution-calendar.firebaseio.com/db-test";
	}

	public getDate(date: string): Observable<boolean> {
		return this.http.get<boolean | null>(`${this.dbBaseUrl}/${date}.json`).pipe(map(a => a || false));
	}

	public saveDate(date: string, value: boolean): Observable<boolean> {
		return this.http.put<boolean>(`${this.dbBaseUrl}/${date}.json`, value);
	}

	public getCalendar(): Observable<CalendarDto> {
		return this.http.get<CalendarDto>(`${this.dbBaseUrl}.json`);
	}
}
