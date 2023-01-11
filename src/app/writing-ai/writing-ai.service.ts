import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WritingAiResType } from './writing-ai';

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

  getData() {
    return this.http.get<WritingAiResType>('./assets/VirtualWriting.json');
  }
}
