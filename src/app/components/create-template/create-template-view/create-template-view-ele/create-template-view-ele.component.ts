import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Template } from '../../create-template';
import { CreateTemplateService } from '../../create-template.service';

@Component({
  selector: 'app-create-template-view-ele',
  templateUrl: './create-template-view-ele.component.html',
  styleUrls: ['./create-template-view-ele.component.scss']
})
export class CreateTemplateViewEleComponent implements OnInit, AfterViewInit {
  @ViewChild('ele') ele: ElementRef;
  @Input() data: Template;
  activeTemplate: Template | null;
  isSelect = false;

  constructor(
    public createTemplateService: CreateTemplateService,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data.width = (this.ele.nativeElement as HTMLDivElement).clientWidth;
    });
  }

  ngOnInit(): void {
    this.createTemplateService.listen_active_template().subscribe((res: Template | null) => {
      this.activeTemplate = res;
      if (this.data.id === this.activeTemplate?.id) {
        this.isSelect = true;
      } else {
        this.isSelect = false;
      }
    })
  }

  active() {
    this.createTemplateService.active_template.next(this.data);
  }
}
