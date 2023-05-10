import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundTemplate, Template, TypeAction, TypeTemplate } from './create-template';

@Injectable()
export class CreateTemplateService {
  //data
  background: BackgroundTemplate = new BackgroundTemplate();
  listElement: Template[] = []
  ramdon = Math.random();

  //event
  load_list_element;
  fullScreen;
  active_template;

  constructor() {
    console.log(this.ramdon);

    this.fullScreen = new BehaviorSubject<any>(false);
    this.active_template = new BehaviorSubject<any>(null);
    this.listElement = [...Array(5)].map((ele: any, index: number) => {
      return new Template('element' + index);
    });
    this.listElement = [
      new Template('element')
    ]
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

  changeTemplate(template: Template | BackgroundTemplate, action: TypeAction) {
    if (template instanceof Template) {
      switch (action) {
        case TypeAction.ADD:
          this.listElement = [
            ...this.listElement,
            template
          ];
          this.load_list_element.next(this.listElement);
          break;
        case TypeAction.CHANGE:
          this.listElement = this.listElement.map((ele: Template) => {
            if (ele.id === template.id) {
              return template
            }
            return ele;
          });
          break;
        case TypeAction.DELETE:
          this.listElement = this.listElement.filter((ele: Template) => ele.id !== template.id);
          this.load_list_element.next(this.listElement);
          break;
        default:
          break;
      }
    } else {
      this.background = template
    }
  }
}
