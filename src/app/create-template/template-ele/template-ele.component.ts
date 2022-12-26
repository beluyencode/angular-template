import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ELementType } from '../create-template';

@Component({
  selector: 'app-template-ele',
  templateUrl: './template-ele.component.html',
  styleUrls: ['./template-ele.component.scss']
})
export class TemplateEleComponent implements OnInit {
  @Input() dataElement: ELementType;
  @Output() changeInput = new EventEmitter<any>();
  @Output() openPopupEdit = new EventEmitter<any>();
  @ViewChild('drap') element: ElementRef<HTMLDivElement>;
  mouseDown: boolean = false;
  prevPosition: any = {
    top: 0,
    left: 0
  };
  listenMouseMove: any;
  isMove = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(event: any) {
    event.preventDefault();
    this.prevPosition = {
      top: event.clientY,
      left: event.clientX
    };
    this.element.nativeElement.onmousemove = (events: any) => {
      this.isMove = true;
      this.eventMouseMove(events);
    };
  }

  eventMouseMove(eventMouse: any) {
    this.dataElement.position.top = this.countPositon(eventMouse, 'top');
    this.dataElement.position.left = this.countPositon(eventMouse, 'left');
    this.changeInput.emit(this.dataElement);
    // this.renderer2.setStyle(this.element.nativeElement, 'top', this.countPositon(eventMouse, 'top') + 'px');
    // this.renderer2.setStyle(this.element.nativeElement, 'left', this.countPositon(eventMouse, 'left') + 'px');
    this.prevPosition = {
      top: eventMouse.clientY,
      left: eventMouse.clientX,
    };
  }

  countPositon(event: any, type: string) {
    switch (type) {
      case 'top':
        const returnValueTop = (this.element.nativeElement.offsetTop - this.prevPosition.top + event.clientY);
        if (returnValueTop < 0) {
          this.element.nativeElement.onmousemove = null;
          return 0;
        }
        return returnValueTop;
      case 'left':
        const returnValueLeft = (this.element.nativeElement.offsetLeft - this.prevPosition.left + event.clientX);
        if (returnValueLeft < 0) {
          this.element.nativeElement.onmousemove = null;
          return 0;
        }
        return returnValueLeft;
      default:
        return 0;
    }
  }

  onMouseUp() {
    this.element.nativeElement.onmousemove = null;
    if (!this.isMove) {
      console.log('popup');
      this.openPopupEdit.emit(this.dataElement);
    }
    this.isMove = false;
  }

  onMouseLeave() {
    this.element.nativeElement.onmousemove = null;
  }
}
