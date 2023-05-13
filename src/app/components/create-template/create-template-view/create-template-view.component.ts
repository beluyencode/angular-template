import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BackgroundTemplate, Template, TypeScreen } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-view',
  templateUrl: './create-template-view.component.html',
  styleUrls: ['./create-template-view.component.scss']
})
export class CreateTemplateViewComponent implements OnInit {
  @ViewChild('eleView') ele: ElementRef
  listTemplate: Template[];
  background: BackgroundTemplate;
  typeScreen = TypeScreen
  constructor(
    public createTemplateService: CreateTemplateService,
    private renderer2: Renderer2
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(
      (this.ele.nativeElement as HTMLDivElement).clientWidth
    );

  }

  ngOnInit(): void {
    this.createTemplateService.listen_change_list_element().subscribe((res: Template[]) => {
      if (res) {
        this.listTemplate = res;
      }
    });
    this.background = this.createTemplateService.background;
    this.createTemplateService.listen_full_screen().subscribe((res: boolean) => {
      if (res && this.createTemplateService.background.scale === TypeScreen.PC) {
        if (this.ele.nativeElement.requestFullscreen) {
          this.ele.nativeElement.requestFullscreen();
        } else if (this.ele.nativeElement.webkitRequestFullscreen) { /* Safari */
          this.ele.nativeElement.webkitRequestFullscreen();
        } else if (this.ele.nativeElement.msRequestFullscreen) { /* IE11 */
          this.ele.nativeElement.msRequestFullscreen();
        }
      }
    });
  }

  wheel(event: WheelEvent) {
    // if (event.deltaY > 0) {
    //   // console.log(ele.clientWidth);
    //   this.renderer2.setStyle(this.ele.nativeElement, 'width', this.ele.nativeElement.clientWidth + 20 + 'px');
    // } else {
    //   console.log("Scrolling up");
    //   // Perform actions for scrolling up
    //   this.renderer2.setStyle(this.ele.nativeElement, 'width', this.ele.nativeElement.clientWidth - 20 + 'px');

    // }
  }

}
