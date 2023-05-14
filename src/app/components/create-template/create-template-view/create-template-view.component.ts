import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BackgroundTemplate, Template, TypeScreen } from '../create-template';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-view',
  templateUrl: './create-template-view.component.html',
  styleUrls: ['./create-template-view.component.scss']
})
export class CreateTemplateViewComponent implements OnInit, AfterViewInit {
  @ViewChild('eleView') ele: ElementRef
  listTemplate: Template[];
  background: BackgroundTemplate;
  typeScreen = TypeScreen;
  scale: number;

  constructor(
    public createTemplateService: CreateTemplateService,
    private renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scale = (this.ele.nativeElement as HTMLDivElement).clientWidth / this.createTemplateService.scaleDefault;
      this.createTemplateService.currentWidth = (this.ele.nativeElement as HTMLDivElement).clientWidth;
      this.createTemplateService.currentHeight = (this.ele.nativeElement as HTMLDivElement).clientHeight;
      console.log(this.scale);
      console.log(this.createTemplateService.currentWidth);

    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scale = (this.ele.nativeElement as HTMLDivElement).clientWidth / this.createTemplateService.scaleDefault;
    this.createTemplateService.currentWidth = (this.ele.nativeElement as HTMLDivElement).clientWidth;
    this.createTemplateService.currentHeight = (this.ele.nativeElement as HTMLDivElement).clientHeight;
    console.log(this.scale);
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

  mouseOver(e: MouseEvent) {

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

  selectBackground() {
    // this.createTemplateService.active_template.next(null);
  }

}
