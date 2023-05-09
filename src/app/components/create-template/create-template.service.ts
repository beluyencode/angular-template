import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CreateTemplateService {
  fullScreen;
  constructor() {
    this.fullScreen = new BehaviorSubject<any>(false);
  }

  listen_full_screen() {
    return this.fullScreen.asObservable();
  }

}
