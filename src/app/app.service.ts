import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchedules } from './schedules.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'schedules.json';

  constructor(private readonly http: HttpClient) { }

  public getSchedules(): Observable<ISchedules> {
    return this.http.get<ISchedules>(this.url);
  }
}
