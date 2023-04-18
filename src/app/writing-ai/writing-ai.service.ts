import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WritingAiService {
  myHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient
  ) { }

  checkGrammar(text: string) {
    const body = {
      text: text,
    };

  }


}
