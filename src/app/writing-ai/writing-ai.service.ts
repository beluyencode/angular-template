import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from 'constants/constants';
import { environment } from 'environments/environment';


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
    return this.http.post(environment.BASE_API_URL_WRITING_AI + CONSTANTS.API.IELTS.PRACTICE.WRITING_AI.CHECK_GRAMMAR, body, { headers: this.myHeader });
  }


}
