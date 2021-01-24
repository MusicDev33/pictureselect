import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  constructor(private http: HttpClient) {

  }

  public getRandomImgStrings(): Observable<object> {
    const url = `http://localhost:3000/random`;

    return this.http.get(url).pipe(map((res) => res));
  }

  public selectImg(imgName: string, loseName: string): Observable<object> {
    const url = `http://localhost:3000/select`;
    const body = {
      selected: imgName,
      lost: loseName
    };

    return this.http.post(url, body).pipe(map((res) => res));
  }

  getResults(): Observable<object> {
    const url = `http://localhost:3000/results`;

    return this.http.get(url).pipe(map((res) => res));
  }
}
