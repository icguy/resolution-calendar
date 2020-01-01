import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CalendarComponent } from './calendar/calendar.component';
import { DbService } from "./db.service";
import { DetailComponent } from './detail/detail.component';

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
		DbService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
