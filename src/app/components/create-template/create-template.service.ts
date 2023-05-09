import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundTemplate, Template, TypeTemplate } from './create-template';

@Injectable()
export class CreateTemplateService {
  //data
  background: BackgroundTemplate = {
    name: 'background',
    url: './../../../../assets/create-template/background.png'
  }
  listElement: Template[] = []

  //event
  load_list_element;
  fullScreen;
  active_template;

  constructor() {
    this.fullScreen = new BehaviorSubject<any>(false);
    this.active_template = new BehaviorSubject<any>(null);
    this.listElement = [...Array(5)].map((ele: any, index: number) => {
      return {
        x: 0,
        y: 0,
        content: '123',
        name: 'element ' + index,
        width: 0,
        height: 0,
        color: '',
        align: '',
        hidden: false,
        type: TypeTemplate.TEXT,
        id: this.ObjectId()
      }
    });
    this.load_list_element = new BehaviorSubject<any>(this.listElement);
  }

  ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  listen_full_screen() {
    return this.fullScreen.asObservable();
  }

  listen_active_template() {
    return this.active_template.asObservable();
  }

  listen_change_list_element() {
    return this.load_list_element.asObservable();
  }


}
