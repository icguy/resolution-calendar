import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import * as moment from 'moment';
import { AppComponent } from "./app.component";
import { CalendarComponent } from './calendar/calendar.component';
import { DbService } from "./db.service";
import { DetailComponent } from './detail/detail.component';
import { EnvironmentService } from './environment.service';


export function init(): any {
	return () => new Promise((resolve) => {
		moment.locale("hu");
		resolve();
	});
}

@NgModule({
	declarations: [
		AppComponent,
		CalendarComponent,
		DetailComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		DbService,
		EnvironmentService,
		{
			provide: APP_INITIALIZER,
			useFactory: init,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
