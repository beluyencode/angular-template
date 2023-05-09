import { Component, ElementRef, OnInit } from '@angular/core';
import { CreateTemplateService } from '../create-template.service';

@Component({
  selector: 'app-create-template-view',
  templateUrl: './create-template-view.component.html',
  styleUrls: ['./create-template-view.component.scss']
})
export class CreateTemplateViewComponent implements OnInit {

  constructor(
    private createTemplateService: CreateTemplateService,
    private ele: ElementRef
  ) { }

  ngOnInit(): void {
    this.createTemplateService.listen_full_screen().subscribe((res: boolean) => {
      if (res) {
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

}
