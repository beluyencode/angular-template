import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CheckGrammarFeedbackType } from '../../writing-ai';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-writing-ai-char',
  templateUrl: './writing-ai-char.component.html',
  styleUrls: ['./writing-ai-char.component.scss']
})
export class WritingAiCharComponent implements OnInit {
  @Input() char: any;
  @ViewChild('charError') charError!: ElementRef<HTMLDivElement>;
  @ViewChild('charErrorMenu') charErrorMenu!: ElementRef<HTMLDivElement>;
  @Input() arrayDataError: CheckGrammarFeedbackType[];
  dataError: CheckGrammarFeedbackType | undefined;
  typeError: any = 'GRAMMAR';
  isOpenPopup: boolean = false;
  isTouchMargin: boolean = false;

  constructor(
    private renderer: Renderer2
  ) { }


  ngOnInit(): void {
    this.dataError = this.arrayDataError.find(ele => ele.error_grammar === this.char.text);
    if (this.dataError?.feedback_grammar === 'Possible spelling mistake found') {
      this.typeError = 'SPELLING'
    }
    if (this.char.isError) {
      this.renderer.listen('window', 'click', (e: any) => {
        if (!this.charError.nativeElement.contains(e.target)) {
          // clicked outside => close dropdown list
          this.isOpenPopup = false;
        } else {
          this.isOpenPopup = true;
          if (this.charError.nativeElement.getBoundingClientRect().left + this.charErrorMenu.nativeElement.offsetWidth > window.innerWidth) {
            this.isTouchMargin = true;
          } else {
            this.isTouchMargin = false;
          }

        }
      });
    }
  }

}
