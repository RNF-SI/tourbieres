import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/conf/app.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  constructor(
    private _http: HttpClient,
  ) { }

  allReserves() {
    return this._http
      .get<any>(`${AppConfig.API_APP}/reserves`,
      this.httpOptions)
  }

  nomenclatureByMnemo(mnemonique) {
    return this._http.get<any>(
      `${AppConfig.API_APP}/nomenclature/` + `${mnemonique}`,
      this.httpOptions
    )
  }
}
