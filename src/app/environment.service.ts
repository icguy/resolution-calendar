import { Injectable } from "@angular/core";

@Injectable()
export class EnvironmentService {
	public get isLive(): boolean {
		if (this._isLive !== undefined)
			return this._isLive;
		return this._isLive = !/^https?:\/\/localhost/.test(window.location.href);
	}

	private _isLive: boolean | undefined;
}
